import type { MetadataRoute } from "next";

const siteUrl = "https://technocratsdigimate.com";
const lastModified = new Date("2026-06-07T00:00:00.000Z");

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: `${siteUrl}/`,
      lastModified,
      changeFrequency: "weekly",
      priority: 1
    },
    {
      url: `${siteUrl}/resources`,
      lastModified,
      changeFrequency: "weekly",
      priority: 0.8
    },
    {
      url: `${siteUrl}/free-growth-audit`,
      lastModified,
      changeFrequency: "monthly",
      priority: 0.9
    },
    {
      url: `${siteUrl}/real-estate-growth-audit`,
      lastModified,
      changeFrequency: "monthly",
      priority: 0.8
    },
    {
      url: `${siteUrl}/study-abroad-growth-audit`,
      lastModified,
      changeFrequency: "monthly",
      priority: 0.8
    },
    {
      url: `${siteUrl}/performance-marketing-survival-kit`,
      lastModified,
      changeFrequency: "monthly",
      priority: 0.8
    },
    {
      url: `${siteUrl}/privacy-policy`,
      lastModified,
      changeFrequency: "yearly",
      priority: 0.3
    }
  ];
}
