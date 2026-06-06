import Link from "next/link";
import { SectionWrapper } from "@/components/ui/SectionWrapper";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { Badge } from "@/components/ui/Badge";

const industries = [
  "Real Estate",
  "Study Abroad",
  "Education",
  "Clinics & Healthcare",
  "High-Ticket Services"
];

const nicheAuditCards = [
  {
    title: "Real Estate Growth Audit",
    body: "Running ads for a real estate project? Get a free audit of your campaign, landing page, lead quality, and WhatsApp follow-up.",
    cta: "Start Real Estate Growth Audit",
    href: "/real-estate-growth-audit"
  },
  {
    title: "Study Abroad Growth Audit",
    body: "Running ads for a consultancy? Get a free audit of your campaign, student lead quality, counsellor follow-up, and CRM.",
    cta: "Start Study Abroad Growth Audit",
    href: "/study-abroad-growth-audit"
  }
];

export function IndustriesSection() {
  return (
    <SectionWrapper bg="navy" id="industries">
      <SectionHeader
        eyebrow="Industries We Serve"
        headline="Built for Industries Where Lead Quality Decides Revenue"
        subheadline="We specialise in businesses where one converted lead justifies months of ad spend."
      />

      {/* Industry pills */}
      <div className="mt-8 flex flex-wrap gap-2">
        {industries.map((industry) => (
          <span
            key={industry}
            className="cursor-default rounded-full border border-white/15 bg-white/[0.04] px-4 py-2 text-sm text-slate-300 transition-all duration-200 hover:border-gold/30 hover:text-gold"
          >
            {industry}
          </span>
        ))}
      </div>

      {/* Divider */}
      <div className="my-10 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />

      {/* Niche audit cards */}
      <div className="grid gap-5 md:grid-cols-2">
        {nicheAuditCards.map((card) => (
          <div
            key={card.title}
            className="group rounded-2xl border border-white/10 bg-panel p-8 transition-all duration-300 hover:-translate-y-1 hover:border-gold/30 hover:shadow-gold"
          >
            <div className="flex items-start justify-between gap-3">
              <h3 className="text-xl font-semibold text-white">{card.title}</h3>
              <Badge label="Niche Audit Available" variant="gold" />
            </div>
            <p className="mt-4 leading-7 text-slate-400">{card.body}</p>
            <Link
              href={card.href}
              className="mt-6 inline-flex items-center gap-2 font-semibold text-gold transition-all duration-200 hover:text-gold-soft"
            >
              {card.cta}
              <span className="transition-transform duration-200 group-hover:translate-x-1">→</span>
            </Link>
          </div>
        ))}
      </div>
    </SectionWrapper>
  );
}
