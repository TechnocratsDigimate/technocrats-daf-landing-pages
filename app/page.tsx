import Link from "next/link";

export default function HomePage() {
  return (
    <main className="bg-ink px-5 py-14 text-white">
      <div className="mx-auto max-w-4xl">
        <p className="text-sm font-semibold uppercase tracking-[0.22em] text-gold">
          Technocrats Digimate Pvt Ltd
        </p>
        <h1 className="mt-4 max-w-3xl text-4xl font-semibold leading-tight md:text-6xl">
          Diagnostic Audit Funnel pages are ready to route by niche.
        </h1>
        <p className="mt-5 max-w-2xl text-lg leading-8 text-slate-300">
          Choose the campaign entry point below. Each page uses the same qualification logic with niche-specific messaging and questions.
        </p>
        <div className="mt-8 flex flex-col gap-3 sm:flex-row">
          <Link
            className="rounded-md bg-gold px-5 py-3 text-center font-semibold text-ink transition hover:bg-gold-soft"
            href="/real-estate-growth-audit"
          >
            Real Estate Audit
          </Link>
          <Link
            className="rounded-md border border-gold/40 px-5 py-3 text-center font-semibold text-gold transition hover:border-gold hover:bg-gold/10"
            href="/study-abroad-growth-audit"
          >
            Study Abroad Audit
          </Link>
        </div>
      </div>
    </main>
  );
}
