"use client";

import Link from "next/link";
import { trackEvent } from "@/lib/tracking";

const funnelSteps = [
  { num: "01", label: "Traffic", sub: "Meta + Google Ads", status: "red" as const, statusText: "High Spend" },
  { num: "02", label: "Landing Page", sub: "Conversion page", status: "yellow" as const, statusText: "Needs Review" },
  { num: "03", label: "Form", sub: "Lead qualification", status: "yellow" as const, statusText: "Low Filter" },
  { num: "04", label: "Tracking", sub: "Pixel + CAPI + GA4", status: "red" as const, statusText: "Misconfigured" },
  { num: "05", label: "WhatsApp", sub: "Speed to lead", status: "red" as const, statusText: "Slow Follow-up" },
  { num: "06", label: "CRM", sub: "Pipeline visibility", status: "yellow" as const, statusText: "No Visibility" },
  { num: "07", label: "Reporting", sub: "Scale decisions", status: "green" as const, statusText: "Running" }
];

const statusDotClass = {
  green: "bg-emerald-400",
  yellow: "bg-amber-400",
  red: "bg-red-400 animate-pulse"
};

const statusTextClass = {
  green: "text-emerald-400",
  yellow: "text-amber-400",
  red: "text-red-400"
};

const trustItems = ["No generic pitch", "Diagnosis first", "SQL over CPL", "Founder-led audit"];

export function HeroSection() {
  const whatsappNumber = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER;
  const whatsappHref = whatsappNumber
    ? `https://wa.me/${whatsappNumber.replace(/\D/g, "")}?text=${encodeURIComponent("Hi, I want to learn more about the Free Growth Audit.")}`
    : "/free-growth-audit";

  return (
    <section className="relative min-h-[90vh] overflow-hidden bg-ink pb-16 pt-28 md:pt-36 md:pb-24">
      {/* Decorative backgrounds */}
      <div className="agency-grid absolute inset-0 pointer-events-none opacity-25" />
      <div className="absolute inset-0 pointer-events-none bg-[radial-gradient(ellipse_70%_60%_at_65%_40%,rgba(214,168,79,0.07)_0%,transparent_65%)]" />

      <div className="relative mx-auto max-w-[1320px] px-5 md:px-8 lg:px-10">
        <div className="grid gap-12 lg:grid-cols-2 lg:items-center lg:gap-16">

          {/* ── Left: Copy ── */}
          <div>
            {/* Eyebrow pill */}
            <div className="inline-flex animate-fade-in items-center gap-2 rounded-full border border-gold/30 bg-gold/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.18em] text-gold">
              <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-gold" />
              Performance Marketing Agency · India
            </div>

            {/* Headline */}
            <h1 className="mt-6 animate-fade-in text-4xl font-semibold leading-tight text-white md:text-5xl lg:text-6xl">
              Your Business Doesn&apos;t Need More Ads.{" "}
              <span className="bg-gradient-to-r from-gold to-gold-soft bg-clip-text text-transparent">
                It Needs a Predictable Lead Generation System.
              </span>
            </h1>

            {/* Subheadline */}
            <p className="mt-6 max-w-xl animate-fade-in text-lg leading-8 text-slate-300">
              Technocrats Digimate connects Meta Ads, Google Ads, landing pages, tracking, WhatsApp automation, and sales follow-up into one system that delivers sales-qualified leads — not vanity CPL.
            </p>

            {/* Primary CTAs */}
            <div className="mt-8 flex animate-fade-in flex-col gap-3 sm:flex-row">
              <Link
                href="/free-growth-audit"
                className="rounded-md bg-gold px-5 py-3 text-center font-semibold text-ink transition-all duration-200 hover:bg-gold-soft hover:shadow-[0_0_20px_rgba(214,168,79,0.35)]"
              >
                Book Free Growth Audit
              </Link>
              <Link
                href="/performance-marketing-survival-kit"
                className="rounded-md border border-gold/40 px-5 py-3 text-center font-semibold text-gold transition-all duration-200 hover:border-gold hover:bg-gold/10"
              >
                Explore Survival Kit
              </Link>
            </div>

            {/* WhatsApp secondary CTA */}
            <div className="mt-4 animate-fade-in">
              <a
                href={whatsappHref}
                rel={whatsappNumber ? "noreferrer" : undefined}
                target={whatsappNumber ? "_blank" : undefined}
                onClick={() => trackEvent("whatsapp_click", { location: "homepage-hero" })}
                className="inline-flex items-center gap-2 text-sm text-slate-400 transition-colors duration-200 hover:text-gold"
              >
                <span className="flex h-4 w-4 items-center justify-center rounded-full bg-emerald-400/20">
                  <span className="h-2 w-2 rounded-full bg-emerald-400" />
                </span>
                Ask on WhatsApp first
              </a>
            </div>

            {/* Trust strip */}
            <div className="mt-6 flex animate-fade-in flex-wrap gap-2">
              {trustItems.map((t) => (
                <span
                  key={t}
                  className="rounded-full border border-white/10 bg-white/[0.04] px-3 py-1 text-xs text-slate-400"
                >
                  {t}
                </span>
              ))}
            </div>
          </div>

          {/* ── Right: Funnel Audit Dashboard Mockup ── */}
          <div className="relative">
            <div className="absolute inset-0 pointer-events-none bg-[radial-gradient(ellipse_80%_60%_at_50%_50%,rgba(214,168,79,0.07)_0%,transparent_70%)]" />
            <div className="relative rounded-2xl border border-white/10 bg-panel/80 p-5 shadow-gold backdrop-blur-sm">

              {/* Card header */}
              <div className="mb-4 flex items-start justify-between gap-3">
                <div>
                  <p className="text-xs font-semibold uppercase tracking-[0.18em] text-gold">
                    Live Funnel Audit Snapshot
                  </p>
                  <p className="mt-0.5 text-xs text-slate-500">Before Technocrats Digimate</p>
                </div>
                <span className="flex-shrink-0 rounded-full border border-red-400/30 bg-red-400/15 px-2 py-0.5 text-xs text-red-400">
                  3 Critical Issues
                </span>
              </div>

              {/* Divider */}
              <div className="mb-4 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />

              {/* Steps */}
              <div className="space-y-0">
                {funnelSteps.map((step, i) => (
                  <div key={step.num}>
                    <div className="flex items-center justify-between rounded-lg border border-white/[0.07] bg-white/[0.04] px-3 py-2.5 transition-colors duration-150 hover:bg-white/[0.07]">
                      <div className="flex items-center gap-3">
                        <span className="w-5 font-mono text-xs text-slate-600">{step.num}</span>
                        <div>
                          <p className="text-sm font-medium leading-none text-white">{step.label}</p>
                          <p className="mt-0.5 text-xs text-slate-500">{step.sub}</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className={`text-xs font-medium ${statusTextClass[step.status]}`}>
                          {step.statusText}
                        </span>
                        <span className={`h-2 w-2 flex-shrink-0 rounded-full ${statusDotClass[step.status]}`} />
                      </div>
                    </div>
                    {i < funnelSteps.length - 1 && (
                      <div className="ml-8 h-3 border-l-2 border-dashed border-white/[0.08]" />
                    )}
                  </div>
                ))}
              </div>

              {/* Card footer */}
              <div className="mt-4 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />
              <p className="mt-3 text-center text-xs text-slate-500">
                Every step leaks leads when it&apos;s not connected to the next one.
              </p>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
