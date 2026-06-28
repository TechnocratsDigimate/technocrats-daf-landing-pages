import type { Metadata } from "next";
import Link from "next/link";
import { BrandHeader } from "@/components/BrandHeader";
import { Footer } from "@/components/Footer";
import { SectionWrapper } from "@/components/ui/SectionWrapper";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { GlassCard } from "@/components/ui/GlassCard";
import { Badge } from "@/components/ui/Badge";
import { AuditForm } from "./AuditForm";
import { TrackedAnchor } from "@/components/ui/TrackedAnchor";

export const metadata: Metadata = {
  title: "Free Growth Audit for Lead Generation Funnels | Technocrats Digimate",
  description:
    "Get a free audit of your ads, landing page, tracking, WhatsApp follow-up, CRM visibility, and lead quality.",
  alternates: {
    canonical: "https://technocratsdigimate.com/free-growth-audit"
  },
  openGraph: {
    title: "Free Growth Audit for Lead Generation Funnels | Technocrats Digimate",
    description:
      "Get a free audit of your ads, landing page, tracking, WhatsApp follow-up, CRM visibility, and lead quality.",
    url: "https://technocratsdigimate.com/free-growth-audit",
    siteName: "Technocrats Digimate",
    type: "website"
  }
};

// ─── Static data ────────────────────────────────────────────────────────────

const AUDIT_AREAS = [
  {
    icon: "/assets/brand/meta-ads.svg.svg",
    title: "Meta Ads Account",
    desc: "Campaign structure, audience targeting, CAPI setup, and creative fatigue diagnosis.",
  },
  {
    icon: "/assets/brand/google-ads.svg.svg",
    title: "Google Ads Account",
    desc: "Search campaign quality score, PMax asset groups, conversion tracking accuracy.",
  },
  {
    icon: null,
    title: "Landing Page",
    desc: "Message-to-ad match, form friction points, mobile speed, and CTA clarity.",
  },
  {
    icon: "/assets/brand/reporting.svg.svg",
    title: "Tracking & Attribution",
    desc: "Pixel events, GA4 goals, GTM container hygiene, and cross-platform accuracy.",
  },
  {
    icon: "/assets/brand/whatsapp.svg.svg",
    title: "WhatsApp Follow-Up",
    desc: "Speed-to-lead, automation setup, message quality, and opt-in compliance.",
  },
  {
    icon: "/assets/brand/icon crm.svg.svg",
    title: "CRM & Pipeline",
    desc: "Lead visibility, stage tracking, drop-off points, and sales-ready handoff.",
  },
];

const WHAT_YOU_GET = [
  "A written summary of every issue found — no fluff, no generic advice",
  "Specific fixes ranked by revenue impact, not complexity",
  "Priority fixes ranked by potential revenue impact — with clear reasoning behind each one",
  "A clear view of where your funnel is leaking leads right now",
  "A 30-minute debrief call with Gautam Punj — questions answered, next steps discussed",
];

const FOR_YOU_IF = [
  "You're running Meta Ads or Google Ads and CPL is too high",
  "Leads are coming in but not converting to calls or sales",
  "You suspect tracking is broken but don't know where",
  "Your follow-up process is slow, manual, or non-existent",
  "You want a second opinion before scaling ad spend",
];

const NOT_FOR_YOU_IF = [
  "You haven't started running ads yet",
  "You're looking for a free strategy session, not a technical audit",
  "You want guaranteed results without sharing access to your accounts",
];

const TRUST_ITEMS = [
  {
    icon: (
      <svg className="h-5 w-5 text-gold" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
    title: "Founder-Reviewed",
    desc: "Gautam Punj personally reviews every audit — no junior handoff.",
  },
  {
    icon: (
      <svg className="h-5 w-5 text-gold" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
    title: "Under 2 Minutes to Apply",
    desc: "The form takes less than 2 minutes. The audit call is 30–45 minutes.",
  },
  {
    icon: (
      <svg className="h-5 w-5 text-gold" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M18.364 18.364A9 9 0 005.636 5.636m12.728 12.728A9 9 0 015.636 5.636m12.728 12.728L5.636 5.636" />
      </svg>
    ),
    title: "No Pitch",
    desc: "We diagnose first. There is no sales conversation until you ask.",
  },
  {
    icon: (
      <svg className="h-5 w-5 text-gold" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M16.5 10.5V6.75a4.5 4.5 0 10-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 002.25-2.25v-6.75a2.25 2.25 0 00-2.25-2.25H6.75a2.25 2.25 0 00-2.25 2.25v6.75a2.25 2.25 0 002.25 2.25z" />
      </svg>
    ),
    title: "Data Stays Private",
    desc: "We review — never retain — your account data. NDA available on request.",
  },
];

const FAQS = [
  {
    q: "What accounts do you need access to?",
    a: "For the audit, read-only access is sufficient — we can work with a screen share or a short Loom recording of your account. You don't need to share login credentials.",
  },
  {
    q: "How long does the audit take?",
    a: "After you submit the form, we'll confirm within 24 business hours and schedule the debrief. The review typically takes 2–3 days. The call is 30–45 minutes.",
  },
  {
    q: "Is this a soft sell in disguise?",
    a: "No. The audit is a genuine diagnostic. You'll receive written findings regardless of whether we work together after. If there's a fit, we'll talk about it — you'll know it's coming.",
  },
  {
    q: "What industries do you audit?",
    a: "Our strongest verticals are real estate, study abroad, clinics, and high-ticket coaching. We also audit e-commerce and financial services campaigns where the funnel is the problem.",
  },
];

// ─── Audit checklist items for hero ────────────────────────────────────────

const HERO_CHECKLIST = [
  { label: "Meta Ads Account", sub: "Campaign + CAPI" },
  { label: "Google Ads Account", sub: "Search + PMax" },
  { label: "Landing Page", sub: "Message match + friction" },
  { label: "Tracking & Attribution", sub: "Pixel + GA4 accuracy" },
  { label: "WhatsApp Follow-Up", sub: "Speed to lead" },
  { label: "CRM & Pipeline", sub: "Lead visibility" },
];

// ─── Page ───────────────────────────────────────────────────────────────────

export default function FreeGrowthAuditPage() {
  const whatsappNumber = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER;
  const waHref = whatsappNumber
    ? `https://wa.me/${whatsappNumber.replace(/\D/g, "")}?text=${encodeURIComponent("Hi, I want to ask about the Free Growth Audit.")}`
    : "/free-growth-audit";

  return (
    <>
      <BrandHeader />

      {/* ── Hero ─────────────────────────────────────────────────────────── */}
      <section className="relative overflow-hidden bg-ink pt-28 pb-16 md:pb-20">
        <div className="agency-grid absolute inset-0 opacity-25 pointer-events-none" />
        <div className="absolute inset-0 pointer-events-none bg-[radial-gradient(ellipse_60%_50%_at_30%_40%,rgba(214,168,79,0.07)_0%,transparent_65%)]" />

        <div className="relative mx-auto max-w-[1320px] px-5 md:px-8 lg:px-10">
          <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-16">

            {/* Left: Copy */}
            <div>
              <Badge label="Free — No Obligation" variant="gold" />

              <h1 className="mt-5 text-4xl font-semibold leading-tight text-white md:text-5xl lg:text-[3.25rem]">
                Find Out Exactly{" "}
                <span className="bg-gradient-to-r from-gold to-gold-soft bg-clip-text text-transparent">
                  Where Your Ad Spend Is Leaking
                </span>
              </h1>

              <p className="mt-5 text-lg leading-8 text-slate-400">
                We audit your Meta Ads, Google Ads, landing page, tracking, and WhatsApp follow-up. You get a written diagnosis and a 30-minute debrief call — before any conversation about working together.
              </p>

              <ul className="mt-6 space-y-2.5">
                {[
                  "No pitch. No generic advice.",
                  "Founder-reviewed by Gautam Punj.",
                  "Written findings + debrief call included.",
                ].map((item) => (
                  <li key={item} className="flex items-center gap-3 text-sm text-slate-300">
                    <svg className="h-4 w-4 flex-shrink-0 text-gold" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                    </svg>
                    {item}
                  </li>
                ))}
              </ul>

              <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                <a
                  href="#audit-form"
                  className="rounded-md bg-gold px-7 py-3.5 text-center font-semibold text-ink transition-all duration-200 hover:bg-gold-soft hover:shadow-[0_0_20px_rgba(214,168,79,0.35)]"
                >
                  Request My Free Audit
                </a>
                <TrackedAnchor
                  href={waHref}
                  target={whatsappNumber ? "_blank" : undefined}
                  rel={whatsappNumber ? "noreferrer" : undefined}
                  className="rounded-md border border-gold/35 px-7 py-3.5 text-center font-semibold text-gold transition-all duration-200 hover:border-gold hover:bg-gold/10"
                  trackLocation="audit-page-hero"
                >
                  Ask on WhatsApp First
                </TrackedAnchor>
              </div>
            </div>

            {/* Right: Audit Checklist Card */}
            <div className="mx-auto w-full max-w-sm lg:max-w-none">
              <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-6 backdrop-blur-sm">
                <div className="mb-5 flex items-center justify-between">
                  <p className="text-xs font-semibold uppercase tracking-[0.18em] text-gold">
                    What Gets Audited
                  </p>
                  <span className="rounded-full border border-emerald-500/30 bg-emerald-500/10 px-2.5 py-0.5 text-xs font-medium text-emerald-400">
                    6 Areas
                  </span>
                </div>
                <ul className="space-y-3">
                  {HERO_CHECKLIST.map((item) => (
                    <li
                      key={item.label}
                      className="flex items-center gap-3 rounded-lg border border-white/[0.06] bg-white/[0.02] px-4 py-3"
                    >
                      <div className="flex h-5 w-5 flex-shrink-0 items-center justify-center rounded-full bg-emerald-500/20">
                        <svg className="h-3 w-3 text-emerald-400" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                        </svg>
                      </div>
                      <div>
                        <p className="text-sm font-medium text-white">{item.label}</p>
                        <p className="text-xs text-slate-500">{item.sub}</p>
                      </div>
                    </li>
                  ))}
                </ul>
                <div className="mt-5 rounded-lg border border-gold/20 bg-gold/[0.06] px-4 py-3 text-center">
                  <p className="text-sm font-medium text-gold">
                    Written report + 30-min debrief included
                  </p>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* ── Audit Form ───────────────────────────────────────────────────── */}
      <section id="audit-form" className="bg-ink py-16 md:py-24">
        <div className="mx-auto max-w-[1320px] px-5 md:px-8 lg:px-10">
          <div className="mx-auto max-w-2xl">
            <div className="mb-10 text-center">
              <Badge label="Free — No Obligation" variant="gold" />
              <h2 className="mt-4 text-3xl font-semibold text-white md:text-4xl">
                Request Your Free Growth Audit
              </h2>
              <p className="mt-3 leading-7 text-slate-400">
                Fill in the form below. Gautam reviews every application personally and confirms within 24 business hours.
              </p>
            </div>

            <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-6 backdrop-blur-sm md:p-8">
              <AuditForm />
            </div>
          </div>
        </div>
      </section>

      {/* ── Who This Is For ──────────────────────────────────────────────── */}
      <SectionWrapper bg="navy">
        <SectionHeader
          eyebrow="Is This For You?"
          headline="Built for businesses running paid ads"
          highlight="running paid ads"
          align="center"
        />
        <div className="mt-12 grid gap-8 lg:grid-cols-2">

          {/* For you */}
          <GlassCard accent="gold">
            <div className="mb-4 flex items-center gap-3">
              <div className="flex h-8 w-8 items-center justify-center rounded-full border border-emerald-500/30 bg-emerald-500/10">
                <svg className="h-4 w-4 text-emerald-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                </svg>
              </div>
              <h3 className="font-semibold text-white">This Audit Is For You If…</h3>
            </div>
            <ul className="space-y-3">
              {FOR_YOU_IF.map((item) => (
                <li key={item} className="flex items-start gap-3 text-sm text-slate-300">
                  <span className="mt-1.5 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-emerald-400" />
                  {item}
                </li>
              ))}
            </ul>
          </GlassCard>

          {/* Not for you */}
          <GlassCard>
            <div className="mb-4 flex items-center gap-3">
              <div className="flex h-8 w-8 items-center justify-center rounded-full border border-red-500/30 bg-red-500/10">
                <svg className="h-4 w-4 text-red-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </div>
              <h3 className="font-semibold text-white">Not the Right Fit If…</h3>
            </div>
            <ul className="space-y-3">
              {NOT_FOR_YOU_IF.map((item) => (
                <li key={item} className="flex items-start gap-3 text-sm text-slate-400">
                  <span className="mt-1.5 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-red-500/60" />
                  {item}
                </li>
              ))}
            </ul>
            <p className="mt-5 rounded-lg border border-white/[0.06] bg-white/[0.02] px-4 py-3 text-xs leading-6 text-slate-500">
              Not running ads yet?{" "}
              <a href="/performance-marketing-survival-kit" className="text-gold underline underline-offset-2 hover:text-gold-soft">
                Download the free PMSK guide
              </a>{" "}
              — it&apos;s the right starting point.
            </p>
          </GlassCard>

        </div>
      </SectionWrapper>

      {/* ── What We Audit ────────────────────────────────────────────────── */}
      <SectionWrapper bg="ink" glow glowColor="gold">
        <SectionHeader
          eyebrow="Audit Scope"
          headline="Six areas. One clear diagnosis."
          highlight="One clear diagnosis."
          align="center"
        />
        <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {AUDIT_AREAS.map((area) => (
            <GlassCard key={area.title} hover>
              <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-lg border border-gold/20 bg-gold/10">
                {area.icon ? (
                  /* eslint-disable-next-line @next/next/no-img-element */
                  <img src={area.icon} alt={area.title} className="h-5 w-5 object-contain" />
                ) : (
                  <svg className="h-5 w-5 text-gold" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 21a9.004 9.004 0 008.716-6.747M12 21a9.004 9.004 0 01-8.716-6.747M12 21c2.485 0 4.5-4.03 4.5-9S14.485 3 12 3m0 18c-2.485 0-4.5-4.03-4.5-9S9.515 3 12 3m0 0a8.997 8.997 0 017.843 4.582M12 3a8.997 8.997 0 00-7.843 4.582m15.686 0A11.953 11.953 0 0112 10.5c-2.998 0-5.74-1.1-7.843-2.918m15.686 0A8.959 8.959 0 0121 12c0 .778-.099 1.533-.284 2.253m0 0A17.919 17.919 0 0112 16.5c-3.162 0-6.133-.815-8.716-2.247m0 0A9.015 9.015 0 013 12c0-1.605.42-3.113 1.157-4.418" />
                  </svg>
                )}
              </div>
              <h3 className="mb-2 font-semibold text-white">{area.title}</h3>
              <p className="text-sm leading-6 text-slate-400">{area.desc}</p>
            </GlassCard>
          ))}
        </div>
      </SectionWrapper>

      {/* ── What You Get ─────────────────────────────────────────────────── */}
      <SectionWrapper bg="navy">
        <div className="mx-auto max-w-3xl">
          <SectionHeader
            eyebrow="Deliverables"
            headline="What you receive after the audit"
            highlight="after the audit"
            align="center"
          />
          <ul className="mt-10 space-y-4">
            {WHAT_YOU_GET.map((item, i) => (
              <li
                key={i}
                className="flex items-start gap-4 rounded-xl border border-white/[0.07] bg-white/[0.03] px-5 py-4 transition-all duration-200 hover:border-gold/20 hover:bg-white/[0.05]"
              >
                <div className="flex h-7 w-7 flex-shrink-0 items-center justify-center rounded-full bg-gold/15 text-xs font-bold text-gold">
                  {i + 1}
                </div>
                <p className="text-sm leading-7 text-slate-300">{item}</p>
              </li>
            ))}
          </ul>

          {/* Bonus: 21-Point Lead Leakage Audit Checklist */}
          <div className="mt-6 rounded-2xl border border-gold/20 bg-gold/[0.04] p-5">
            <div className="flex items-start gap-4">
              <div className="mt-0.5 flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full border border-gold/30 bg-gold/10">
                <svg className="h-4 w-4 text-gold" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 18v-5.25m0 0a6.01 6.01 0 001.5-.189m-1.5.189a6.01 6.01 0 01-1.5-.189m3.75 7.478a12.06 12.06 0 01-4.5 0m3.75 2.383a14.406 14.406 0 01-3 0M14.25 18v-.192c0-.983.658-1.823 1.508-2.316a7.5 7.5 0 10-7.517 0c.85.493 1.509 1.333 1.509 2.316V18" />
                </svg>
              </div>
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.18em] text-gold">
                  Bonus — Included Free
                </p>
                <p className="mt-1 font-semibold text-white">
                  21-Point Lead Leakage Audit Checklist
                </p>
                <p className="mt-1.5 text-sm leading-6 text-slate-400">
                  Every audit applicant also receives our 21-point diagnostic checklist — a framework you can use independently on any campaign to find exactly where leads are dropping before they convert.
                  It is the same diagnostic thinking behind our{" "}
                  <Link
                    className="font-medium text-gold underline underline-offset-2 hover:text-gold-soft"
                    href="/services/performance-marketing-lead-generation"
                  >
                    performance marketing and lead generation system
                  </Link>
                  .
                </p>
              </div>
            </div>
          </div>
        </div>
      </SectionWrapper>

      {/* ── Trust Section ────────────────────────────────────────────────── */}
      <SectionWrapper bg="navy">
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {TRUST_ITEMS.map((item) => (
            <div
              key={item.title}
              className="rounded-xl border border-white/[0.07] bg-white/[0.03] p-5 transition-all duration-200 hover:border-gold/20"
            >
              <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-lg border border-gold/20 bg-gold/10">
                {item.icon}
              </div>
              <h3 className="mb-1.5 text-sm font-semibold text-white">{item.title}</h3>
              <p className="text-sm leading-6 text-slate-500">{item.desc}</p>
            </div>
          ))}
        </div>
      </SectionWrapper>

      {/* ── FAQ ──────────────────────────────────────────────────────────── */}
      <SectionWrapper bg="ink">
        <div className="mx-auto max-w-2xl">
          <SectionHeader
            eyebrow="FAQ"
            headline="Questions about the audit"
            highlight="the audit"
            align="center"
          />
          <div className="mt-10 divide-y divide-white/10">
            {FAQS.map((faq, i) => (
              <div key={i} className="py-6">
                <h3 className="font-medium text-white">{faq.q}</h3>
                <p className="mt-3 leading-7 text-slate-400">{faq.a}</p>
              </div>
            ))}
          </div>

          <div className="mt-10 rounded-2xl border border-gold/15 bg-gold/[0.04] p-6 text-center">
            <p className="text-sm text-slate-400">
              Still have questions?{" "}
              <TrackedAnchor
                href={waHref}
                target={whatsappNumber ? "_blank" : undefined}
                rel={whatsappNumber ? "noreferrer" : undefined}
                className="font-medium text-gold underline underline-offset-2 hover:text-gold-soft"
                trackLocation="audit-page-faq"
              >
                Message us on WhatsApp
              </TrackedAnchor>{" "}
              — we reply within a few hours.
            </p>
          </div>
        </div>
      </SectionWrapper>

      <Footer />
    </>
  );
}
