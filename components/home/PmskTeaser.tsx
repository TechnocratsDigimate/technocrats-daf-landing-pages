import Link from "next/link";
import { SectionWrapper } from "@/components/ui/SectionWrapper";

export function PmskTeaser() {
  return (
    <SectionWrapper bg="deep" glow glowColor="blue" id="resources">
      {/* Sub-brand label */}
      <p className="text-xs font-semibold uppercase tracking-[0.22em] text-slate-500">
        From the Education Arm of Technocrats Digimate
      </p>

      <div className="mt-8 grid gap-12 lg:grid-cols-2 lg:items-center lg:gap-16">

        {/* Left: Copy */}
        <div>
          <h2 className="text-3xl font-semibold leading-tight text-white md:text-4xl">
            Performance Marketing{" "}
            <span className="bg-gradient-to-r from-blue-400 to-blue-300 bg-clip-text text-transparent">
              Survival Kit
            </span>
          </h2>
          <p className="mt-3 text-lg font-medium text-slate-400">
            Ads Manager is easy. The job isn&apos;t. We train for the hard part.
          </p>
          <p className="mt-4 leading-8 text-slate-400">
            Free guides, playbooks, and workshops for students, job seekers, and freelancers who want to think like paid media operators — not button-pushers.
          </p>

          {/* Free resource callout */}
          <div className="mt-6 rounded-xl border border-blue-500/20 bg-blue-500/[0.07] px-5 py-4">
            <p className="text-xs font-semibold uppercase tracking-[0.15em] text-blue-400">
              Free Resource
            </p>
            <p className="mt-1 font-semibold text-white">
              15 Paid Ads Interview Questions That Expose Fake Experts
            </p>
            <p className="mt-1 text-sm text-slate-400">A diagnostic toolkit — not a tutorial.</p>
          </div>

          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <Link
              href="/performance-marketing-survival-kit"
              className="rounded-md bg-blue-600 px-5 py-3 text-center font-semibold text-white transition-all duration-200 hover:bg-blue-500 hover:shadow-[0_0_20px_rgba(37,99,235,0.35)]"
            >
              Download Free Kit →
            </Link>
            <Link
              href="/performance-marketing-survival-kit"
              className="rounded-md border border-blue-500/30 px-5 py-3 text-center font-semibold text-blue-400 transition-all duration-200 hover:border-blue-500 hover:bg-blue-500/10"
            >
              See What&apos;s Inside
            </Link>
          </div>
        </div>

        {/* Right: Ebook Cover Mockup */}
        {/* TODO: Replace with actual ebook cover image at /assets/pmsk/cover.png when available */}
        <div className="flex justify-center lg:justify-end">
          <div className="relative w-52 rotate-3 transition-transform duration-500 hover:rotate-0">
            {/* Book cover card */}
            <div className="relative rounded-2xl border border-blue-500/25 bg-gradient-to-br from-panel to-[#0a1929] p-8 shadow-[0_18px_60px_rgba(37,99,235,0.15)]">
              {/* FREE badge */}
              <span className="absolute right-4 top-4 rounded-full bg-gold px-2 py-0.5 text-xs font-bold text-ink">
                FREE
              </span>

              <p className="text-xs font-semibold uppercase tracking-[0.25em] text-blue-400">
                Performance Marketing
              </p>
              <p className="mt-2 text-3xl font-bold leading-tight text-white">
                Survival<br />Kit
              </p>

              {/* Gold divider */}
              <div className="my-5 h-px bg-gradient-to-r from-gold via-gold/50 to-transparent" />

              <p className="text-sm leading-6 text-slate-400">
                15 Paid Ads Interview Questions That Expose Fake Experts
              </p>

              <div className="mt-6 rounded-lg border border-blue-500/20 bg-blue-500/10 px-3 py-2 text-center">
                <p className="text-xs font-semibold text-blue-400">Technocrats Digimate</p>
              </div>
            </div>

            {/* Book spine shadow effect */}
            <div className="absolute -bottom-3 left-3 right-3 h-4 rounded-b-2xl bg-black/40 blur-md" />
          </div>
        </div>

      </div>
    </SectionWrapper>
  );
}
