import fs from "node:fs";
import path from "node:path";

type StructuredSource = {
  id: string;
  title: string;
  publisher: string;
  url: string;
};

type StructuredArticle = {
  slug: string;
  title: string;
  metaTitle: string;
  metaDescription: string;
  primaryQuery: string;
  searchIntent: string;
  category: string;
  author: string;
  reviewer?: string;
  datePublished: string;
  dateModified: string;
  summary: string;
  body: string;
  sources: StructuredSource[];
  faq?: Array<{ question: string; answer: string }>;
  checklist: string[];
  relatedContent: string[];
  ctaType: string;
  generationMethod: string;
  qualityChecks: Record<string, boolean>;
  publicationMode: "automatic" | "manual-review" | "rejected";
  monetisationEligible: boolean;
  adEligible: boolean;
  status: "approved" | "published" | "manual-review" | "rejected" | "draft";
  image?: string;
};

export type AutomatedBlogPost = {
  slug: string;
  title: string;
  metaTitle: string;
  description: string;
  publishedAt: string;
  updatedAt: string;
  category: string;
  readTime: string;
  image?: string;
  content: string;
  author: string;
  reviewer?: string;
  sources: StructuredSource[];
  primaryQuery: string;
  searchIntent: string;
  generationMethod: string;
  publicationMode: "automatic" | "manual-review";
  monetisationEligible: boolean;
  adEligible: boolean;
};

function estimateReadTime(body: string) {
  const words = body.trim().split(/\s+/).filter(Boolean).length;
  return `${Math.max(1, Math.ceil(words / 220))} min read`;
}

export function getAutomatedPosts(): AutomatedBlogPost[] {
  const directory = path.join(process.cwd(), "content", "blog", "automated");
  if (!fs.existsSync(directory)) return [];

  return fs
    .readdirSync(directory)
    .filter((file) => file.endsWith(".json"))
    .map((file) => {
      const article = JSON.parse(
        fs.readFileSync(path.join(directory, file), "utf8")
      ) as StructuredArticle;
      return article;
    })
    .filter(
      (article) =>
        article.status === "approved" || article.status === "published"
    )
    .filter(
      (article) =>
        article.publicationMode === "automatic" ||
        article.publicationMode === "manual-review"
    )
    .map((article) => ({
      slug: article.slug,
      title: article.title,
      metaTitle: article.metaTitle,
      description: article.metaDescription,
      publishedAt: article.datePublished,
      updatedAt: article.dateModified,
      category: article.category,
      readTime: estimateReadTime(article.body),
      image: article.image,
      content: article.body,
      author: article.author,
      reviewer: article.reviewer,
      sources: article.sources,
      primaryQuery: article.primaryQuery,
      searchIntent: article.searchIntent,
      generationMethod: article.generationMethod,
      publicationMode: article.publicationMode as "automatic" | "manual-review",
      monetisationEligible: article.monetisationEligible,
      adEligible: article.adEligible
    }));
}
