import { getCourseBySlug } from "@/lib/courses";
import { CoursePageTemplate } from "../CoursePageTemplate";

export const metadata = {
  title: "Performance Marketing Implementation Program | Technocrats Digital",
  description: "Done-with-you 4-week program. Gautam builds your entire ads system alongside you. ₹24,999.",
};

export default function Page() {
  const course = getCourseBySlug("performance-marketing-implementation-program")!;
  return <CoursePageTemplate course={course} />;
}
