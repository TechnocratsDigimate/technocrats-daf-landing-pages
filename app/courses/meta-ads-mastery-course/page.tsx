import { getCourseBySlug } from "@/lib/courses";
import { CoursePageTemplate } from "../CoursePageTemplate";

export const metadata = {
  title: "Meta Ads Mastery for Indian Service Businesses | Technocrats Digital",
  description: "Complete A-to-Z Meta Ads course built for Indian service businesses. ₹4,999.",
};

export default function Page() {
  const course = getCourseBySlug("meta-ads-mastery-course")!;
  return <CoursePageTemplate course={course} />;
}
