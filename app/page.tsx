import type { Metadata } from "next";
import { BrandHeader } from "@/components/BrandHeader";
import { Footer } from "@/components/Footer";
import { HomepageV2 } from "@/components/home/HomepageV2";

export const metadata: Metadata = {
  title: "Performance Marketing Agency India — Predictable Lead Generation | Technocrats Digimate",
  description:
    "Technocrats Digimate builds predictable lead-generation systems using Meta Ads, Google Ads, landing pages, tracking, WhatsApp follow-up, CRM visibility, and reporting.",
  alternates: {
    canonical: "https://technocratsdigimate.com/"
  },
  openGraph: {
    title: "Performance Marketing Agency India — Predictable Lead Generation | Technocrats Digimate",
    description:
      "Technocrats Digimate builds predictable lead-generation systems using Meta Ads, Google Ads, landing pages, tracking, WhatsApp follow-up, CRM visibility, and reporting.",
    url: "https://technocratsdigimate.com/",
    siteName: "Technocrats Digimate",
    type: "website"
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
      url: "https://technocratsdigimate.com"
    },
    {
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
    }
  ];

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <BrandHeader />
      <HomepageV2 />
      <Footer />
    </>
  );
}
