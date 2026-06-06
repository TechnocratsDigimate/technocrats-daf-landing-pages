import type { Metadata } from "next";
import Link from "next/link";
import { BrandHeader } from "@/components/BrandHeader";
import { Footer } from "@/components/Footer";
import { ThankYouActions } from "@/components/ThankYouActions";
import { ThankYouTracker } from "@/components/ThankYouTracker";
import { TrackedAnchor } from "@/components/ui/TrackedAnchor";
import { TrackedPdfLink } from "@/components/ui/TrackedPdfLink";

// ─── Types ─────────────────────────────────────────────────────────────────

type PageType = "audit" | "ebook" | "workshop" | "contact";

type SearchParams = Promise<{
  type?: string;
  niche?: string;
  name?: string;
}>;

// ─── Helpers ───────────────────────────────────────────────────────────────

function resolveType(type?: string, niche?: string): PageType {
  if (type === "ebook") return "ebook";
  if (type === "workshop") return "workshop";
  if (type === "contact") return "contact";
  // "audit" explicit, legacy ?niche path, or no params — all → audit
  return "audit";
}

function resolveTrackerNiche(pageType: PageType, niche?: string): string {
  if (pageType === "ebook") return "PMSK Ebook";
  if (pageType === "workshop") return "Workshop";
  if (pageType === "contact") return "Contact";
  // audit / legacy
  return niche || "Growth";
}

// ─── Metadata ──────────────────────────────────────────────────────────────

export async function generateMetadata({
  searchParams,
}: {
  searchParams: SearchParams;
}): Promise<Metadata> {
  const p = await searchParams;
  const pageType = resolveType(p.type, p.niche);

  const titles: Record<PageType, string> = {
    audit: "Audit Confirmed | Technocrats Digimate",
    ebook: "Guide On Its Way | Technocrats Digimate",
    workshop: "You're Registered | Technocrats Digimate",
    contact: "Message Received | Technocrats Digimate",
  };
  const descs: Record<PageType, string> = {
    audit: "Your free growth audit request has been received. Book your slot below.",
    ebook: "Your Performance Marketing Survival Kit is on its way to your WhatsApp.",
    workshop: "You're registered for the workshop. Details will be sent to your WhatsApp.",
    contact: "Your message has been received. We'll respond within one business day.",
  };

  return {
    title: titles[pageType],
    description: descs[pageType],
  };
}

// ─── Section components ─────────────────────────────────────────────────────

function AuditVersion({
  name,
  niche,
}: {
  name: string;
  niche: string;
}) {
  const displayName = name ? `, ${name}` : "";
  const displayNiche = niche !== "Growth" ? `${niche} ` : "";

  return (
    <main className="bg-ink px-5 pb-16 pt-28 text-white">
      <div className="mx-auto max-w-7xl">
        {/* Success icon */}
        <div className="mb-6 flex h-14 w-14 items-center justify-center rounded-full border border-gold/30 bg-gold/10">
          <svg className="h-7 w-7 text-gold" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
          </svg>
        </div>

        {/* Eyebrow */}
        <p className="text-sm font-semibold uppercase tracking-[0.22em] text-gold">
          Request Confirmed
        </p>

        {/* Headline */}
        <h1 className="mt-4 max-w-3xl text-4xl font-semibold leading-tight md:text-5xl">
          Your audit request is in{displayName}.
        </h1>

        <p className="mt-5 max-w-2xl leading-8 text-slate-300">
          We&apos;ll review your lead system the same way we review high-ticket client accounts — ads, landing page, tracking, WhatsApp follow-up, and CRM. While we prepare, your checklist is ready below.
        </p>

        {/* Next steps */}
        <ol className="mt-8 grid gap-4 sm:grid-cols-3">
          {[
            {
              step: "1",
              title: "We map your leaks",
              desc: "We'll review the details you submitted and map where your leads are leaking across the six stages.",
            },
            {
              step: "2",
              title: "We schedule your call",
              desc: "You'll hear from us within one business day to schedule your free growth audit.",
            },
            {
              step: "3",
              title: "Written findings",
              desc: "After the call, you receive a written summary of all issues found.",
            },
          ].map((item) => (
            <li
              key={item.step}
              className="rounded-xl border border-white/[0.07] bg-white/[0.03] p-5"
            >
              <div className="mb-3 flex h-8 w-8 items-center justify-center rounded-full bg-gold/15 text-sm font-bold text-gold">
                {item.step}
              </div>
              <p className="font-medium text-white">{item.title}</p>
              <p className="mt-1.5 text-sm leading-6 text-slate-400">{item.desc}</p>
            </li>
          ))}
        </ol>

        {/* Checklist download */}
        <div className="mt-10 rounded-2xl border border-gold/20 bg-gold/[0.04] p-6">
          <p className="text-xs font-semibold uppercase tracking-[0.22em] text-gold">
            Start Here — Free Checklist
          </p>
          <h2 className="mt-2 text-xl font-semibold text-white">
            Start with the 21-Point Lead Leakage Audit
          </h2>
          <p className="mt-2 text-sm leading-6 text-slate-400">
            This is the exact framework we&apos;ll use on your account. Run through it before we talk — the points you can&apos;t tick are usually where the leaks are, and it makes our review far more useful.
          </p>
          <TrackedPdfLink
            href="/assets/audit/21-point-lead-leakage-audit.pdf"
            target="_blank"
            rel="noopener noreferrer"
            download="21_Point_Lead_Leakage_Audit_Technocrats_Digimate.pdf"
            className="mt-4 inline-flex items-center gap-2 rounded-md bg-gold px-5 py-3 text-sm font-semibold text-ink transition-all duration-200 hover:bg-gold-soft hover:shadow-[0_0_20px_rgba(214,168,79,0.3)]"
            eventName="pdf_download"
            resource="audit_checklist"
            page="thank-you"
          >
            <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5M16.5 12L12 16.5m0 0L7.5 12m4.5 4.5V3" />
            </svg>
            Download the checklist (PDF)
          </TrackedPdfLink>
        </div>

        {/* Booking + WhatsApp */}
        <ThankYouActions name={name} niche={niche} />

        <Link
          className="mt-8 inline-block text-sm font-semibold text-gold transition hover:text-gold-soft"
          href="/"
        >
          ← Back to homepage
        </Link>
      </div>
    </main>
  );
}

const PMSK_PDF_URL = "/assets/pmsk/pmsk-paid-ads-interview-questions.pdf";

function EbookVersion({ name }: { name: string }) {
  const whatsappNumber = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER;
  const waHref = whatsappNumber
    ? `https://wa.me/${whatsappNumber.replace(/\D/g, "")}?text=${encodeURIComponent("Hi, I just downloaded the PMSK guide. Looking forward to future playbooks and updates.")}`
    : "/performance-marketing-survival-kit";

  const displayName = name ? `, ${name}` : "";

  return (
    <main className="bg-[#060c14] px-5 pb-16 pt-28 text-white">
      <div className="mx-auto max-w-2xl">

        {/* Success icon */}
        <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full border border-blue-500/30 bg-blue-500/10">
          <svg className="h-8 w-8 text-blue-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
          </svg>
        </div>

        {/* Eyebrow */}
        <p className="mt-6 text-center text-sm font-semibold uppercase tracking-[0.22em] text-blue-400">
          Guide Ready
        </p>

        {/* Headline */}
        <h1 className="mt-4 text-center text-4xl font-semibold leading-tight text-white md:text-5xl">
          Your guide is ready{displayName}.
        </h1>

        <p className="mt-4 text-center leading-8 text-slate-400">
          15 Paid Ads Interview Questions That Expose Fake Experts — yours to keep. Ads Manager is easy; the job isn&apos;t. This guide is about the thinking that gets you hired.
        </p>

        {/* Primary download card */}
        <div className="mt-8 rounded-2xl border border-blue-500/20 bg-blue-500/[0.04] p-6">
          {/* Guide identity */}
          <div className="mb-5 flex items-start gap-4">
            <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-lg border border-blue-500/25 bg-blue-500/10">
              <svg className="h-5 w-5 text-blue-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m0 12.75h7.5m-7.5 3H12M10.5 2.25H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z" />
              </svg>
            </div>
            <div>
              <p className="font-semibold text-white">
                15 Paid Ads Interview Questions That Expose Fake Experts
              </p>
              <p className="mt-0.5 text-sm text-slate-500">
                Performance Marketing Survival Kit · Technocrats Digimate · PDF, 454 KB
              </p>
            </div>
          </div>

          {/* Download button */}
          <TrackedPdfLink
            href={PMSK_PDF_URL}
            target="_blank"
            rel="noopener noreferrer"
            download="15_Paid_Ads_Interview_Questions_Technocrats_Digimate.pdf"
            className="flex w-full items-center justify-center gap-2 rounded-md bg-blue-600 px-5 py-3.5 text-center font-semibold text-white transition-all duration-200 hover:bg-blue-500 hover:shadow-[0_0_24px_rgba(59,130,246,0.35)]"
            eventName="pdf_download"
            resource="pmsk"
            page="thank-you"
          >
            <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5M16.5 12L12 16.5m0 0L7.5 12m4.5 4.5V3" />
            </svg>
            Download the guide (PDF)
          </TrackedPdfLink>
          <p className="mt-3 text-center text-xs leading-5 text-slate-600">
            Opens or downloads depending on your browser. Save it to your phone so you can review before your next interview.
          </p>

          {/* WhatsApp follow-up note */}
          <div className="mt-5 border-t border-white/10 pt-4">
            <p className="mb-3 text-sm text-slate-500">
              Have a question while you prep?
            </p>
            <TrackedAnchor
              href={waHref}
              target={whatsappNumber ? "_blank" : undefined}
              rel={whatsappNumber ? "noreferrer" : undefined}
              className="flex w-full items-center justify-center gap-2 rounded-md border border-blue-500/30 px-5 py-2.5 text-sm font-semibold text-blue-400 transition-all duration-200 hover:border-blue-500 hover:bg-blue-500/10"
              trackLocation="thank-you-ebook-whatsapp"
            >
              <span className="flex h-4 w-4 items-center justify-center rounded-full bg-emerald-400/20">
                <span className="h-2 w-2 rounded-full bg-emerald-400" />
              </span>
              Have a question while you prep? Message us on WhatsApp →
            </TrackedAnchor>
            <p className="mt-2 text-center text-xs text-slate-600">We answer real paid media questions, not auto-replies.</p>
          </div>
        </div>

        {/* How to use */}
        <div className="mt-4 space-y-2.5 rounded-xl border border-white/[0.06] bg-white/[0.02] px-5 py-4">
          {[
            "Read it with the answer covered — attempt your own version of each question first, then compare to the framework.",
            "Score yourself on the final checklist to see exactly where you're interview-ready and where to drill.",
          ].map((tip, i) => (
            <p key={i} className="flex items-start gap-3 text-sm leading-6 text-slate-400">
              <span className="mt-0.5 flex h-5 w-5 flex-shrink-0 items-center justify-center rounded-full bg-blue-500/15 text-xs font-bold text-blue-400">
                {i + 1}
              </span>
              {tip}
            </p>
          ))}
        </div>

        {/* Cross-sell: Free Audit */}
        <div className="mt-6 rounded-2xl border border-gold/15 bg-gold/[0.04] p-6">
          <p className="text-sm font-semibold uppercase tracking-[0.18em] text-gold">
            Also Available — Free
          </p>
          <h2 className="mt-2 text-lg font-semibold text-white">
            Already running ads for a business?
          </h2>
          <p className="mt-2 text-sm leading-6 text-slate-400">
            The thinking in this guide is what we apply to live accounts. If you want a second set of eyes on yours, book a free growth audit — no pitch, just a real review.
          </p>
          <Link
            href="/free-growth-audit"
            className="mt-4 inline-block rounded-md border border-gold/40 px-5 py-2.5 text-sm font-semibold text-gold transition-all duration-200 hover:border-gold hover:bg-gold/10"
          >
            See the free audit →
          </Link>
        </div>

        <div className="mt-6 text-center">
          <Link
            className="text-sm font-semibold text-slate-500 transition hover:text-slate-300"
            href="/"
          >
            ← Back to homepage
          </Link>
        </div>
      </div>
    </main>
  );
}

function WorkshopVersion({ name }: { name: string }) {
  const whatsappNumber = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER;
  const waHref = whatsappNumber
    ? `https://wa.me/${whatsappNumber.replace(/\D/g, "")}?text=${encodeURIComponent("Hi, I just registered for the workshop. Please confirm my registration.")}`
    : "/";
  const displayName = name ? `, ${name}` : "";

  return (
    <main className="bg-ink px-5 pb-16 pt-28 text-white">
      <div className="mx-auto max-w-xl text-center">
        <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full border border-gold/30 bg-gold/10">
          <svg className="h-8 w-8 text-gold" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
          </svg>
        </div>
        <p className="mt-6 text-sm font-semibold uppercase tracking-[0.22em] text-gold">
          Registration Confirmed
        </p>
        <h1 className="mt-4 text-4xl font-semibold leading-tight text-white md:text-5xl">
          You&apos;re registered{displayName}.
        </h1>
        <p className="mt-4 leading-8 text-slate-400">
          Workshop details — date, time, and joining link — will be sent to your WhatsApp before the event. Keep an eye on your messages.
        </p>
        <TrackedAnchor
          href={waHref}
          target={whatsappNumber ? "_blank" : undefined}
          rel={whatsappNumber ? "noreferrer" : undefined}
          className="mt-8 inline-block rounded-md bg-gold px-7 py-3.5 font-semibold text-ink transition-all duration-200 hover:bg-gold-soft hover:shadow-[0_0_20px_rgba(214,168,79,0.35)]"
          trackLocation="thank-you-workshop-whatsapp"
        >
          Confirm on WhatsApp →
        </TrackedAnchor>
        <div className="mt-6">
          <Link
            className="text-sm font-semibold text-slate-500 transition hover:text-slate-300"
            href="/"
          >
            ← Back to homepage
          </Link>
        </div>
      </div>
    </main>
  );
}

function ContactVersion({ name }: { name: string }) {
  const displayName = name ? `, ${name}` : "";

  return (
    <main className="bg-ink px-5 pb-16 pt-28 text-white">
      <div className="mx-auto max-w-xl text-center">
        <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full border border-gold/30 bg-gold/10">
          <svg className="h-8 w-8 text-gold" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75" />
          </svg>
        </div>
        <p className="mt-6 text-sm font-semibold uppercase tracking-[0.22em] text-gold">
          Message Received
        </p>
        <h1 className="mt-4 text-4xl font-semibold leading-tight text-white md:text-5xl">
          Got it{displayName}.
        </h1>
        <p className="mt-4 leading-8 text-slate-400">
          We&apos;ve received your message and will respond within one business day. If it&apos;s urgent, message us directly on WhatsApp.
        </p>
        <div className="mt-8 flex flex-col items-center gap-3 sm:flex-row sm:justify-center">
          <Link
            href="/"
            className="rounded-md bg-gold px-7 py-3.5 font-semibold text-ink transition-all duration-200 hover:bg-gold-soft hover:shadow-[0_0_20px_rgba(214,168,79,0.35)]"
          >
            Back to Homepage
          </Link>
          <Link
            href="/free-growth-audit"
            className="rounded-md border border-gold/40 px-7 py-3.5 font-semibold text-gold transition-all duration-200 hover:border-gold hover:bg-gold/10"
          >
            Book Free Audit
          </Link>
        </div>
      </div>
    </main>
  );
}

// ─── Page ───────────────────────────────────────────────────────────────────

export default async function ThankYouPage({
  searchParams,
}: {
  searchParams: SearchParams;
}) {
  const p = await searchParams;
  const pageType = resolveType(p.type, p.niche);
  const name = p.name || "";
  const trackerNiche = resolveTrackerNiche(pageType, p.niche);

  return (
    <>
      <ThankYouTracker niche={trackerNiche} />
      <BrandHeader />

      {pageType === "audit" && (
        <AuditVersion name={name} niche={p.niche || "Growth"} />
      )}
      {pageType === "ebook" && <EbookVersion name={name} />}
      {pageType === "workshop" && <WorkshopVersion name={name} />}
      {pageType === "contact" && <ContactVersion name={name} />}

      <Footer />
    </>
  );
}
