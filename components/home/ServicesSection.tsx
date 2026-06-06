import Link from "next/link";
import { SectionWrapper } from "@/components/ui/SectionWrapper";
import { SectionHeader } from "@/components/ui/SectionHeader";

const services = [
  {
    title: "Meta Ads Management",
    desc: "Campaign strategy, CAPI setup, and optimisation for Facebook and Instagram.",
    icon: "/assets/brand/meta-ads.svg.svg",
    iconAlt: "Meta Ads"
  },
  {
    title: "Google Ads Management",
    desc: "Search and PMax management with proper keyword structure and conversion tracking.",
    icon: "/assets/brand/google-ads.svg.svg",
    iconAlt: "Google Ads"
  },
  {
    title: "Landing Page Design",
    desc: "Conversion-optimised pages matched to your specific campaign and audience.",
    icon: null,
    iconAlt: "Landing Page"
  },
  {
    title: "Tracking & Analytics Setup",
    desc: "Meta Pixel + CAPI, GA4, and GTM — built so your numbers tell the truth.",
    icon: "/assets/brand/reporting.svg.svg",
    iconAlt: "Tracking"
  },
  {
    title: "WhatsApp Automation",
    desc: "Speed-to-lead automation that responds in minutes, not hours.",
    icon: "/assets/brand/whatsapp.svg.svg",
    iconAlt: "WhatsApp"
  },
  {
    title: "Funnel Audit & Consulting",
    desc: "A 60-minute diagnostic of where your ad spend is leaking.",
    icon: "/assets/brand/icon crm.svg.svg",
    iconAlt: "Audit"
  }
];

function ServiceIcon({ icon, iconAlt }: { icon: string | null; iconAlt: string }) {
  if (icon) {
    return (
      /* eslint-disable-next-line @next/next/no-img-element */
      <img src={icon} alt={iconAlt} className="h-6 w-6 object-contain opacity-80" />
    );
  }
  return (
    <svg className="h-6 w-6 text-gold/70" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 5a1 1 0 011-1h14a1 1 0 011 1v2a1 1 0 01-1 1H5a1 1 0 01-1-1V5zM4 13a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H5a1 1 0 01-1-1v-6zM16 13a1 1 0 011-1h2a1 1 0 011 1v6a1 1 0 01-1 1h-2a1 1 0 01-1-1v-6z" />
    </svg>
  );
}

export function ServicesSection() {
  return (
    <SectionWrapper bg="ink" id="services">
      <SectionHeader
        eyebrow="What We Build"
        headline="What We Build For You"
        subheadline="Six interconnected capabilities — each one a lever in the same lead generation system."
      />

      <div className="mt-10 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {services.map((service) => (
          <div
            key={service.title}
            className="group rounded-2xl border border-white/10 bg-white/[0.03] p-6 backdrop-blur-sm transition-all duration-300 hover:-translate-y-1 hover:border-gold/25 hover:shadow-gold"
          >
            {/* Icon container */}
            <div className="inline-flex h-10 w-10 items-center justify-center rounded-lg border border-gold/20 bg-gold/10">
              <ServiceIcon icon={service.icon} iconAlt={service.iconAlt} />
            </div>

            <h3 className="mt-5 font-semibold text-white">{service.title}</h3>
            <p className="mt-2 text-sm leading-6 text-slate-400">{service.desc}</p>

            {/* Sliding gold underline on hover */}
            <div className="mt-5 h-px w-0 bg-gradient-to-r from-gold to-transparent transition-all duration-500 group-hover:w-full" />
          </div>
        ))}
      </div>

      <div className="mt-10 text-center">
        <Link
          href="/free-growth-audit"
          className="inline-flex items-center gap-1 text-sm font-semibold text-gold transition-colors duration-200 hover:text-gold-soft"
        >
          Need one of these? Book a free audit →
        </Link>
      </div>
    </SectionWrapper>
  );
}
