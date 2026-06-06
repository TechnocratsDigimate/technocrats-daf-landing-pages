"use client";

import { useState } from "react";

const faqs = [
  {
    q: "Is the growth audit really free?",
    a: "Yes. We audit your ads, landing page, tracking, and follow-up — no charge, no obligation. If we find problems, we'll show you exactly what they are. Whether you work with us after that is your decision."
  },
  {
    q: "How long does the audit take?",
    a: "The application form takes under 2 minutes. The audit call is typically 30–45 minutes. We review your setup before the call so we don't waste your time on basics."
  },
  {
    q: "Do you only work with real estate and study abroad businesses?",
    a: "No — those are two core verticals where we have deep experience. We also work with clinics, education brands, coaching businesses, and other high-ticket service providers."
  },
  {
    q: "What is the Performance Marketing Survival Kit?",
    a: "PMSK is the education arm of Technocrats Digimate. It's a set of free guides, playbooks, and workshops for students, job seekers, and marketers who want to learn how to run and diagnose paid media campaigns — not just launch them."
  },
  {
    q: "I'm not ready for an agency. What should I do?",
    a: "Download the free Performance Marketing Survival Kit. It's a starting point — and if you're a business owner who wants to understand your campaign better before hiring, the guide is useful."
  }
];

export function FaqAccordion() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <section className="bg-ink py-16 md:py-24">
      <div className="mx-auto max-w-[1320px] px-5 md:px-8 lg:px-10">
        <div className="mx-auto max-w-2xl">
          <p className="text-center text-xs font-semibold uppercase tracking-[0.22em] text-gold">
            FAQ
          </p>
          <h2 className="mt-4 text-center text-3xl font-semibold text-white md:text-4xl">
            Frequently Asked Questions
          </h2>
          <p className="mt-4 text-center leading-7 text-slate-500">
            Clear answers before you book your free audit.
          </p>

          <div className="mt-10 divide-y divide-white/10">
            {faqs.map((faq, i) => (
              <div key={i}>
                <button
                  className="group flex w-full items-center justify-between py-5 text-left"
                  onClick={() => setOpenIndex(openIndex === i ? null : i)}
                  aria-expanded={openIndex === i}
                >
                  <span
                    className={`pr-4 font-medium transition-colors duration-200 ${
                      openIndex === i ? "text-gold" : "text-white group-hover:text-gold"
                    }`}
                  >
                    {faq.q}
                  </span>
                  <span
                    className={`flex-shrink-0 text-2xl font-light text-gold transition-transform duration-300 ${
                      openIndex === i ? "rotate-45" : "rotate-0"
                    }`}
                  >
                    +
                  </span>
                </button>
                <div
                  className={`overflow-hidden transition-all duration-300 ease-out ${
                    openIndex === i ? "max-h-64 pb-5" : "max-h-0"
                  }`}
                >
                  <p className="leading-7 text-slate-400">{faq.a}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
