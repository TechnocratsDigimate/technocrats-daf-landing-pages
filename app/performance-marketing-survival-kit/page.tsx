import type { Metadata } from "next";
import { BrandHeader } from "@/components/BrandHeader";
import { Footer } from "@/components/Footer";
import { PmskForm } from "./PmskForm";
import { TrackedAnchor } from "@/components/ui/TrackedAnchor";

export const metadata: Metadata = {
  title: "Free Performance Marketing Survival Kit | Technocrats Digimate",
  description:
    "Download the free Performance Marketing Survival Kit — 15 paid ads interview questions that expose fake experts. Free guide for marketers, job seekers, and business owners who want to understand what good campaign management actually looks like.",
};

// ─── Static data ────────────────────────────────────────────────────────────

const CHAPTERS = [
  {
    num: "01",
    title: "The 3 Questions That Separate Real Practitioners From Theoretical Marketers",
    desc: "Most marketers can explain what a campaign is. Very few can explain why their last campaign failed. Here's how to tell the difference in under 5 minutes.",
  },
  {
    num: "02",
    title: "Meta Ads — What to Ask About Pixel Setup, CAPI, and Attribution",
    desc: "If someone can't explain the difference between browser pixel events and server-side CAPI, they're guessing at your attribution. These questions surface that fast.",
  },
  {
    num: "03",
    title: "Google Ads — Budget, Bidding, and Conversion Tracking Red Flags",
    desc: "Automated bidding without a conversion history is just spending money. Learn which questions reveal whether your Google Ads account is actually optimising.",
  },
  {
    num: "04",
    title: "Landing Pages and CRO — What Bad Marketers Always Get Wrong",
    desc: "Most ad spend waste happens after the click. These questions expose whether the person you're interviewing has ever thought about what happens after the ad.",
  },
  {
    num: "05",
    title: "How to Run a 15-Minute Funnel Audit Before Hiring Anyone",
    desc: "A simple pre-hire checklist that shows you the state of any funnel before you sign a contract or hand over ad account access.",
  },
];

const FOR_YOU_IF = [
  "You're interviewing performance marketers and don't know what to ask",
  "You hired an agency and suspect they're not doing what they promised",
  "You're a marketer preparing for a job interview at a performance-first company",
  "You're a business owner who wants to understand your campaigns better",
  "You want to audit your own ads setup without paying a consultant",
];

const PROOF_STATS = [
  // TODO: Replace with verified, approved data before publishing
  { stat: "15", label: "Interview Questions", sub: "Covering Meta, Google, tracking, and CRO" },
  { stat: "5", label: "Chapters", sub: "From first principles to final audit checklist" },
  { stat: "Free", label: "Forever", sub: "No course upsell. No paywall. Just the guide." },
];

const FAQS = [
  {
    q: "Is this really free?",
    a: "Yes. There's no upsell, no paid course attached, and no hidden fee. You'll receive the guide via WhatsApp after submitting the form. That's it.",
  },
  {
    q: "I'm a business owner, not a marketer. Is this useful for me?",
    a: "Yes — especially the interview questions chapters. If you're hiring a freelancer or agency and don't know what to ask, this guide gives you a working script.",
  },
  {
    q: "I already run ads. Is there anything new here?",
    a: "The audit checklist in Chapter 5 is useful regardless of experience level. Even experienced practitioners miss systematic checks when they're inside an account every day.",
  },
  {
    q: "What's the difference between PMSK and the Technocrats Digimate agency?",
    a: "PMSK is the education side — free guides, frameworks, and eventually workshops for marketers and job seekers. Technocrats Digimate is the agency side — for business owners who want campaigns managed. They're related but separate.",
  },
];

// ─── Page ───────────────────────────────────────────────────────────────────

export default function PmskPage() {
  const whatsappNumber = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER;
  const waHref = whatsappNumber
    ? `https://wa.me/${whatsappNumber.replace(/\D/g, "")}?text=${encodeURIComponent("Hi, I want to ask about the Performance Marketing Survival Kit.")}`
    : "/performance-marketing-survival-kit";

  return (
    <>
      <BrandHeader />

      {/* ── Hero ─────────────────────────────────────────────────────────── */}
      <section className="relative overflow-hidden bg-[#060c14] pt-28 pb-16 md:pb-20">
        {/* Blue radial glow */}
        <div className="absolute inset-0 pointer-events-none bg-[radial-gradient(ellipse_65%_55%_at_70%_40%,rgba(59,130,246,0.08)_0%,transparent_65%)]" />
        <div className="agency-grid absolute inset-0 opacity-20 pointer-events-none" />

        <div className="relative mx-auto max-w-[1320px] px-5 md:px-8 lg:px-10">
          <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-16">

            {/* Left: Ebook cover */}
            <div className="mx-auto w-full max-w-xs lg:max-w-sm">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/assets/pmsk/cover.png"
                alt="Performance Marketing Survival Kit — 15 Paid Ads Interview Questions That Expose Fake Experts"
                className="w-full rotate-2 rounded-2xl shadow-[0_32px_80px_rgba(59,130,246,0.25)] transition-transform duration-500 hover:rotate-0"
              />
            </div>

            {/* Right: Headline + form */}
            <div>
              <div className="inline-flex items-center rounded-full border border-blue-500/30 bg-blue-500/10 px-3 py-1 text-xs font-semibold uppercase tracking-[0.18em] text-blue-400">
                Free — No Credit Card
              </div>

              <h1 className="mt-5 text-4xl font-semibold leading-tight text-white md:text-5xl">
                15 Questions That{" "}
                <span className="bg-gradient-to-r from-blue-400 to-blue-300 bg-clip-text text-transparent">
                  Expose Fake Performance Marketers
                </span>
              </h1>

              <p className="mt-4 leading-8 text-slate-400">
                A free guide for business owners who want to hire the right marketer, marketers preparing for high-stakes interviews, and anyone who wants to audit their own campaigns without paying a consultant.
              </p>

              <ul className="mt-5 space-y-2">
                {[
                  "5 chapters · 15 ready-to-use questions",
                  "Meta Ads · Google Ads · Tracking · CRO",
                  "Bonus: 15-minute funnel audit checklist",
                ].map((item) => (
                  <li key={item} className="flex items-center gap-3 text-sm text-slate-300">
                    <svg className="h-4 w-4 flex-shrink-0 text-blue-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                    </svg>
                    {item}
                  </li>
                ))}
              </ul>

              {/* Form card */}
              <div className="mt-8 rounded-2xl border border-white/10 bg-white/[0.03] p-6 backdrop-blur-sm">
                <p className="mb-5 text-sm font-medium text-slate-300">
                  Enter your details — we&apos;ll send the guide directly to your WhatsApp:
                </p>
                <PmskForm />
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* ── Proof strip ──────────────────────────────────────────────────── */}
      <section className="border-y border-white/[0.06] bg-[#07111f] py-10">
        <div className="mx-auto max-w-[1320px] px-5 md:px-8 lg:px-10">
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-3">
            {PROOF_STATS.map((item) => (
              <div key={item.label} className="text-center">
                {/* TODO: Replace stat values with verified data before publishing */}
                <p className="text-4xl font-bold text-blue-400">{item.stat}</p>
                <p className="mt-1 font-medium text-white">{item.label}</p>
                <p className="mt-1 text-sm text-slate-500">{item.sub}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── What's Inside ────────────────────────────────────────────────── */}
      <section className="bg-[#060c14] py-16 md:py-24">
        <div className="mx-auto max-w-[1320px] px-5 md:px-8 lg:px-10">
          <div className="text-center">
            <p className="text-xs font-semibold uppercase tracking-[0.22em] text-blue-400">
              Inside the Guide
            </p>
            <h2 className="mt-4 text-3xl font-semibold text-white md:text-4xl">
              Five chapters.{" "}
              <span className="bg-gradient-to-r from-blue-400 to-blue-300 bg-clip-text text-transparent">
                One clear framework.
              </span>
            </h2>
            <p className="mx-auto mt-4 max-w-xl leading-7 text-slate-400">
              Not theory. Each chapter gives you a usable tool — a question to ask, a red flag to spot, or a checklist to run.
            </p>
          </div>

          <div className="mt-12 space-y-4">
            {CHAPTERS.map((chapter) => (
              <div
                key={chapter.num}
                className="group flex gap-5 rounded-xl border border-white/[0.07] bg-white/[0.03] p-5 transition-all duration-200 hover:border-blue-500/20 hover:bg-white/[0.05] md:gap-6 md:p-6"
              >
                <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-lg border border-blue-500/25 bg-blue-500/10 text-xs font-bold text-blue-400">
                  {chapter.num}
                </div>
                <div>
                  <h3 className="font-semibold text-white transition-colors duration-200 group-hover:text-blue-100">
                    {chapter.title}
                  </h3>
                  <p className="mt-2 text-sm leading-6 text-slate-400">{chapter.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Who This Is For ──────────────────────────────────────────────── */}
      <section className="bg-[#07111f] py-16 md:py-24">
        <div className="mx-auto max-w-[1320px] px-5 md:px-8 lg:px-10">
          <div className="mx-auto max-w-2xl">
            <div className="text-center">
              <p className="text-xs font-semibold uppercase tracking-[0.22em] text-blue-400">
                Who This Is For
              </p>
              <h2 className="mt-4 text-3xl font-semibold text-white md:text-4xl">
                Built for people who need to{" "}
                <span className="bg-gradient-to-r from-blue-400 to-blue-300 bg-clip-text text-transparent">
                  tell real from fake
                </span>
              </h2>
            </div>

            <ul className="mt-10 space-y-3">
              {FOR_YOU_IF.map((item) => (
                <li
                  key={item}
                  className="flex items-start gap-4 rounded-xl border border-white/[0.07] bg-white/[0.03] px-5 py-4"
                >
                  <div className="mt-0.5 flex h-5 w-5 flex-shrink-0 items-center justify-center rounded-full bg-blue-500/20">
                    <svg className="h-3 w-3 text-blue-400" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <p className="text-sm leading-7 text-slate-300">{item}</p>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* ── Lead capture (repeat) ─────────────────────────────────────────── */}
      <section id="get-the-guide" className="bg-[#060c14] py-16 md:py-24">
        <div className="relative mx-auto max-w-[1320px] px-5 md:px-8 lg:px-10">
          {/* Blue glow behind form */}
          <div className="absolute inset-0 pointer-events-none bg-[radial-gradient(ellipse_50%_60%_at_50%_50%,rgba(59,130,246,0.06)_0%,transparent_70%)]" />

          <div className="relative mx-auto max-w-lg text-center">
            <p className="text-xs font-semibold uppercase tracking-[0.22em] text-blue-400">
              Get the Guide
            </p>
            <h2 className="mt-4 text-3xl font-semibold text-white md:text-4xl">
              Download Free — Takes 30 Seconds
            </h2>
            <p className="mt-3 leading-7 text-slate-400">
              Enter your details below. The guide lands on your WhatsApp immediately.
            </p>

            <div className="mt-8 rounded-2xl border border-white/10 bg-white/[0.03] p-6 text-left backdrop-blur-sm md:p-8">
              <PmskForm />
            </div>
          </div>
        </div>
      </section>

      {/* ── About the guide / author ─────────────────────────────────────── */}
      <section className="bg-[#07111f] py-16 md:py-24">
        <div className="mx-auto max-w-[1320px] px-5 md:px-8 lg:px-10">
          <div className="grid items-center gap-10 lg:grid-cols-2 lg:gap-16">

            {/* Founder image */}
            <div className="mx-auto w-full max-w-sm lg:max-w-none">
              <div className="relative overflow-hidden rounded-2xl border-2 border-blue-500/20">
                {/* Blue corner brackets */}
                <div className="absolute left-3 top-3 z-10 h-10 w-10 rounded-tl-lg border-l-2 border-t-2 border-blue-500/60" />
                <div className="absolute bottom-3 right-3 z-10 h-10 w-10 rounded-br-lg border-b-2 border-r-2 border-blue-500/60" />
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src="/assets/brand/founder.jpeg"
                  alt="Gautam Punj — Founder, Technocrats Digimate"
                  className="aspect-[4/5] w-full object-cover"
                />
                <div className="absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-[#07111f]/80 to-transparent" />
              </div>
            </div>

            {/* Copy */}
            <div>
              <div className="inline-flex items-center rounded-full border border-blue-500/30 bg-blue-500/10 px-3 py-1 text-xs font-semibold uppercase tracking-[0.18em] text-blue-400">
                About the Author
              </div>

              <h2 className="mt-4 text-3xl font-semibold text-white md:text-4xl">
                Written by Gautam Punj
              </h2>

              <div className="mt-4 inline-flex rounded-full border border-blue-500/20 bg-blue-500/10 px-4 py-2 text-sm text-blue-300">
                Meta Ads · Google Ads · Funnel Architecture
              </div>

              <p className="mt-5 leading-8 text-slate-400">
                Gautam leads Technocrats Digimate and has worked hands-on across performance marketing for real estate, study abroad, and high-ticket service businesses. The questions in this guide come directly from audits of real accounts — not from reading about marketing, but from diagnosing broken funnels and finding out why campaigns fail.
              </p>

              <p className="mt-4 leading-8 text-slate-400">
                PMSK was built because the same mistakes come up in almost every account audit. This guide is a way to help business owners and new marketers see those mistakes before they make them.
              </p>

              <div className="mt-8">
                <a
                  href="#get-the-guide"
                  className="inline-block rounded-md bg-blue-600 px-5 py-3 font-semibold text-white transition-all duration-200 hover:bg-blue-500 hover:shadow-[0_0_20px_rgba(59,130,246,0.3)]"
                >
                  Get the Free Guide →
                </a>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* ── FAQ ──────────────────────────────────────────────────────────── */}
      <section className="bg-[#060c14] py-16 md:py-24">
        <div className="mx-auto max-w-[1320px] px-5 md:px-8 lg:px-10">
          <div className="mx-auto max-w-2xl">
            <div className="text-center">
              <p className="text-xs font-semibold uppercase tracking-[0.22em] text-blue-400">FAQ</p>
              <h2 className="mt-4 text-3xl font-semibold text-white md:text-4xl">
                Questions about the guide
              </h2>
            </div>

            <div className="mt-10 divide-y divide-white/10">
              {FAQS.map((faq, i) => (
                <div key={i} className="py-6">
                  <h3 className="font-medium text-white">{faq.q}</h3>
                  <p className="mt-3 leading-7 text-slate-400">{faq.a}</p>
                </div>
              ))}
            </div>

            {/* Bottom CTA strip */}
            <div className="mt-10 rounded-2xl border border-blue-500/15 bg-blue-500/[0.04] p-6">
              <div className="flex flex-col items-center gap-4 text-center sm:flex-row sm:justify-between sm:text-left">
                <div>
                  <p className="font-medium text-white">
                    Running ads and want a proper diagnosis?
                  </p>
                  <p className="mt-1 text-sm text-slate-500">
                    The free growth audit goes deeper — for businesses already spending on ads.
                  </p>
                </div>
                <a
                  href="/free-growth-audit"
                  className="flex-shrink-0 rounded-md border border-gold/35 px-5 py-2.5 text-sm font-semibold text-gold transition-all duration-200 hover:border-gold hover:bg-gold/10"
                >
                  Book Free Audit →
                </a>
              </div>
            </div>

            {/* WhatsApp question link */}
            <p className="mt-6 text-center text-sm text-slate-600">
              Still have questions?{" "}
              <TrackedAnchor
                href={waHref}
                target={whatsappNumber ? "_blank" : undefined}
                rel={whatsappNumber ? "noreferrer" : undefined}
                className="text-blue-400 underline underline-offset-2 hover:text-blue-300"
                trackLocation="pmsk-page-faq"
              >
                Message us on WhatsApp
              </TrackedAnchor>
            </p>
          </div>
        </div>
      </section>

      <Footer />
    </>
  );
}
