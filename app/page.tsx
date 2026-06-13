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
  },
  twitter: {
    card: "summary_large_image",
    title: "Performance Marketing & Lead Generation Agency | Technocrats Digimate",
    description:
      "Predictable lead-generation systems for real estate & study abroad businesses. Meta Ads, Google Ads, landing pages, tracking, WhatsApp follow-up."
  }
};

export default function HomePage() {
  const jsonLd = [
    {
      "@context": "https://schema.org",
      "@type": "Organization",
      name: "Technocrats Digimate Pvt Ltd",
      url: "https://technocratsdigimate.com",
      logo: "https://technocratsdigimate.com/assets/brand/logo-white.svg",
      sameAs: []
    },
    {
      "@context": "https://schema.org",
      "@type": "WebSite",
      name: "Technocrats Digimate",
      url: "https://technocratsdigimate.com",
      potentialAction: {
        "@type": "SearchAction",
        target: {
          "@type": "EntryPoint",
          urlTemplate: "https://technocratsdigimate.com/?q={search_term_string}"
        },
        "query-input": "required name=search_term_string"
      }
    },
    {
      "@context": "https://schema.org",
      "@type": "LocalBusiness",
      name: "Technocrats Digimate Pvt Ltd",
      url: "https://technocratsdigimate.com",
      logo: "https://technocratsdigimate.com/assets/brand/logo-white.svg",
      image: "https://technocratsdigimate.com/assets/brand/wide-logo.svg",
      description:
        "Performance marketing agency specialising in lead generation for real estate and study abroad businesses using Meta Ads, Google Ads, and conversion tracking.",
      priceRange: "$$",
      address: {
        "@type": "PostalAddress",
        addressLocality: "Chandigarh",
        addressRegion: "Punjab",
        addressCountry: "IN"
      },
      areaServed: [
        "Chandigarh",
        "Mohali",
        "Panchkula",
        "Ambala",
        "Gurgaon",
        "Delhi",
        "India",
        "Dubai",
        "UAE"
      ],
      serviceType: [
        "Performance Marketing",
        "Meta Ads Management",
        "Google Ads Management",
        "Lead Generation",
        "Conversion Tracking",
        "Landing Page Strategy",
        "Funnel Audit",
        "WhatsApp Follow-up Systems",
        "Social Media Marketing"
      ]
    },
    {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      mainEntity: [
        {
          "@type": "Question",
          name: "Is the growth audit really free?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Yes. We audit your ads, landing page, tracking, and follow-up — no charge, no obligation. If we find problems, we'll show you exactly what they are. Whether you work with us after that is your decision."
          }
        },
        {
          "@type": "Question",
          name: "How long does the audit take?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "The application form takes under 2 minutes. The audit call is typically 30–45 minutes. We review your setup before the call so we don't waste your time on basics."
          }
        },
        {
          "@type": "Question",
          name: "Do you only work with real estate and study abroad businesses?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "No — those are two core verticals where we have deep experience. We also work with clinics, education brands, coaching businesses, and other high-ticket service providers."
          }
        },
        {
          "@type": "Question",
          name: "What is the Performance Marketing Survival Kit?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "PMSK is the education arm of Technocrats Digimate. It's a set of free guides, playbooks, and workshops for students, job seekers, and marketers who want to learn how to run and diagnose paid media campaigns — not just launch them."
          }
        },
        {
          "@type": "Question",
          name: "I'm not ready for an agency. What should I do?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Download the free Performance Marketing Survival Kit. It's a starting point — and if you're a business owner who wants to understand your campaign better before hiring, the guide is useful."
          }
        }
      ]
    }
  ];

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
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
