"use client";

import { useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { BrandHeader } from "@/components/BrandHeader";
import { Footer } from "@/components/Footer";
import { MultiStepAuditForm } from "@/components/MultiStepAuditForm";
import { WhatsAppLink } from "@/components/WhatsAppLink";
import type { FunnelConfig } from "@/lib/funnel-data";
import { processSteps } from "@/lib/funnel-data";
import { trackEvent } from "@/lib/tracking";

function CaseFrameworkVisual({
  niche,
  snapshot,
  src
}: {
  niche: string;
  snapshot: FunnelConfig["caseStudy"]["snapshot"];
  src: string;
}) {
  return (
    <div className="rounded-md border border-white/10 bg-[linear-gradient(145deg,rgba(5,7,13,0.96),rgba(13,24,40,0.96))] p-4">
      {/* Replace this visual with the final approved case study screenshot or proof asset. */}
      <div className="flex items-start justify-between gap-4 border-b border-white/10 pb-4">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.22em] text-gold">Audit Snapshot</p>
          <p className="mt-2 text-xl font-semibold text-white">{niche === "Real Estate" ? "Buyer Intent Review" : "Student Intent Review"}</p>
        </div>
        <span className="rounded-md border border-gold/30 bg-gold/10 px-3 py-1 text-xs font-semibold text-gold">Case Review</span>
      </div>
      <div className="mt-4 overflow-hidden rounded-md border border-white/10 bg-ink">
        <Image
          alt={`${niche} lead quality visual`}
          className="h-44 w-full object-cover md:h-52 lg:h-56"
          height={520}
          src={src}
          width={1200}
        />
      </div>
      <div className="mt-4 grid gap-3 sm:grid-cols-2">
        {snapshot.map((item) => (
          <div className="rounded-md border border-white/10 bg-white/[0.035] p-3" key={item.label}>
            <p className="text-xs font-semibold uppercase tracking-[0.14em] text-gold">{item.label}</p>
            <p className="mt-2 text-sm font-medium leading-6 text-slate-100">{item.value}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

function VisibilityProofSection({ niche }: { niche: string }) {
  const isRealEstate = niche === "Real Estate";
  const proofRows = [
    {
      src: "/assets/case-studies/meta-ads-screenshot.jpg.jpg",
      title: "Meta Ads Visibility",
      description: "See which campaigns are spending budget, generating enquiries, increasing CPL, or producing low-intent leads.",
      bullets: [
        "Campaign spend and CPL visibility",
        "Lead volume and quality signals",
        "Campaigns to scale, pause, or restructure"
      ]
    },
    {
      src: "/assets/case-studies/google-ads-screenshot.jpg.jpg",
      title: "Google Ads Visibility",
      description: "Understand which search campaigns, clicks, and conversion paths are creating real intent instead of wasting budget.",
      bullets: [
        "Clicks, CPC, conversions, and cost per conversion",
        "Search intent and campaign performance",
        "Budget leakage from weak traffic"
      ]
    },
    {
      src: "/assets/case-studies/lead-quality-screenshot.png",
      title: isRealEstate ? "Lead Quality Review" : "Student Lead Quality Review",
      description: isRealEstate
        ? "Track what happens after the lead comes in — from enquiry source to WhatsApp follow-up, call readiness, and booked meeting or site visit movement."
        : "Track what happens after the student lead comes in — from enquiry source to country fit, eligibility, WhatsApp follow-up, and counselling-booking readiness.",
      bullets: isRealEstate
        ? [
            "Lead source and intent visibility",
            "Follow-up and response tracking",
            "Booked call / site visit readiness"
          ]
        : [
            "Student intent, country fit, and eligibility visibility",
            "WhatsApp follow-up and response tracking",
            "Counselling-booking readiness"
          ]
    }
  ];

  return (
    <section className="border-b border-white/10 bg-ink px-5 py-12 md:px-8 md:py-16 lg:px-10">
      <div className="mx-auto max-w-[1320px]">
        <div className="max-w-4xl">
          <p className="text-base font-semibold uppercase tracking-[0.18em] text-gold">Campaign Visibility System</p>
          <h2 className="mt-4 max-w-3xl text-3xl font-semibold leading-[1.08] md:text-5xl">
            See Exactly Where Your Paid Ads Are Leaking
          </h2>
          <p className="mt-5 max-w-3xl text-lg leading-8 text-slate-300">
            We connect campaign spend, lead quality, follow-up movement, and booked-call readiness so you can see what is working before scaling the funnel.
          </p>
        </div>

        <div className="mt-8 grid gap-5">
          {proofRows.map((row, index) => {
            const image = (
              <div className="overflow-hidden rounded-md border border-gold/20 bg-[linear-gradient(145deg,rgba(255,255,255,0.06),rgba(255,255,255,0.025))] p-3 shadow-gold">
                <Image
                  alt={`${row.title} visual`}
                  className="h-auto max-h-[360px] w-full rounded-sm bg-white object-contain [image-rendering:auto]"
                  height={1006}
                  src={row.src}
                  unoptimized
                  width={1564}
                />
              </div>
            );
            const text = (
              <div className="flex h-full flex-col justify-center rounded-md border border-white/10 bg-panel p-5 md:p-6">
                <p className="w-fit rounded-md border border-gold/25 bg-gold/10 px-3 py-1 text-xs font-semibold uppercase tracking-[0.16em] text-gold">
                  Visibility Proof
                </p>
                <h3 className="mt-4 text-2xl font-semibold text-white md:text-3xl">{row.title}</h3>
                <p className="mt-4 text-base leading-7 text-slate-300 md:text-lg md:leading-8">{row.description}</p>
                <div className="mt-5 grid gap-3">
                  {row.bullets.map((bullet) => (
                    <div className="flex gap-3" key={bullet}>
                      <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-gold" />
                      <p className="text-sm leading-6 text-slate-200 md:text-base">{bullet}</p>
                    </div>
                  ))}
                </div>
              </div>
            );

            return (
              <div className="grid gap-4 rounded-md border border-white/10 bg-[linear-gradient(145deg,rgba(13,24,40,0.84),rgba(5,7,13,0.94))] p-4 lg:grid-cols-2 lg:items-center" key={row.title}>
                {index === 1 ? (
                  <>
                    {image}
                    {text}
                  </>
                ) : (
                  <>
                    {text}
                    {image}
                  </>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

function ProcessIcon({ title }: { title: string }) {
  const iconProps = {
    className: "h-7 w-7",
    fill: "none",
    stroke: "currentColor",
    strokeLinecap: "round" as const,
    strokeLinejoin: "round" as const,
    strokeWidth: 1.8,
    viewBox: "0 0 24 24"
  };

  if (title === "Filtration Form") {
    return (
      <svg aria-hidden="true" {...iconProps}>
        <path d="M5 5h14" />
        <path d="M7 12h10" />
        <path d="M10 19h4" />
        <path d="M4 3h16l-6.5 8v6l-3 2v-8L4 3Z" />
      </svg>
    );
  }

  if (title === "Booker") {
    return (
      <svg aria-hidden="true" {...iconProps}>
        <rect height="15" rx="2.5" width="16" x="4" y="5" />
        <path d="M8 3v4" />
        <path d="M16 3v4" />
        <path d="M4 10h16" />
        <path d="M8 14h3" />
        <path d="M14 14h2" />
      </svg>
    );
  }

  if (title === "Call Confirmation") {
    return (
      <svg aria-hidden="true" {...iconProps}>
        <path d="M5 18.5 6.2 15A7 7 0 1 1 9 17.5L5 18.5Z" />
        <path d="m9.3 11.8 1.8 1.8 3.8-4.2" />
      </svg>
    );
  }

  return (
    <svg aria-hidden="true" {...iconProps}>
      <rect height="12" rx="2" width="16" x="4" y="5" />
      <path d="M8 17v2" />
      <path d="M16 17v2" />
      <path d="M9 13v-3" />
      <path d="M12 13V8" />
      <path d="M15 13v-2" />
    </svg>
  );
}

function ClientProofVisual({ niche }: { niche: string }) {
  const reviewDescription =
    niche === "Study Abroad"
      ? "Every audit looks beyond ad campaigns and checks the complete journey from traffic to qualified student enquiry, follow-up, counselling booking, and counselling conversation."
      : "Every audit looks beyond ad campaigns and checks the complete journey from traffic to qualified enquiry, follow-up, booking, and sales conversation.";

  return (
    <div className="rounded-md border border-white/10 bg-[linear-gradient(145deg,#05070d,#0d1828)] p-4">
      {/* Replace this visual with approved testimonial, client logo, or founder/agency proof imagery. */}
      <div className="grid gap-4 md:grid-cols-[0.72fr_1fr] md:items-stretch">
        <div className="overflow-hidden rounded-md border border-white/10 bg-white/[0.035]">
          <Image
            alt="Technocrats Digimate founder"
            className="aspect-[4/5] h-full w-full object-cover"
            height={900}
            src="/assets/brand/founder.jpeg"
            width={720}
          />
        </div>
        <div className="flex h-full flex-col justify-center rounded-md border border-white/10 bg-white/[0.035] p-5">
          <p className="text-xl font-semibold text-white">What Gets Reviewed</p>
          <p className="mt-3 leading-7 text-slate-300">
            {reviewDescription}
          </p>
          <div className="mt-5 grid grid-cols-2 gap-3 sm:grid-cols-5">
            {[
              { src: "/assets/brand/meta-ads.svg.svg", label: "Meta Ads" },
              { src: "/assets/brand/google-ads.svg.svg", label: "Google Ads" },
              { src: "/assets/brand/whatsapp.svg.svg", label: "WhatsApp" },
              { src: "/assets/brand/icon crm.svg.svg", label: "CRM" },
              { src: "/assets/brand/reporting.svg.svg", label: "Reporting" }
            ].map((item) => (
              <div className="flex min-h-24 flex-col items-center justify-center rounded-md border border-gold/20 bg-[linear-gradient(145deg,rgba(255,255,255,0.06),rgba(255,255,255,0.025))] p-3 text-center" key={item.label}>
                <span className="flex h-10 w-10 items-center justify-center rounded-md border border-gold/25 bg-gold/10">
                  <Image alt="" className="h-6 w-6 object-contain" height={24} src={item.src} unoptimized width={24} />
                </span>
                <p className="mt-3 min-h-8 text-center text-xs font-semibold leading-4 text-slate-200">{item.label}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export function FunnelPage({ funnel }: { funnel: FunnelConfig }) {
  const isStudyAbroad = funnel.niche === "Study Abroad";
  const serviceAnchorText = isStudyAbroad
    ? "study abroad lead generation system"
    : "real estate lead generation system";
  const auditFormIntro = isStudyAbroad
    ? "Answer a few questions so we can understand your country focus, student lead quality issue, ad spend, and counselling follow-up bottleneck before the audit call."
    : "Answer a few questions so we can understand your niche, ad spend, lead quality issue, and follow-up bottleneck before the audit call.";
  const auditBenefits = isStudyAbroad
    ? [
        "Find where student leads are leaking",
        "Check enquiry quality before the call",
        "Get a clear student-lead funnel diagnosis"
      ]
    : [
        "Find where your paid ads are leaking",
        "Check lead quality before the call",
        "Get a clear funnel diagnosis direction"
      ];
  const bottomCtaHeadline = isStudyAbroad ? "Ready to Diagnose the Student Lead Funnel?" : "Ready to Diagnose the Funnel?";
  const founderReviewItems = isStudyAbroad
    ? [
        "Campaign spend and CPL leakage",
        "Landing page intent and form quality",
        "WhatsApp and counsellor follow-up gaps",
        "CRM visibility and counselling booking movement",
        "Reporting clarity before scaling"
      ]
    : [
        "Campaign spend and CPL leakage",
        "Landing page intent and form quality",
        "WhatsApp and call follow-up gaps",
        "CRM visibility and booking movement",
        "Reporting clarity before scaling"
      ];
  const diagnosticProcessSteps = isStudyAbroad
    ? [
        {
          title: "Filtration Form",
          description: "We collect country interest, intake, budget, service need, and lead source before booking the audit.",
          output: "Qualified student-lead context"
        },
        {
          title: "Booker",
          description: "Qualified prospects move toward a dedicated audit slot instead of a vague callback request.",
          output: "Confirmed audit slot"
        },
        {
          title: "Call Confirmation",
          description: "The prospect is sent to WhatsApp and calendar actions so the audit does not get lost.",
          output: "Higher show-up readiness"
        },
        {
          title: "Growth Audit Meeting",
          description: "We diagnose ads, landing page, counsellor follow-up, CRM, and appointment tracking as one funnel.",
          output: "Clear student-lead growth plan"
        }
      ]
    : processSteps;

  useEffect(() => {
    // ConsentAwareTracking fires the global PageView — we must not duplicate it.
    // Fire a niche-specific named event instead so funnels are identifiable via GTM.
    trackEvent("funnel_page_view", { niche: funnel.niche, page: funnel.slug });
  }, [funnel.niche, funnel.slug]);

  return (
    <>
      <BrandHeader />
      <main className="bg-ink text-white">
        <section className="agency-grid relative overflow-hidden px-5 pb-14 pt-24 md:px-8 md:pb-16 md:pt-28 lg:px-10">
          <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(5,7,13,0.12),#05070d_92%)]" />
          <div className="relative z-10 mx-auto grid max-w-[1320px] items-start gap-8 lg:grid-cols-[1fr_0.86fr]">
            <div>
              <p className="w-fit rounded-md border border-gold/25 bg-gold/10 px-3 py-2 text-xs font-semibold uppercase tracking-[0.22em] text-gold md:text-[0.82rem]">
                {funnel.eyebrow}
              </p>
              <h1 className="mt-5 max-w-[820px] text-[2.05rem] font-semibold leading-[1.13] text-white sm:text-[2.75rem] sm:leading-[1.1] lg:text-[3.45rem] lg:leading-[1.07]">
                {funnel.heroHeadline}
              </h1>
              <p className="mt-5 max-w-[730px] text-base leading-[1.65] text-slate-200/90 md:text-[1.18rem] md:leading-[1.65]">{funnel.heroSubheadline}</p>
              <p className="mt-4 max-w-[730px] text-sm leading-6 text-slate-300">
                Learn how this fits into a complete{" "}
                <Link
                  className="font-medium text-gold underline underline-offset-2 hover:text-gold-soft"
                  href="/services/performance-marketing-lead-generation"
                >
                  {serviceAnchorText}
                </Link>
                .
              </p>
              <div className="mt-5 grid max-w-2xl gap-3 sm:grid-cols-3">
                {["Funnel diagnosis", "Lead quality check", "Follow-up audit"].map((item) => (
                  <div className="rounded-md border border-white/10 bg-white/[0.035] px-4 py-3 text-sm font-medium text-slate-200 md:text-[0.95rem]" key={item}>
                    {item}
                  </div>
                ))}
              </div>
              <div className="mt-6 flex flex-col gap-3 sm:flex-row">
                <a className="rounded-md bg-[linear-gradient(90deg,#d6a84f,#f3d58a)] px-6 py-4 text-center font-semibold text-ink shadow-gold transition hover:brightness-110" href="#audit-form">
                  {funnel.cta}
                </a>
                <WhatsAppLink
                  className="rounded-md border border-gold/40 px-6 py-4 text-center font-semibold text-gold transition hover:border-gold hover:bg-gold/10"
                  label="Ask on WhatsApp"
                  source={`${funnel.slug}-hero`}
                />
              </div>
              <p className="mt-4 max-w-[720px] text-sm leading-[1.7] text-slate-300/90 md:text-[0.95rem]">
                No generic pitch. We first diagnose where your paid ads, landing page, and follow-up system are leaking conversions.
              </p>
            </div>

            <div className="relative rounded-md border border-white/12 bg-navy/88 p-3 shadow-gold backdrop-blur md:p-4">
              <div className="absolute -right-3 -top-3 z-10 rounded-md border border-gold/35 bg-ink px-4 py-3 shadow-gold">
                <p className="text-xs uppercase tracking-[0.2em] text-gold">DAF</p>
                <p className="mt-1 text-sm font-semibold text-white">Audit Snapshot</p>
              </div>
              <div className="rounded-md border border-gold/20 bg-[linear-gradient(145deg,rgba(5,7,13,0.96),rgba(13,24,40,0.96))] p-3 md:p-4">
                <div className="flex items-start justify-between gap-4 border-b border-white/10 pb-3">
                  <div>
                    <p className="text-xs font-semibold uppercase tracking-[0.22em] text-gold">Diagnostic Dashboard</p>
                    <h2 className="mt-2 text-xl font-semibold leading-tight text-white md:text-2xl">{funnel.heroAudit.title}</h2>
                  </div>
                  <span className="rounded-md border border-gold/35 bg-gold/10 px-3 py-1 text-xs font-semibold uppercase tracking-[0.16em] text-gold">
                    Preview
                  </span>
                </div>
                <div className="mt-4 grid gap-2.5">
                  {funnel.heroAudit.items.map((item) => (
                    <div
                      className="grid gap-2.5 rounded-md border border-white/10 bg-white/[0.035] p-2.5 sm:grid-cols-[1fr_auto] sm:items-center"
                      key={item.label}
                    >
                      <div className="flex items-center gap-3">
                        <span className="h-2.5 w-2.5 shrink-0 rounded-full bg-gold" />
                        <span className="text-sm font-medium text-slate-200">{item.label}</span>
                      </div>
                      <span className="w-fit rounded-md border border-gold/25 bg-gold/10 px-3 py-1 text-xs font-semibold text-gold">
                        {item.status}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="px-5 py-10 md:px-8 md:py-16 lg:px-10">
          <div className="mx-auto grid max-w-[1320px] gap-8 md:grid-cols-[0.85fr_1.15fr] md:items-start">
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.22em] text-gold">The Real Issue</p>
              <h2 className="mt-4 text-3xl font-semibold leading-tight md:text-5xl">
                Most businesses don&apos;t have an ads problem. They have a funnel problem.
              </h2>
              <p className="mt-5 text-lg leading-8 text-slate-400">
                The audit separates traffic problems from offer, page, qualification, follow-up, and tracking problems.
              </p>
            </div>
            <div className="grid gap-4">
              {funnel.painPoints.map((point, index) => (
                <div className="flex items-center gap-4 rounded-md border border-white/10 bg-[linear-gradient(145deg,rgba(255,255,255,0.055),rgba(255,255,255,0.02))] px-4 py-4 md:px-5" key={point}>
                  <span className="inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-md border border-gold/35 bg-gold/10 text-sm font-semibold text-gold">
                    {index + 1}
                  </span>
                  <p className="text-base leading-7 text-slate-200 md:text-lg">{point}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="border-y border-white/10 bg-navy px-5 py-12 md:px-8 md:py-16 lg:px-10">
          <div className="mx-auto grid max-w-[1320px] gap-8 lg:grid-cols-[0.48fr_0.52fr] lg:items-center">
            <div className="max-w-2xl">
              <p className="text-sm font-semibold uppercase tracking-[0.22em] text-gold">{funnel.caseStudy.label}</p>
              <h2 className="mt-4 text-3xl font-semibold leading-tight md:text-5xl">{funnel.caseStudy.title}</h2>
              <div className="mt-5 space-y-4 text-lg leading-8 text-slate-300">
                {funnel.caseStudy.description.map((paragraph) => (
                  <p key={paragraph}>{paragraph}</p>
                ))}
              </div>
              <div className="mt-7 rounded-md border border-white/10 bg-white/[0.035] p-4">
                <p className="text-sm font-semibold uppercase tracking-[0.18em] text-gold">What We Audited:</p>
                <div className="mt-4 grid gap-3">
                  {funnel.caseStudy.audited.map((item) => (
                    <div className="flex items-start gap-3" key={item}>
                      <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-gold" />
                      <p className="leading-7 text-slate-200">{item}</p>
                    </div>
                  ))}
                </div>
              </div>
              <p className="mt-5 rounded-md border border-gold/25 bg-gold/10 px-4 py-3 font-medium leading-7 text-gold-soft">
                {funnel.caseStudy.outcome}
              </p>
            </div>
            <div className="rounded-md border border-gold/25 bg-[linear-gradient(145deg,#05070d,#0d1828)] p-4 shadow-gold">
              <CaseFrameworkVisual niche={funnel.niche} snapshot={funnel.caseStudy.snapshot} src={funnel.assets.caseStudy} />
              <p className="mb-4 mt-5 text-sm font-semibold uppercase tracking-[0.22em] text-gold">What the audit should prove</p>
              <div className="grid gap-3">
                {funnel.caseStudy.bullets.map((bullet) => (
                  <div className="flex gap-4" key={bullet}>
                    <span className="mt-2 h-2 w-2 shrink-0 rounded-full bg-gold" />
                    <p className="text-sm leading-6 text-slate-200 md:text-base">{bullet}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        <VisibilityProofSection niche={funnel.niche} />

        <section className="px-5 py-10 md:px-8 md:py-12 lg:px-10">
          <div className="mx-auto max-w-[1320px]">
            <div className="grid gap-5 lg:grid-cols-[1fr_300px] lg:items-center">
              <div className="max-w-4xl">
                <p className="text-base font-bold uppercase tracking-[0.2em] text-gold md:text-lg">Diagnostic Audit Funnel</p>
                <h2 className="mt-4 max-w-3xl text-3xl font-semibold leading-[1.08] md:text-5xl">
                  A simple path from unclear paid ads to a focused growth conversation.
                </h2>
                <p className="mt-4 max-w-2xl text-lg leading-8 text-slate-300">
                  No vague callback. Every step filters intent, confirms readiness, and prepares the audit.
                </p>
              </div>
              <div className="rounded-md border border-gold/25 bg-gold/10 p-3.5 shadow-gold lg:self-center">
                <a className="block rounded-md bg-[linear-gradient(90deg,#d6a84f,#f3d58a)] px-5 py-3.5 text-center text-base font-bold text-ink transition hover:brightness-110" href="#audit-form">
                  Start My Free Audit
                </a>
                <p className="mt-2.5 text-center text-sm font-medium text-gold-soft">Takes less than 2 minutes</p>
              </div>
            </div>
            <div className="mt-6 grid gap-4 md:grid-cols-2 xl:grid-cols-4">
              {diagnosticProcessSteps.map((step, index) => (
                <div className="group flex h-full min-h-[310px] flex-col rounded-md border border-white/10 bg-panel p-5 transition hover:border-gold/35 hover:bg-white/[0.045]" key={step.title}>
                  <div className="flex items-center justify-between gap-4">
                    <span className="inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-md border border-gold/35 bg-gold/10 text-sm font-semibold text-gold">
                      0{index + 1}
                    </span>
                    <span className="inline-flex h-12 w-12 shrink-0 items-center justify-center rounded-md border border-gold/25 bg-[linear-gradient(145deg,rgba(214,168,79,0.14),rgba(37,99,235,0.12))] text-gold shadow-[0_14px_35px_rgba(214,168,79,0.12)]">
                      <ProcessIcon title={step.title} />
                    </span>
                  </div>
                  <h3 className="mt-5 text-[1.4rem] font-semibold leading-tight text-white">{step.title}</h3>
                  <p className="mt-4 flex-1 text-base leading-7 text-slate-300">{step.description}</p>
                  <div className="mt-5 rounded-md border border-gold/30 bg-gold/10 px-4 py-3">
                    <p className="text-xs font-semibold uppercase tracking-[0.16em] text-gold">Output</p>
                    <p className="mt-1.5 text-sm font-semibold leading-5 text-gold-soft">{step.output}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="border-t border-white/10 bg-navy px-5 py-12 md:px-8 md:py-16 lg:px-10">
          <div className="mx-auto grid max-w-[1320px] gap-6 md:grid-cols-[0.78fr_1fr] md:items-center">
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.22em] text-gold">Founder-Led Audit</p>
              <h2 className="mt-4 text-3xl font-semibold leading-tight md:text-5xl">
                Your Funnel Reviewed by Gautam Punj
              </h2>
              <p className="mt-5 text-lg leading-8 text-slate-300">
                A practical review of your paid ads, landing page, WhatsApp follow-up, CRM, and reporting gaps that affect lead quality.
              </p>
              <p className="mt-4 text-base leading-7 text-slate-300">
                Gautam Punj leads Technocrats Digimate and works hands-on across performance marketing systems for real estate, study abroad, and high-ticket service businesses.
              </p>
              <div className="mt-5 rounded-md border border-white/10 bg-white/[0.035] p-4">
                <p className="text-sm font-semibold uppercase tracking-[0.16em] text-gold">What I personally review</p>
                <div className="mt-4 grid gap-3">
                  {founderReviewItems.map((item) => (
                    <div className="flex gap-3" key={item}>
                      <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-gold" />
                      <p className="text-sm leading-6 text-slate-200 md:text-base">{item}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
            <ClientProofVisual niche={funnel.niche} />
          </div>
        </section>

        <section className="border-t border-white/10 bg-[linear-gradient(180deg,#07111f,#05070d)] px-5 py-12 md:px-8 md:py-16 lg:px-10" id="audit-form">
          <div className="mx-auto grid max-w-[1320px] gap-8 lg:grid-cols-[0.78fr_1.22fr] lg:items-start">
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.22em] text-gold">Free Audit</p>
              <h2 className="mt-4 text-3xl font-semibold leading-tight md:text-5xl">Start Your Free Audit</h2>
              <p className="mt-5 text-lg leading-8 text-slate-300">
                {auditFormIntro}
              </p>
              <p className="mt-4 w-fit rounded-md border border-gold/25 bg-gold/10 px-4 py-3 text-sm font-semibold text-gold">
                Takes less than 2 minutes. No generic sales pitch.
              </p>
              <div className="mt-7 grid gap-3">
                {auditBenefits.map((item) => (
                  <div className="rounded-md border border-white/10 bg-white/[0.035] px-4 py-3 text-sm font-medium text-slate-200" key={item}>
                    {item}
                  </div>
                ))}
              </div>
              <p className="mt-4 text-sm leading-6 text-slate-400">
                After submitting, you&apos;ll be redirected to select your preferred audit slot.
              </p>
            </div>
            <MultiStepAuditForm funnel={funnel} />
          </div>
        </section>

        <section className="px-5 py-10 md:px-8 md:py-14 lg:px-10">
          <div className="mx-auto flex max-w-[1320px] flex-col gap-6 rounded-md border border-gold/30 bg-[linear-gradient(135deg,rgba(214,168,79,0.16),rgba(13,24,40,0.88))] p-6 shadow-gold md:flex-row md:items-center md:justify-between md:p-8">
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.22em] text-gold">Free Diagnostic Audit</p>
              <h2 className="mt-3 max-w-3xl text-2xl font-semibold leading-tight md:text-4xl">{bottomCtaHeadline}</h2>
              <p className="mt-3 max-w-2xl text-base leading-7 text-slate-300">
                Start with the audit form or message us first if you want to clarify your situation.
              </p>
            </div>
            <div className="flex flex-col gap-3 sm:flex-row">
              <a className="rounded-md bg-[linear-gradient(90deg,#d6a84f,#f3d58a)] px-6 py-4 text-center font-semibold text-ink shadow-gold transition hover:brightness-110" href="#audit-form">
                Start My Free Audit
              </a>
              <WhatsAppLink
                className="rounded-md border border-gold/40 px-6 py-4 text-center font-semibold text-gold transition hover:border-gold hover:bg-gold/10"
                label="Ask on WhatsApp"
                source={`${funnel.slug}-final-cta`}
              />
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
