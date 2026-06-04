import type { Metadata } from "next";
import { BrandHeader } from "@/components/BrandHeader";
import { Footer } from "@/components/Footer";

export const metadata: Metadata = {
  title: "Privacy Policy | Technocrats Digimate",
  description: "Privacy policy for Technocrats Digimate diagnostic audit funnel pages."
};

const policySections = [
  {
    title: "1. Information We Collect",
    body: [
      "When you submit an audit form, we collect the personal and business details you voluntarily provide, such as your name, business name, phone or WhatsApp number, email address, city or location, business category, budget range, current lead generation challenges, services you are interested in, preferred call time, preferred language, and related form answers.",
      "With your consent, we may collect anonymous behavioral events such as page visits, form starts, completed form steps, form abandonment status, WhatsApp clicks, booking clicks, and campaign attribution parameters such as utm_source, utm_medium, utm_campaign, utm_content, and utm_term. We do not intentionally collect personal details, typed form values, hidden personal identity, or device fingerprinting data from users who do not submit the form."
    ]
  },
  {
    title: "2. How We Use Your Information",
    body: [
      "We use submitted information to contact you regarding your enquiry or audit request, understand your business and marketing requirements, schedule and confirm consultation calls, provide recommendations, send relevant follow-ups, and maintain business records.",
      "We use consented anonymous events to understand whether visitors are starting the form, completing steps, leaving before submission, clicking WhatsApp, or opening the booking page. This helps us improve the website and measure campaign performance without collecting personal details from unsubmitted users."
    ]
  },
  {
    title: "3. Legal Basis and Consent",
    body: [
      "By submitting your information through our website, forms, landing pages, WhatsApp links, or booking pages, you consent to Technocrats Digimate collecting and processing your submitted information for the purposes mentioned in this Privacy Policy.",
      "Non-essential analytics, advertising, remarketing, and retargeting technologies are controlled through our cookie consent banner. You can accept or reject non-essential tracking, and you can revisit your choice through the Cookie Preferences link in the footer."
    ]
  },
  {
    title: "4. Cookies, Pixels, and Tracking Technologies",
    body: [
      "If you accept non-essential tracking, we may use cookies, Google Tag Manager, Google Analytics 4, Meta Pixel, remarketing or retargeting tools, advertising tags, and related performance tools.",
      "These tools may receive anonymous behavioral events such as PageView, FormStarted, StepCompleted, FormAbandoned, LeadSubmitted, ThankYouPageView, WhatsAppClicked, and BookingClicked. Form abandonment events do not include form answers, name, phone, email, business name, budget, or other typed personal details.",
      "If you reject non-essential tracking, we do not intentionally fire Google Analytics 4, Google Tag Manager marketing or analytics events, Meta Pixel, remarketing events, or anonymous behavioral tracking events from these landing pages."
    ]
  },
  {
    title: "5. How We Share Your Information",
    body: [
      "We do not sell your personal information. We may share limited information with trusted service providers such as hosting providers, CRM or lead management tools, Google Sheets or form storage tools, email and notification tools, analytics platforms, advertising platforms, booking tools, WhatsApp, or communication service providers."
    ]
  },
  {
    title: "6. Data Security and Retention",
    body: [
      "We take reasonable technical and organizational measures to protect your information, but no online transmission or electronic storage method is completely secure. We retain information only for as long as necessary for enquiry follow-up, business communication, reporting, legal compliance, and internal records."
    ]
  },
  {
    title: "7. Your Rights",
    body: [
      "Subject to applicable law, you may request access, correction, deletion, withdrawal of consent, opt out of marketing communication, or raise a concern about how your information is processed."
    ]
  },
  {
    title: "8. Third-Party Links",
    body: [
      "Our website or landing pages may contain links to third-party websites, booking pages, WhatsApp, social media platforms, or external tools. We are not responsible for the privacy practices, content, or security of third-party websites."
    ]
  },
  {
    title: "9. Contact Us",
    body: [
      "Technocrats Digimate Pvt Ltd",
      "Email: gautam.punj@technocratsdigimate.com",
      "Phone / WhatsApp: +919467744000",
      "Website: www.technocratsdigimate.com",
      "Address: Yamunanagar, Haryana"
    ]
  }
];

export default function PrivacyPolicyPage() {
  const sourceUrl = process.env.NEXT_PUBLIC_PRIVACY_POLICY_URL;

  return (
    <>
      <BrandHeader />
      <main className="bg-ink px-5 pb-14 pt-28 text-white">
        <article className="mx-auto max-w-4xl">
          <p className="text-sm font-semibold uppercase tracking-[0.22em] text-gold">Privacy Policy</p>
          <h1 className="mt-4 text-4xl font-semibold leading-tight md:text-5xl">Technocrats Digimate Pvt Ltd Privacy Policy</h1>
          <p className="mt-5 text-slate-400">Effective Date: 01/04/2026</p>
          <div className="mt-8 space-y-7 text-base leading-8 text-slate-300">
            <p>
              Technocrats Digimate Pvt Ltd respects your privacy and is committed to protecting the personal information you share through our website,
              landing pages, lead forms, consultation forms, WhatsApp links, booking pages, advertisements, and related digital properties.
            </p>
            {policySections.map((section) => (
              <section className="rounded-md border border-white/10 bg-white/[0.03] p-5" key={section.title}>
                <h2 className="text-xl font-semibold text-white">{section.title}</h2>
                <div className="mt-3 space-y-3">
                  {section.body.map((paragraph) => (
                    <p key={paragraph}>{paragraph}</p>
                  ))}
                </div>
              </section>
            ))}
          </div>
          {sourceUrl ? (
            <a className="mt-8 inline-block text-sm font-semibold text-gold transition hover:text-gold-soft" href={sourceUrl} rel="noreferrer" target="_blank">
              View source policy document
            </a>
          ) : null}
        </article>
      </main>
      <Footer />
    </>
  );
}
