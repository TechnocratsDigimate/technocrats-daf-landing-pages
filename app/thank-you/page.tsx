import type { Metadata } from "next";
import Link from "next/link";
import { BrandHeader } from "@/components/BrandHeader";
import { Footer } from "@/components/Footer";
import { ThankYouActions } from "@/components/ThankYouActions";
import { ThankYouTracker } from "@/components/ThankYouTracker";

export const metadata: Metadata = {
  title: "Thank You | Technocrats Digimate",
  description: "Your diagnostic audit request has been received."
};

export default async function ThankYouPage({
  searchParams
}: {
  searchParams?: Promise<{ niche?: string; name?: string }>;
}) {
  const resolvedSearchParams = await searchParams;
  const niche = resolvedSearchParams?.niche || "Growth";
  const name = resolvedSearchParams?.name || "";

  return (
    <>
      <ThankYouTracker niche={niche} />
      <BrandHeader />
      <main className="bg-ink px-5 pb-14 pt-28 text-white">
        <div className="mx-auto max-w-7xl">
          <p className="text-sm font-semibold uppercase tracking-[0.22em] text-gold">Request Received</p>
          <h1 className="mt-4 max-w-4xl text-4xl font-semibold leading-tight md:text-6xl">
            Your free {niche} audit request has been submitted.
          </h1>
          <p className="mt-5 max-w-2xl text-lg leading-8 text-slate-300">
            The next step is booking a slot and confirming your preferred call details. Use the calendar area or WhatsApp CTA below.
          </p>
          <ThankYouActions name={name} niche={niche} />
          <Link className="mt-8 inline-block text-sm font-semibold text-gold transition hover:text-gold-soft" href="/">
            Back to funnel routes
          </Link>
        </div>
      </main>
      <Footer />
    </>
  );
}
