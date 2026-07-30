"""Guardrails and storage for the Technocrats Digimate automated blog pipeline."""

from __future__ import annotations

import argparse
import hashlib
import json
import os
import re
import sys
import urllib.error
import urllib.request
from dataclasses import dataclass, field
from datetime import datetime, timedelta, timezone
from pathlib import Path
from typing import Any, Iterable
from urllib.parse import urlparse


ROOT = Path(__file__).resolve().parents[1]
CONFIG_PATH = ROOT / "config" / "auto-blog.json"
LEGACY_POSTS_PATH = ROOT / "lib" / "blog" / "posts.ts"
AUTOMATED_CONTENT_DIR = ROOT / "content" / "blog" / "automated"
AUTOMATION_LOG_PATH = ROOT / "content" / "blog" / "automation-log.json"
SUMMARY_PATH = ROOT / ".automation" / "summary.json"
SITE_URL = "https://technocratsdigimate.com"

RISK_PATTERNS = {
    "performance-claim": re.compile(
        r"\b(?:our campaigns?|our clients?|we achieved|we generated|we reduced|we increased)\b",
        re.IGNORECASE,
    ),
    "precise-benchmark": re.compile(
        r"(?:\b\d+(?:\.\d+)?\s*%|\b₹\s?\d|\bRs\.?\s?\d|\b\d+\s*(?:x|times)\b)",
        re.IGNORECASE,
    ),
    "named-case-study": re.compile(r"\b(?:case study|client result|client account)\b", re.IGNORECASE),
    "pricing": re.compile(r"\b(?:price|pricing|costs? ₹|₹\s?\d|per month)\b", re.IGNORECASE),
}
PLACEHOLDER_PATTERN = re.compile(
    r"\b(?:TODO|TBD|INSERT|PLACEHOLDER|YOUR_[A-Z_]+|example\.com)\b"
)
UNSUPPORTED_SUPERLATIVE_PATTERN = re.compile(
    r"\b(?:best|guaranteed|always|never fails|number one|#1|ultimate)\b", re.IGNORECASE
)
RAW_MARKDOWN_LINK_PATTERN = re.compile(r"\[[^\]]+\]\([^)]+\)")
MARKDOWN_LINK_PATTERN = re.compile(r"\[([^\]]+)\]\((https?://[^)]+|/[^)]+)\)")
SOURCE_MARKER_PATTERN = re.compile(r"\[source:([a-zA-Z0-9_-]+)\]")
HEADING_PATTERN = re.compile(r"^#{2,3}\s+(.+)$", re.MULTILINE)
WORD_PATTERN = re.compile(r"[a-z0-9]+")
RAW_HTML_PATTERN = re.compile(r"<\s*/?\s*[a-z][^>]*>", re.IGNORECASE)
ACTIVE_CONTENT_PATTERN = re.compile(
    r"(?:javascript\s*:|data\s*:\s*text/html|on[a-z]+\s*=|"
    r"!\[[^\]]*\]\([^)]+\)|<\s*(?:script|iframe|object|embed|svg|img)\b)",
    re.IGNORECASE,
)
SAFE_IMAGE_PATTERN = re.compile(
    r"^/(?:opengraph-image|assets/[a-zA-Z0-9._/-]+)$"
)


@dataclass
class ValidationResult:
    passed: bool
    publication_mode: str
    errors: list[str] = field(default_factory=list)
    warnings: list[str] = field(default_factory=list)
    checks: dict[str, bool] = field(default_factory=dict)
    collision: dict[str, Any] | None = None


def load_json(path: Path, default: Any = None) -> Any:
    if not path.exists():
        return default
    return json.loads(path.read_text(encoding="utf-8"))


def write_json(path: Path, payload: Any) -> None:
    path.parent.mkdir(parents=True, exist_ok=True)
    path.write_text(
        json.dumps(payload, ensure_ascii=False, indent=2) + "\n",
        encoding="utf-8",
    )


def normalize_text(value: str) -> str:
    return " ".join(WORD_PATTERN.findall(value.lower()))


def token_set(value: str) -> set[str]:
    stop = {
        "a", "an", "and", "are", "as", "at", "be", "for", "from", "how",
        "in", "is", "it", "of", "on", "or", "the", "to", "what", "with",
        "your", "you", "why",
    }
    return {word for word in normalize_text(value).split() if word not in stop}


def jaccard(left: str, right: str) -> float:
    a, b = token_set(left), token_set(right)
    if not a or not b:
        return 0.0
    return len(a & b) / len(a | b)


def paragraph_fingerprints(body: str) -> list[str]:
    return [
        normalize_text(part)
        for part in re.split(r"\n\s*\n", body)
        if len(normalize_text(part).split()) >= 8
    ]


def extract_legacy_articles() -> list[dict[str, Any]]:
    source = LEGACY_POSTS_PATH.read_text(encoding="utf-8")
    pattern = re.compile(
        r'slug:\s*"(?P<slug>[^"]+)".*?'
        r'title:\s*"(?P<title>[^"]+)".*?'
        r'description:\s*"(?P<description>[^"]+)".*?'
        r'category:\s*"(?P<category>[^"]+)".*?'
        r"content:\s*`(?P<body>.*?)`,\s*\}",
        re.DOTALL,
    )
    records = []
    for match in pattern.finditer(source):
        body = match.group("body")
        records.append(
            {
                "slug": match.group("slug"),
                "title": match.group("title"),
                "metaTitle": match.group("title"),
                "metaDescription": match.group("description"),
                "primaryQuery": match.group("title"),
                "searchIntent": "informational",
                "category": match.group("category"),
                "body": body,
                "headings": HEADING_PATTERN.findall(body),
                "status": "published",
            }
        )
    return records


def extract_automated_articles() -> list[dict[str, Any]]:
    if not AUTOMATED_CONTENT_DIR.exists():
        return []
    return [
        load_json(path, {})
        for path in sorted(AUTOMATED_CONTENT_DIR.glob("*.json"))
    ]


def existing_articles() -> list[dict[str, Any]]:
    return extract_legacy_articles() + extract_automated_articles()


def pending_topics(path: Path | None) -> list[dict[str, str]]:
    if not path or not path.exists():
        return []
    payload = load_json(path, [])
    return [
        {
            "slug": item.get("headRefName", ""),
            "title": item.get("title", ""),
            "primaryQuery": item.get("title", ""),
            "searchIntent": "pending",
            "category": "pending",
            "body": "",
            "headings": [],
        }
        for item in payload
    ]


def collision_report(
    candidate: dict[str, Any],
    records: Iterable[dict[str, Any]],
    config: dict[str, Any],
) -> dict[str, Any] | None:
    normalized_slug = normalize_text(candidate.get("slug", ""))
    normalized_title = normalize_text(candidate.get("title", ""))
    candidate_headings = " ".join(
        candidate.get("headings") or HEADING_PATTERN.findall(candidate.get("body", ""))
    )
    strongest: dict[str, Any] | None = None

    for record in records:
        slug_exact = normalized_slug == normalize_text(record.get("slug", ""))
        title_exact = normalized_title == normalize_text(record.get("title", ""))
        title_similarity = jaccard(candidate.get("title", ""), record.get("title", ""))
        query_similarity = jaccard(
            candidate.get("primaryQuery", ""),
            record.get("primaryQuery", record.get("title", "")),
        )
        intent_match = (
            normalize_text(candidate.get("searchIntent", ""))
            == normalize_text(record.get("searchIntent", ""))
            and query_similarity >= 0.5
        )
        heading_overlap = jaccard(
            candidate_headings,
            " ".join(
                record.get("headings")
                or HEADING_PATTERN.findall(record.get("body", ""))
            ),
        )
        body_similarity = jaccard(candidate.get("body", ""), record.get("body", ""))
        category_collision = (
            normalize_text(candidate.get("category", ""))
            == normalize_text(record.get("category", ""))
            and max(title_similarity, query_similarity, heading_overlap) >= 0.55
        )
        score = max(title_similarity, query_similarity, heading_overlap, body_similarity)
        collided = (
            slug_exact
            or title_exact
            or title_similarity >= config["maximumTitleSimilarity"]
            or body_similarity >= config["maximumBodySimilarity"]
            or heading_overlap >= config["maximumHeadingOverlap"]
            or intent_match
            or category_collision
        )
        if collided and (strongest is None or score > strongest["score"]):
            strongest = {
                "slug": record.get("slug"),
                "title": record.get("title"),
                "score": round(score, 3),
                "checks": {
                    "slugExact": slug_exact,
                    "titleExact": title_exact,
                    "titleSimilarity": round(title_similarity, 3),
                    "querySimilarity": round(query_similarity, 3),
                    "intentMatch": intent_match,
                    "headingOverlap": round(heading_overlap, 3),
                    "bodySimilarity": round(body_similarity, 3),
                    "categoryCollision": category_collision,
                },
                "recommendation": (
                    f"Update the existing canonical article '{record.get('slug')}' "
                    "instead of publishing another URL."
                ),
            }
    return strongest


def publication_frequency(
    now: datetime, config: dict[str, Any], log: dict[str, Any]
) -> tuple[bool, str]:
    publications = [
        entry
        for entry in log.get("publications", [])
        if entry.get("mode") == "automatic" and entry.get("publishedAt")
    ]
    times = sorted(
        (
            datetime.fromisoformat(entry["publishedAt"].replace("Z", "+00:00"))
            for entry in publications
        ),
        reverse=True,
    )
    if times:
        minimum = timedelta(hours=config["minimumHoursBetweenAutomaticPublications"])
        if now - times[0] < minimum:
            return False, (
                f"Last automatic publication was less than "
                f"{minimum.total_seconds() / 3600:.0f} hours ago."
            )
    window = timedelta(days=config["rollingWindowDays"])
    recent = [stamp for stamp in times if now - stamp <= window]
    if len(recent) >= config["maximumAutomaticPublicationsPerRollingWindow"]:
        return False, (
            f"Rolling {config['rollingWindowDays']}-day automatic publication limit "
            f"of {config['maximumAutomaticPublicationsPerRollingWindow']} reached."
        )
    return True, "Frequency gate passed."


def source_domain_allowed(url: str, config: dict[str, Any]) -> bool:
    host = (urlparse(url).hostname or "").lower()
    return any(
        host == domain or host.endswith("." + domain)
        for domain in config["allowedAutomaticSourceDomains"]
    )


def source_reachable(url: str, timeout: int = 12) -> bool:
    request = urllib.request.Request(
        url,
        headers={"User-Agent": "TechnocratsDigimateEditorialValidator/1.0"},
        method="GET",
    )
    try:
        with urllib.request.urlopen(request, timeout=timeout) as response:
            return 200 <= response.status < 400
    except (urllib.error.URLError, ValueError, TimeoutError):
        return False


def validate_article(
    article: dict[str, Any],
    config: dict[str, Any],
    records: Iterable[dict[str, Any]],
    *,
    verify_urls: bool = True,
) -> ValidationResult:
    errors: list[str] = []
    warnings: list[str] = []
    checks: dict[str, bool] = {}
    required = [
        "slug", "title", "metaTitle", "metaDescription", "primaryQuery",
        "searchIntent", "category", "author", "datePublished", "dateModified",
        "summary", "body", "sources", "checklist", "relatedContent", "ctaType",
        "generationMethod", "qualityChecks", "publicationMode",
        "monetisationEligible", "adEligible", "status",
    ]
    missing = [field for field in required if article.get(field) in (None, "", [])]
    checks["requiredFields"] = not missing
    if missing:
        errors.append("Missing required fields: " + ", ".join(missing))

    slug = article.get("slug", "")
    checks["slug"] = bool(
        re.fullmatch(r"[a-z0-9]+(?:-[a-z0-9]+)*", slug)
    ) and len(slug) <= 70
    if not checks["slug"]:
        errors.append("Slug must be lowercase, hyphenated, and no longer than 70 characters.")

    checks["metadata"] = (
        20 <= len(article.get("metaTitle", "")) <= 70
        and 80 <= len(article.get("metaDescription", "")) <= 170
    )
    if not checks["metadata"]:
        errors.append("Meta title or description is outside the approved length range.")

    body = article.get("body", "")
    security_text = "\n".join(
        [
            article.get("title", ""),
            article.get("metaTitle", ""),
            article.get("metaDescription", ""),
            article.get("summary", ""),
            body,
            *(article.get("checklist", []) or []),
            *[
                str(value)
                for item in (article.get("faq", []) or [])
                for value in (
                    (item.get("question", ""), item.get("answer", ""))
                    if isinstance(item, dict)
                    else (item,)
                )
            ],
        ]
    )
    checks["safeGeneratedContent"] = not bool(
        RAW_HTML_PATTERN.search(security_text)
        or ACTIVE_CONTENT_PATTERN.search(security_text)
    )
    if not checks["safeGeneratedContent"]:
        errors.append(
            "Generated content contains raw HTML, active content, an event handler, "
            "a JavaScript URL, or an embedded image/pixel."
        )

    image = article.get("image", "")
    checks["safeImage"] = not image or bool(SAFE_IMAGE_PATTERN.fullmatch(image))
    if not checks["safeImage"]:
        errors.append(
            "Article image must be an approved root-relative site asset; remote images "
            "and tracking pixels are not allowed."
        )

    headings = HEADING_PATTERN.findall(body)
    article["headings"] = headings
    checks["headingHierarchy"] = bool(headings) and not body.lstrip().startswith("# ")
    if not checks["headingHierarchy"]:
        errors.append("Body must use a logical H2/H3 hierarchy without a second H1.")

    checks["actionable"] = (
        len(article.get("checklist", [])) >= config["minimumChecklistItems"]
        and bool(
            re.search(
                r"(?im)^#{2,3}\s+.*(?:steps|checklist|framework|process|how to)",
                body,
            )
        )
    )
    if not checks["actionable"]:
        errors.append("Article needs a substantive process/framework and checklist.")

    links = MARKDOWN_LINK_PATTERN.findall(body)
    safe_links = []
    for _, url in links:
        if url.startswith("/"):
            safe_links.append(
                not url.startswith("//")
                and bool(re.fullmatch(r"/[a-zA-Z0-9._~!$&'()*+,;=:@%/-]*", url))
            )
        else:
            host = (urlparse(url).hostname or "").lower()
            safe_links.append(
                urlparse(url).scheme == "https"
                and (
                    host == "technocratsdigimate.com"
                    or host.endswith(".technocratsdigimate.com")
                    or source_domain_allowed(url, config)
                )
            )
    checks["safeLinks"] = all(safe_links)
    if not checks["safeLinks"]:
        errors.append(
            "Markdown links must use approved HTTPS domains or safe root-relative paths."
        )

    internal_links = [
        url
        for _, url in links
        if (
            (url.startswith("/") and not url.startswith("//"))
            or (urlparse(url).hostname or "").lower() == "technocratsdigimate.com"
            or (urlparse(url).hostname or "").lower().endswith(".technocratsdigimate.com")
        )
    ]
    checks["internalLinks"] = (
        len(set(internal_links)) >= config["minimumInternalLinks"]
    )
    if not checks["internalLinks"]:
        errors.append("Article does not contain enough relevant internal links.")

    source_ids = {source.get("id") for source in article.get("sources", [])}
    markers = set(SOURCE_MARKER_PATTERN.findall(body))
    checks["sourceMarkers"] = (
        bool(source_ids)
        and markers.issubset(source_ids)
        and source_ids.issubset(markers)
    )
    if not checks["sourceMarkers"]:
        errors.append("Every structured source must have a matching [source:id] marker.")

    valid_sources = []
    for source in article.get("sources", []):
        url = source.get("url", "")
        valid = bool(
            urlparse(url).scheme == "https" and urlparse(url).hostname
        ) and source_domain_allowed(url, config)
        if valid and verify_urls:
            valid = source_reachable(url)
        valid_sources.append(valid)
    checks["sources"] = (
        len(valid_sources) >= config["minimumSources"] and all(valid_sources)
    )
    if not checks["sources"]:
        errors.append(
            "Sources are missing, unreachable, malformed, or not approved primary-source domains."
        )

    checks["placeholders"] = not bool(PLACEHOLDER_PATTERN.search(body))
    if not checks["placeholders"]:
        errors.append("Unresolved placeholder detected.")

    paragraphs = paragraph_fingerprints(body)
    checks["duplicateParagraphs"] = len(paragraphs) == len(set(paragraphs))
    if not checks["duplicateParagraphs"]:
        errors.append("Duplicate paragraph detected.")

    checks["superlatives"] = not bool(UNSUPPORTED_SUPERLATIVE_PATTERN.search(body))
    if not checks["superlatives"]:
        errors.append("Unsupported superlative detected.")

    collision = collision_report(article, records, config)
    checks["differentiated"] = collision is None
    if collision:
        errors.append(
            f"Topic collides with existing article '{collision['slug']}' "
            f"(similarity {collision['score']})."
        )

    malformed = [
        match.group(0)
        for match in RAW_MARKDOWN_LINK_PATTERN.finditer(body)
        if not MARKDOWN_LINK_PATTERN.fullmatch(match.group(0))
    ]
    checks["markdownLinks"] = not malformed
    if malformed:
        errors.append("Malformed Markdown link detected.")

    risk_reasons = [
        name for name, pattern in RISK_PATTERNS.items() if pattern.search(body)
    ]
    sensitive = [
        term for term in config["sensitiveAdviceTerms"] if term.lower() in body.lower()
    ]
    commercial = [
        term for term in config["commercialComparisonTerms"] if term.lower() in body.lower()
    ]
    if risk_reasons or sensitive or commercial:
        warnings.append(
            "Manual review required: "
            + ", ".join(risk_reasons + sensitive + commercial)
        )

    requested_mode = article.get("publicationMode", "automatic")
    publication_mode = (
        "rejected"
        if errors
        else "manual-review"
        if warnings or requested_mode == "manual-review"
        else "automatic"
    )
    return ValidationResult(
        passed=not errors,
        publication_mode=publication_mode,
        errors=errors,
        warnings=warnings,
        checks=checks,
        collision=collision,
    )


def article_id(article: dict[str, Any]) -> str:
    material = "|".join(
        [
            article.get("slug", ""),
            article.get("primaryQuery", ""),
            article.get("body", ""),
        ]
    )
    return hashlib.sha256(material.encode("utf-8")).hexdigest()[:16]


def canonical_url(article: dict[str, Any]) -> str:
    return f"{SITE_URL}/blog/{article['slug']}"


def persist_candidate(
    article: dict[str, Any],
    validation: ValidationResult,
    *,
    run_id: str,
    dry_run: bool,
) -> dict[str, Any]:
    article["publicationMode"] = validation.publication_mode
    article["status"] = (
        "approved"
        if validation.publication_mode == "automatic"
        else validation.publication_mode
    )
    article["canonicalUrl"] = canonical_url(article)
    article["qualityChecks"] = validation.checks
    article["automation"] = {
        "runId": run_id,
        "contentId": article_id(article),
        "validatedAt": datetime.now(timezone.utc).isoformat(),
    }
    summary = {
        "topic": article.get("title"),
        "targetQuery": article.get("primaryQuery"),
        "slug": article.get("slug"),
        "publishedUrl": canonical_url(article),
        "publicationMode": validation.publication_mode,
        "status": "dry-run" if dry_run else article["status"],
        "sources": article.get("sources", []),
        "qualityChecks": validation.checks,
        "errors": validation.errors,
        "warnings": validation.warnings,
        "collision": validation.collision,
        "contentId": article["automation"]["contentId"],
    }
    write_json(SUMMARY_PATH, summary)
    if not dry_run and validation.passed:
        write_json(AUTOMATED_CONTENT_DIR / f"{article['slug']}.json", article)
    return summary


def fixture_article() -> dict[str, Any]:
    today = datetime.now(timezone.utc).date().isoformat()
    return {
        "slug": "verify-meta-conversion-tracking-signals",
        "title": "How to Verify Meta Conversion Tracking Signals",
        "metaTitle": "Verify Meta Conversion Tracking Signals | Technocrats Digimate",
        "metaDescription": "A practical verification process for checking Meta Pixel and Conversions API signals before changing campaign optimisation decisions.",
        "primaryQuery": "verify meta conversion tracking signals",
        "searchIntent": "informational troubleshooting",
        "category": "Tracking & Analytics",
        "author": "Gautam Punj",
        "reviewer": "Automated editorial gates",
        "datePublished": today,
        "dateModified": today,
        "summary": "A source-backed workflow for checking whether Meta receives usable conversion signals.",
        "body": """## Diagnose the signal before the campaign

Campaign changes cannot repair missing event data. Start by confirming what the browser and server send, then compare those events with the action recorded by your form or CRM. Meta documents the purpose of browser and server events in its developer material. [source:meta-pixel]

Read the related [conversion tracking guide](/blog/conversion-tracking-setup-meta-google-2026) before changing attribution settings.

## Verification process

1. Confirm the intended event fires once.
2. Compare browser and server event names.
3. Check that deduplication identifiers match.
4. Record the test and its date.

Google recommends validating analytics implementations with debug and realtime tools before relying on reporting. [source:google-debug]

Use the [free growth audit](/free-growth-audit) when the tracking path spans ads, forms and follow-up systems.

## Practical checklist

- Record the event name.
- Record the browser and server timestamps.
- Confirm the destination action.
- Re-test after every container change.
""",
        "sources": [
            {
                "id": "meta-pixel",
                "title": "Meta Pixel documentation",
                "publisher": "Meta",
                "url": "https://developers.facebook.com/docs/meta-pixel/",
            },
            {
                "id": "google-debug",
                "title": "Debug events",
                "publisher": "Google",
                "url": "https://developers.google.com/analytics/devguides/collection/ga4/validate-events",
            },
        ],
        "faq": [],
        "checklist": [
            "Record the event name",
            "Compare browser and server timestamps",
            "Confirm the destination action",
        ],
        "relatedContent": [
            "/blog/conversion-tracking-setup-meta-google-2026",
            "/free-growth-audit",
        ],
        "ctaType": "audit",
        "generationMethod": "AI-assisted draft with automated source and policy validation",
        "qualityChecks": {"pending": True},
        "publicationMode": "automatic",
        "monetisationEligible": True,
        "adEligible": True,
        "status": "draft",
        "image": "/opengraph-image",
    }


def main() -> int:
    parser = argparse.ArgumentParser()
    parser.add_argument("--candidate", type=Path)
    parser.add_argument("--pending-prs", type=Path)
    parser.add_argument("--dry-run", action="store_true")
    parser.add_argument("--offline", action="store_true")
    parser.add_argument("--fixture", action="store_true")
    parser.add_argument("--now")
    args = parser.parse_args()

    config = load_json(CONFIG_PATH, {})
    log = load_json(AUTOMATION_LOG_PATH, {"publications": []})
    now = (
        datetime.fromisoformat(args.now.replace("Z", "+00:00"))
        if args.now
        else datetime.now(timezone.utc)
    )
    allowed, frequency_reason = publication_frequency(now, config, log)
    if not allowed:
        summary = {
            "status": "skipped",
            "reason": frequency_reason,
            "publicationMode": "rejected",
        }
        write_json(SUMMARY_PATH, summary)
        print(json.dumps(summary, indent=2))
        return 0

    candidate = fixture_article() if args.fixture or not args.candidate else load_json(args.candidate, {})
    records = existing_articles() + pending_topics(args.pending_prs)
    validation = validate_article(
        candidate,
        config,
        records,
        verify_urls=not args.offline,
    )
    summary = persist_candidate(
        candidate,
        validation,
        run_id=os.environ.get("GITHUB_RUN_ID", "local-dry-run"),
        dry_run=args.dry_run,
    )
    summary["frequency"] = frequency_reason
    write_json(SUMMARY_PATH, summary)
    print(json.dumps(summary, ensure_ascii=False, indent=2))
    if validation.publication_mode == "rejected":
        return 2
    if validation.publication_mode == "manual-review":
        return 3
    return 0


if __name__ == "__main__":
    sys.exit(main())
