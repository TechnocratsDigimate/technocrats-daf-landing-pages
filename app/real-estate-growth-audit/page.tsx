import type { Metadata } from "next";
import { FunnelPage } from "@/components/FunnelPage";
import { realEstateFunnel } from "@/lib/funnel-data";

export const metadata: Metadata = {
  title: "Real Estate Lead Generation Audit | Technocrats Digimate",
  description:
    "Get a free real estate growth audit for your ads, landing page, tracking, lead quality, WhatsApp follow-up, and CRM visibility.",
  alternates: {
    canonical: "https://technocratsdigimate.com/real-estate-growth-audit"
  },
  openGraph: {
    title: "Real Estate Lead Generation Audit | Technocrats Digimate",
    description:
      "Get a free real estate growth audit for your ads, landing page, tracking, lead quality, WhatsApp follow-up, and CRM visibility.",
    url: "https://technocratsdigimate.com/real-estate-growth-audit",
    siteName: "Technocrats Digimate",
    type: "website"
  }
};

export default function RealEstateGrowthAuditPage() {
  return <FunnelPage funnel={realEstateFunnel} />;
}
