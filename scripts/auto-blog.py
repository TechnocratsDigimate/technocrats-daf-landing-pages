"""Discover and draft a guarded structured article candidate.

This script does not publish, commit, push, merge, deploy, or call the Google
Indexing API. The GitHub workflow passes its structured candidate through the
independent policy validator before any pull request can be merged.
"""

from __future__ import annotations

import argparse
import json
import os
import random
import re
import sys
import time
from datetime import datetime, timezone
from pathlib import Path

from blog_pipeline import (
    CONFIG_PATH,
    collision_report,
    existing_articles,
    load_json,
    normalize_text,
    pending_topics,
    write_json,
)

try:
    from pytrends.request import TrendReq
except ImportError:
    TrendReq = None

try:
    import anthropic
except ImportError:
    anthropic = None


KEYWORDS = [
    ["AI marketing", "Digital Marketing"],
    ["Meta Ads", "Facebook Ads"],
    ["Google Ads", "PPC"],
    ["WhatsApp marketing", "Marketing Automation"],
    ["Performance Marketing", "Lead Generation"],
    ["Instagram Ads", "Social Media Marketing"],
    ["conversion tracking", "GA4"],
]

FALLBACK_TOPICS = [
    ("How to verify Meta conversion tracking signals", "verify meta conversion tracking", "Tracking & Analytics"),
    ("How to diagnose Google Ads search term waste", "google ads search term waste", "Google Ads"),
    ("WhatsApp lead follow-up workflow checklist", "whatsapp lead follow up workflow", "WhatsApp & CRM Automation"),
    ("Landing page message-match audit process", "landing page message match audit", "Landing Pages & CRO"),
]

CATEGORY_MAP = {
    "Meta Ads": ["meta ads", "facebook ads", "advantage+", "lead ads", "instagram ads"],
    "Google Ads": ["google ads", "ppc", "search ads", "performance max"],
    "AI Marketing Tools": ["ai", "chatgpt", "gemini", "artificial intelligence"],
    "WhatsApp & CRM Automation": ["whatsapp", "automation", "crm", "follow-up"],
    "Tracking & Analytics": ["tracking", "analytics", "pixel", "capi", "conversion", "ga4"],
    "Landing Pages & CRO": ["landing page", "cro", "conversion rate", "message match"],
}

SYSTEM_PROMPT = """You draft low-risk evergreen educational content for Technocrats
Digimate. Return one valid JSON object only. Do not wrap it in Markdown.

Rules:
- Never invent a URL, source, statistic, price, benchmark, client, case study,
  screenshot, certification, testimonial, campaign result or first-person experience.
- Sources MUST come only from these approved domains (no others will pass validation):
    developers.google.com, support.google.com, business.google.com,
    facebook.com, developers.facebook.com, about.fb.com,
    meity.gov.in, gov.in
  Every source URL must begin with https:// and one of those domains.
  Minimum 2 sources required. Cite each in the body as [source:source-id].
- Do not use these words (automated superlative check will reject the article):
    best, guaranteed, always, never fails, number one, #1, ultimate
  Replace them with specific, measured alternatives (e.g. "one reliable approach").
- Do not claim Google Trends proves a factual statement.
- Do not use precise percentages, currency amounts or performance benchmarks.
- Do not use "our campaigns", "our clients" or "we achieved".
- Use H2/H3 Markdown headings, a useful introduction, a practical framework and
  checklist, and at least two relevant Technocrats Digimate internal links.
- Links must use valid Markdown syntax.
- Do not include an H1 in the body.
- If the topic needs uncertain claims, set publicationMode to "manual-review".
- AI validation is not human fact-checking.
"""


def detect_category(value: str) -> str:
    lowered = value.lower()
    for category, terms in CATEGORY_MAP.items():
        if any(term in lowered for term in terms):
            return category
    return "Performance Marketing"


def get_trending_topics() -> list[dict[str, str]]:
    if TrendReq is None:
        return []
    selected = random.choice(KEYWORDS)
    collected: list[dict[str, str]] = []
    try:
        trends = TrendReq(hl="en-IN", tz=330, timeout=(10, 30), retries=2)
        trends.build_payload(selected, cat=0, timeframe="now 7-d", geo="IN")
        related = trends.related_queries()
        for keyword in selected:
            result = related.get(keyword) or {}
            for kind in ("rising", "top"):
                frame = result.get(kind)
                if frame is None or frame.empty:
                    continue
                for _, row in frame.head(5).iterrows():
                    query = str(row["query"]).strip()
                    if len(query) >= 12:
                        collected.append(
                            {
                                "topic": query,
                                "primaryQuery": query,
                                "baseKeyword": keyword,
                                "category": detect_category(f"{query} {keyword}"),
                                "source": "Google Trends topic discovery",
                            }
                        )
        time.sleep(1)
    except Exception as error:
        print(f"Topic discovery warning: {error}", file=sys.stderr)
    return collected


def topic_candidate(topic: str, query: str, category: str) -> dict[str, object]:
    return {
        "slug": re.sub(r"-+", "-", re.sub(r"[^a-z0-9]+", "-", query.lower())).strip("-")[:70],
        "title": topic,
        "primaryQuery": query,
        "searchIntent": "informational",
        "category": category,
        "body": "",
        "headings": [],
    }


def choose_differentiated_topic(
    pending_path: Path | None,
) -> tuple[dict[str, str] | None, list[dict[str, object]]]:
    config = load_json(CONFIG_PATH, {})
    records = existing_articles() + pending_topics(pending_path)
    discovered = get_trending_topics()
    fallback = [
        {
            "topic": topic,
            "primaryQuery": query,
            "baseKeyword": query,
            "category": category,
            "source": "approved evergreen fallback",
        }
        for topic, query, category in FALLBACK_TOPICS
    ]
    candidates = discovered + fallback
    skips: list[dict[str, object]] = []
    seen: set[str] = set()
    for candidate in candidates:
        key = normalize_text(candidate["primaryQuery"])
        if key in seen:
            continue
        seen.add(key)
        collision = collision_report(
            topic_candidate(
                candidate["topic"],
                candidate["primaryQuery"],
                candidate["category"],
            ),
            records,
            config,
        )
        if collision:
            skips.append(
                {
                    "topic": candidate["topic"],
                    "reason": "topic-cluster collision",
                    "collision": collision,
                }
            )
            continue
        return candidate, skips
    return None, skips


def generation_prompt(topic: dict[str, str]) -> str:
    today = datetime.now(timezone.utc).date().isoformat()
    return f"""Draft an article for this approved topic:
Topic: {topic['topic']}
Primary query: {topic['primaryQuery']}
Category: {topic['category']}
Audience: Indian business owners and performance marketers
Date: {today}

Return all fields:
slug, title, metaTitle, metaDescription, primaryQuery, searchIntent, category,
author, reviewer, datePublished, dateModified, summary, body, sources, faq,
checklist, relatedContent, ctaType, generationMethod, qualityChecks,
publicationMode, monetisationEligible, adEligible, status, image.

Use author "Gautam Punj", reviewer "Automated editorial gates", status "draft",
generationMethod "AI-assisted draft with automated source and policy validation",
and image "/opengraph-image". qualityChecks may contain {{"pending": true}}.
Sources need id, title, publisher and url. Use at least two official sources.
"""


def generate_candidate(topic: dict[str, str], api_key: str) -> dict[str, object]:
    if anthropic is None:
        raise RuntimeError("anthropic package is not installed")
    client = anthropic.Anthropic(api_key=api_key)
    response = client.messages.create(
        model=os.environ.get("AUTO_BLOG_MODEL", "claude-sonnet-4-6"),
        max_tokens=5000,
        system=SYSTEM_PROMPT,
        messages=[{"role": "user", "content": generation_prompt(topic)}],
    )
    raw = response.content[0].text.strip()
    if raw.startswith("```"):
        raw = re.sub(r"^```(?:json)?\s*|\s*```$", "", raw)
    return json.loads(raw)


def main() -> int:
    parser = argparse.ArgumentParser()
    parser.add_argument("--output", type=Path, required=True)
    parser.add_argument("--pending-prs", type=Path)
    parser.add_argument("--topic-only", action="store_true")
    args = parser.parse_args()

    topic, skips = choose_differentiated_topic(args.pending_prs)
    if topic is None:
        summary = {
            "status": "skipped",
            "reason": "No sufficiently differentiated topic was available.",
            "skippedTopics": skips,
        }
        write_json(args.output, summary)
        print(json.dumps(summary, ensure_ascii=False, indent=2))
        return 4

    if args.topic_only:
        write_json(args.output, topic)
        print(json.dumps(topic, ensure_ascii=False, indent=2))
        return 0

    api_key = os.environ.get("ANTHROPIC_API_KEY", "")
    if not api_key:
        raise SystemExit("ANTHROPIC_API_KEY is required for generation")
    article = generate_candidate(topic, api_key)
    article["topicDiscovery"] = {
        "source": topic["source"],
        "query": topic["primaryQuery"],
    }
    write_json(args.output, article)
    print(f"Candidate drafted: {article.get('slug')}")
    return 0


if __name__ == "__main__":
    sys.exit(main())
