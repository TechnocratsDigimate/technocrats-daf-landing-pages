import Link from "next/link";
import { SectionWrapper } from "@/components/ui/SectionWrapper";

export function FooterCtaSection() {
  return (
    <SectionWrapper bg="panel" className="border-t border-white/10 py-14 md:py-16">
      <div className="mx-auto max-w-xl text-center">
        <h2 className="text-2xl font-semibold text-white md:text-3xl">
          Don&apos;t Leave Without Knowing{" "}
          <span className="bg-gradient-to-r from-gold to-gold-soft bg-clip-text text-transparent">
            Where Your Leads Are Leaking
          </span>
        </h2>
        <p className="mt-4 leading-7 text-slate-400">
          One audit. No pitch. Just clarity on what to fix first.
        </p>
        <div className="mt-7">
          <Link
            href="/free-growth-audit"
            className="inline-block rounded-md bg-gold px-7 py-3.5 font-semibold text-ink transition-all duration-200 hover:bg-gold-soft hover:shadow-[0_0_20px_rgba(214,168,79,0.35)]"
          >
            Book Free Growth Audit
          </Link>
        </div>
      </div>
    </SectionWrapper>
  );
}
