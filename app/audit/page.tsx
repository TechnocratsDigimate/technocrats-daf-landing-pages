import type { Metadata } from "next";
import Link from "next/link";
import { AuditShortFormClient as AuditShortForm } from "./AuditFormWrapper";

export const metadata: Metadata = {
  title: "Free Growth Audit — Find Where Your Ad Spend Is Leaking | Technocrats Digimate",
  description:
    "Running Meta Ads but not getting quality leads? Get a free audit of your campaigns, landing page, and follow-up. Written findings + 30-min call. No pitch.",
  robots: { index: false, follow: false },
};

const TRUST_SIGNALS = [
  {
    icon: "🚫",
    label: "No Pitch",
    desc: "We diagnose first. Sales conversation only if you ask.",
  },
  {
    icon: "👤",
    label: "Founder-Reviewed",
    desc: "Gautam Punj personally reviews every audit. No junior handoff.",
  },
  {
    icon: "📄",
    label: "Written Report Included",
    desc: "You get findings in writing before the call.",
  },
];

const AUDIT_AREAS = [
  {
    icon: "📊",
    label: "Meta Ads",
    desc: "Campaign structure, creative fatigue, CAPI setup",
  },
  {
    icon: "📱",
    label: "Landing Page",
    desc: "Message match, form friction, mobile speed",
  },
  {
    icon: "💬",
    label: "Lead Follow-Up",
    desc: "WhatsApp speed, CRM visibility, drop-off points",
  },
];

export default function AuditPage() {
  return (
    <div className="min-h-screen bg-ink text-white">
      {/* ── Minimal header — logo only ──────────────────────────────────── */}
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

      {/* ── Hero + Form (above fold on mobile) ──────────────────────────── */}
      <section className="mx-auto max-w-7xl px-5 pt-10 pb-6 md:pt-16 md:pb-10">
        <div className="grid gap-8 md:grid-cols-[1fr_420px] md:items-start">
          {/* Left — copy */}
          <div>
            <span className="inline-flex rounded-full border border-gold/30 bg-gold/10 px-3 py-1 text-xs font-semibold uppercase tracking-widest text-gold">
              Free — No Obligation
            </span>
            <h1 className="mt-4 text-3xl font-bold leading-tight text-white sm:text-4xl md:text-5xl">
              Your Ads Are Running.{" "}
              <span className="text-gold">Your Pipeline Is Leaking.</span>
            </h1>
            <p className="mt-4 text-base leading-7 text-slate-300 md:text-lg">
              We&apos;ll find exactly where your leads are dropping — before they
              reach your sales team. One free audit. Written findings. 30-minute
              debrief call.
            </p>
          </div>

          {/* Right — form */}
          <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-6 backdrop-blur-sm">
            <AuditShortForm formId="audit-top" />
          </div>
        </div>
      </section>

      {/* ── Trust signals ────────────────────────────────────────────────── */}
      <section className="border-t border-white/10 bg-white/[0.02] py-10">
        <div className="mx-auto max-w-7xl px-5">
          <div className="grid gap-6 sm:grid-cols-3">
            {TRUST_SIGNALS.map((t) => (
              <div key={t.label} className="flex gap-4">
                <span className="mt-0.5 text-2xl">{t.icon}</span>
                <div>
                  <p className="font-semibold text-white">{t.label}</p>
                  <p className="mt-1 text-sm text-slate-400">{t.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── What gets audited ────────────────────────────────────────────── */}
      <section className="py-12">
        <div className="mx-auto max-w-7xl px-5">
          <p className="mb-6 text-xs font-semibold uppercase tracking-widest text-gold">
            What we look at
          </p>
          <div className="grid gap-4 sm:grid-cols-3">
            {AUDIT_AREAS.map((a) => (
              <div
                key={a.label}
                className="rounded-xl border border-white/10 bg-white/[0.03] p-5"
              >
                <span className="text-2xl">{a.icon}</span>
                <p className="mt-3 font-semibold text-white">{a.label}</p>
                <p className="mt-1 text-sm text-slate-400">{a.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Founder credibility ──────────────────────────────────────────── */}
      <section className="border-t border-white/10 bg-white/[0.02] py-12">
        <div className="mx-auto max-w-4xl px-5 text-center">
          <h2 className="mb-4 text-xl font-bold text-white md:text-2xl">
            Reviewed by Gautam Punj — not an intern
          </h2>
          <p className="text-base leading-7 text-slate-300">
            Every audit submission goes directly to Gautam. He reviews the
            account, identifies the exact leakage points, and delivers findings
            in writing before the call. If it is not worth your time, he will
            tell you that too.
          </p>
        </div>
      </section>

      {/* ── Repeat form ──────────────────────────────────────────────────── */}
      <section className="py-12">
        <div className="mx-auto max-w-lg px-5">
          <h2 className="mb-6 text-center text-xl font-bold text-white">
            Ready to find your leaks?
          </h2>
          <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-6 backdrop-blur-sm">
            <AuditShortForm formId="audit-bottom" />
          </div>
        </div>
      </section>

      {/* ── Minimal footer ───────────────────────────────────────────────── */}
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
