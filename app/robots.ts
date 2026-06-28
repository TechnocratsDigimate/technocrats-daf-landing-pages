import type { MetadataRoute } from "next";

const siteUrl = "https://technocratsdigimate.com";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: [
          "/wp-admin/",
          "/wp-content/",
          "/wp-includes/",
          "/wp-login.php",
          "/xmlrpc.php",
          "/feed/",
          "/wp-json/",
        ],
      },
    ],
    sitemap: `${siteUrl}/sitemap.xml`,
  };
}
