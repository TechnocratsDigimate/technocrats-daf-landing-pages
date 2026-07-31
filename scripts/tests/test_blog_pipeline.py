import unittest
from datetime import datetime, timezone
from pathlib import Path

from blog_pipeline import (
    fixture_article,
    load_json,
    publication_frequency,
    validate_article,
)


ROOT = Path(__file__).resolve().parents[2]
CONFIG = load_json(ROOT / "config" / "auto-blog.json", {})


class BlogPipelineTests(unittest.TestCase):
    def validate(self, article, records=()):
        return validate_article(article, CONFIG, records, verify_urls=False)

    def test_duplicate_cluster_is_rejected(self):
        article = fixture_article()
        article["slug"] = "why-meta-ads-cpl-rising-new-guide"
        article["title"] = "Why Your Meta Ads CPL Keeps Rising and How to Fix It"
        article["metaTitle"] = article["title"]
        article["primaryQuery"] = "why meta ads cpl keeps rising"
        existing = [{
            "slug": "why-meta-ads-cpl-rising-how-to-fix-it",
            "title": "Why Your Meta Ads CPL Keeps Rising (And How to Fix It)",
            "primaryQuery": "why meta ads cpl keeps rising",
            "searchIntent": "informational troubleshooting",
            "category": "Meta Ads",
            "body": article["body"],
            "headings": ["The Real Reasons Your Meta Ads CPL Is Climbing"],
        }]
        result = self.validate(article, existing)
        self.assertEqual(result.publication_mode, "rejected")
        self.assertIsNotNone(result.collision)
        self.assertIn("Update the existing canonical", result.collision["recommendation"])

    def test_unsupported_claim_requires_manual_review(self):
        article = fixture_article()
        article["body"] += "\n\nOur clients achieved a 47% CPL reduction."
        result = self.validate(article)
        self.assertTrue(result.passed)
        self.assertEqual(result.publication_mode, "manual-review")
        self.assertTrue(any("performance-claim" in warning for warning in result.warnings))

    def test_missing_sources_is_rejected(self):
        article = fixture_article()
        article["sources"] = []
        article["body"] = article["body"].replace("[source:meta-pixel]", "").replace("[source:google-debug]", "")
        result = self.validate(article)
        self.assertEqual(result.publication_mode, "rejected")
        self.assertFalse(result.checks["sources"])

    def test_frequency_minimum_interval(self):
        now = datetime(2026, 7, 30, 12, 0, tzinfo=timezone.utc)
        log = {"publications": [{"mode": "automatic", "publishedAt": "2026-07-29T12:00:00+00:00"}]}
        allowed, reason = publication_frequency(now, CONFIG, log)
        self.assertFalse(allowed)
        self.assertIn("48 hours", reason)

    def test_frequency_rolling_limit(self):
        now = datetime(2026, 7, 30, 12, 0, tzinfo=timezone.utc)
        log = {"publications": [
            {"mode": "automatic", "publishedAt": "2026-07-28T10:00:00+00:00"},
            {"mode": "automatic", "publishedAt": "2026-07-26T10:00:00+00:00"},
            {"mode": "automatic", "publishedAt": "2026-07-24T10:00:00+00:00"},
        ]}
        allowed, reason = publication_frequency(now, CONFIG, log)
        self.assertFalse(allowed)
        self.assertIn("limit", reason)

    def test_fixture_passes_automatic_gates(self):
        result = self.validate(fixture_article())
        self.assertTrue(result.passed, result.errors)
        self.assertEqual(result.publication_mode, "automatic")

    def test_active_content_vectors_are_rejected(self):
        vectors = [
            '<script src="https://example.com/payload.js"></script>',
            '<a onclick="alert(1)">Click</a>',
            "[Click](javascript:alert(1))",
            '<iframe src="https://example.com"></iframe>',
            "![pixel](https://example.com/pixel.gif)",
            "<div>raw HTML</div>",
        ]
        for vector in vectors:
            with self.subTest(vector=vector):
                article = fixture_article()
                article["body"] += f"\n\n{vector}"
                result = self.validate(article)
                self.assertEqual(result.publication_mode, "rejected")
                self.assertFalse(result.checks["safeGeneratedContent"])

    def test_remote_article_image_is_rejected(self):
        article = fixture_article()
        article["image"] = "https://example.com/tracking-pixel.gif"
        result = self.validate(article)
        self.assertEqual(result.publication_mode, "rejected")
        self.assertFalse(result.checks["safeImage"])

    def test_unsafe_markdown_links_are_rejected(self):
        for link in [
            "[Protocol-relative](//example.com/path)",
            "[Unapproved external](https://example.com/path)",
            "[Insecure source](http://developers.google.com/path)",
        ]:
            with self.subTest(link=link):
                article = fixture_article()
                article["body"] += f"\n\n{link}"
                result = self.validate(article)
                self.assertEqual(result.publication_mode, "rejected")
                self.assertFalse(result.checks["safeLinks"])


if __name__ == "__main__":
    unittest.main()
