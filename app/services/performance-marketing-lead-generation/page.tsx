import type { Metadata } from "next";
import Link from "next/link";
import { BrandHeader } from "@/components/BrandHeader";
import { Footer } from "@/components/Footer";
import { GlassCard } from "@/components/ui/GlassCard";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { SectionWrapper } from "@/components/ui/SectionWrapper";

const pageTitle = "Performance Marketing & Lead Generation Agency | Technocrats Digimate";
const pageDescription =
  "Technocrats Digimate builds predictable lead-generation systems using Meta Ads, Google Ads, landing pages, conversion tracking, WhatsApp follow-up, CRM visibility, and reporting.";
const canonicalUrl =
  "https://technocratsdigimate.com/services/performance-marketing-lead-generation";

export const metadata: Metadata = {
  title: pageTitle,
  description: pageDescription,
  alternates: {
    canonical: canonicalUrl
  },
  openGraph: {
    title: pageTitle,
    description: pageDescription,
    url: canonicalUrl,
    siteName: "Technocrats Digimate",
    type: "website",
    images: [{ url: "/opengraph-image", width: 1200, height: 630 }],
  },
  twitter: {
    card: "summary_large_image",
    title: pageTitle,
    description: pageDescription,
  },
};

const systemParts = [
  "Campaign message and offer clarity",
  "Meta Ads and Google Ads account diagnosis",
  "Landing page structure and lead qualification",
  "Conversion tracking across forms, calls, and WhatsApp",
  "CRM visibility and sales follow-up reporting",
  "Weekly learning loops that connect spend to lead quality"
];

const fixes = [
  {
    title: "Ad Spend Without Qualified Conversations",
    body: "We look beyond CPL and diagnose whether campaigns are attracting the right audience, asking the right questions, and handing leads to sales cleanly."
  },
  {
    title: "Landing Pages That Do Not Filter Intent",
    body: "We review the promise, proof, form friction, mobile experience, and follow-up path so the page supports qualified enquiries instead of casual clicks."
  },
  {
    title: "Tracking That Hides the Truth",
    body: "We check whether Meta, Google, GA4, forms, WhatsApp clicks, and thank-you events are creating a clear view of what is actually working."
  },
  {
    title: "Slow or Invisible Follow-Up",
    body: "We connect marketing performance to WhatsApp response, CRM stages, sales visibility, and reporting so leads do not disappear after submission."
  }
];

const industries = [
  "Real estate developers and brokers",
  "Study abroad and immigration consultants",
  "Education brands and training institutes",
  "Clinics, healthcare providers, and high-ticket services",
  "Founder-led businesses that need better lead quality"
];

const leakageSignals = [
  "Campaigns generate leads, but sales calls do not improve.",
  "Meta and Google report conversions, but the CRM tells a different story.",
  "WhatsApp follow-up depends on manual effort and inconsistent speed.",
  "Landing pages collect enquiries without filtering budget, urgency, or fit.",
  "Reports show spend and CPL, but not lead quality or revenue movement."
];

const serviceJsonLd = {
  "@context": "https://schema.org",
  "@type": "Service",
  name: "Performance Marketing and Lead Generation",
  provider: {
    "@type": "Organization",
    name: "Technocrats Digimate Pvt Ltd",
    url: "https://technocratsdigimate.com"
  },
  areaServed: ["Chandigarh", "Tricity", "India", "Dubai", "UAE"],
  serviceType: [
    "Performance marketing",
    "Lead generation",
    "Meta Ads management",
    "Google Ads management",
    "Conversion tracking",
    "Funnel audit"
  ],
  url: canonicalUrl
};

export default function PerformanceMarketingLeadGenerationPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceJsonLd) }}
      />
      <BrandHeader />
      <main className="bg-ink text-white">
        <SectionWrapper bg="deep" grid glow className="pt-32 md:pt-40">
          <div className="grid gap-10 lg:grid-cols-[1.05fr_0.95fr] lg:items-center">
            <div>
              <span className="inline-flex rounded-full border border-gold/30 bg-gold/10 px-3 py-1 text-xs font-semibold uppercase tracking-[0.18em] text-gold">
                Performance Marketing
              </span>
              <h1 className="mt-5 max-w-4xl text-4xl font-semibold leading-tight text-white md:text-6xl">
                Performance Marketing & Lead Generation Agency
              </h1>
              <p className="mt-6 max-w-2xl text-lg leading-8 text-slate-300">
                We build lead-generation systems that connect paid media, landing pages,
                tracking, WhatsApp follow-up, CRM visibility, and reporting into one
                practical growth engine.
              </p>
              <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                <Link
                  href="/free-growth-audit"
                  className="rounded-md bg-gold px-5 py-3 text-center text-sm font-semibold text-ink transition hover:bg-gold-soft"
                >
                  Request a Free Growth Audit
                </Link>
                <Link
                  href="/resources"
                  className="rounded-md border border-white/10 px-5 py-3 text-center text-sm font-semibold text-gold transition hover:border-gold/40 hover:text-gold-soft"
                >
                  View Resources
                </Link>
              </div>
            </div>
            <GlassCard className="space-y-5">
              <p className="text-sm font-semibold uppercase tracking-[0.18em] text-gold">
                The system we diagnose
              </p>
              <div className="space-y-3">
                {systemParts.map((part) => (
                  <div key={part} className="flex gap-3 rounded-md border border-white/10 bg-white/[0.03] p-3">
                    <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-gold" />
                    <p className="text-sm leading-6 text-slate-300">{part}</p>
                  </div>
                ))}
              </div>
            </GlassCard>
          </div>
        </SectionWrapper>

        <SectionWrapper bg="ink">
          <SectionHeader
            eyebrow="Lead Generation"
            headline="Lead Generation Is More Than Running Ads"
            subheadline="Most campaigns do not fail because one setting is wrong. They fail because the ad, landing page, tracking, follow-up, and CRM are not working as one system."
          />
          <div className="mt-10 grid gap-5 md:grid-cols-3">
            {[
              "Paid ads create demand and intent.",
              "Landing pages qualify and convert that intent.",
              "Tracking and CRM reporting reveal what should be scaled."
            ].map((item) => (
              <GlassCard key={item} hover>
                <p className="text-lg font-semibold leading-7 text-white">{item}</p>
              </GlassCard>
            ))}
          </div>
        </SectionWrapper>

        <SectionWrapper bg="panel" id="qualified-leads">
          <SectionHeader
            eyebrow="Qualified Leads"
            headline="Performance Marketing Built Around Qualified Leads"
            subheadline="Our work is designed for businesses where lead quality matters: higher-ticket decisions, longer sales cycles, and teams that need visibility after the enquiry."
          />
          <div className="mt-10 grid gap-5 lg:grid-cols-2">
            {fixes.map((fix) => (
              <GlassCard key={fix.title} accent="gold">
                <h2 className="text-xl font-semibold text-white">{fix.title}</h2>
                <p className="mt-3 leading-7 text-slate-300">{fix.body}</p>
              </GlassCard>
            ))}
          </div>
        </SectionWrapper>

        <SectionWrapper bg="deep" grid>
          <div className="grid gap-10 lg:grid-cols-[0.9fr_1.1fr]">
            <SectionHeader
              eyebrow="Connected Funnel"
              headline="Meta Ads, Google Ads, Landing Pages, Tracking, and Follow-Up"
              subheadline="The point is not to run isolated channels. The point is to make each part of the funnel improve the next."
            />
            <div className="grid gap-4 sm:grid-cols-2">
              {systemParts.map((part) => (
                <GlassCard key={part}>
                  <h2 className="text-base font-semibold text-white">{part}</h2>
                </GlassCard>
              ))}
            </div>
          </div>
        </SectionWrapper>

        <SectionWrapper bg="ink">
          <SectionHeader
            eyebrow="Funnel Fixes"
            headline="What We Fix Across the Funnel"
            subheadline="We focus on the places where money usually leaks: unclear offers, weak qualification, broken tracking, slow follow-up, and reporting that does not connect marketing to sales."
          />
          <div className="mt-10 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
            {[
              "Campaign structure and targeting clarity",
              "Creative and offer-message alignment",
              "Landing page conversion and qualification",
              "Pixel, GA4, Google Ads, and event tracking",
              "WhatsApp follow-up and speed-to-lead",
              "CRM stages, lead quality, and reporting"
            ].map((item) => (
              <GlassCard key={item} hover>
                <h2 className="text-lg font-semibold text-white">{item}</h2>
              </GlassCard>
            ))}
          </div>
        </SectionWrapper>

        <SectionWrapper bg="panel">
          <div className="grid gap-10 lg:grid-cols-2">
            <div>
              <SectionHeader
                eyebrow="Industries"
                headline="Industries We Work With"
                subheadline="The strongest fit is a business where a lead is valuable enough to justify better diagnosis, better follow-up, and better reporting."
              />
              <ul className="mt-8 space-y-3">
                {industries.map((industry) => (
                  <li key={industry} className="flex gap-3 text-slate-300">
                    <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-gold" />
                    {industry}
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <SectionHeader
                eyebrow="Lead Quality"
                headline="Why Lead Quality Drops"
                subheadline="Lead quality usually drops when the campaign optimises for the easiest conversion instead of the most useful sales conversation."
              />
              <ul className="mt-8 space-y-3">
                {leakageSignals.map((signal) => (
                  <li key={signal} className="flex gap-3 text-slate-300">
                    <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-blue-500" />
                    {signal}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </SectionWrapper>

        <SectionWrapper bg="deep">
          <div className="grid gap-10 lg:grid-cols-[1fr_0.85fr] lg:items-start">
            <SectionHeader
              eyebrow="Diagnosis"
              headline="How We Diagnose Lead Leakage"
              subheadline="We trace the journey from ad impression to sales follow-up. The audit looks at what the visitor saw, what they submitted, what was tracked, and what happened after the lead entered the pipeline."
            />
            <GlassCard accent="blue">
              <h2 className="text-xl font-semibold text-white">
                Performance Marketing for Chandigarh, Tricity, India and Remote Clients
              </h2>
              <p className="mt-4 leading-7 text-slate-300">
                Technocrats Digimate works with businesses in Chandigarh, Mohali,
                Panchkula, Zirakpur, Ambala, Gurgaon, Delhi NCR, Dubai, and remote
                markets where lead quality, tracking, and follow-up discipline matter
                more than surface-level traffic metrics.
              </p>
            </GlassCard>
          </div>
        </SectionWrapper>

        <SectionWrapper bg="ink" glow>
          <div className="grid gap-8 rounded-md border border-gold/20 bg-gold/10 p-8 md:grid-cols-[1fr_auto] md:items-center">
            <div>
              <h2 className="text-2xl font-semibold text-white md:text-3xl">
                Request a Free Growth Audit
              </h2>
              <p className="mt-3 max-w-2xl leading-7 text-slate-300">
                Get a practical diagnosis of your ads, landing page, tracking,
                WhatsApp follow-up, CRM visibility, and lead quality.
              </p>
              <div className="mt-5 flex flex-wrap gap-3 text-sm text-slate-300">
                <Link className="text-gold hover:text-gold-soft" href="/real-estate-growth-audit">
                  Real estate audit
                </Link>
                <Link className="text-gold hover:text-gold-soft" href="/study-abroad-growth-audit">
                  Study abroad audit
                </Link>
                <Link className="text-gold hover:text-gold-soft" href="/services/social-media-marketing">
                  Social media marketing
                </Link>
              </div>
            </div>
            <Link
              href="/free-growth-audit"
              className="rounded-md bg-gold px-5 py-3 text-center text-sm font-semibold text-ink transition hover:bg-gold-soft"
            >
              Request a Free Growth Audit
            </Link>
          </div>
        </SectionWrapper>
      </main>
      <Footer />
    </>
  );
}
