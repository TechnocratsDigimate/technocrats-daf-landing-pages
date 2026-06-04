import type { Metadata } from "next";
import { FunnelPage } from "@/components/FunnelPage";
import { realEstateFunnel } from "@/lib/funnel-data";

export const metadata: Metadata = {
  title: "Free Real Estate Growth Audit | Technocrats Digimate",
  description:
    "Diagnose why your real estate Meta and Google Ads are not generating serious buyers, site visits, and conversions."
};

export default function RealEstateGrowthAuditPage() {
  return <FunnelPage funnel={realEstateFunnel} />;
}
