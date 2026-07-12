import type { MetadataRoute } from "next";
import { getAllPosts } from "@/lib/blog/posts";

const siteUrl = "https://technocratsdigimate.com";
const lastModified = new Date("2026-06-07T00:00:00.000Z");

const DUPLICATE_SLUGS = new Set(["meta-ad-lead-quality-problem-fix"]);

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  const blogPosts = getAllPosts()
    .filter((post) => !DUPLICATE_SLUGS.has(post.slug))
    .map((post) => ({
      url: `${siteUrl}/blog/${post.slug}`,
      lastModified: new Date(post.publishedAt),
      changeFrequency: "monthly" as const,
      priority: 0.7,
    }));

  return [
    { url: `${siteUrl}/`, lastModified: now, changeFrequency: "weekly" as const, priority: 1 },
    { url: `${siteUrl}/audit`, lastModified: now, changeFrequency: "monthly" as const, priority: 0.95 },
    { url: `${siteUrl}/blog`, lastModified: now, changeFrequency: "daily" as const, priority: 0.9 },
    { url: `${siteUrl}/services/performance-marketing-lead-generation`, lastModified, changeFrequency: "monthly" as const, priority: 0.85 },
    { url: `${siteUrl}/courses`, lastModified, changeFrequency: "monthly" as const, priority: 0.85 },
    { url: `${siteUrl}/courses/meta-ads-quality-leads-webinar`, lastModified, changeFrequency: "monthly" as const, priority: 0.8 },
    { url: `${siteUrl}/courses/meta-ads-mastery-course`, lastModified, changeFrequency: "monthly" as const, priority: 0.8 },
    { url: `${siteUrl}/courses/performance-marketing-implementation-program`, lastModified, changeFrequency: "monthly" as const, priority: 0.8 },
    { url: `${siteUrl}/free-google-ai-tool`, lastModified, changeFrequency: "monthly" as const, priority: 0.8 },
    { url: `${siteUrl}/resources`, lastModified, changeFrequency: "weekly" as const, priority: 0.8 },
    { url: `${siteUrl}/services/social-media-marketing`, lastModified, changeFrequency: "monthly" as const, priority: 0.75 },
    { url: `${siteUrl}/real-estate-growth-audit`, lastModified, changeFrequency: "monthly" as const, priority: 0.75 },
    { url: `${siteUrl}/study-abroad-growth-audit`, lastModified, changeFrequency: "monthly" as const, priority: 0.75 },
    { url: `${siteUrl}/performance-marketing-survival-kit`, lastModified, changeFrequency: "monthly" as const, priority: 0.7 },
    ...blogPosts,
    { url: `${siteUrl}/privacy-policy`, lastModified, changeFrequency: "yearly" as const, priority: 0.3 },
  ];
}
