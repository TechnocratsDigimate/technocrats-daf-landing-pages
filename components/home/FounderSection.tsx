import Link from "next/link";
import { SectionWrapper } from "@/components/ui/SectionWrapper";

export function FounderSection() {
  return (
    <SectionWrapper bg="navy">
      <div className="grid gap-12 lg:grid-cols-2 lg:items-center lg:gap-16">

        {/* Founder image with gold frame */}
        <div className="mx-auto w-full max-w-sm lg:max-w-none">
          <div className="relative overflow-hidden rounded-2xl border-2 border-gold/25">
            {/* Gold corner brackets */}
            <div className="absolute left-3 top-3 z-10 h-12 w-12 rounded-tl-lg border-l-2 border-t-2 border-gold" />
            <div className="absolute bottom-3 right-3 z-10 h-12 w-12 rounded-br-lg border-b-2 border-r-2 border-gold" />

            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/assets/brand/founder.jpeg"
              alt="Gautam Punj — Founder, Technocrats Digimate"
              className="aspect-[4/5] w-full object-cover"
            />

            {/* Bottom gradient overlay */}
            <div className="absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-navy/80 to-transparent" />
          </div>
        </div>

        {/* Copy */}
        <div>
          <span className="inline-flex items-center rounded-full border border-gold/30 bg-gold/10 px-3 py-1 text-xs font-semibold uppercase tracking-[0.18em] text-gold">
            Founder &amp; Lead Strategist
          </span>

          <h2 className="mt-4 text-3xl font-semibold text-white md:text-4xl">
            Your Growth System Reviewed by Gautam Punj
          </h2>

          {/* Credential badge */}
          <div className="mt-4 inline-flex rounded-full border border-gold/25 bg-gold/10 px-4 py-2 text-sm text-gold">
            Meta Ads · Google Ads · Funnel Architecture
          </div>

          <p className="mt-5 leading-8 text-slate-400">
            Gautam Punj leads Technocrats Digimate and works hands-on across performance marketing for real estate, study abroad, and high-ticket service businesses. He has managed live ad spend across Meta and Google, built tracking stacks, and audited funnels where the lead-to-sale gap was the actual problem. Every audit is done personally.
          </p>

          {/* Feature list */}
          <ul className="mt-6 space-y-3">
            {[
              "No junior handoff — you speak to the person who built the system",
              "Diagnosis-first — problems found before any sales conversation",
              "Specialist — not a generalist agency"
            ].map((item) => (
              <li key={item} className="flex items-start gap-3 text-sm text-slate-300">
                <span className="mt-1 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-gold" />
                {item}
              </li>
            ))}
          </ul>

          <div className="mt-8">
            <Link
              href="/free-growth-audit"
              className="inline-block rounded-md bg-gold px-5 py-3 font-semibold text-ink transition-all duration-200 hover:bg-gold-soft hover:shadow-[0_0_20px_rgba(214,168,79,0.35)]"
            >
              Book Your Audit with Gautam →
            </Link>
          </div>
        </div>

      </div>
    </SectionWrapper>
  );
}
