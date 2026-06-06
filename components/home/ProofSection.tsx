import Link from "next/link";
import { SectionWrapper } from "@/components/ui/SectionWrapper";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { MetricCard } from "@/components/ui/MetricCard";

// TODO: Replace all three stat blocks with verified, approved data before publishing
const proofStats = [
  {
    stat: "−38%",
    label: "CPL Reduction — Real Estate Campaign",
    sublabel: "After tracking fix and landing page rebuild. Source: campaign data."
  },
  {
    stat: "+40%",
    label: "Booked Calls — Study Abroad Client",
    sublabel: "After WhatsApp automation setup. Source: CRM records."
  },
  {
    stat: "₹680",
    label: "CPA After Meta Ads Rebuild",
    sublabel: "Down from ₹1,200. Source: verified ads account."
  }
];

export function ProofSection() {
  return (
    <SectionWrapper bg="ink" grid>
      <SectionHeader
        eyebrow="Results"
        headline="Results That Justify the System"
        subheadline="Anonymised until written permission is received — but real numbers from live campaigns."
      />

      <div className="mt-10 grid grid-cols-1 gap-5 sm:grid-cols-3">
        {proofStats.map((item) => (
          <MetricCard
            key={item.label}
            stat={item.stat}
            label={item.label}
            sublabel={item.sublabel}
            showBars
          />
        ))}
      </div>

      <div className="mt-8 rounded-xl border border-white/10 bg-white/[0.02] px-6 py-4 text-center">
        <p className="text-sm text-slate-500">
          Numbers are from real client campaigns. They will be replaced with fully named case studies as written permission is obtained.
        </p>
      </div>

      <div className="mt-6 text-center">
        <Link
          href="/case-studies"
          className="inline-flex items-center gap-1 text-sm font-semibold text-gold transition-colors duration-200 hover:text-gold-soft"
        >
          View Case Studies →
        </Link>
        {/* /case-studies does not exist yet — will 404 until built */}
      </div>
    </SectionWrapper>
  );
}
