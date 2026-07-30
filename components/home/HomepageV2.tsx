import Image from "next/image";
import Link from "next/link";

const stages = [
  ["Ads", "Qualified traffic"],
  ["Landing Page", "Message match"],
  ["Form", "Intent filter"],
  ["Tracking", "Reliable signals"],
  ["WhatsApp", "Fast follow-up"],
  ["CRM", "Pipeline context"],
  ["Sale", "Revenue outcome"]
];

const capabilities = [
  ["Paid acquisition", "Meta and Google campaigns structured around qualified demand."],
  ["Conversion experience", "Landing pages and forms aligned with the campaign promise."],
  ["Measurement", "Tracking that connects clicks, enquiries and sales follow-up."],
  ["Lead operations", "WhatsApp and CRM workflows that protect speed and context."]
];

const industries = [
  ["Real estate", "Buyer-intent journeys from campaign to project conversation.", "/real-estate-growth-audit"],
  ["Study abroad", "Student-enquiry systems built around qualification and counsellor follow-up.", "/study-abroad-growth-audit"],
  ["High-ticket services", "Connected acquisition where lead quality decides revenue.", "/free-growth-audit"]
];

function ArrowIcon() {
  return <span aria-hidden="true">→</span>;
}

function ConnectedDashboard() {
  return (
    <figure aria-label="Conceptual view of a connected lead-generation system" className="rounded-[28px] border border-line bg-white p-4 shadow-[0_24px_70px_rgba(4,14,24,0.12)] sm:p-6">
      <figcaption className="flex items-center justify-between border-b border-line pb-4">
        <span className="text-xs font-black uppercase tracking-[0.16em] text-ink">Connected system view</span>
        <span className="rounded-full bg-mist px-3 py-1 text-[11px] font-bold text-slate">Conceptual process</span>
      </figcaption>
      <div className="relative mt-5">
        <span aria-hidden="true" className="absolute bottom-4 left-[15px] top-4 w-px bg-line" />
        {stages.map(([name, outcome], index) => (
          <div className="relative grid grid-cols-[32px_1fr_auto] items-center gap-3 py-2" key={name}>
            <span className={`relative z-10 grid h-8 w-8 place-items-center rounded-full border text-xs font-black ${index === 3 ? "border-signal bg-signal text-white" : "border-line bg-white text-ink"}`}>
              {String(index + 1).padStart(2, "0")}
            </span>
            <span className="text-sm font-black text-ink">{name}</span>
            <span className="text-right text-xs font-semibold text-slate">{outcome}</span>
            {index < stages.length - 1 ? (
              <span aria-hidden="true" className="absolute -bottom-1 left-[11px] z-20 text-xs font-black text-signal">↓</span>
            ) : null}
          </div>
        ))}
      </div>
      <p className="mt-4 text-xs leading-5 text-slate">A diagnostic model—not client reporting software or a performance claim.</p>
    </figure>
  );
}

export function HomepageV2() {
  return (
    <main>
      <section className="overflow-hidden bg-mist">
        <div className="mx-auto grid min-h-[calc(100svh-72px)] max-w-[1240px] items-center gap-12 px-5 py-12 lg:grid-cols-[1.02fr_.98fr] lg:px-8 lg:py-16">
          <div>
            <p className="text-xs font-black uppercase tracking-[0.2em] text-signal">Connected performance marketing systems</p>
            <h1 className="mt-5 max-w-3xl text-4xl font-black leading-[1.06] tracking-[-0.035em] text-ink sm:text-5xl lg:text-[62px]">
              We connect your ads, landing pages, tracking and follow-up into one lead‑generation system.
            </h1>
            <p className="mt-6 max-w-2xl text-lg leading-8 text-slate">
              Technocrats Digimate diagnoses and fixes the gaps between ad spend and qualified sales conversations.
              Built for Indian businesses where lead quality matters more than vanity CPL.
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Link className="inline-flex min-h-12 items-center justify-center gap-2 rounded-lg bg-signal px-6 font-bold text-white hover:bg-signal-dark" data-cta-id="hero-growth-audit" href="/free-growth-audit">
                Book a Growth Audit <ArrowIcon />
              </Link>
              <Link className="inline-flex min-h-12 items-center justify-center gap-2 rounded-lg border border-ink px-6 font-bold text-ink hover:bg-white" data-cta-id="hero-learning-hub" href="/blog">
                Explore the Learning Hub <ArrowIcon />
              </Link>
            </div>
            <ul className="mt-8 flex flex-wrap gap-x-6 gap-y-3 text-sm font-bold text-slate">
              <li>Founder-led diagnosis</li>
              <li>Ads-to-CRM visibility</li>
              <li>No generic pitch</li>
            </ul>
          </div>
          <ConnectedDashboard />
        </div>
      </section>

      <section aria-label="Trust signals" className="border-y border-line bg-white">
        <div className="mx-auto grid max-w-[1240px] grid-cols-2 divide-x divide-y divide-line px-5 sm:grid-cols-4 sm:divide-y-0 md:px-8">
          {["Meta + Google expertise", "Landing-page diagnosis", "Tracking architecture", "WhatsApp + CRM follow-up"].map((item) => (
            <p className="flex min-h-24 items-center justify-center px-4 text-center text-sm font-black text-ink" key={item}>{item}</p>
          ))}
        </div>
      </section>

      <section className="bg-white py-14 md:py-28">
        <div className="mx-auto grid max-w-[1240px] gap-12 px-5 lg:grid-cols-[.85fr_1.15fr] lg:px-8">
          <div>
            <p className="text-xs font-black uppercase tracking-[0.2em] text-signal">Lead-leakage diagnostic</p>
            <h2 className="mt-4 text-3xl font-black tracking-tight text-ink md:text-4xl">The campaign is only one part of the result.</h2>
            <p className="mt-5 max-w-xl leading-7 text-slate">
              A strong ad can still produce weak sales conversations when the promise changes after the click,
              the form captures no intent, tracking loses context or follow-up arrives too late.
            </p>
            <p className="mt-5 max-w-xl text-sm leading-7 text-slate">
              The audit traces a lead from the first campaign impression through the landing page, form,
              measurement layer and sales hand-off. That makes the recommendation specific: protect what is
              already working, repair the weakest connection, and give the team a clearer next action.
            </p>
          </div>
          <div className="relative border-y border-line py-4 sm:py-8">
            <span aria-hidden="true" className="absolute bottom-10 left-[17px] top-10 w-px bg-line sm:bottom-auto sm:left-8 sm:right-8 sm:top-[53px] sm:h-px sm:w-auto" />
            <ol className="relative grid gap-1 sm:grid-cols-4 sm:gap-5">
              {[
                ["Message gap", "The page breaks the campaign promise."],
                ["Intent gap", "The form captures contact, not qualification."],
                ["Signal gap", "Platforms lose dependable conversion feedback."],
                ["Follow-up gap", "Sales receives the lead without speed or context."]
              ].map(([title, copy], index) => (
                <li className="relative grid grid-cols-[36px_1fr] gap-4 py-3 sm:block sm:py-0" key={title}>
                  <span className={`relative z-10 grid h-9 w-9 place-items-center rounded-full border text-xs font-black ${index === 2 ? "border-signal bg-signal text-white" : "border-line bg-white text-ink"}`}>
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <div className="sm:mt-5">
                    <h3 className="font-black text-ink">{title}</h3>
                    <p className="mt-1 text-sm leading-6 text-slate">{copy}</p>
                  </div>
                </li>
              ))}
            </ol>
          </div>
        </div>
      </section>

      <section className="bg-ink py-10 text-white md:py-28">
        <div className="mx-auto max-w-[1240px] px-5 md:px-8">
          <div className="max-w-3xl">
            <p className="text-xs font-black uppercase tracking-[0.2em] text-signal">The connected system</p>
            <h2 className="mt-4 text-2xl font-black tracking-tight md:text-4xl">Seven stages. One accountable growth path.</h2>
            <p className="mt-5 leading-7 text-slate-300">
              Each stage passes useful intent and measurement context to the next.
            </p>
          </div>
          <div className="relative mt-6 lg:mt-10">
            <span aria-hidden="true" className="absolute bottom-4 left-[16px] top-4 w-px bg-white/20 lg:bottom-auto lg:left-8 lg:right-8 lg:top-[18px] lg:h-px lg:w-auto" />
            <ol className="relative grid gap-0 pl-1 lg:grid-cols-7 lg:gap-4 lg:pl-0">
              {stages.map(([name, outcome], index) => (
                <li className="relative grid min-h-[48px] grid-cols-[32px_1fr] items-start gap-3 py-1 lg:block lg:min-h-0 lg:py-0" key={name}>
                  <span className={`relative z-10 grid h-8 w-8 place-items-center rounded-full border text-[11px] font-black lg:h-9 lg:w-9 lg:text-xs ${index === 3 ? "border-signal bg-signal text-white" : "border-white/25 bg-ink text-white"}`}>
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <div className="lg:pt-5">
                    <h3 className="text-sm font-black">{name}</h3>
                    <p className="mt-1 text-xs leading-5 text-slate-400">{outcome}</p>
                  </div>
                  {index < stages.length - 1 ? <span aria-hidden="true" className="absolute bottom-[-2px] left-[12px] z-20 text-xs text-signal lg:-right-3 lg:left-auto lg:top-[11px]">→</span> : null}
                </li>
              ))}
            </ol>
          </div>
        </div>
      </section>

      <section className="bg-mist py-20 md:py-28">
        <div className="mx-auto grid max-w-[1240px] gap-10 px-5 lg:grid-cols-2 lg:px-8">
          <div>
            <p className="text-xs font-black uppercase tracking-[0.2em] text-signal">Capabilities</p>
            <h2 className="mt-4 text-3xl font-black tracking-tight text-ink md:text-4xl">Built around the whole conversion journey.</h2>
            <div className="mt-8 grid gap-3 sm:grid-cols-2">
              {capabilities.map(([title, copy]) => (
                <article className="border-l-2 border-signal bg-white px-5 py-4 shadow-[0_8px_24px_rgba(4,14,24,0.05)]" key={title}>
                  <h3 className="font-black text-ink">{title}</h3>
                  <p className="mt-2 text-sm leading-6 text-slate">{copy}</p>
                </article>
              ))}
            </div>
          </div>
          <div>
            <p className="text-xs font-black uppercase tracking-[0.2em] text-signal">Industry pathways</p>
            <h2 className="mt-4 text-3xl font-black tracking-tight text-ink md:text-4xl">Different journeys need different qualification.</h2>
            <div className="mt-8 space-y-3">
              {industries.map(([title, copy, href]) => (
                <Link className="group flex min-h-24 items-center justify-between gap-5 border-b border-line bg-transparent px-1 py-5 first:border-t" href={href} key={title}>
                  <span>
                    <span className="block font-black text-ink">{title}</span>
                    <span className="mt-1 block text-sm leading-6 text-slate">{copy}</span>
                  </span>
                  <span className="text-xl text-signal transition group-hover:translate-x-1"><ArrowIcon /></span>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="bg-white py-20 md:py-28" id="proof">
        <div className="mx-auto grid max-w-[1240px] gap-10 px-5 lg:grid-cols-[.85fr_1.15fr] lg:px-8">
          <div>
            <p className="text-xs font-black uppercase tracking-[0.2em] text-signal">Useful audit outputs</p>
            <h2 className="mt-4 text-3xl font-black tracking-tight text-ink md:text-4xl">What your growth audit documents.</h2>
            <p className="mt-5 max-w-xl leading-7 text-slate">
              The review follows observable inputs across campaigns, landing pages, conversion events,
              qualification fields and the actual sales hand-off. Its purpose is to make the next corrective
              decision clearer, without presenting the diagnosis as a guaranteed outcome.
            </p>
          </div>
          <ol className="divide-y divide-line border-y border-line">
            {[
              ["Campaign-to-CRM journey map", "A shared view of how traffic, page intent, form data and follow-up context move through the current system."],
              ["Tracking and qualification gaps", "Specific points where measurement becomes unreliable or the lead reaches sales without useful qualification."],
              ["Prioritised corrective action plan", "A practical order for addressing the most consequential gaps using the evidence available in the audit."]
            ].map(([title, copy], index) => (
              <li className="grid grid-cols-[44px_1fr] gap-4 py-6" key={title}>
                <span className="text-sm font-black text-signal">{String(index + 1).padStart(2, "0")}</span>
                <div>
                  <h3 className="text-lg font-black text-ink">{title}</h3>
                  <p className="mt-2 text-sm leading-6 text-slate">{copy}</p>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section className="border-y border-line bg-mist py-20 md:py-24">
        <div className="mx-auto max-w-[1240px] px-5 md:px-8">
          <div className="max-w-2xl">
            <p className="text-xs font-black uppercase tracking-[0.2em] text-signal">Learn and diagnose</p>
            <h2 className="mt-4 text-3xl font-black tracking-tight text-ink md:text-4xl">Learn what to fix before you spend more.</h2>
            <p className="mt-5 leading-7 text-slate">
              Use practical guides, checklists and diagnostics to understand common lead-generation gaps,
              prepare better questions for your team and make more informed decisions about the next investment.
            </p>
          </div>
          <div className="mt-10 grid gap-4 md:grid-cols-3">
            {[
              ["Learning Hub", "Practical guidance on ads, tracking, automation and conversion.", "/blog", "Read the guides"],
              ["Free resources", "Checklists and field guides for marketers and business owners.", "/resources", "Browse resources"],
              ["Growth audit checklist", "A useful starting point for reviewing campaign, page, tracking and follow-up hand-offs.", "/resources", "Open the resources"]
            ].map(([title, copy, href, action]) => (
              <article className="flex min-h-64 flex-col rounded-2xl border border-line bg-white p-6" key={title}>
                <div aria-hidden="true" className="h-20 rounded-xl border border-line bg-mist p-3">
                  <div className="h-2 w-1/3 rounded bg-signal" />
                  <div className="mt-3 h-2 w-3/4 rounded bg-line" />
                  <div className="mt-2 h-2 w-1/2 rounded bg-line" />
                </div>
                <h3 className="mt-6 text-xl font-black text-ink">{title}</h3>
                <p className="mt-2 flex-1 text-sm leading-6 text-slate">{copy}</p>
                <Link className="mt-5 inline-flex min-h-11 items-center gap-2 font-bold text-ink hover:text-signal" href={href}>{action} <ArrowIcon /></Link>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-white py-20 md:py-28">
        <div className="mx-auto grid max-w-[1240px] gap-12 px-5 lg:grid-cols-[.85fr_1.15fr] lg:px-8">
          <div className="relative min-h-[360px] overflow-hidden border-l-4 border-signal bg-mist">
            <Image alt="Gautam Punj, founder and lead strategist at Technocrats Digimate" className="h-full min-h-[360px] w-full object-cover object-center" height={720} loading="lazy" sizes="(min-width: 1024px) 40vw, 100vw" src="/assets/brand/founder.jpeg" width={640} />
          </div>
          <div>
            <p className="text-xs font-black uppercase tracking-[0.2em] text-signal">Founder-led diagnosis</p>
            <h2 className="mt-4 text-3xl font-black tracking-tight text-ink md:text-4xl">Your growth system is reviewed by Gautam Punj.</h2>
            <p className="mt-5 leading-7 text-slate">
              Gautam works across Meta Ads, Google Ads, funnel architecture, tracking and lead operations. The
              audit starts with where the system loses intent or visibility—not with a generic media plan. You
              leave with a prioritised view of the journey, including what can be corrected internally and where
              specialist implementation may help.
            </p>
            <div className="mt-10 space-y-3">
              {[
                ["Is the growth audit free?", "Yes. The initial diagnosis is free and carries no obligation."],
                ["Do you only work with real estate and study abroad?", "No. Those are core pathways, alongside education, clinics and other high-ticket services."],
                ["What if I am not ready for an agency?", "Start with the Learning Hub and free resources, then apply the frameworks internally."]
              ].map(([question, answer]) => (
                <details className="group rounded-xl border border-line p-5" key={question}>
                  <summary className="cursor-pointer list-none font-black text-ink">{question}</summary>
                  <p className="mt-3 text-sm leading-6 text-slate">{answer}</p>
                </details>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="bg-signal py-16 text-white md:py-20">
        <div className="mx-auto flex max-w-[1240px] flex-col gap-8 px-5 md:flex-row md:items-center md:justify-between md:px-8">
          <div className="max-w-3xl">
            <p className="text-xs font-black uppercase tracking-[0.2em] text-white/75">Start with diagnosis</p>
            <h2 className="mt-3 text-3xl font-black tracking-tight md:text-5xl">See where your lead‑generation system loses momentum.</h2>
            <p className="mt-4 max-w-2xl leading-7 text-white/85">
              Bring the campaigns, landing pages and follow-up process you use today. We will map the hand-offs,
              identify the most consequential leak and outline a practical sequence for improving lead quality,
              measurement confidence and sales response.
            </p>
          </div>
          <Link className="inline-flex min-h-12 shrink-0 items-center justify-center gap-2 rounded-lg bg-white px-6 font-black text-signal hover:bg-mist" data-cta-id="closing-growth-audit" href="/free-growth-audit">
            Book a Growth Audit <ArrowIcon />
          </Link>
        </div>
      </section>
    </main>
  );
}
