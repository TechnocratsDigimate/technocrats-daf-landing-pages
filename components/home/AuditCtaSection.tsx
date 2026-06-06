"use client";

import Link from "next/link";
import { trackEvent } from "@/lib/tracking";

const trustItems = [
  "Takes less than 2 minutes to apply",
  "Founder-led audit by Gautam Punj",
  "No obligation"
];

export function AuditCtaSection() {
  const whatsappNumber = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER;
  const whatsappHref = whatsappNumber
    ? `https://wa.me/${whatsappNumber.replace(/\D/g, "")}?text=${encodeURIComponent("Hi, I want to ask about the Free Growth Audit.")}`
    : "/free-growth-audit";

  return (
    <section className="relative overflow-hidden border-t border-gold/15 bg-ink py-20 md:py-28">
      {/* Strong radial glow centred at bottom */}
      <div className="absolute inset-0 pointer-events-none bg-[radial-gradient(ellipse_80%_60%_at_50%_100%,rgba(214,168,79,0.12)_0%,transparent_65%)]" />
      <div className="agency-grid absolute inset-0 pointer-events-none opacity-20" />

      <div className="relative mx-auto max-w-[1320px] px-5 text-center md:px-8 lg:px-10">
        <span className="inline-flex items-center rounded-full border border-gold/30 bg-gold/10 px-3 py-1 text-xs font-semibold uppercase tracking-[0.18em] text-gold">
          Free — No Obligation
        </span>

        <h2 className="mx-auto mt-5 max-w-3xl text-4xl font-semibold leading-tight text-white md:text-5xl">
          Ready to See{" "}
          <span className="bg-gradient-to-r from-gold to-gold-soft bg-clip-text text-transparent">
            Where Your Ad Spend Is Leaking?
          </span>
        </h2>

        <p className="mx-auto mt-5 max-w-xl text-lg leading-8 text-slate-300">
          No pitch. No generic advice. We audit your campaign, landing page, tracking, and follow-up — then show you the exact problems before we discuss anything else.
        </p>

        <div className="mt-8 flex flex-col items-center gap-3 sm:flex-row sm:justify-center">
          <Link
            href="/free-growth-audit"
            className="w-full rounded-md bg-gold px-7 py-3.5 text-center font-semibold text-ink transition-all duration-200 hover:bg-gold-soft hover:shadow-[0_0_30px_rgba(214,168,79,0.4)] sm:w-auto"
          >
            Book Free Growth Audit
          </Link>
          <a
            href={whatsappHref}
            rel={whatsappNumber ? "noreferrer" : undefined}
            target={whatsappNumber ? "_blank" : undefined}
            onClick={() => trackEvent("whatsapp_click", { location: "homepage-audit-cta" })}
            className="w-full rounded-md border border-gold/40 px-7 py-3.5 text-center font-semibold text-gold transition-all duration-200 hover:border-gold hover:bg-gold/10 sm:w-auto"
          >
            Ask on WhatsApp
          </a>
        </div>

        {/* Trust strip */}
        <div className="mt-8 flex flex-wrap items-center justify-center gap-x-6 gap-y-2">
          {trustItems.map((item, i) => (
            <span key={item} className="flex items-center gap-2 text-sm text-slate-500">
              {i > 0 && <span className="hidden text-slate-700 sm:inline">·</span>}
              <span className="h-1 w-1 rounded-full bg-gold/50" />
              {item}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
