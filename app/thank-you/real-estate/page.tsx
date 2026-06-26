import { redirect } from "next/navigation";

export default function RealEstateThankyou({
  searchParams,
}: {
  searchParams: Record<string, string>;
}) {
  const name = searchParams.name ? `&name=${encodeURIComponent(searchParams.name)}` : "";
  redirect(`/thank-you?niche=Real+Estate${name}`);
}
