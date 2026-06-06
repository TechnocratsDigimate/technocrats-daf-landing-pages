import type { Metadata } from "next";
import Link from "next/link";
import { BrandHeader } from "@/components/BrandHeader";
import { Footer } from "@/components/Footer";
import { GlassCard } from "@/components/ui/GlassCard";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { SectionWrapper } from "@/components/ui/SectionWrapper";

const pageTitle = "Social Media Marketing Agency | Technocrats Digimate";
const pageDescription =
  "Social media marketing services for brands that need content strategy, Instagram and LinkedIn growth, reels, campaigns, community building, and lead generation support.";
const canonicalUrl = "https://technocratsdigimate.com/services/social-media-marketing";

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
    type: "website"
  }
};

const channels = [
  {
    title: "Instagram",
    body: "Reels, carousels, proof-led posts, and campaign content that make the brand easier to trust before someone clicks an ad or sends an enquiry."
  },
  {
    title: "LinkedIn",
    body: "Founder-led and brand-led content that explains your thinking, shows expertise, and supports higher-ticket buying decisions."
  },
  {
    title: "Facebook",
    body: "Audience education, campaign support, retargeting-friendly content, and social proof that can reinforce paid acquisition."
  },
  {
    title: "YouTube",
    body: "Short educational videos, explainers, and repurposed founder content that can support discovery and remarketing."
  }
];

const contentFormats = [
  "Reels and short-form video ideas",
  "Static posts and carousels",
  "Campaign content calendars",
  "Founder-led educational content",
  "Lead magnet and audit promotion posts",
  "Content that supports paid ads and retargeting"
];

const industries = [
  "Real estate brands that need trust before site visits",
  "Study abroad consultants explaining outcomes and process",
  "Education brands and institutes building authority",
  "Clinics and healthcare providers simplifying decisions",
  "High-ticket service businesses led by founder expertise"
];

const problems = [
  "Posting regularly without a clear positioning system",
  "Content that gets attention but does not support lead quality",
  "Founder knowledge staying private instead of becoming useful content",
  "Organic and paid campaigns running with different messages",
  "No repeatable process for ideas, production, publishing, and learning"
];

const serviceJsonLd = {
  "@context": "https://schema.org",
  "@type": "Service",
  name: "Social Media Marketing",
  provider: {
    "@type": "Organization",
    name: "Technocrats Digimate Pvt Ltd",
    url: "https://technocratsdigimate.com"
  },
  areaServed: ["Chandigarh", "Tricity", "India", "Dubai", "UAE"],
  serviceType: [
    "Social media marketing",
    "Instagram marketing",
    "LinkedIn marketing",
    "Content strategy",
    "Community building",
    "Lead generation support"
  ],
  url: canonicalUrl
};

export default function SocialMediaMarketingPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceJsonLd) }}
      />
      <BrandHeader />
      <main className="bg-ink text-white">
        <SectionWrapper bg="deep" grid glow glowColor="blue" className="pt-32 md:pt-40">
          <div className="grid gap-10 lg:grid-cols-[1fr_0.9fr] lg:items-center">
            <div>
              <span className="inline-flex rounded-full border border-blue-500/30 bg-blue-500/10 px-3 py-1 text-xs font-semibold uppercase tracking-[0.18em] text-blue-300">
                Social Media Marketing
              </span>
              <h1 className="mt-5 max-w-4xl text-4xl font-semibold leading-tight text-white md:text-6xl">
                Social Media Marketing Agency for Growth-Focused Brands
              </h1>
              <p className="mt-6 max-w-2xl text-lg leading-8 text-slate-300">
                We help brands turn content into a trust-building system that supports
                paid ads, lead generation, founder visibility, and clearer buying
                decisions.
              </p>
              <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                <Link
                  href="/free-growth-audit"
                  className="rounded-md bg-gold px-5 py-3 text-center text-sm font-semibold text-ink transition hover:bg-gold-soft"
                >
                  Start a Free Growth Audit
                </Link>
                <Link
                  href="/services/performance-marketing-lead-generation"
                  className="rounded-md border border-white/10 px-5 py-3 text-center text-sm font-semibold text-gold transition hover:border-gold/40 hover:text-gold-soft"
                >
                  Performance Marketing
                </Link>
              </div>
            </div>
            <GlassCard className="space-y-4">
              <p className="text-sm font-semibold uppercase tracking-[0.18em] text-blue-300">
                Content with a job to do
              </p>
              <p className="leading-7 text-slate-300">
                Social media should help prospects understand what you do, why it
                matters, how you think, and what action to take next. The goal is not
                noise. The goal is trust before the lead.
              </p>
            </GlassCard>
          </div>
        </SectionWrapper>

        <SectionWrapper bg="ink">
          <SectionHeader
            eyebrow="Trust System"
            headline="Social Media That Builds Trust Before the Lead"
            subheadline="For high-ticket brands, content often does the first layer of sales education. It helps prospects understand the problem before they speak to your team."
          />
          <div className="mt-10 grid gap-5 md:grid-cols-3">
            {[
              "Clarify what your brand stands for.",
              "Make expertise visible before the sales call.",
              "Support ads with consistent proof and education."
            ].map((item) => (
              <GlassCard key={item} hover>
                <h2 className="text-lg font-semibold leading-7 text-white">{item}</h2>
              </GlassCard>
            ))}
          </div>
        </SectionWrapper>

        <SectionWrapper bg="panel">
          <SectionHeader
            eyebrow="Channels"
            headline="What We Do Across Instagram, LinkedIn, Facebook and YouTube"
            subheadline="Each platform needs a role. We use social media to explain, educate, build proof, and support the conversion journey."
          />
          <div className="mt-10 grid gap-5 md:grid-cols-2">
            {channels.map((channel) => (
              <GlassCard key={channel.title} accent="blue">
                <h2 className="text-xl font-semibold text-white">{channel.title}</h2>
                <p className="mt-3 leading-7 text-slate-300">{channel.body}</p>
              </GlassCard>
            ))}
          </div>
        </SectionWrapper>

        <SectionWrapper bg="deep" grid>
          <div className="grid gap-10 lg:grid-cols-[0.95fr_1.05fr]">
            <SectionHeader
              eyebrow="Content Formats"
              headline="Reels, Posts, Carousels, Campaigns and Content Strategy"
              subheadline="We turn positioning, customer questions, objections, proof points, and founder expertise into practical content themes."
            />
            <div className="grid gap-4 sm:grid-cols-2">
              {contentFormats.map((format) => (
                <GlassCard key={format}>
                  <h2 className="text-base font-semibold text-white">{format}</h2>
                </GlassCard>
              ))}
            </div>
          </div>
        </SectionWrapper>

        <SectionWrapper bg="ink">
          <div className="grid gap-10 lg:grid-cols-2">
            <div>
              <SectionHeader
                eyebrow="Industries"
                headline="Social Media for Real Estate, Study Abroad, Education, Clinics and Service Brands"
                subheadline="The content strategy changes by industry, but the job is consistent: build trust, reduce confusion, and support qualified enquiries."
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
            <GlassCard accent="gold">
              <h2 className="text-2xl font-semibold text-white">
                How Organic Content Supports Paid Ads
              </h2>
              <p className="mt-4 leading-7 text-slate-300">
                Paid ads create reach, but social content often creates context. A
                prospect who sees useful posts, founder explanations, proof-led
                content, and consistent messaging is easier to qualify than someone
                seeing a disconnected ad for the first time.
              </p>
              <Link
                href="/services/performance-marketing-lead-generation"
                className="mt-5 inline-flex text-sm font-semibold text-gold hover:text-gold-soft"
              >
                See how this connects to performance marketing
              </Link>
            </GlassCard>
          </div>
        </SectionWrapper>

        <SectionWrapper bg="panel">
          <SectionHeader
            eyebrow="Founder-Led Content"
            headline="Founder-Led and Brand-Led Content Systems"
            subheadline="Some brands need the founder's thinking in public. Others need a clear brand voice. Both need a repeatable system for ideas, approvals, publishing, and learning."
          />
          <div className="mt-10 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
            {[
              "Positioning and content pillars",
              "Founder POV and educational angles",
              "Campaign themes and lead magnet support",
              "Posting cadence and content calendar",
              "Organic-to-paid message alignment",
              "Monthly learning and topic refinement"
            ].map((item) => (
              <GlassCard key={item} hover>
                <h2 className="text-lg font-semibold text-white">{item}</h2>
              </GlassCard>
            ))}
          </div>
        </SectionWrapper>

        <SectionWrapper bg="deep">
          <div className="grid gap-10 lg:grid-cols-[1fr_0.9fr]">
            <SectionHeader
              eyebrow="Problems"
              headline="Common Social Media Problems We Fix"
              subheadline="Most brands do not need more random posting. They need clearer topics, stronger proof, better distribution, and a connection between content and lead generation."
            />
            <ul className="space-y-3">
              {problems.map((problem) => (
                <li key={problem} className="flex gap-3 rounded-md border border-white/10 bg-white/[0.03] p-4 text-slate-300">
                  <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-blue-500" />
                  {problem}
                </li>
              ))}
            </ul>
          </div>
        </SectionWrapper>

        <SectionWrapper bg="ink">
          <GlassCard accent="blue" className="grid gap-8 md:grid-cols-[1fr_auto] md:items-center">
            <div>
              <h2 className="text-2xl font-semibold text-white md:text-3xl">
                Social Media Marketing for Chandigarh, Tricity, India and Remote Clients
              </h2>
              <p className="mt-3 max-w-3xl leading-7 text-slate-300">
                We work with brands in Chandigarh, Mohali, Panchkula, Zirakpur,
                Ambala, Gurgaon, Delhi NCR, Dubai, and remote markets where content
                needs to support trust, visibility, and better lead quality.
              </p>
              <div className="mt-5 flex flex-wrap gap-3 text-sm">
                <Link className="text-gold hover:text-gold-soft" href="/resources">
                  Resources
                </Link>
                <Link className="text-gold hover:text-gold-soft" href="/real-estate-growth-audit">
                  Real estate audit
                </Link>
                <Link className="text-gold hover:text-gold-soft" href="/study-abroad-growth-audit">
                  Study abroad audit
                </Link>
              </div>
            </div>
            <Link
              href="/free-growth-audit"
              className="rounded-md bg-gold px-5 py-3 text-center text-sm font-semibold text-ink transition hover:bg-gold-soft"
            >
              Start a Free Growth Audit
            </Link>
          </GlassCard>
        </SectionWrapper>
      </main>
      <Footer />
    </>
  );
}
