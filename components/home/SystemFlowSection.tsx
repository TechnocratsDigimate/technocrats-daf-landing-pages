import Link from "next/link";
import { SectionWrapper } from "@/components/ui/SectionWrapper";
import { SectionHeader } from "@/components/ui/SectionHeader";

const systemSteps = [
  {
    num: "01",
    label: "Traffic",
    desc: "Meta + Google Ads",
    icon: "/assets/brand/meta-ads.svg.svg",
    iconAlt: "Traffic"
  },
  {
    num: "02",
    label: "Landing Page",
    desc: "Conversion-optimised",
    icon: null,
    iconAlt: "Landing Page"
  },
  {
    num: "03",
    label: "Form",
    desc: "Intent filter",
    icon: null,
    iconAlt: "Form"
  },
  {
    num: "04",
    label: "Tracking",
    desc: "Pixel + CAPI + GA4",
    icon: "/assets/brand/reporting.svg.svg",
    iconAlt: "Tracking"
  },
  {
    num: "05",
    label: "WhatsApp",
    desc: "Speed to lead",
    icon: "/assets/brand/whatsapp.svg.svg",
    iconAlt: "WhatsApp"
  },
  {
    num: "06",
    label: "CRM",
    desc: "Pipeline visibility",
    icon: "/assets/brand/icon crm.svg.svg",
    iconAlt: "CRM"
  },
  {
    num: "07",
    label: "Reporting",
    desc: "What to scale",
    icon: null,
    iconAlt: "Reporting"
  }
];

function StepIcon({ icon, iconAlt }: { icon: string | null; iconAlt: string }) {
  if (icon) {
    return (
      /* eslint-disable-next-line @next/next/no-img-element */
      <img src={icon} alt={iconAlt} className="h-7 w-7 object-contain opacity-75" />
    );
  }
  // Generic layout/system icon for steps without a brand SVG
  return (
    <svg className="h-7 w-7 text-gold/50" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <rect x="3" y="3" width="18" height="18" rx="2" strokeWidth={1.5} />
      <path d="M3 9h18M9 21V9" strokeWidth={1.5} strokeLinecap="round" />
    </svg>
  );
}

export function SystemFlowSection() {
  return (
    <SectionWrapper bg="navy" glow glowColor="gold">
      <SectionHeader
        eyebrow="The Growth System"
        headline="One Connected System. From Click to Closed Sale."
        highlight="One Connected System."
        subheadline="We don't manage ads in isolation. We build and connect every part of the lead generation machine."
        align="center"
      />

      {/* Steps grid */}
      <div className="relative mt-12">
        {/* Background connector line — desktop only */}
        <div className="absolute left-8 right-8 top-8 hidden h-px bg-gradient-to-r from-transparent via-gold/20 to-transparent lg:block" />

        <div className="grid grid-cols-2 gap-4 sm:grid-cols-4 lg:grid-cols-7">
          {systemSteps.map((step) => (
            <div
              key={step.num}
              className="group flex flex-col items-center rounded-xl border border-white/10 bg-panel p-4 text-center transition-all duration-200 hover:-translate-y-1 hover:border-gold/30 hover:bg-gold/[0.04]"
            >
              {/* Step number badge */}
              <div className="relative z-10 mb-3 flex h-7 w-7 items-center justify-center rounded-full bg-gold text-xs font-bold text-ink">
                {step.num}
              </div>
              {/* Icon */}
              <div className="mb-3 flex h-8 w-8 items-center justify-center">
                <StepIcon icon={step.icon} iconAlt={step.iconAlt} />
              </div>
              <p className="text-xs font-semibold leading-tight text-white">{step.label}</p>
              <p className="mt-1 text-xs leading-tight text-slate-500">{step.desc}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Caption */}
      <p className="mx-auto mt-10 max-w-2xl text-center leading-7 text-slate-400">
        Every step leaks leads when it&apos;s not connected to the next one. We audit what you have, rebuild what&apos;s broken, and build what&apos;s missing.
      </p>

      {/* CTA */}
      <div className="mt-8 flex justify-center">
        <Link
          href="/free-growth-audit"
          className="rounded-md bg-gold px-6 py-3 font-semibold text-ink transition-all duration-200 hover:bg-gold-soft hover:shadow-[0_0_20px_rgba(214,168,79,0.35)]"
        >
          Book Your Free System Audit
        </Link>
      </div>
    </SectionWrapper>
  );
}
