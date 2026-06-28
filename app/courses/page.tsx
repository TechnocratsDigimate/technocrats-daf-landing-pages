import Link from "next/link";
import { BrandHeader } from "@/components/BrandHeader";
import { Footer } from "@/components/Footer";
import { COURSES } from "@/lib/courses";

export const metadata = {
  title: "Courses & Programs | Technocrats Digital",
  description:
    "Learn Meta Ads the right way. Live webinars, self-paced courses, and done-with-you programs for Indian service businesses.",
};

const typeColor: Record<string, string> = {
  webinar: "bg-emerald-500/10 text-emerald-400 border border-emerald-500/20",
  course: "bg-gold/10 text-gold border border-gold/20",
  program: "bg-orange-500/10 text-orange-400 border border-orange-500/20",
  mentorship: "bg-purple-500/10 text-purple-400 border border-purple-500/20",
};

export default function CoursesPage() {
  return (
    <>
    <BrandHeader />
    <main className="min-h-screen bg-navy text-white">
      {/* Hero */}
      <section className="mx-auto max-w-4xl px-6 pb-12 pt-20 text-center">
        <p className="mb-3 text-sm font-semibold uppercase tracking-widest text-gold">
          Learn · Implement · Scale
        </p>
        <h1 className="text-4xl font-extrabold leading-tight text-white md:text-5xl">
          Stop Guessing with Meta Ads.
          <br />
          <span className="text-gold">Start Knowing.</span>
        </h1>
        <p className="mx-auto mt-5 max-w-2xl text-lg text-slate-300">
          Built for Indian service businesses — real estate, clinics, coaching, financial services.
          Every program is based on campaigns Gautam runs for clients spending ₹50,000–₹5,00,000/month.
        </p>
      </section>

      {/* Cards */}
      <section className="mx-auto max-w-5xl px-6 pb-24">
        <div className="grid gap-8 md:grid-cols-3">
          {COURSES.map((course) => (
            <article
              key={course.slug}
              className="flex flex-col rounded-2xl border border-white/10 bg-white/[0.03] p-6 transition hover:border-gold/30 hover:bg-white/[0.05]"
            >
              <div className="mb-4 flex items-center justify-between">
                <span className={`rounded-full px-3 py-1 text-xs font-semibold ${typeColor[course.type]}`}>
                  {course.type === "webinar" ? "Live Webinar" : course.type === "course" ? "Self-Paced" : "Done-With-You"}
                </span>
                <span className="text-xs text-slate-500">{course.duration}</span>
              </div>

              <h2 className="mb-2 text-lg font-bold leading-snug text-white">{course.title}</h2>
              <p className="mb-4 text-sm leading-relaxed text-slate-400 line-clamp-3">{course.description}</p>

              <ul className="mb-6 space-y-1.5">
                {course.includes.slice(0, 3).map((item) => (
                  <li key={item} className="flex items-start gap-2 text-sm text-slate-300">
                    <span className="mt-0.5 shrink-0 text-gold">✓</span>
                    {item}
                  </li>
                ))}
              </ul>

              <div className="mt-auto">
                <div className="mb-4">
                  <div className="flex items-baseline gap-2">
                    <span className="text-3xl font-extrabold text-white">
                      ₹{course.price.toLocaleString("en-IN")}
                    </span>
                    <span className="text-sm text-slate-500 line-through">
                      ₹{course.originalPrice.toLocaleString("en-IN")}
                    </span>
                  </div>
                  <p className="mt-1 text-xs text-emerald-400">{course.urgency}</p>
                </div>

                <Link
                  href={`/courses/${course.slug}`}
                  className="block w-full rounded-xl bg-gold py-3 text-center text-sm font-bold text-ink transition hover:bg-gold-soft"
                >
                  {course.cta}
                </Link>
              </div>
            </article>
          ))}
        </div>

        {/* Mentorship CTA */}
        <div className="mt-12 rounded-2xl border border-white/10 bg-white/[0.03] p-8 text-center">
          <p className="mb-2 text-sm font-semibold uppercase tracking-widest text-gold">For Serious Businesses</p>
          <h3 className="mb-3 text-2xl font-extrabold text-white">1:1 Mentorship with Gautam</h3>
          <p className="mx-auto mb-6 max-w-xl text-slate-400">
            Custom engagement. Gautam works directly with your team on a monthly retainer.
            ₹75,000–₹1,50,000/month depending on scope. Limited to 3 clients at a time.
          </p>
          <a
            href="https://wa.me/919467744000?text=Hi%20Gautam%2C%20I'm%20interested%20in%201%3A1%20mentorship."
            target="_blank"
            rel="noreferrer"
            className="inline-block rounded-xl border border-gold px-8 py-3 font-bold text-gold transition hover:bg-gold hover:text-ink"
          >
            Apply on WhatsApp →
          </a>
        </div>
      </section>
    </main>
    <Footer />
    </>
  );
}
