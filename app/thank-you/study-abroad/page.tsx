import { redirect } from "next/navigation";

export default function StudyAbroadThankyou({
  searchParams,
}: {
  searchParams: Record<string, string>;
}) {
  const name = searchParams.name ? `&name=${encodeURIComponent(searchParams.name)}` : "";
  redirect(`/thank-you?niche=Study+Abroad${name}`);
}
