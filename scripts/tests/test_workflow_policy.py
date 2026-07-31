import unittest
from pathlib import Path


ROOT = Path(__file__).resolve().parents[2]
WORKFLOW = ROOT / ".github" / "workflows" / "auto-blog.yml"
RENDERER = ROOT / "app" / "blog" / "[slug]" / "page.tsx"


class WorkflowPolicyTests(unittest.TestCase):
    def test_workflow_never_pushes_generated_content_to_main(self):
        text = WORKFLOW.read_text(encoding="utf-8")
        self.assertIn("automation/blog-", text)
        self.assertIn("gh pr create", text)
        self.assertNotIn("git push origin main", text)

    def test_failed_quality_checks_precede_merge(self):
        text = WORKFLOW.read_text(encoding="utf-8")
        self.assertLess(text.index("npm run quality"), text.index("gh pr merge"))
        self.assertIn("concurrency:", text)
        self.assertIn("cancel-in-progress: false", text)

    def test_merge_is_registered_as_auto_merge_and_deletes_branch(self):
        text = WORKFLOW.read_text(encoding="utf-8")
        self.assertIn("--auto --squash --delete-branch", text)
        self.assertIn("steps.validate.outputs.mode == 'automatic'", text)
        self.assertIn("steps.pr.outcome == 'failure'", text)
        self.assertIn("git push origin --delete", text)

    def test_workflow_uses_minimum_default_token_permissions(self):
        text = WORKFLOW.read_text(encoding="utf-8")
        permissions = text.split("permissions:", 1)[1].split("jobs:", 1)[0]
        self.assertIn("contents: read", permissions)
        self.assertNotIn("contents: write", permissions)
        self.assertNotIn("pull-requests: write", permissions)
        self.assertIn("secrets.AUTO_BLOG_GITHUB_TOKEN", text)

    def test_publisher_cannot_recurse_on_push_or_pull_request(self):
        text = WORKFLOW.read_text(encoding="utf-8")
        trigger = text.split("on:", 1)[1].split("concurrency:", 1)[0]
        self.assertIn("schedule:", trigger)
        self.assertIn("workflow_dispatch:", trigger)
        self.assertNotIn("pull_request:", trigger)
        self.assertNotIn("push:", trigger)

    def test_json_ld_escapes_generated_text(self):
        text = RENDERER.read_text(encoding="utf-8")
        self.assertIn("function safeJsonLd", text)
        self.assertEqual(text.count("dangerouslySetInnerHTML={{ __html: safeJsonLd("), 2)
        self.assertNotIn("dangerouslySetInnerHTML={{ __html: JSON.stringify(", text)


if __name__ == "__main__":
    unittest.main()
