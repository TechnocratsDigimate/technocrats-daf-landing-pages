import type { Metadata } from "next";
import Link from "next/link";
import { BrandHeader } from "@/components/BrandHeader";
import { Footer } from "@/components/Footer";
import { ThankYouActions } from "@/components/ThankYouActions";
import { ThankYouTracker } from "@/components/ThankYouTracker";
import { TrackedAnchor } from "@/components/ui/TrackedAnchor";

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
        {/* Eyebrow */}
        <p className="text-sm font-semibold uppercase tracking-[0.22em] text-gold">
          Request Confirmed
        </p>

        {/* Headline */}
        <h1 className="mt-4 max-w-3xl text-4xl font-semibold leading-tight md:text-5xl">
          Your free {displayNiche}growth audit request is confirmed{displayName}.
        </h1>

        <p className="mt-5 max-w-2xl leading-8 text-slate-300">
          Gautam reviews every application personally. Here&apos;s what happens next.
        </p>

        {/* Next steps */}
        <ol className="mt-8 grid gap-4 sm:grid-cols-3">
          {[
            {
              step: "1",
              title: "Application reviewed",
              desc: "Gautam reviews your submission within 24 business hours.",
            },
            {
              step: "2",
              title: "Slot confirmed",
              desc: "You'll receive a WhatsApp message with your debrief call time.",
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

function EbookVersion({ name }: { name: string }) {
  const whatsappNumber = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER;
  const waHref = whatsappNumber
    ? `https://wa.me/${whatsappNumber.replace(/\D/g, "")}?text=${encodeURIComponent("Hi, I just signed up for the PMSK guide. Please send it over.")}`
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
          Guide on Its Way
        </p>

        {/* Headline */}
        <h1 className="mt-4 text-center text-4xl font-semibold leading-tight text-white md:text-5xl">
          Your guide is coming{displayName}.
        </h1>

        <p className="mt-4 text-center leading-8 text-slate-400">
          We&apos;re sending the{" "}
          <span className="font-medium text-white">
            Performance Marketing Survival Kit
          </span>{" "}
          to your WhatsApp right now.
        </p>

        {/* Delivery card */}
        <div className="mt-8 rounded-2xl border border-blue-500/20 bg-blue-500/[0.04] p-6">
          <p className="mb-4 text-sm font-semibold uppercase tracking-[0.18em] text-blue-400">
            What&apos;s happening
          </p>
          <ol className="space-y-3">
            {[
              "Your WhatsApp number has been logged.",
              "The guide link is being sent via WhatsApp now.",
              "Check your WhatsApp — it should arrive within a few minutes.",
            ].map((step, i) => (
              <li key={i} className="flex items-start gap-3 text-sm text-slate-300">
                <span className="mt-0.5 flex h-5 w-5 flex-shrink-0 items-center justify-center rounded-full bg-blue-500/20 text-xs font-bold text-blue-400">
                  {i + 1}
                </span>
                {step}
              </li>
            ))}
          </ol>

          <div className="mt-6 border-t border-white/10 pt-5">
            <p className="mb-3 text-sm text-slate-500">
              Didn&apos;t receive it? Message us and we&apos;ll resend manually.
            </p>
            <TrackedAnchor
              href={waHref}
              target={whatsappNumber ? "_blank" : undefined}
              rel={whatsappNumber ? "noreferrer" : undefined}
              className="block rounded-md bg-blue-600 px-5 py-3 text-center font-semibold text-white transition-all duration-200 hover:bg-blue-500 hover:shadow-[0_0_20px_rgba(59,130,246,0.3)]"
              trackLocation="thank-you-ebook-whatsapp"
            >
              Message on WhatsApp →
            </TrackedAnchor>
          </div>
        </div>

        {/* Cross-sell: Free Audit */}
        <div className="mt-6 rounded-2xl border border-gold/15 bg-gold/[0.04] p-6">
          <p className="text-sm font-semibold uppercase tracking-[0.18em] text-gold">
            Also Available — Free
          </p>
          <h2 className="mt-2 text-lg font-semibold text-white">
            Running paid ads? Get a proper audit.
          </h2>
          <p className="mt-2 text-sm leading-6 text-slate-400">
            If you&apos;re already spending on Meta Ads or Google Ads, the free growth audit goes deeper — a personal review of your campaigns, tracking, landing page, and follow-up. Written findings included.
          </p>
          <Link
            href="/free-growth-audit"
            className="mt-4 inline-block rounded-md border border-gold/40 px-5 py-2.5 text-sm font-semibold text-gold transition-all duration-200 hover:border-gold hover:bg-gold/10"
          >
            Book Free Growth Audit →
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
