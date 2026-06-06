import type { Metadata } from "next";
import { FunnelPage } from "@/components/FunnelPage";
import { studyAbroadFunnel } from "@/lib/funnel-data";

export const metadata: Metadata = {
  title: "Study Abroad Lead Generation Audit | Technocrats Digimate",
  description:
    "Get a free study abroad growth audit for student lead generation campaigns, landing pages, tracking, counsellor follow-up, and CRM visibility.",
  alternates: {
    canonical: "https://technocratsdigimate.com/study-abroad-growth-audit"
  },
  openGraph: {
    title: "Study Abroad Lead Generation Audit | Technocrats Digimate",
    description:
      "Get a free study abroad growth audit for student lead generation campaigns, landing pages, tracking, counsellor follow-up, and CRM visibility.",
    url: "https://technocratsdigimate.com/study-abroad-growth-audit",
    siteName: "Technocrats Digimate",
    type: "website"
  }
};

export default function StudyAbroadGrowthAuditPage() {
  return <FunnelPage funnel={studyAbroadFunnel} />;
}
