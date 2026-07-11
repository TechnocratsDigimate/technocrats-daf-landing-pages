import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "You're In — Technocrats Digimate",
  robots: { index: false, follow: false },
};

export default function ThankYouAuditPage() {
  return (
    <div className="min-h-screen bg-ink text-white flex flex-col">
      {/* Minimal header */}
      <header className="border-b border-white/10 bg-ink/90 backdrop-blur-xl">
        <div className="mx-auto flex h-16 max-w-7xl items-center px-5">
          <Link href="/">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/assets/brand/wide-logo.svg"
              alt="Technocrats Digimate"
              className="h-8 w-auto"
            />
          </Link>
        </div>
      </header>

      {/* Thank you content */}
      <main className="flex flex-1 items-center justify-center px-5 py-16">
        <div className="max-w-lg w-full text-center">
          <div className="mb-6 flex justify-center">
            <div className="flex h-16 w-16 items-center justify-center rounded-full border border-gold/30 bg-gold/10 text-3xl">
              ✓
            </div>
          </div>
          <h1 className="mb-4 text-3xl font-bold text-white md:text-4xl">
            You&apos;re in. We&apos;ll reach out on WhatsApp within 24 hours.
          </h1>
          <p className="mb-8 text-base leading-7 text-slate-300">
            Gautam will personally review your situation before the call. Check your WhatsApp — we&apos;ll send a confirmation shortly.
          </p>
          <a
            href="https://wa.me/919467744000?text=Hi%2C%20I%20just%20submitted%20the%20audit%20form."
            rel="noreferrer"
            target="_blank"
            className="inline-block rounded-lg bg-[#25D366] px-8 py-4 font-semibold text-white transition hover:bg-[#1ebe5d]"
          >
            Open WhatsApp Now →
          </a>
          <p className="mt-6 text-sm text-slate-500">
            While you wait —{" "}
            <Link href="/" className="text-gold underline underline-offset-2 hover:text-gold-soft">
              learn more about how we work
            </Link>
          </p>
        </div>
      </main>

      {/* Minimal footer */}
      <footer className="border-t border-white/10 py-6">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-5 text-xs text-slate-500">
          <span>© {new Date().getFullYear()} Technocrats Digimate Pvt Ltd</span>
          <Link href="/privacy-policy" className="hover:text-gold">
            Privacy Policy
          </Link>
        </div>
      </footer>
    </div>
  );
}
