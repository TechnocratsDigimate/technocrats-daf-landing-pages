import fs from "node:fs";
import path from "node:path";

const root = process.cwd();
const contentDir = path.join(root, "content", "blog", "automated");
const errors = [];

for (const file of fs.readdirSync(contentDir).filter((name) => name.endsWith(".json"))) {
  const article = JSON.parse(fs.readFileSync(path.join(contentDir, file), "utf8"));
  const expectedCanonical = `https://technocratsdigimate.com/blog/${article.slug}`;
  if (article.canonicalUrl !== expectedCanonical) errors.push(`${file}: invalid canonical`);
  if (!article.metaTitle || !article.metaDescription) errors.push(`${file}: missing metadata`);
  if (!article.author || !article.dateModified) errors.push(`${file}: missing author/update date`);
  if (!["approved", "published", "manual-review"].includes(article.status)) {
    errors.push(`${file}: ineligible status`);
  }
  if (article.status === "manual-review" && article.publicationMode === "automatic") {
    errors.push(`${file}: manual content marked automatic`);
  }
  if (!article.image) errors.push(`${file}: missing social preview image`);
}

const sitemap = fs.readFileSync(path.join(root, "app", "sitemap.ts"), "utf8");
if (!sitemap.includes("getAllPosts")) errors.push("sitemap does not consume canonical posts");

if (errors.length) {
  console.error(errors.join("\n"));
  process.exit(1);
}
console.log("SEO policy checks passed.");
