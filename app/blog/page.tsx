import type { Metadata } from "next";
import Link from "next/link";
import { BrandHeader } from "@/components/BrandHeader";
import { Footer } from "@/components/Footer";
import { getAllPosts } from "@/lib/blog/posts";

export const metadata: Metadata = {
  title: "Performance Marketing & AI Blog | Technocrats Digimate",
  description:
    "Practical guides on Meta Ads, Google Ads, AI tools, conversion tracking, and lead generation for Indian businesses. No fluff — only what actually works.",
  alternates: { canonical: "https://technocratsdigimate.com/blog" },
  openGraph: {
    title: "Performance Marketing & AI Blog | Technocrats Digimate",
    description:
      "Practical guides on Meta Ads, Google Ads, AI tools, and lead generation for Indian businesses.",
    url: "https://technocratsdigimate.com/blog",
    siteName: "Technocrats Digimate",
    type: "website",
  },
  twitter: { card: "summary_large_image" },
};

const CATEGORY_COLORS: Record<string, string> = {
  "Meta Ads": "bg-blue-500/10 text-blue-400 border-blue-500/20",
  "Google Ads": "bg-green-500/10 text-green-400 border-green-500/20",
  "AI Tools": "bg-purple-500/10 text-purple-400 border-purple-500/20",
  "Marketing Automation": "bg-orange-500/10 text-orange-400 border-orange-500/20",
  "Tracking & Analytics": "bg-yellow-500/10 text-yellow-400 border-yellow-500/20",
  "Real Estate": "bg-red-500/10 text-red-400 border-red-500/20",
  "Study Abroad": "bg-teal-500/10 text-teal-400 border-teal-500/20",
  "Conversion Optimization": "bg-pink-500/10 text-pink-400 border-pink-500/20",
};

function formatDate(dateStr: string) {
  return new Date(dateStr).toLocaleDateString("en-IN", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}

export default function BlogPage() {
  const posts = getAllPosts();
  const [featured, ...rest] = posts;

  return (
    <div className="min-h-screen bg-ink text-white">
      <BrandHeader />

      {/* Hero */}
      <section className="pt-32 pb-16 md:pt-40 md:pb-20">
        <div className="mx-auto max-w-7xl px-5">
          <p className="mb-3 text-xs font-semibold uppercase tracking-widest text-gold">
            The Technocrats Blog
          </p>
          <h1 className="text-4xl font-bold leading-tight text-white md:text-5xl">
            Performance Marketing & AI — <br className="hidden md:block" />
            What&apos;s Actually Working
          </h1>
          <p className="mt-4 max-w-2xl text-lg text-slate-300">
            Practical guides on Meta Ads, Google Ads, AI tools, and lead generation. Written by practitioners, not content marketers.
          </p>
        </div>
      </section>

      {/* Featured post */}
      {featured && (
        <section className="pb-12">
          <div className="mx-auto max-w-7xl px-5">
            <Link href={`/blog/${featured.slug}`} className="group block">
              <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-8 transition hover:border-gold/30 hover:bg-white/[0.05]">
                <div className="mb-4 flex items-center gap-3">
                  <span className={`rounded-full border px-3 py-1 text-xs font-semibold ${CATEGORY_COLORS[featured.category] ?? "bg-gold/10 text-gold border-gold/20"}`}>
                    {featured.category}
                  </span>
                  <span className="text-xs text-slate-500">{featured.readTime}</span>
                  <span className="text-xs text-slate-500">{formatDate(featured.publishedAt)}</span>
                </div>
                <h2 className="mb-3 text-2xl font-bold text-white transition group-hover:text-gold md:text-3xl">
                  {featured.title}
                </h2>
                <p className="text-slate-300">{featured.description}</p>
                <span className="mt-5 inline-block text-sm font-semibold text-gold">
                  Read article →
                </span>
              </div>
            </Link>
          </div>
        </section>
      )}

      {/* Post grid */}
      <section className="pb-20">
        <div className="mx-auto max-w-7xl px-5">
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {rest.map((post) => (
              <Link key={post.slug} href={`/blog/${post.slug}`} className="group block">
                <div className="h-full rounded-2xl border border-white/10 bg-white/[0.03] p-6 transition hover:border-gold/30 hover:bg-white/[0.05]">
                  <div className="mb-3 flex items-center gap-2">
                    <span className={`rounded-full border px-2.5 py-0.5 text-xs font-semibold ${CATEGORY_COLORS[post.category] ?? "bg-gold/10 text-gold border-gold/20"}`}>
                      {post.category}
                    </span>
                  </div>
                  <h3 className="mb-2 font-bold leading-snug text-white transition group-hover:text-gold">
                    {post.title}
                  </h3>
                  <p className="mb-4 text-sm text-slate-400 line-clamp-3">
                    {post.description}
                  </p>
                  <div className="flex items-center justify-between text-xs text-slate-500">
                    <span>{formatDate(post.publishedAt)}</span>
                    <span>{post.readTime}</span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="border-t border-white/10 bg-white/[0.02] py-16">
        <div className="mx-auto max-w-2xl px-5 text-center">
          <h2 className="mb-4 text-2xl font-bold text-white">
            Want us to audit your ad account?
          </h2>
          <p className="mb-6 text-slate-300">
            Free. Written findings. 30-minute call with Gautam. No pitch.
          </p>
          <Link
            href="/audit"
            className="inline-block rounded-lg bg-gold px-8 py-4 font-bold text-ink transition hover:bg-gold-soft"
          >
            Claim Your Free Audit →
          </Link>
        </div>
      </section>

      <Footer />
    </div>
  );
}
