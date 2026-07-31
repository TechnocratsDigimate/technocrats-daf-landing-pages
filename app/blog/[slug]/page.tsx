import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { BrandHeader } from "@/components/BrandHeader";
import { Footer } from "@/components/Footer";
import { getAllPosts, getPostBySlug } from "@/lib/blog/posts";

type Props = { params: Promise<{ slug: string }> };

export async function generateStaticParams() {
  return getAllPosts().map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const post = getPostBySlug(slug);
  if (!post) return {};
  const ogImages = post.image
    ? [{ url: post.image, width: 1080, height: 720, alt: post.title }]
    : [{ url: "/assets/brand/og-blog.png", width: 1200, height: 630, alt: post.title }];

  return {
    title: post.metaTitle || `${post.title} | Technocrats Digimate`,
    description: post.description,
    alternates: { canonical: `https://technocratsdigimate.com/blog/${slug}` },
    openGraph: {
      title: post.title,
      description: post.description,
      url: `https://technocratsdigimate.com/blog/${slug}`,
      siteName: "Technocrats Digimate",
      type: "article",
      publishedTime: post.publishedAt,
      modifiedTime: post.updatedAt || post.publishedAt,
      images: ogImages,
    },
    twitter: { card: "summary_large_image", title: post.title, description: post.description, images: ogImages.map(i => i.url) },
  };
}

function formatDate(dateStr: string) {
  return new Date(dateStr).toLocaleDateString("en-IN", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}

function isSafeHref(href: string) {
  return (href.startsWith("/") && !href.startsWith("//")) || href.startsWith("https://");
}

function safeJsonLd(value: unknown) {
  return JSON.stringify(value)
    .replace(/</g, "\\u003c")
    .replace(/>/g, "\\u003e")
    .replace(/&/g, "\\u0026")
    .replace(/\u2028/g, "\\u2028")
    .replace(/\u2029/g, "\\u2029");
}

function renderInline(text: string) {
  const tokenPattern = /(\[[^\]]+\]\((?:https?:\/\/|\/)[^)]+\)|\*\*[^*]+\*\*|`[^`]+`)/g;
  return text.split(tokenPattern).filter(Boolean).map((token, index) => {
    const link = token.match(/^\[([^\]]+)\]\(([^)]+)\)$/);
    if (link && isSafeHref(link[2])) {
      const external = link[2].startsWith("http");
      return (
        <a
          className="font-semibold text-signal underline decoration-signal/30 underline-offset-4 hover:decoration-signal"
          href={link[2]}
          key={`${token}-${index}`}
          rel={external ? "noreferrer" : undefined}
          target={external ? "_blank" : undefined}
        >
          {link[1]}
        </a>
      );
    }
    if (token.startsWith("**") && token.endsWith("**")) {
      return <strong className="text-ink" key={`${token}-${index}`}>{token.slice(2, -2)}</strong>;
    }
    if (token.startsWith("`") && token.endsWith("`")) {
      return <code className="rounded bg-mist px-1.5 py-0.5 text-sm text-ink" key={`${token}-${index}`}>{token.slice(1, -1)}</code>;
    }
    return token;
  });
}

function renderContent(content: string) {
  const lines = content.trim().split("\n");
  const elements: React.ReactNode[] = [];
  let i = 0;

  while (i < lines.length) {
    const line = lines[i];

    if (line.startsWith("## ")) {
      elements.push(
        <h2 key={i} className="mt-10 mb-4 text-2xl font-bold text-white">
          {line.slice(3)}
        </h2>
      );
    } else if (line.startsWith("### ")) {
      elements.push(
        <h3 key={i} className="mt-8 mb-3 text-xl font-bold text-gold">
          {line.slice(4)}
        </h3>
      );
    } else if (line.startsWith("**") && line.endsWith("**") && line.length > 4) {
      elements.push(
        <p key={i} className="mt-4 font-semibold text-white">
          {line.slice(2, -2)}
        </p>
      );
    } else if (line.startsWith("| ")) {
      // Table — collect all table rows
      const tableLines: string[] = [];
      while (i < lines.length && lines[i].startsWith("|")) {
        tableLines.push(lines[i]);
        i++;
      }
      const rows = tableLines.filter((l) => !l.match(/^\|[-\s|]+\|$/));
      elements.push(
        <div key={i} className="my-6 overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-white/10">
                {rows[0]?.split("|").filter(Boolean).map((cell, ci) => (
                  <th key={ci} className="px-3 py-2 text-left font-semibold text-gold">
                    {cell.trim()}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {rows.slice(1).map((row, ri) => (
                <tr key={ri} className="border-b border-white/5">
                  {row.split("|").filter(Boolean).map((cell, ci) => (
                    <td key={ci} className="px-3 py-2 text-slate-300">
                      {cell.trim()}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      );
      continue;
    } else if (line.startsWith("```")) {
      // Code block
      i++;
      const codeLines: string[] = [];
      while (i < lines.length && !lines[i].startsWith("```")) {
        codeLines.push(lines[i]);
        i++;
      }
      elements.push(
        <pre key={i} className="my-6 overflow-x-auto rounded-xl border border-white/10 bg-white/[0.04] p-5 text-sm text-slate-300">
          <code>{codeLines.join("\n")}</code>
        </pre>
      );
    } else if (line.startsWith("- ")) {
      const listLines: string[] = [];
      while (i < lines.length && lines[i].startsWith("- ")) {
        listLines.push(lines[i].slice(2));
        i++;
      }
      elements.push(
        <ul key={i} className="my-4 space-y-2 pl-4">
          {listLines.map((item, li) => (
            <li key={li} className="flex gap-2 text-slate-300">
              <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-gold" />
              <span>{renderInline(item)}</span>
            </li>
          ))}
        </ul>
      );
      continue;
    } else if (line.startsWith("1. ") || line.startsWith("2. ") || line.startsWith("3. ")) {
      const listLines: string[] = [];
      while (i < lines.length && /^\d+\.\s/.test(lines[i])) {
        listLines.push(lines[i].replace(/^\d+\.\s/, ""));
        i++;
      }
      elements.push(
        <ol key={i} className="my-4 space-y-2 pl-4">
          {listLines.map((item, li) => (
            <li key={li} className="flex gap-3 text-slate-300">
              <span className="shrink-0 font-bold text-gold">{li + 1}.</span>
              <span>{renderInline(item)}</span>
            </li>
          ))}
        </ol>
      );
      continue;
    } else if (line === "---") {
      elements.push(<hr key={i} className="my-8 border-white/10" />);
    } else if (line.trim() === "") {
      // skip blank lines
    } else {
      elements.push(
        <p key={i} className="my-4 leading-8 text-slate-300">
          {renderInline(line)}
        </p>
      );
    }
    i++;
  }

  return <>{elements}</>;
}

export default async function BlogPostPage({ params }: Props) {
  const { slug } = await params;
  const post = getPostBySlug(slug);
  if (!post) notFound();

  const allPosts = getAllPosts();
  const related = allPosts.filter((p) => p.slug !== slug && p.category === post.category).slice(0, 3);

  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: post.title,
    description: post.description,
    datePublished: post.publishedAt,
    dateModified: post.updatedAt || post.publishedAt,
    image: post.image || "https://technocratsdigimate.com/assets/brand/og-blog.png",
    author: {
      "@type": "Person",
      name: post.author || "Gautam Punj",
      url: "https://technocratsdigimate.com/about",
    },
    publisher: {
      "@type": "Organization",
      name: "Technocrats Digimate",
      url: "https://technocratsdigimate.com",
      logo: {
        "@type": "ImageObject",
        url: "https://technocratsdigimate.com/assets/brand/logo-white.svg",
      },
    },
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": `https://technocratsdigimate.com/blog/${slug}`,
    },
  };

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: "https://technocratsdigimate.com" },
      { "@type": "ListItem", position: 2, name: "Blog", item: "https://technocratsdigimate.com/blog" },
      { "@type": "ListItem", position: 3, name: post.category, item: `https://technocratsdigimate.com/blog` },
      { "@type": "ListItem", position: 4, name: post.title, item: `https://technocratsdigimate.com/blog/${slug}` },
    ],
  };

  return (
    <div className="min-h-screen bg-ink text-white">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: safeJsonLd(articleSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: safeJsonLd(breadcrumbSchema) }}
      />
      <BrandHeader />

      <article className="mx-auto max-w-7xl px-5 pt-32 pb-20 md:pt-40">
        {/* Breadcrumb */}
        <nav className="mb-8 flex items-center gap-2 text-sm text-slate-500">
          <Link href="/blog" className="hover:text-gold">Blog</Link>
          <span>/</span>
          <span className="text-slate-400">{post.category}</span>
        </nav>

        {/* Header */}
        <header className="mb-10">
          <div className="mb-4 flex flex-wrap items-center gap-3 text-sm text-slate-400">
            <span className="rounded-full border border-gold/20 bg-gold/10 px-3 py-1 text-xs font-semibold text-gold">
              {post.category}
            </span>
            <span>{formatDate(post.publishedAt)}</span>
            <span>·</span>
            <span>{post.readTime}</span>
            <span>·</span>
            <span>By {post.author || "Gautam Punj"}</span>
            {post.updatedAt && post.updatedAt !== post.publishedAt && (
              <span>Updated {formatDate(post.updatedAt)}</span>
            )}
          </div>
          <h1 className="text-3xl font-bold leading-tight text-white md:text-4xl">
            {post.title}
          </h1>
          <p className="mt-4 text-lg text-slate-300">{post.description}</p>
        </header>

        {/* Hero image */}
        {post.image && (
          <div className="mb-10 overflow-hidden rounded-2xl">
            {/* Structured automation accepts approved remote primary artwork; dimensions reserve layout space. */}
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={post.image}
              alt={post.title}
              height={720}
              loading="lazy"
              width={1080}
              className="w-full object-cover"
              style={{ maxHeight: "420px" }}
            />
          </div>
        )}

        {/* Content */}
        <div className="prose-custom">
          {renderContent(post.content)}
        </div>

        {post.generationMethod && (
          <aside className="mt-10 rounded-xl border border-line bg-mist p-5 text-sm leading-6 text-slate">
            <strong className="text-ink">AI-assisted content disclosure:</strong>{" "}
            This article was created with AI assistance and passed automated editorial,
            source, duplication and technical checks. Automated validation is not presented
            as human fact-checking.
          </aside>
        )}

        {post.sources && post.sources.length > 0 && (
          <section className="mt-12" aria-labelledby="article-sources">
            <h2 className="text-2xl font-bold text-white" id="article-sources">Sources</h2>
            <ol className="mt-5 space-y-3">
              {post.sources.map((source) => (
                <li className="text-sm text-slate-300" id={`source-${source.id}`} key={source.id}>
                  <a className="font-semibold text-gold underline underline-offset-4" href={source.url} rel="noreferrer" target="_blank">
                    {source.title}
                  </a>{" "}
                  — {source.publisher}
                </li>
              ))}
            </ol>
          </section>
        )}

        {/* CTA */}
        <div className="mt-16 rounded-2xl border border-gold/20 bg-gold/5 p-8 text-center">
          <h3 className="mb-2 text-xl font-bold text-white">
            Want us to audit your ad account?
          </h3>
          <p className="mb-6 text-slate-300">
            Free. Written findings. 30-minute call with Gautam. No pitch.
          </p>
          <Link
            href="/audit"
            className="inline-block rounded-lg bg-gold px-8 py-3 font-bold text-ink transition hover:bg-gold-soft"
          >
            Claim Your Free Audit →
          </Link>
        </div>

        {/* Related posts */}
        {related.length > 0 && (
          <section className="mt-16">
            <h3 className="mb-6 text-lg font-bold text-white">More in {post.category}</h3>
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {related.map((p) => (
                <Link key={p.slug} href={`/blog/${p.slug}`} className="group block rounded-xl border border-white/10 bg-white/[0.03] p-5 transition hover:border-gold/30">
                  <p className="mb-1 text-xs text-slate-500">{formatDate(p.publishedAt)}</p>
                  <p className="font-semibold leading-snug text-white transition group-hover:text-gold">
                    {p.title}
                  </p>
                </Link>
              ))}
            </div>
          </section>
        )}
      </article>

      <Footer />
    </div>
  );
}
