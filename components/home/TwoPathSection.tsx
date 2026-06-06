import Link from "next/link";
import { SectionWrapper } from "@/components/ui/SectionWrapper";
import { SectionHeader } from "@/components/ui/SectionHeader";

export function TwoPathSection() {
  return (
    <SectionWrapper bg="navy">
      <SectionHeader
        eyebrow="Choose Your Path"
        headline="Who Are You Here For?"
        align="center"
      />

      <div className="mt-12 grid gap-6 md:grid-cols-2">

        {/* Card A — Business owners */}
        <div className="group rounded-2xl border border-l-4 border-white/10 border-l-gold bg-white/[0.03] p-8 backdrop-blur-sm transition-all duration-300 hover:-translate-y-1 hover:border-gold/40 hover:shadow-gold">
          <div className="inline-flex h-11 w-11 items-center justify-center rounded-xl border border-gold/20 bg-gold/10">
            <svg className="h-5 w-5 text-gold" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-2 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
            </svg>
          </div>
          <h3 className="mt-5 text-xl font-semibold text-white">Grow My Business</h3>
          <p className="mt-3 leading-7 text-slate-400">
            You&apos;re spending on ads. Leads come in. They don&apos;t convert. Your agency shows a cheap CPL report and calls it a win. We audit the whole system — not just the campaign.
          </p>
          <div className="mt-5 h-px w-0 bg-gradient-to-r from-gold to-transparent transition-all duration-500 group-hover:w-full" />
          <Link
            href="/free-growth-audit"
            className="mt-6 inline-flex items-center gap-2 rounded-md bg-gold px-5 py-3 font-semibold text-ink transition-all duration-200 hover:bg-gold-soft hover:shadow-[0_0_20px_rgba(214,168,79,0.35)]"
          >
            Book Free Growth Audit
            <span className="transition-transform duration-200 group-hover:translate-x-1">→</span>
          </Link>
        </div>

        {/* Card B — Learners / PMSK */}
        <div className="group rounded-2xl border border-l-4 border-white/10 border-l-blue-500 bg-white/[0.03] p-8 backdrop-blur-sm transition-all duration-300 hover:-translate-y-1 hover:border-blue-500/40 hover:shadow-[0_18px_60px_rgba(59,130,246,0.12)]">
          <div className="inline-flex h-11 w-11 items-center justify-center rounded-xl border border-blue-500/20 bg-blue-500/10">
            <svg className="h-5 w-5 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 14l9-5-9-5-9 5 9 5z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 14l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z" />
            </svg>
          </div>
          <h3 className="mt-5 text-xl font-semibold text-white">Learn Performance Marketing</h3>
          <p className="mt-3 leading-7 text-slate-400">
            You know how to launch a campaign. You freeze when it breaks. The Performance Marketing Survival Kit trains for the hard 80% tutorials skip — diagnosis, attribution, and interview prep.
          </p>
          <div className="mt-5 h-px w-0 bg-gradient-to-r from-blue-500 to-transparent transition-all duration-500 group-hover:w-full" />
          <Link
            href="/performance-marketing-survival-kit"
            className="mt-6 inline-flex items-center gap-2 rounded-md border border-blue-500/40 px-5 py-3 font-semibold text-blue-400 transition-all duration-200 hover:border-blue-500 hover:bg-blue-500/10"
          >
            Get the Free Survival Kit
            <span className="transition-transform duration-200 group-hover:translate-x-1">→</span>
          </Link>
        </div>

      </div>
    </SectionWrapper>
  );
}
