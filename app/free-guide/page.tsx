import { BrandHeader } from "@/components/BrandHeader";
import { Footer } from "@/components/Footer";
import { GuideForm } from "./GuideForm";

export const metadata = {
  title: "Free Google AI Marketing Stack Guide | Technocrats Digimate",
  description:
    "Replace a ₹15,000–20,000/month marketing tool stack using 4 free Google AI tools. Download the free guide by Technocrats Digimate.",
};

const tools = [
  {
    num: "01",
    name: "Google AI Studio",
    replaces: "Strategy consultant",
    desc: "Generate campaign angles, hooks, and content pillars in minutes based on your niche and audience.",
  },
  {
    num: "02",
    name: "Nano Banana Pro",
    replaces: "Freelance graphic designer",
    desc: "Generate scroll-stopping static ad creatives and multiple variations for A/B testing — without hiring a designer.",
  },
  {
    num: "03",
    name: "Stitch",
    replaces: "UI/UX designer",
    desc: "Turn a rough landing page brief into a visual concept before writing a line of code.",
  },
  {
    num: "04",
    name: "Opal",
    replaces: "No-code automation (Zapier-lite)",
    desc: "Chain research, writing, and formatting steps into one repeatable automated workflow.",
  },
];

export default function FreeGuidePage() {
  return (
    <>
      <BrandHeader />
      <main className="min-h-screen bg-navy text-white">

        {/* Hero */}
        <section className="mx-auto max-w-5xl px-6 pb-16 pt-20">
          <div className="grid gap-12 lg:grid-cols-[1fr_400px]">
            {/* Left */}
            <div>
              <p className="mb-4 inline-block rounded-full border border-gold/30 bg-gold/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-widest text-gold">
                Free AI Guide · Google Marketing Stack
              </p>

              <h1 className="mb-5 text-4xl font-extrabold leading-tight text-white md:text-5xl">
                Replace a ₹15,000–20,000/month tool stack
                <span className="text-gold"> using 4 free Google AI tools.</span>
              </h1>

              <p className="mb-8 text-lg leading-relaxed text-slate-300">
                Most marketers think they&apos;ve &ldquo;adopted AI&rdquo; because they use ChatGPT for captions.
                That&apos;s one tool doing one small task. Real AI adoption means building a system —
                campaign ideas, ad creatives, landing page concepts, and automated workflows.
                Google has quietly released four free tools that cover almost the entire top-of-funnel workflow.
              </p>

              <blockquote className="rounded-xl border border-gold/20 bg-gold/5 px-5 py-4 text-sm italic text-slate-300">
                &ldquo;Tools don&apos;t make money. Systems make money. The goal isn&apos;t to use more AI tools —
                it&apos;s to connect them into one workflow that runs without you.&rdquo;
                <span className="mt-2 block not-italic font-semibold text-gold">— Gautam Punj, Technocrats Digimate</span>
              </blockquote>

              {/* What's inside */}
              <div className="mt-10">
                <p className="mb-4 text-sm font-semibold uppercase tracking-widest text-gold">What&apos;s inside</p>
                <ul className="space-y-2.5">
                  {[
                    "The 4 free Google AI tools and what each one replaces",
                    "Exact prompts you can copy for each tool right now",
                    "How to chain all 4 tools into one lead-gen production line",
                    "The full system: Ideate → Create → Convert → Automate",
                  ].map((item) => (
                    <li key={item} className="flex items-start gap-3 text-slate-300">
                      <span className="mt-0.5 shrink-0 text-gold">✓</span>
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Right — Form */}
            <div className="lg:pt-4">
              <div className="rounded-2xl border border-gold/20 bg-white/[0.03] p-7">
                <p className="mb-1 text-lg font-bold text-white">Get the Free Guide</p>
                <p className="mb-6 text-sm text-slate-400">
                  Enter your WhatsApp number — verify with OTP — download instantly.
                </p>
                <GuideForm />
              </div>
            </div>
          </div>
        </section>

        {/* Tools breakdown */}
        <section className="border-t border-white/5 bg-white/[0.02]">
          <div className="mx-auto max-w-5xl px-6 py-16">
            <p className="mb-2 text-sm font-semibold uppercase tracking-widest text-gold">The Toolkit · 4 Tools</p>
            <h2 className="mb-10 text-2xl font-extrabold text-white md:text-3xl">
              What each tool does — and what it replaces
            </h2>
            <div className="grid gap-5 md:grid-cols-2">
              {tools.map((t) => (
                <div
                  key={t.num}
                  className="rounded-xl border border-white/10 bg-white/[0.03] p-6 transition hover:border-gold/20"
                >
                  <div className="mb-3 flex items-center gap-3">
                    <span className="text-2xl font-extrabold text-gold/40">{t.num}</span>
                    <div>
                      <h3 className="font-bold text-white">{t.name}</h3>
                      <p className="text-xs text-slate-500">Replaces: {t.replaces}</p>
                    </div>
                  </div>
                  <p className="text-sm leading-relaxed text-slate-400">{t.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* System flow */}
        <section className="mx-auto max-w-5xl px-6 py-16">
          <p className="mb-2 text-sm font-semibold uppercase tracking-widest text-gold">The System</p>
          <h2 className="mb-10 text-2xl font-extrabold text-white md:text-3xl">
            Used together — it becomes a lead-gen production line
          </h2>
          <div className="grid gap-4 md:grid-cols-4">
            {[
              { step: "1", label: "IDEATE", tool: "AI Studio", desc: "Campaign angles + hooks from pain points" },
              { step: "2", label: "CREATE", tool: "Nano Banana Pro", desc: "Ad creatives in multiple variations" },
              { step: "3", label: "CONVERT", tool: "Stitch", desc: "Landing page concept that matches the ad" },
              { step: "4", label: "AUTOMATE", tool: "Opal", desc: "One repeatable workflow, no code" },
            ].map((s, i) => (
              <div key={s.step} className="relative">
                <div className="rounded-xl border border-white/10 bg-white/[0.03] p-5 text-center">
                  <div className="mx-auto mb-3 flex h-10 w-10 items-center justify-center rounded-full bg-gold/10 text-lg font-extrabold text-gold">
                    {s.step}
                  </div>
                  <p className="mb-0.5 text-xs font-bold uppercase tracking-widest text-gold">{s.label}</p>
                  <p className="mb-2 font-semibold text-white">{s.tool}</p>
                  <p className="text-xs text-slate-400">{s.desc}</p>
                </div>
                {i < 3 && (
                  <div className="absolute -right-3 top-1/2 hidden -translate-y-1/2 text-slate-600 md:block">→</div>
                )}
              </div>
            ))}
          </div>
          <p className="mt-6 text-center text-sm text-slate-500">
            The output of one tool becomes the input for the next. That&apos;s the difference between &ldquo;using AI&rdquo; and running an AI-powered growth system.
          </p>
        </section>

        {/* Bottom CTA */}
        <section className="border-t border-white/5 bg-white/[0.02]">
          <div className="mx-auto max-w-3xl px-6 py-16 text-center">
            <p className="mb-3 text-sm font-semibold uppercase tracking-widest text-gold">Free Download</p>
            <h2 className="mb-4 text-2xl font-extrabold text-white md:text-3xl">
              Get the guide. Start building the system today.
            </h2>
            <p className="mx-auto mb-8 max-w-lg text-slate-400">
              Verify your WhatsApp number and get instant access to the PDF — plus Gautam will send you implementation tips directly.
            </p>
            <div className="mx-auto max-w-sm rounded-2xl border border-gold/20 bg-white/[0.03] p-6">
              <GuideForm />
            </div>
          </div>
        </section>

      </main>
      <Footer />
    </>
  );
}
