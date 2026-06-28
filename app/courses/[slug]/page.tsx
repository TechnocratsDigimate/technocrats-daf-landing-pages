import { notFound } from "next/navigation";
import Link from "next/link";
import { getCourseBySlug, COURSES } from "@/lib/courses";
import { RazorpayCheckout } from "./RazorpayCheckout";

export function generateStaticParams() {
  return COURSES.map((c) => ({ slug: c.slug }));
}

export function generateMetadata({ params }: { params: { slug: string } }) {
  const course = getCourseBySlug(params.slug);
  if (!course) return {};
  return {
    title: `${course.title} | Technocrats Digital`,
    description: course.description,
  };
}

export default function CoursePage({ params }: { params: { slug: string } }) {
  const course = getCourseBySlug(params.slug);
  if (!course) notFound();

  const discount = Math.round(((course.originalPrice - course.price) / course.originalPrice) * 100);

  return (
    <main className="min-h-screen bg-navy text-white">
      {/* Breadcrumb */}
      <div className="mx-auto max-w-5xl px-6 pt-8">
        <Link href="/courses" className="text-sm text-gold hover:underline">
          ← All Programs
        </Link>
      </div>

      <div className="mx-auto max-w-5xl px-6 py-12">
        <div className="grid gap-12 lg:grid-cols-[1fr_380px]">
          {/* Left — Content */}
          <div>
            {/* Badge + Title */}
            <p className="mb-3 text-sm font-semibold uppercase tracking-widest text-gold">
              {course.badge}
            </p>
            <h1 className="mb-4 text-3xl font-extrabold leading-tight text-white md:text-4xl">
              {course.title}
            </h1>
            <p className="mb-6 text-lg text-slate-300">{course.subtitle}</p>

            {/* Description */}
            <p className="mb-10 text-base leading-relaxed text-slate-400">{course.description}</p>

            {/* Pain Points */}
            <section className="mb-10">
              <h2 className="mb-4 text-xl font-bold text-white">Does this sound familiar?</h2>
              <ul className="space-y-3">
                {course.painPoints.map((p) => (
                  <li key={p} className="flex items-start gap-3 text-slate-300">
                    <span className="mt-0.5 shrink-0 text-red-400">✗</span>
                    {p}
                  </li>
                ))}
              </ul>
            </section>

            {/* What's Included */}
            <section className="mb-10">
              <h2 className="mb-4 text-xl font-bold text-white">What you get</h2>
              <ul className="space-y-2.5">
                {course.includes.map((item) => (
                  <li key={item} className="flex items-start gap-3 text-slate-300">
                    <span className="mt-0.5 shrink-0 text-gold">✓</span>
                    {item}
                  </li>
                ))}
              </ul>
            </section>

            {/* Curriculum */}
            <section className="mb-10">
              <h2 className="mb-5 text-xl font-bold text-white">
                {course.type === "webinar" ? "What we'll cover" : "Curriculum"}
              </h2>
              <div className="space-y-4">
                {course.curriculum.map((mod, i) => (
                  <div key={i} className="rounded-xl border border-white/10 bg-white/[0.03] p-5">
                    <h3 className="mb-3 font-semibold text-gold">{mod.module}</h3>
                    <ul className="space-y-2">
                      {mod.lessons.map((lesson) => (
                        <li key={lesson} className="flex items-start gap-2.5 text-sm text-slate-300">
                          <span className="mt-0.5 shrink-0 text-slate-500">→</span>
                          {lesson}
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </section>

            {/* Who It's For */}
            <section className="mb-10">
              <h2 className="mb-4 text-xl font-bold text-white">This is for you if</h2>
              <ul className="space-y-2.5">
                {course.forWho.map((item) => (
                  <li key={item} className="flex items-start gap-3 text-slate-300">
                    <span className="mt-0.5 shrink-0 text-gold">✓</span>
                    {item}
                  </li>
                ))}
              </ul>
            </section>

            {/* Mobile checkout */}
            <div className="lg:hidden">
              <RazorpayCheckout slug={course.slug} title={course.title} price={course.price} />
            </div>
          </div>

          {/* Right — Sticky Checkout */}
          <aside className="hidden lg:block">
            <div className="sticky top-8">
              {/* Pricing */}
              <div className="mb-4 rounded-2xl border border-white/10 bg-white/[0.03] p-6">
                <div className="mb-1 flex items-baseline gap-3">
                  <span className="text-4xl font-extrabold text-white">
                    ₹{course.price.toLocaleString("en-IN")}
                  </span>
                  <span className="text-lg text-slate-500 line-through">
                    ₹{course.originalPrice.toLocaleString("en-IN")}
                  </span>
                  <span className="rounded-full bg-emerald-500/10 px-2.5 py-0.5 text-xs font-semibold text-emerald-400">
                    {discount}% off
                  </span>
                </div>
                <p className="text-sm text-slate-400">{course.duration}</p>
                <p className="mt-2 text-sm font-medium text-emerald-400">{course.urgency}</p>
              </div>

              <RazorpayCheckout slug={course.slug} title={course.title} price={course.price} />

              <p className="mt-4 text-center text-xs text-slate-500">
                Questions?{" "}
                <a
                  href="https://wa.me/919467744000"
                  target="_blank"
                  rel="noreferrer"
                  className="text-gold underline underline-offset-2"
                >
                  WhatsApp Gautam
                </a>
              </p>
            </div>
          </aside>
        </div>
      </div>
    </main>
  );
}
