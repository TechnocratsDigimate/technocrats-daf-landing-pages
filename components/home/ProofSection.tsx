import { SectionWrapper } from "@/components/ui/SectionWrapper";
import { SectionHeader } from "@/components/ui/SectionHeader";

const metrics = [
  {
    title: "CPL Efficiency",
    body: "We check whether your cost per lead is improving without reducing lead quality. CPL going down while quality drops is not a win — we track both.",
    label: "Tracked weekly",
    icon: (
      <svg className="h-5 w-5 text-gold" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 18L9 11.25l4.306 4.307a11.95 11.95 0 015.814-5.519l2.74-1.22m0 0l-5.94-2.28m5.94 2.28l-2.28 5.941" />
      </svg>
    ),
  },
  {
    title: "Booked Call Rate",
    body: "We measure how many leads move from form submission to actual counselling or sales conversations — not just raw lead volume.",
    label: "Lead-to-call visibility",
    icon: (
      <svg className="h-5 w-5 text-gold" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 002.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 01-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 00-1.091-.852H4.5A2.25 2.25 0 002.25 4.5v2.25z" />
      </svg>
    ),
  },
  {
    title: "CPA Improvement",
    body: "We review whether campaigns are improving cost per qualified opportunity — not just chasing cheap clicks or form fills that never convert.",
    label: "Qualified acquisition",
    icon: (
      <svg className="h-5 w-5 text-gold" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v12m-3-2.818l.879.659c1.171.879 3.07.879 4.242 0 1.172-.879 1.172-2.303 0-3.182C13.536 12.219 12.768 12 12 12c-.725 0-1.45-.22-2.003-.659-1.106-.879-1.106-2.303 0-3.182s2.9-.879 4.006 0l.415.33M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
  },
  {
    title: "Lead-to-Sale Visibility",
    body: "We connect ad source, landing page, WhatsApp follow-up, and CRM movement so you can see exactly where leads drop before becoming clients.",
    label: "Pipeline clarity",
    icon: (
      <svg className="h-5 w-5 text-gold" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 3v11.25A2.25 2.25 0 006 16.5h2.25M3.75 3h-1.5m1.5 0h16.5m0 0h1.5m-1.5 0v11.25A2.25 2.25 0 0118 16.5h-2.25m-7.5 0h7.5m-7.5 0l-1 3m8.5-3l1 3m0 0l.5 1.5m-.5-1.5h-9.5m0 0l-.5 1.5M9 11.25v1.5M12 9v3.75m3-6.75v6.75" />
      </svg>
    ),
  },
];

export function ProofSection() {
  return (
    <SectionWrapper bg="ink" grid id="proof">
      <SectionHeader
        eyebrow="How We Measure"
        headline="What We Measure Before Scaling"
        subheadline="Scaling ad spend without measuring these four things first is how budgets get wasted. We track all of them from day one."
      />

      <div className="mt-10 grid grid-cols-1 gap-5 sm:grid-cols-2">
        {metrics.map((item) => (
          <div
            key={item.title}
            className="group rounded-2xl border border-white/10 bg-white/[0.03] p-6 backdrop-blur-sm transition-all duration-300 hover:-translate-y-1 hover:border-gold/25 hover:shadow-gold"
          >
            {/* Icon */}
            <div className="mb-4 inline-flex h-10 w-10 items-center justify-center rounded-lg border border-gold/20 bg-gold/10">
              {item.icon}
            </div>

            {/* Title */}
            <h3 className="mb-2 font-semibold text-white">{item.title}</h3>

            {/* Body */}
            <p className="text-sm leading-7 text-slate-400">{item.body}</p>

            {/* Label pill */}
            <div className="mt-4">
              <span className="inline-flex items-center gap-1.5 rounded-full border border-gold/20 bg-gold/[0.07] px-3 py-1 text-xs font-medium text-gold/80">
                <span className="h-1 w-1 rounded-full bg-gold/60" />
                {item.label}
              </span>
            </div>
          </div>
        ))}
      </div>

      {/* Bottom CTA */}
      <div className="mt-8 text-center">
        <a
          href="/free-growth-audit"
          className="inline-flex items-center gap-1 text-sm font-semibold text-gold transition-colors duration-200 hover:text-gold-soft"
        >
          Want us to measure this for your campaign? Book a free audit →
        </a>
      </div>
    </SectionWrapper>
  );
}
