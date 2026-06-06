import type { Metadata } from "next";
import Link from "next/link";
import { BrandHeader } from "@/components/BrandHeader";
import { Footer } from "@/components/Footer";
import { TrackedAnchor } from "@/components/ui/TrackedAnchor";

export const metadata: Metadata = {
  title: "Resource Library | Technocrats Digimate",
  description:
    "Practical guides and audit tools for people who run paid media — whether you're learning the craft or running a business that depends on it.",
};

// ─── Data ────────────────────────────────────────────────────────────────────

const CATEGORIES = [
  {
    icon: (
      <svg className="h-6 w-6 text-blue-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M4.26 10.147a60.436 60.436 0 00-.491 6.347A48.627 48.627 0 0112 20.904a48.627 48.627 0 018.232-4.41 60.46 60.46 0 00-.491-6.347m-15.482 0a50.57 50.57 0 00-2.658-.813A59.905 59.905 0 0112 3.493a59.902 59.902 0 0110.399 5.84c-.896.248-1.783.52-2.658.814m-15.482 0A50.697 50.697 0 0112 13.489a50.702 50.702 0 017.74-3.342M6.75 15a.75.75 0 100-1.5.75.75 0 000 1.5zm0 0v-3.675A55.378 55.378 0 0112 8.443m-7.007 11.55A5.981 5.981 0 006.75 15.75v-1.5" />
      </svg>
    ),
    label: "For Marketers",
    desc: "Interview prep, diagnosis frameworks, tracking audits, and campaign troubleshooting.",
    count: "3 resources",
  },
  {
    icon: (
      <svg className="h-6 w-6 text-gold" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 21h19.5m-18-18v18m10.5-18v18m6-13.5V21M6.75 6.75h.75m-.75 3h.75m-.75 3h.75m3-6h.75m-.75 3h.75m-.75 3h.75M6.75 21v-3.375c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21M3 3h12m-.75 4.5H21m-3.75 3.75h.008v.008h-.008v-.008zm0 3h.008v.008h-.008v-.008zm0 3h.008v.008h-.008v-.008z" />
      </svg>
    ),
    label: "For Business Owners",
    desc: "Lead quality audits, funnel leakage checklists, tracking setup, and growth system reviews.",
    count: "2 resources",
  },
  {
    icon: (
      <svg className="h-6 w-6 text-emerald-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M15.59 14.37a6 6 0 01-5.84 7.38v-4.8m5.84-2.58a14.98 14.98 0 006.16-12.12A14.98 14.98 0 009.631 8.41m5.96 5.96a14.926 14.926 0 01-5.841 2.58m-.119-8.54a6 6 0 00-7.381 5.84h4.8m2.581-5.84a14.927 14.927 0 00-2.58 5.84m2.699 2.7c-.103.021-.207.041-.311.06a15.09 15.09 0 01-2.448-2.448 14.9 14.9 0 01.06-.312m-2.24 2.39a4.493 4.493 0 00-1.757 4.306 4.493 4.493 0 004.306-1.758M16.5 9a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0z" />
      </svg>
    ),
    label: "For Freelancers & Job Seekers",
    desc: "Interview question banks, 30-day skill plans, and campaign troubleshooting playbooks.",
    count: "2 resources",
  },
];

const COMING_SOON = [
  {
    keyword: "AUDIT",
    title: "The 21-Point Lead Leakage Audit",
    audience: "For founders and business owners in real estate, study abroad, clinics, education, and high-ticket services.",
    desc: "You may not have an ads problem — you may have a system leakage problem. The same 21-point audit we run on high-ticket accounts to find exactly where ad spend stops turning into qualified sales conversations. Score your own system across ads, landing page, tracking, WhatsApp follow-up, and CRM.",
    cta: "Get the checklist + free audit",
    helperText: "Book your free growth audit and get the checklist instantly.",
    href: "/free-growth-audit",
    whatsapp: false,
    accentColor: "gold" as const,
    live: true,
    label: "For Business Owners",
    previewHref: "/assets/audit/21-point-lead-leakage-audit.pdf",
    previewLabel: "Preview Checklist",
  },
  {
    keyword: "FIX",
    title: "Campaign Troubleshooting Playbook",
    audience: "Freelancers · Paid Media Teams · Agency Interns",
    desc: "A diagnostic checklist for high CPL, low conversions, creative fatigue, tracking gaps, and sudden CPA spikes.",
    cta: "Notify Me on WhatsApp",
    helperText: null,
    href: null,
    whatsapp: true,
    accentColor: "blue" as const,
    live: false,
    label: null,
    previewHref: null,
    previewLabel: null,
  },
  {
    keyword: "TRACK",
    title: "Tracking & Attribution Checklist",
    audience: "Marketers · Agencies · Founders",
    desc: "Pixel, CAPI, GA4, GTM, attribution gaps, and CRM mismatch — explained practically for real campaign setups.",
    cta: "Join PMSK List",
    helperText: null,
    href: "/performance-marketing-survival-kit",
    whatsapp: false,
    accentColor: "blue" as const,
    live: false,
    label: null,
    previewHref: null,
    previewLabel: null,
  },
  {
    keyword: "GOOGLE",
    title: "Google Ads Survival Guide",
    audience: "Beginners · Freelancers · Business Owners",
    desc: "A practical beginner guide to Search campaigns, PMax, match types, negative keywords, and conversion tracking.",
    cta: "Join PMSK List",
    helperText: null,
    href: "/performance-marketing-survival-kit",
    whatsapp: false,
    accentColor: "blue" as const,
    live: false,
    label: null,
    previewHref: null,
    previewLabel: null,
  },
  {
    keyword: "META",
    title: "Meta Ads Survival Guide",
    audience: "Beginners · Freelancers · Business Owners",
    desc: "A practical guide to campaign objectives, audiences, creatives, Pixel, CAPI, and lead generation that converts.",
    cta: "Join PMSK List",
    helperText: null,
    href: "/performance-marketing-survival-kit",
    whatsapp: false,
    accentColor: "blue" as const,
    live: false,
    label: null,
    previewHref: null,
    previewLabel: null,
  },
  {
    keyword: "30DAY",
    title: "30-Day Performance Marketing Job-Ready Plan",
    audience: "Students · Career Switchers · Job Seekers",
    desc: "A 30-day roadmap to build paid ads skills, create portfolio proof, and walk into any interview with confidence.",
    cta: "Join PMSK List",
    helperText: null,
    href: "/performance-marketing-survival-kit",
    whatsapp: false,
    accentColor: "blue" as const,
    live: false,
    label: null,
    previewHref: null,
    previewLabel: null,
  },
];

const FAQS = [
  {
    q: "Are these resources free?",
    a: "Both live resources — the PMSK guide and the 21-Point Audit Checklist — are completely free. No credit card, no paywall. Future resources may be free, gated, or part of a workshop bundle depending on depth.",
  },
  {
    q: "Who are these resources for?",
    a: "Marketers, freelancers, students, job seekers, business owners, founders, and agency teams who want practical performance marketing knowledge — not generic theory.",
  },
  {
    q: "Where should I start?",
    a: "If you are a marketer, freelancer, or job seeker — start with the PMSK interview guide. If you are a business owner already running ads — start with the free growth audit and 21-point checklist. Both are free.",
  },
  {
    q: "Will more resources be added?",
    a: "Yes. More playbooks, checklists, and guides will be added gradually. The best way to stay updated is to follow us on WhatsApp after accessing any resource.",
  },
];

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function ResourcesPage() {
  const whatsappNumber = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER;
  const waPlaybookHref = whatsappNumber
    ? `https://wa.me/${whatsappNumber.replace(/\D/g, "")}?text=${encodeURIComponent(
        "Hi, I want to be notified when the Campaign Troubleshooting Playbook is available."
      )}`
    : "/performance-marketing-survival-kit";

  return (
    <>
      <BrandHeader />

      {/* ── Hero ─────────────────────────────────────────────────────────── */}
      <section className="relative overflow-hidden bg-ink pt-28 pb-16 md:pb-20">
        <div className="agency-grid absolute inset-0 opacity-25 pointer-events-none" />
        <div className="absolute inset-0 pointer-events-none bg-[radial-gradient(ellipse_60%_50%_at_50%_0%,rgba(214,168,79,0.07)_0%,transparent_65%)]" />

        <div className="relative mx-auto max-w-[1320px] px-5 md:px-8 lg:px-10">
          <div className="mx-auto max-w-3xl text-center">
            <div className="inline-flex items-center gap-2 rounded-full border border-gold/30 bg-gold/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.18em] text-gold">
              <span className="h-1.5 w-1.5 rounded-full bg-gold" />
              Free Resources
            </div>

            <h1 className="mt-6 text-4xl font-semibold leading-tight text-white md:text-5xl lg:text-[3.25rem]">
              The Technocrats Digimate{" "}
              <span className="bg-gradient-to-r from-gold to-gold-soft bg-clip-text text-transparent">
                Resource Library
              </span>
            </h1>

            <p className="mx-auto mt-5 max-w-2xl text-lg leading-8 text-slate-400">
              Practical guides and audit tools for people who run paid media — whether you&apos;re learning the craft or running a business that depends on it. Pick the one built for you.
            </p>

            <div className="mt-8 flex flex-col items-center gap-3 sm:flex-row sm:justify-center">
              <Link
                href="#resources-library"
                className="w-full rounded-md bg-gold px-6 py-3.5 text-center font-semibold text-ink transition-all duration-200 hover:bg-gold-soft hover:shadow-[0_0_20px_rgba(214,168,79,0.35)] sm:w-auto"
              >
                Browse the Library →
              </Link>
              <Link
                href="/free-growth-audit"
                className="w-full rounded-md border border-gold/35 px-6 py-3.5 text-center font-semibold text-gold transition-all duration-200 hover:border-gold hover:bg-gold/10 sm:w-auto"
              >
                Book Free Growth Audit
              </Link>
            </div>

            {/* Quick stats */}
            <div className="mt-10 flex flex-wrap items-center justify-center gap-x-8 gap-y-3">
              {[
                { n: "2", label: "Live Resources" },
                { n: "6", label: "Total Planned" },
                { n: "Free", label: "Always Free to Start" },
              ].map((s) => (
                <div key={s.label} className="text-center">
                  <p className="text-xl font-bold text-white">{s.n}</p>
                  <p className="text-xs text-slate-500">{s.label}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── Category Cards ───────────────────────────────────────────────── */}
      <section className="border-y border-white/[0.06] bg-navy py-12 md:py-16">
        <div className="mx-auto max-w-[1320px] px-5 md:px-8 lg:px-10">
          <p className="mb-8 text-center text-xs font-semibold uppercase tracking-[0.22em] text-slate-500">
            Browse by Audience
          </p>
          <div className="grid gap-5 md:grid-cols-3">
            {CATEGORIES.map((cat) => (
              <div
                key={cat.label}
                className="rounded-2xl border border-white/10 bg-white/[0.03] p-6 backdrop-blur-sm transition-all duration-200 hover:border-gold/20 hover:bg-white/[0.05]"
              >
                <div className="mb-4 inline-flex h-11 w-11 items-center justify-center rounded-xl border border-white/10 bg-white/[0.04]">
                  {cat.icon}
                </div>
                <h3 className="font-semibold text-white">{cat.label}</h3>
                <p className="mt-2 text-sm leading-6 text-slate-400">{cat.desc}</p>
                <p className="mt-4 text-xs font-medium text-slate-600">{cat.count}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Audience Splitter ────────────────────────────────────────────── */}
      <div className="border-b border-white/[0.06] bg-ink px-5 py-5 md:px-8 lg:px-10">
        <div className="mx-auto flex max-w-[1320px] flex-col items-center justify-center gap-2 text-sm sm:flex-row sm:gap-8">
          <span className="flex items-center gap-2 text-slate-400">
            <span className="font-semibold text-blue-400">Learning paid media?</span>
            <span className="text-slate-600">→</span>
            Start with the interview guide.
          </span>
          <span className="hidden h-4 w-px bg-white/10 sm:block" aria-hidden />
          <span className="flex items-center gap-2 text-slate-400">
            <span className="font-semibold text-gold">Running a business?</span>
            <span className="text-slate-600">→</span>
            Start with the audit checklist.
          </span>
        </div>
      </div>

      {/* ── Featured Resource (PMSK) ─────────────────────────────────────── */}
      <section className="relative overflow-hidden bg-ink py-16 md:py-24">
        <div className="absolute inset-0 pointer-events-none bg-[radial-gradient(ellipse_70%_50%_at_50%_50%,rgba(59,130,246,0.05)_0%,transparent_70%)]" />
        <div className="relative mx-auto max-w-[1320px] px-5 md:px-8 lg:px-10">

          <div className="mb-10 text-center">
            <p className="text-xs font-semibold uppercase tracking-[0.22em] text-blue-400">
              Available Now · For Learners
            </p>
            <h2 className="mt-3 text-3xl font-semibold text-white md:text-4xl">
              Featured Resource
            </h2>
          </div>

          {/* Featured card */}
          <div className="mx-auto max-w-4xl">
            <div className="relative overflow-hidden rounded-2xl border border-blue-500/25 bg-gradient-to-br from-[#0d1828] to-[#060c14] p-7 shadow-[0_24px_80px_rgba(37,99,235,0.1)] md:p-10">
              {/* Live badge */}
              <div className="absolute right-6 top-6">
                <span className="flex items-center gap-1.5 rounded-full border border-emerald-500/30 bg-emerald-500/10 px-3 py-1 text-xs font-semibold text-emerald-400">
                  <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-emerald-400" />
                  Live Free Guide
                </span>
              </div>

              <div className="grid items-center gap-8 lg:grid-cols-[1fr_auto]">
                <div>
                  {/* Keyword + label */}
                  <div className="flex items-center gap-2">
                    <span className="rounded-md border border-blue-500/30 bg-blue-500/10 px-2.5 py-0.5 font-mono text-xs font-bold tracking-wider text-blue-400">
                      ADS
                    </span>
                    <span className="rounded-md border border-blue-500/20 bg-blue-500/[0.06] px-2.5 py-0.5 text-xs font-semibold text-blue-300">
                      For Learners
                    </span>
                  </div>

                  <h3 className="mt-4 text-2xl font-semibold leading-snug text-white md:text-3xl">
                    15 Paid Ads Interview Questions That Expose Fake Experts
                  </h3>

                  <p className="mt-2 text-sm font-medium text-slate-500">
                    For students, job seekers, freelancers, junior marketers, and agency interns.
                  </p>

                  <p className="mt-4 leading-8 text-slate-400">
                    Ads Manager is easy. The job isn&apos;t. A diagnostic field guide for anyone preparing for a paid media role — the 15 questions interviewers use to separate operators from button-pushers, with the weak answer, the strong framework, and the pro insight for each.
                  </p>

                  {/* Feature list */}
                  <ul className="mt-5 space-y-2">
                    {[
                      "How to answer \"CTR is high, conversions are low\" like an operator, not a guesser",
                      "The 5-step formula that works on questions you've never seen",
                      "Pixel vs CAPI, GA4 vs platform attribution — explained for interviews",
                      "A self-scoring checklist to find out if you're actually interview-ready",
                    ].map((item) => (
                      <li key={item} className="flex items-start gap-3 text-sm text-slate-300">
                        <svg className="mt-0.5 h-4 w-4 flex-shrink-0 text-blue-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                          <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                        </svg>
                        {item}
                      </li>
                    ))}
                  </ul>

                  {/* CTAs */}
                  <div className="mt-7 flex flex-col gap-3 sm:flex-row sm:items-center">
                    <div className="flex flex-col gap-1">
                      <Link
                        href="/performance-marketing-survival-kit"
                        className="rounded-md bg-blue-600 px-6 py-3 text-center font-semibold text-white transition-all duration-200 hover:bg-blue-500 hover:shadow-[0_0_20px_rgba(59,130,246,0.3)]"
                      >
                        Get the free guide →
                      </Link>
                      <p className="text-center text-xs text-slate-600">Quick form, then instant download.</p>
                    </div>
                    <a
                      href="/assets/pmsk/pmsk-paid-ads-interview-questions.pdf"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-center text-sm font-medium text-slate-500 underline underline-offset-4 transition-colors duration-200 hover:text-slate-300"
                    >
                      Preview PDF ↗
                    </a>
                  </div>
                </div>

                {/* Cover image */}
                <div className="hidden w-44 flex-shrink-0 lg:block xl:w-52">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src="/assets/pmsk/cover.png"
                    alt="Performance Marketing Survival Kit"
                    className="w-full rotate-2 rounded-xl shadow-[0_16px_48px_rgba(37,99,235,0.2)] transition-transform duration-500 hover:rotate-0"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Resource Library Grid ─────────────────────────────────────────── */}
      <section id="resources-library" className="bg-navy py-16 md:py-24">
        <div className="mx-auto max-w-[1320px] px-5 md:px-8 lg:px-10">
          <div className="mb-12 text-center">
            <p className="text-xs font-semibold uppercase tracking-[0.22em] text-slate-500">
              The Library
            </p>
            <h2 className="mt-3 text-3xl font-semibold text-white md:text-4xl">
              More Resources on the Way
            </h2>
            <p className="mx-auto mt-4 max-w-xl text-sm leading-7 text-slate-500">
              Follow us on WhatsApp after accessing any resource — you&apos;ll be first to know when each one drops.
            </p>
          </div>

          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {COMING_SOON.map((res) => (
              <div
                key={res.keyword}
                className={`flex flex-col rounded-2xl border p-6 transition-colors duration-200 ${
                  res.live
                    ? "border-gold/25 bg-gold/[0.03] hover:border-gold/40 hover:bg-gold/[0.05]"
                    : "border-white/[0.07] bg-white/[0.02] hover:border-white/[0.12] hover:bg-white/[0.04]"
                }`}
              >
                {/* Top row */}
                <div className="mb-4 flex items-center justify-between gap-3">
                  <div className="flex items-center gap-2">
                    <span className={`rounded-md border px-2.5 py-0.5 font-mono text-xs font-bold tracking-wider ${
                      res.live
                        ? "border-gold/30 bg-gold/[0.08] text-gold"
                        : "border-white/10 bg-white/[0.04] text-slate-500"
                    }`}>
                      {res.keyword}
                    </span>
                    {res.live && res.label && (
                      <span className="rounded-md border border-gold/20 bg-gold/[0.05] px-2 py-0.5 text-xs font-semibold text-gold/80">
                        {res.label}
                      </span>
                    )}
                  </div>
                  {res.live ? (
                    <span className="rounded-full border border-gold/30 bg-gold/10 px-2.5 py-0.5 text-xs font-semibold text-gold">
                      Live Free Checklist
                    </span>
                  ) : (
                    <span className="rounded-full border border-white/10 bg-white/[0.03] px-2.5 py-0.5 text-xs font-medium text-slate-600">
                      Coming Soon
                    </span>
                  )}
                </div>

                {/* Title */}
                <h3 className={`mb-2 font-semibold leading-snug ${res.live ? "text-white" : "text-slate-400"}`}>
                  {res.title}
                </h3>

                {/* Audience */}
                <p className={`mb-3 text-xs leading-5 ${res.live ? "text-slate-500" : "text-slate-600"}`}>{res.audience}</p>

                {/* Description */}
                <p className={`mb-6 flex-1 text-sm leading-6 ${res.live ? "text-slate-400" : "text-slate-600"}`}>{res.desc}</p>

                {/* CTA */}
                {res.whatsapp ? (
                  <TrackedAnchor
                    href={waPlaybookHref}
                    target={whatsappNumber ? "_blank" : undefined}
                    rel={whatsappNumber ? "noreferrer" : undefined}
                    className="mt-auto inline-flex items-center gap-1 text-sm font-semibold text-slate-500 transition-colors duration-200 hover:text-slate-300"
                    trackLocation="resources-coming-soon-playbook-waitlist"
                  >
                    {res.cta} →
                  </TrackedAnchor>
                ) : (
                  <div className="mt-auto flex flex-col gap-1.5">
                    <Link
                      href={res.href!}
                      className={`inline-flex items-center gap-1 text-sm font-semibold transition-colors duration-200 ${
                        res.live
                          ? "text-gold hover:text-gold-soft"
                          : "text-slate-500 hover:text-slate-300"
                      }`}
                    >
                      {res.cta} →
                    </Link>
                    {res.live && res.helperText && (
                      <p className="text-xs text-slate-600">{res.helperText}</p>
                    )}
                    {res.live && res.previewHref && (
                      <a
                        href={res.previewHref}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1 text-xs font-medium text-slate-500 transition-colors duration-200 hover:text-slate-300"
                      >
                        {res.previewLabel ?? "Preview"} ↗
                      </a>
                    )}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Closing Strip ────────────────────────────────────────────────── */}
      <section className="relative overflow-hidden border-t border-gold/15 bg-ink py-20 md:py-28">
        <div className="absolute inset-0 pointer-events-none bg-[radial-gradient(ellipse_80%_60%_at_50%_100%,rgba(214,168,79,0.10)_0%,transparent_65%)]" />
        <div className="agency-grid absolute inset-0 pointer-events-none opacity-20" />

        <div className="relative mx-auto max-w-[1320px] px-5 text-center md:px-8 lg:px-10">
          <span className="inline-flex items-center rounded-full border border-gold/30 bg-gold/10 px-3 py-1 text-xs font-semibold uppercase tracking-[0.18em] text-gold">
            For Business Owners
          </span>

          <h2 className="mx-auto mt-5 max-w-3xl text-4xl font-semibold leading-tight text-white md:text-5xl">
            Running Ads But Not Seeing{" "}
            <span className="bg-gradient-to-r from-gold to-gold-soft bg-clip-text text-transparent">
              Sales-Qualified Leads?
            </span>
          </h2>

          <p className="mx-auto mt-5 max-w-xl text-lg leading-8 text-slate-400">
            Technocrats Digimate builds predictable lead-generation systems for high-ticket businesses — connecting ads, landing pages, tracking, WhatsApp follow-up, CRM, and reporting.
          </p>

          <div className="mt-8 flex flex-col items-center gap-3 sm:flex-row sm:justify-center">
            <Link
              href="/free-growth-audit"
              className="w-full rounded-md bg-gold px-7 py-3.5 text-center font-semibold text-ink transition-all duration-200 hover:bg-gold-soft hover:shadow-[0_0_30px_rgba(214,168,79,0.4)] sm:w-auto"
            >
              Book Free Growth Audit
            </Link>
            <Link
              href="/"
              className="w-full rounded-md border border-gold/35 px-7 py-3.5 text-center font-semibold text-gold transition-all duration-200 hover:border-gold hover:bg-gold/10 sm:w-auto"
            >
              Learn More About Us
            </Link>
          </div>

          <div className="mt-7 flex flex-wrap items-center justify-center gap-x-6 gap-y-2">
            {["Founder-led audit", "Written findings included", "No obligation"].map((item) => (
              <span key={item} className="flex items-center gap-2 text-sm text-slate-500">
                <span className="h-1 w-1 rounded-full bg-gold/50" />
                {item}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* ── FAQ ──────────────────────────────────────────────────────────── */}
      <section className="bg-navy py-16 md:py-24">
        <div className="mx-auto max-w-[1320px] px-5 md:px-8 lg:px-10">
          <div className="mx-auto max-w-2xl">
            <div className="mb-10 text-center">
              <p className="text-xs font-semibold uppercase tracking-[0.22em] text-gold">FAQ</p>
              <h2 className="mt-4 text-3xl font-semibold text-white md:text-4xl">
                Questions About the Resources
              </h2>
            </div>

            <div className="divide-y divide-white/10">
              {FAQS.map((faq, i) => (
                <div key={i} className="py-6">
                  <h3 className="font-medium text-white">{faq.q}</h3>
                  <p className="mt-3 leading-7 text-slate-400">{faq.a}</p>
                </div>
              ))}
            </div>

            {/* Bottom CTA */}
            <div className="mt-10 rounded-2xl border border-gold/15 bg-gold/[0.04] p-6 text-center">
              <p className="font-medium text-white">Ready to start?</p>
              <p className="mt-1 text-sm text-slate-500">
                Get the free interview guide or book your growth audit — both take under 2 minutes.
              </p>
              <div className="mt-5 flex flex-col items-center gap-3 sm:flex-row sm:justify-center">
                <Link
                  href="/performance-marketing-survival-kit"
                  className="rounded-md border border-blue-500/40 px-5 py-2.5 text-sm font-semibold text-blue-400 transition-all duration-200 hover:border-blue-500 hover:bg-blue-500/10"
                >
                  Get the free guide →
                </Link>
                <Link
                  href="/free-growth-audit"
                  className="rounded-md border border-gold/40 px-5 py-2.5 text-sm font-semibold text-gold transition-all duration-200 hover:border-gold hover:bg-gold/10"
                >
                  Book Free Audit →
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </>
  );
}
