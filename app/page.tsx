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
import { AuditCtaSection } from "@/components/home/AuditCtaSection";
import { FounderSection } from "@/components/home/FounderSection";
import { FaqAccordion } from "@/components/home/FaqAccordion";
import { FooterCtaSection } from "@/components/home/FooterCtaSection";

export const metadata: Metadata = {
  title: "Performance Marketing Agency India | Technocrats Digimate",
  description:
    "Technocrats Digimate builds predictable lead generation systems using Meta Ads, Google Ads, landing pages, tracking, and WhatsApp automation. Book your free growth audit."
};

export default function HomePage() {
  return (
    <>
      <BrandHeader />
      <HeroSection />
      <TwoPathSection />
      <ProblemSection />
      <SystemFlowSection />
      <ServicesSection />
      <IndustriesSection />
      <ProofSection />
      <PmskTeaser />
      <AuditCtaSection />
      <FounderSection />
      <FaqAccordion />
      <FooterCtaSection />
      <Footer />
    </>
  );
}
