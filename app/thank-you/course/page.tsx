import Link from "next/link";
import { BrandHeader } from "@/components/BrandHeader";
import { Footer } from "@/components/Footer";
import { getCourseBySlug } from "@/lib/courses";

export const metadata = {
  title: "Payment Successful | Technocrats Digital",
};

export default function ThankYouCoursePage({
  searchParams,
}: {
  searchParams: { slug?: string; name?: string };
}) {
  const course = searchParams.slug ? getCourseBySlug(searchParams.slug) : undefined;
  const name = searchParams.name ?? "there";

  const message = course?.thankYouMessage ??
    "Your purchase is confirmed! You'll receive access details on WhatsApp within 2 hours.";

  return (
    <>
    <BrandHeader />
    <main className="flex min-h-screen flex-col items-center justify-center bg-navy px-6 py-20 text-center text-white">
      <div className="mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-emerald-500/10 text-4xl">
        ✓
      </div>

      <p className="mb-2 text-sm font-semibold uppercase tracking-widest text-gold">Payment Confirmed</p>
      <h1 className="mb-4 text-3xl font-extrabold text-white md:text-4xl">
        Welcome, {name}!
      </h1>

      {course && (
        <p className="mb-4 text-lg font-semibold text-gold">{course.title}</p>
      )}

      <p className="mx-auto mb-8 max-w-lg text-slate-300">{message}</p>

      <a
        href="https://wa.me/919467744000"
        target="_blank"
        rel="noreferrer"
        className="inline-flex items-center gap-2 rounded-xl bg-emerald-600 px-8 py-4 font-bold text-white transition hover:bg-emerald-500"
      >
        Open WhatsApp
      </a>

      <Link
        href="/courses"
        className="mt-5 text-sm text-slate-500 underline underline-offset-2 hover:text-slate-300"
      >
        Browse other programs
      </Link>
    </main>
    <Footer />
    </>
  );
}
