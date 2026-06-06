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

        {/* Right: Real Ebook Cover */}
        <div className="flex justify-center lg:justify-end">
          <div className="w-full max-w-[220px] lg:max-w-[260px]">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/assets/pmsk/cover.png"
              alt="Performance Marketing Survival Kit — Free Guide by Technocrats Digimate"
              className="w-full rotate-3 rounded-2xl shadow-[0_24px_64px_rgba(37,99,235,0.2)] transition-transform duration-500 hover:rotate-0"
            />
          </div>
        </div>

      </div>
    </SectionWrapper>
  );
}
