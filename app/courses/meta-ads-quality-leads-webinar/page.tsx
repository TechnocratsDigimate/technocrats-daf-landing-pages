import { getCourseBySlug } from "@/lib/courses";
import { CoursePageTemplate } from "../CoursePageTemplate";

export const metadata = {
  title: "Why Your Meta Ads Get Clicks But Zero Quality Leads | Technocrats Digital",
  description: "Live 2-hour webinar with Gautam Punj — diagnose your exact leakage point. Only ₹99.",
};

export default function Page() {
  const course = getCourseBySlug("meta-ads-quality-leads-webinar")!;
  return <CoursePageTemplate course={course} />;
}
