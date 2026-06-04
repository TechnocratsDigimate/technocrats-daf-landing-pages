import type { Metadata } from "next";
import { FunnelPage } from "@/components/FunnelPage";
import { studyAbroadFunnel } from "@/lib/funnel-data";

export const metadata: Metadata = {
  title: "Free Study Abroad Growth Audit | Technocrats Digimate",
  description:
    "Diagnose why your study abroad or immigration ads are not generating qualified student enquiries and counselling appointments."
};

export default function StudyAbroadGrowthAuditPage() {
  return <FunnelPage funnel={studyAbroadFunnel} />;
}
