"""
Auto Blog Publisher — Technocrats Digimate
Runs every 6 hours via GitHub Actions.
Fetches Google Trends → generates blog with Claude API → publishes to posts.ts
"""

import os
import re
import time
import random
import requests
from datetime import datetime, timezone

try:
    from pytrends.request import TrendReq
except ImportError:
    TrendReq = None

try:
    import anthropic
except ImportError:
    anthropic = None


# ── Keywords to track ────────────────────────────────────────────────────────

KEYWORDS = [
    ["AI marketing", "Digital Marketing"],
    ["Meta Ads", "Facebook Ads"],
    ["Google Ads", "PPC"],
    ["WhatsApp marketing", "Marketing Automation"],
    ["Performance Marketing", "Lead Generation"],
    ["Instagram Ads", "Social Media Marketing"],
    ["ChatGPT", "AI tools"],
    ["Programmatic advertising", "Retargeting"],
]

FALLBACK_TOPICS = [
    ("How AI Is Changing Meta Ads in 2026 — What Indian Marketers Need to Know", "AI marketing", "AI Tools"),
    ("Why Your Meta Ads CPL Is Rising Every Week (And How to Fix It)", "Meta Ads", "Meta Ads"),
    ("WhatsApp Marketing Automation for Indian Service Businesses: The Complete Guide", "WhatsApp marketing", "Marketing Automation"),
    ("Google Ads vs Meta Ads for Lead Generation in India: Which Actually Works in 2026", "Google Ads", "Google Ads"),
    ("How to Use Free AI Tools to Replace a ₹20,000/month Marketing Stack", "AI tools", "AI Tools"),
    ("Performance Marketing for Real Estate in India: Meta Ads System That Gets Quality Leads", "Performance Marketing", "Meta Ads"),
    ("The Lead Quality Problem: Why 90% of Meta Ad Leads Don't Convert (And How to Fix It)", "Lead Generation", "Meta Ads"),
    ("Instagram Reels Ads for Indian Businesses: Hooks, Formats, and What Actually Converts", "Instagram Ads", "Meta Ads"),
]

CATEGORY_MAP = {
    "Meta Ads": ["meta ads", "facebook ads", "advantage+", "lead ads", "instagram ads", "reels ads"],
    "Google Ads": ["google ads", "ppc", "search ads", "programmatic", "display ads", "performance max"],
    "AI Tools": ["ai", "chatgpt", "gemini", "artificial intelligence", "automation tools", "ai marketing"],
    "Marketing Automation": ["whatsapp", "automation", "crm", "follow-up", "workflow", "zapier"],
    "Tracking & Analytics": ["tracking", "analytics", "pixel", "capi", "conversion", "data"],
}


# ── Google Trends ─────────────────────────────────────────────────────────────

def get_trending_topics():
    if TrendReq is None:
        print("pytrends not available, using fallback")
        return []

    pytrends = TrendReq(hl="en-US", tz=330, timeout=(10, 30), retries=2, backoff_factor=0.5)
    collected = []

    kw_group = random.choice(KEYWORDS)
    geos = ["IN", "US"]

    for geo in geos:
        try:
            pytrends.build_payload(kw_group, cat=0, timeframe="now 7-d", geo=geo)
            related = pytrends.related_queries()

            for kw in kw_group:
                if kw in related and related[kw] is not None:
                    for trend_type in ["rising", "top"]:
                        df = related[kw].get(trend_type)
                        if df is not None and not df.empty:
                            for _, row in df.head(5).iterrows():
                                collected.append({
                                    "query": row["query"],
                                    "value": int(row["value"]) if trend_type == "rising" else 10,
                                    "base_keyword": kw,
                                    "geo": geo,
                                })
            time.sleep(2)
        except Exception as e:
            print(f"Trends error ({geo}): {e}")
            continue

    # Filter out very short or non-marketing queries
    filtered = [t for t in collected if len(t["query"]) > 10 and not any(
        x in t["query"].lower() for x in ["celebrity", "movie", "cricket", "ipl", "sports"]
    )]
    filtered.sort(key=lambda x: x["value"], reverse=True)
    return filtered[:10]


# ── Category Detection ────────────────────────────────────────────────────────

def detect_category(text):
    text_lower = text.lower()
    for category, keywords in CATEGORY_MAP.items():
        if any(kw in text_lower for kw in keywords):
            return category
    return "Marketing Automation"


# ── Unsplash Image ────────────────────────────────────────────────────────────

def get_unsplash_image(query, access_key):
    if not access_key:
        return ""
    try:
        res = requests.get(
            "https://api.unsplash.com/search/photos",
            params={"query": query, "per_page": 5, "orientation": "landscape"},
            headers={"Authorization": f"Client-ID {access_key}"},
            timeout=10,
        )
        data = res.json()
        if data.get("results"):
            photo = random.choice(data["results"][:3])
            return photo["urls"]["regular"]
    except Exception as e:
        print(f"Unsplash error: {e}")
    return ""


# ── Blog Generation ───────────────────────────────────────────────────────────

SYSTEM_PROMPT = """You are a senior performance marketing writer for Technocrats Digimate, an Indian
digital marketing agency run by Gautam Punj. Write practical, human-sounding blog posts that:
- Speak directly to Indian business owners, marketers, and agency professionals
- Use a sharp, no-fluff tone — like a senior explaining to a peer, not lecturing
- Reference Indian market realities (rupees ₹, Indian industries, metro cities, tier-2 growth)
- Are packed with specific, actionable insights — not generic advice
- Use natural keyword integration, never forced
- Format in clean markdown with H2 and H3 headings
- 1000–1500 words strictly
- Never start with "In today's digital landscape", "In conclusion", or AI-clichés
- End with a CTA: "Want to see how this applies to your specific business? [Book a free growth audit](https://technocratsdigimate.com/audit) — Gautam personally reviews every setup."
"""

def generate_blog(topic, base_keyword, client):
    category = detect_category(f"{topic} {base_keyword}")

    prompt = f"""Write a blog post for Technocrats Digimate's website about: "{topic}"

Context: {base_keyword} — written for Indian performance marketers and business owners.

Return your response in EXACTLY this format:

TITLE: [compelling SEO title with primary keyword, under 70 chars]
DESCRIPTION: [2-sentence meta description, 150-160 chars total]
CATEGORY: {category}
READ_TIME: [e.g. "6 min read"]
SLUG: [lowercase-hyphenated-slug, max 60 chars]

---CONTENT---
[Full markdown blog post, 1000-1500 words, starting with ## (first H2 heading)]

Rules:
- Open with a hook: a stat, a sharp observation, or a question that makes them stop scrolling
- Use H2 for main sections, H3 for sub-points
- Bold key terms with **bold**
- Include at least one practical example using Indian industry (real estate, clinics, coaching, study abroad)
- Include at least one numbered list or bullet list of actionable steps
- End with the CTA linking to https://technocratsdigimate.com/audit
- Related keywords to use naturally: {base_keyword}, performance marketing, Indian businesses, lead generation, ROI, Meta Ads, Google Ads, digital marketing India
"""

    response = client.messages.create(
        model="claude-sonnet-4-6",
        max_tokens=3000,
        system=SYSTEM_PROMPT,
        messages=[{"role": "user", "content": prompt}],
    )

    return response.content[0].text, category


# ── Response Parser ───────────────────────────────────────────────────────────

def parse_response(text):
    metadata = {}
    content = ""

    # Extract metadata lines
    for field in ["TITLE", "DESCRIPTION", "CATEGORY", "READ_TIME", "SLUG"]:
        match = re.search(rf"^{field}:\s*(.+)$", text, re.MULTILINE)
        if match:
            metadata[field.lower().replace("_", "")] = match.group(1).strip()

    # Extract content after ---CONTENT---
    content_match = re.search(r"---CONTENT---\s*([\s\S]+)", text)
    if content_match:
        content = content_match.group(1).strip()
    else:
        # Fallback: everything after the last metadata line that starts with ##
        h2_match = re.search(r"(## .+[\s\S]+)", text)
        if h2_match:
            content = h2_match.group(1).strip()

    # Escape for TypeScript template literal
    content = content.replace("\\", "\\\\").replace("`", "\\`").replace("${", "\\${")

    return metadata, content


# ── Slug helpers ──────────────────────────────────────────────────────────────

def make_slug(title):
    slug = title.lower()
    slug = re.sub(r"[^a-z0-9\s-]", "", slug)
    slug = re.sub(r"\s+", "-", slug.strip())
    slug = re.sub(r"-+", "-", slug)
    return slug[:65]


def post_exists(slug, posts_path):
    with open(posts_path, "r", encoding="utf-8") as f:
        return f'slug: "{slug}"' in f.read()


# ── Write to posts.ts ─────────────────────────────────────────────────────────

def append_post(post, posts_path):
    with open(posts_path, "r", encoding="utf-8") as f:
        src = f.read()

    title_escaped = post["title"].replace("\\", "\\\\").replace('"', '\\"')
    desc_escaped = post["description"].replace("\\", "\\\\").replace('"', '\\"')
    img_escaped = post.get("image", "").replace("\\", "\\\\")

    new_entry = f"""  {{
    slug: "{post["slug"]}",
    title: "{title_escaped}",
    description: "{desc_escaped}",
    publishedAt: "{post["publishedAt"]}",
    category: "{post["category"]}",
    readTime: "{post["readtime"]}",
    image: "{img_escaped}",
    content: `
{post["content"]}
`,
  }},"""

    # Insert before the closing ]; of the posts array
    marker = "];\n\nexport function getAllPosts"
    if marker in src:
        src = src.replace(marker, new_entry + "\n" + marker)
    else:
        # fallback: find last ]; in file
        pos = src.rfind("];")
        if pos == -1:
            raise ValueError("Cannot find insertion point in posts.ts")
        src = src[:pos] + new_entry + "\n" + src[pos:]

    with open(posts_path, "w", encoding="utf-8") as f:
        f.write(src)

    print(f"✅ Published: {post['slug']}")


# ── Main ──────────────────────────────────────────────────────────────────────

def main():
    anthropic_key = os.environ.get("ANTHROPIC_API_KEY")
    unsplash_key = os.environ.get("UNSPLASH_ACCESS_KEY", "")

    if not anthropic_key:
        raise SystemExit("❌ ANTHROPIC_API_KEY not set")

    if anthropic is None:
        raise SystemExit("❌ anthropic package not installed")

    posts_path = os.path.normpath(
        os.path.join(os.path.dirname(__file__), "..", "lib", "blog", "posts.ts")
    )
    print(f"📄 Posts file: {posts_path}")

    # Get trending topics
    print("🔍 Fetching Google Trends...")
    trending = get_trending_topics()

    # Build candidate list: trending first, then fallbacks
    candidates = [(t["query"], t["base_keyword"], None) for t in trending]
    random.shuffle(FALLBACK_TOPICS)
    candidates += [(topic, kw, cat) for topic, kw, cat in FALLBACK_TOPICS]

    client = anthropic.Anthropic(api_key=anthropic_key)

    for topic, base_keyword, _ in candidates[:8]:
        print(f"\n📝 Topic: {topic}")

        try:
            response_text, category = generate_blog(topic, base_keyword, client)
            metadata, content = parse_response(response_text)

            if not metadata.get("title") or not content or len(content) < 500:
                print("⚠️  Incomplete response, skipping...")
                continue

            slug = metadata.get("slug") or make_slug(metadata.get("title", topic))
            slug = make_slug(slug)  # re-sanitize

            if post_exists(slug, posts_path):
                print(f"⚠️  '{slug}' already exists, trying next...")
                continue

            # Fetch image
            image_query = f"{base_keyword} marketing digital business"
            image_url = get_unsplash_image(image_query, unsplash_key)
            if image_url:
                print(f"🖼️  Image: {image_url[:70]}...")
            else:
                print("⚠️  No image found")

            post = {
                "slug": slug,
                "title": metadata.get("title", topic),
                "description": metadata.get("description", ""),
                "publishedAt": datetime.now(timezone.utc).strftime("%Y-%m-%d"),
                "category": metadata.get("category", category),
                "readtime": metadata.get("readtime", metadata.get("read_time", "6 min read")),
                "image": image_url,
                "content": content,
            }

            append_post(post, posts_path)
            print(f"\n🎉 Done! Blog published: \"{post['title']}\"")
            print(f"   Slug: /blog/{slug}")
            print(f"   Category: {post['category']}")
            print(f"   Date: {post['publishedAt']}")
            return  # success — stop

        except Exception as e:
            print(f"❌ Error: {e}")
            import traceback
            traceback.print_exc()
            time.sleep(3)
            continue

    print("❌ Could not generate any blog post in this run.")


if __name__ == "__main__":
    main()
