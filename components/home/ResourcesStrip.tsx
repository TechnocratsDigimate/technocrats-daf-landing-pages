import Link from "next/link";
import { TrackedAnchor } from "@/components/ui/TrackedAnchor";

// ─── Giveaway definitions ─────────────────────────────────────────────────────

type Giveaway = {
  keyword: string;
  badge: string;
  live: boolean;
  title: string;
  desc: string;
  cta: string;
  href: string;
  whatsapp: boolean;
  trackLocation: string;
};

function buildGiveaways(waHref: string): Giveaway[] {
  return [
    {
      keyword: "ADS",
      badge: "Free — Available Now",
      live: true,
      title: "15 Paid Ads Interview Questions That Expose Fake Experts",
      desc: "For students, job seekers, freelancers, and junior marketers who want to think like operators — not button-pushers.",
      cta: "Download Free Guide →",
      href: "/performance-marketing-survival-kit",
      whatsapp: false,
      trackLocation: "",
    },
    {
      keyword: "AUDIT",
      badge: "Free — Included with Audit",
      live: true,
      title: "21-Point Lead Leakage Audit Checklist",
      desc: "For business owners running ads. Covers Meta Ads, landing page, tracking, WhatsApp follow-up, and CRM — shared with every audit applicant.",
      cta: "Book Free Growth Audit →",
      href: "/free-growth-audit",
      whatsapp: false,
      trackLocation: "",
    },
    {
      keyword: "FIX",
      badge: "Coming Soon",
      live: false,
      title: "Campaign Troubleshooting Playbook",
      desc: "For freelancers, agency interns, and in-house marketers. A step-by-step playbook for diagnosing and fixing underperforming campaigns fast.",
      cta: "Join Waitlist on WhatsApp →",
      href: waHref,
      whatsapp: true,
      trackLocation: "resources-strip-waitlist",
    },
  ];
}

// ─── Component ─────────────────────────────────────────────────────────────────

export function ResourcesStrip() {
  const whatsappNumber = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER;
  const waHref = whatsappNumber
    ? `https://wa.me/${whatsappNumber.replace(/\D/g, "")}?text=${encodeURIComponent(
        "Hi, I want to be notified when the Campaign Troubleshooting Playbook is available."
      )}`
    : "/performance-marketing-survival-kit";

  const giveaways = buildGiveaways(waHref);

  return (
    <section className="relative overflow-hidden border-y border-white/[0.06] bg-navy py-16 md:py-20">
      {/* Subtle top glow */}
      <div className="absolute inset-0 pointer-events-none bg-[radial-gradient(ellipse_70%_40%_at_50%_0%,rgba(214,168,79,0.05)_0%,transparent_70%)]" />

      <div className="relative mx-auto max-w-[1320px] px-5 md:px-8 lg:px-10">
        {/* Header */}
        <div className="mb-10 text-center">
          <p className="text-xs font-semibold uppercase tracking-[0.22em] text-gold">
            Free Resources
          </p>
          <h2 className="mt-3 text-2xl font-semibold text-white md:text-3xl">
            Take Something Free Before You Decide Anything
          </h2>
          <p className="mt-3 text-sm leading-7 text-slate-500">
            Three tools — two available now, one on the way.
          </p>
        </div>

        {/* Cards */}
        <div className="grid gap-5 md:grid-cols-3">
          {giveaways.map((g) => (
            <div
              key={g.keyword}
              className={`relative flex flex-col rounded-2xl border p-6 transition-all duration-300 ${
                g.live
                  ? "border-white/10 bg-white/[0.03] hover:-translate-y-1 hover:border-gold/25 hover:shadow-gold"
                  : "border-white/[0.06] bg-white/[0.015] opacity-80"
              }`}
            >
              {/* Keyword + badge row */}
              <div className="mb-4 flex items-center justify-between gap-3">
                <span className="rounded-md border border-gold/30 bg-gold/10 px-2.5 py-1 font-mono text-xs font-bold tracking-wider text-gold">
                  {g.keyword}
                </span>
                <span
                  className={`rounded-full px-2.5 py-0.5 text-xs font-medium ${
                    g.live
                      ? "border border-emerald-500/25 bg-emerald-500/10 text-emerald-400"
                      : "border border-white/10 bg-white/[0.04] text-slate-500"
                  }`}
                >
                  {g.badge}
                </span>
              </div>

              {/* Title */}
              <h3 className={`mb-3 font-semibold leading-snug ${g.live ? "text-white" : "text-slate-500"}`}>
                {g.title}
              </h3>

              {/* Description */}
              <p className="mb-6 flex-1 text-sm leading-6 text-slate-500">{g.desc}</p>

              {/* CTA */}
              {g.live && !g.whatsapp && (
                <Link
                  href={g.href}
                  className="mt-auto inline-flex items-center gap-1 text-sm font-semibold text-gold transition-colors duration-200 hover:text-gold-soft"
                >
                  {g.cta}
                </Link>
              )}
              {g.live && g.whatsapp && (
                <TrackedAnchor
                  href={g.href}
                  target="_blank"
                  rel="noreferrer"
                  className="mt-auto inline-flex items-center gap-1 text-sm font-semibold text-gold transition-colors duration-200 hover:text-gold-soft"
                  trackLocation={g.trackLocation}
                >
                  {g.cta}
                </TrackedAnchor>
              )}
              {!g.live && (
                <TrackedAnchor
                  href={g.href}
                  target={whatsappNumber ? "_blank" : undefined}
                  rel={whatsappNumber ? "noreferrer" : undefined}
                  className="mt-auto inline-flex items-center gap-1 text-sm font-semibold text-slate-500 transition-colors duration-200 hover:text-slate-300"
                  trackLocation={g.trackLocation}
                >
                  {g.cta}
                </TrackedAnchor>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
