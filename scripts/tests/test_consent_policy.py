import unittest
from pathlib import Path


ROOT = Path(__file__).resolve().parents[2]
CONSENT = ROOT / "components" / "CookieConsentBanner.tsx"
HEADER = ROOT / "components" / "BrandHeader.tsx"


class ConsentPolicyTests(unittest.TestCase):
    def setUp(self):
        self.consent = CONSENT.read_text(encoding="utf-8")

    def test_escape_listener_exists_only_with_visible_dialog_and_is_removed(self):
        effect = self.consent.split("function closeWithEscape", 1)[0].rsplit("useEffect(() => {", 1)[1]
        self.assertIn("if (!isVisible) return;", effect)
        self.assertEqual(self.consent.count('window.addEventListener("keydown", closeWithEscape)'), 1)
        self.assertEqual(self.consent.count('window.removeEventListener("keydown", closeWithEscape)'), 1)

    def test_escape_dismisses_without_changing_consent_or_reloading(self):
        handler = self.consent.split("function closeWithEscape", 1)[1].split(
            'window.addEventListener("keydown", closeWithEscape)', 1
        )[0]
        self.assertIn('event.key !== "Escape"', handler)
        self.assertIn("setIsVisible(false)", handler)
        self.assertNotIn("setTrackingConsent", handler)
        self.assertNotIn("window.location.reload", handler)

    def test_escape_restores_opener_or_safe_home_fallback(self):
        self.assertIn("const returnTarget = returnFocusRef.current;", self.consent)
        self.assertIn('a[aria-label="Technocrats Digimate home"]', self.consent)
        self.assertIn("returnTarget?.isConnected ? returnTarget : fallback", self.consent)
        self.assertGreaterEqual(self.consent.count("restoreFocusAfterDialog(returnTarget)"), 2)

    def test_explicit_accept_and_reject_semantics_remain(self):
        self.assertIn('onClick={() => chooseConsent("accepted")}', self.consent)
        self.assertIn('onClick={() => chooseConsent("rejected")}', self.consent)
        self.assertIn("setTrackingConsent(choice)", self.consent)

    def test_mobile_menu_retains_its_independent_escape_listener(self):
        header = HEADER.read_text(encoding="utf-8")
        self.assertIn('if (event.key === "Escape") setMenuOpen(false)', header)
        self.assertIn('window.addEventListener("keydown", closeWithEscape)', header)
        self.assertIn('window.removeEventListener("keydown", closeWithEscape)', header)


if __name__ == "__main__":
    unittest.main()
