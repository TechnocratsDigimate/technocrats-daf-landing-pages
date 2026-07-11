"""
One-time / on-demand script to ping Google Indexing API for ALL site URLs.
Run via GitHub Actions (workflow_dispatch) whenever you add new pages.
"""

import os
import json
import time
import requests

SITE_URL = "https://technocratsdigimate.com"

STATIC_PAGES = [
    "/",
    "/audit",
    "/blog",
    "/courses",
    "/courses/meta-ads-quality-leads-webinar",
    "/courses/meta-ads-mastery-course",
    "/courses/performance-marketing-implementation-program",
    "/services/performance-marketing-lead-generation",
    "/free-google-ai-tool",
    "/resources",
    "/thank-you/course",
]


def get_blog_slugs():
    import re, os
    posts_path = os.path.normpath(
        os.path.join(os.path.dirname(__file__), "..", "lib", "blog", "posts.ts")
    )
    with open(posts_path, "r", encoding="utf-8") as f:
        content = f.read()
    return re.findall(r'slug:\s*"([^"]+)"', content)


def get_token(service_account_json: str) -> str:
    from google.oauth2 import service_account
    import google.auth.transport.requests

    info = json.loads(service_account_json)
    credentials = service_account.Credentials.from_service_account_info(
        info,
        scopes=["https://www.googleapis.com/auth/indexing"],
    )
    credentials.refresh(google.auth.transport.requests.Request())
    return credentials.token


def ping(url: str, token: str):
    res = requests.post(
        "https://indexing.googleapis.com/v3/urlNotifications:publish",
        headers={
            "Authorization": f"Bearer {token}",
            "Content-Type": "application/json",
        },
        json={"url": url, "type": "URL_UPDATED"},
        timeout=15,
    )
    status = "✅" if res.status_code == 200 else f"⚠️  {res.status_code}"
    print(f"{status} {url}")
    return res.status_code == 200


def main():
    indexing_key = os.environ.get("GOOGLE_INDEXING_KEY", "")
    if not indexing_key:
        raise SystemExit("❌ GOOGLE_INDEXING_KEY not set")

    token = get_token(indexing_key)

    blog_slugs = get_blog_slugs()
    all_urls = [SITE_URL + p for p in STATIC_PAGES]
    all_urls += [f"{SITE_URL}/blog/{slug}" for slug in blog_slugs]

    print(f"📡 Pinging {len(all_urls)} URLs to Google Indexing API...\n")

    success = 0
    for url in all_urls:
        ok = ping(url, token)
        if ok:
            success += 1
        time.sleep(0.5)  # avoid rate limiting

    print(f"\n🎉 Done: {success}/{len(all_urls)} URLs submitted for indexing.")


if __name__ == "__main__":
    main()
