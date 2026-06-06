import { SectionWrapper } from "@/components/ui/SectionWrapper";
import { SectionHeader } from "@/components/ui/SectionHeader";

const leakSteps = [
  { label: "Ad Budget", width: "w-full", leak: null, pct: "100% in" },
  { label: "Landing Page Visitors", width: "w-10/12", leak: "~15% lost — page mismatch", pct: null },
  { label: "Form Submissions", width: "w-7/12", leak: "~40% lost — zero qualification", pct: null },
  { label: "WhatsApp Replies", width: "w-4/12", leak: "~60% lost — slow follow-up", pct: null },
  { label: "Closed Sales", width: "w-1/5", leak: "~85% lost — no pipeline", pct: null }
];

const painCards = [
  "Cheap leads that never answer the phone",
  "Agencies optimising CPL instead of pipeline",
  "No visibility from click to closed sale",
  "Follow-up that loses leads in the first 5 minutes"
];

export function ProblemSection() {
  return (
    <SectionWrapper bg="ink" grid>
      <div className="grid gap-12 lg:grid-cols-2 lg:items-center lg:gap-16">

        {/* Left: Copy + pain cards */}
        <div>
          <SectionHeader
            eyebrow="The Real Problem"
            headline="Most Businesses Don't Have an Ads Problem. They Have a System Problem."
            highlight="System Problem."
            subheadline="The campaign is running. The budget is spending. The leads come in. None of them convert. Your agency blames the market."
          />
          <p className="mt-5 leading-8 text-slate-400">
            The problem is never just the ad. It&apos;s the landing page that mismatches the promise. The form that qualifies nobody. The WhatsApp follow-up that arrives 6 hours late. The CRM with no pipeline visibility. We fix the system — not just the campaign.
          </p>

          <div className="mt-8 grid grid-cols-1 gap-3 sm:grid-cols-2">
            {painCards.map((card) => (
              <div
                key={card}
                className="flex items-start gap-3 rounded-xl border border-white/10 bg-white/[0.03] p-4"
              >
                <span className="mt-1 h-2 w-2 flex-shrink-0 animate-pulse rounded-full bg-red-400" />
                <p className="text-sm leading-6 text-slate-300">{card}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Right: Leaking Funnel Diagram */}
        <div className="flex flex-col items-center">
          <p className="mb-6 text-xs font-semibold uppercase tracking-[0.18em] text-slate-500">
            Where Your Leads Are Leaking
          </p>
          <div className="w-full space-y-0">
            {leakSteps.map((step, i) => (
              <div key={step.label} className="flex flex-col items-center">
                <div
                  className={`relative flex items-center justify-between rounded-md border border-white/10 bg-white/[0.06] px-4 py-3 text-sm transition-all duration-200 hover:bg-white/[0.09] ${step.width}`}
                >
                  <span className="font-medium text-white">{step.label}</span>
                  {step.leak ? (
                    <span className="ml-2 text-xs font-medium text-red-400">{step.leak}</span>
                  ) : (
                    <span className="text-xs font-medium text-emerald-400">{step.pct}</span>
                  )}
                </div>
                {i < leakSteps.length - 1 && (
                  <div className="h-4 w-px border-l-2 border-dashed border-white/15" />
                )}
              </div>
            ))}
          </div>
          <p className="mt-5 max-w-xs text-center text-xs text-slate-500">
            Every disconnected step loses a percentage of leads. We audit and fix each one.
          </p>
        </div>

      </div>
    </SectionWrapper>
  );
}
