import type { Metadata } from "next";
import { BrandHeader } from "@/components/BrandHeader";
import { Footer } from "@/components/Footer";
import { HeroSection } from "@/components/home/HeroSection";
import { TwoPathSection } from "@/components/home/TwoPathSection";
import { ProblemSection } from "@/components/home/ProblemSection";
import { SystemFlowSection } from "@/components/home/SystemFlowSection";
import { ServicesSection } from "@/components/home/ServicesSection";
import { IndustriesSection } from "@/components/home/IndustriesSection";
import { ProofSection } from "@/components/home/ProofSection";
import { PmskTeaser } from "@/components/home/PmskTeaser";
import { ResourcesStrip } from "@/components/home/ResourcesStrip";
import { AuditCtaSection } from "@/components/home/AuditCtaSection";
import { FounderSection } from "@/components/home/FounderSection";
import { FaqAccordion } from "@/components/home/FaqAccordion";
import { FooterCtaSection } from "@/components/home/FooterCtaSection";

export const metadata: Metadata = {
  title: "Performance Marketing & Lead Generation Agency | Technocrats Digimate",
  description:
    "Technocrats Digimate builds predictable lead-generation systems using Meta Ads, Google Ads, landing pages, tracking, WhatsApp follow-up, CRM visibility, and reporting.",
  alternates: {
    canonical: "https://technocratsdigimate.com/"
  },
  openGraph: {
    title: "Performance Marketing & Lead Generation Agency | Technocrats Digimate",
    description:
      "Technocrats Digimate builds predictable lead-generation systems using Meta Ads, Google Ads, landing pages, tracking, WhatsApp follow-up, CRM visibility, and reporting.",
    url: "https://technocratsdigimate.com/",
    siteName: "Technocrats Digimate",
    type: "website"
  }
};

export default function HomePage() {
  const organizationJsonLd = {
    "@context": "https://schema.org",
    "@type": "ProfessionalService",
    name: "Technocrats Digimate Pvt Ltd",
    url: "https://technocratsdigimate.com",
    serviceType: [
      "Performance marketing",
      "Meta Ads management",
      "Google Ads management",
      "Lead generation",
      "Conversion tracking",
      "Landing page strategy",
      "Funnel audit",
      "WhatsApp follow-up systems"
    ],
    areaServed: [
      "India",
      "Chandigarh",
      "Mohali",
      "Panchkula",
      "Ambala",
      "Gurgaon",
      "Dubai",
      "UAE"
    ]
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationJsonLd) }}
      />
      <BrandHeader />
      <HeroSection />
      <TwoPathSection />
      <ProblemSection />
      <SystemFlowSection />
      <ServicesSection />
      <IndustriesSection />
      <ProofSection />
      <PmskTeaser />
      <ResourcesStrip />
      <AuditCtaSection />
      <FounderSection />
      <FaqAccordion />
      <FooterCtaSection />
      <Footer />
    </>
  );
}
