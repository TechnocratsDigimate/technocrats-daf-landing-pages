import fs from "node:fs";

const summary = JSON.parse(fs.readFileSync(".automation/summary.json", "utf8"));
const logPath = "content/blog/automation-log.json";
const log = JSON.parse(fs.readFileSync(logPath, "utf8"));

if (summary.publicationMode !== "automatic") {
  throw new Error("Only automatic publications may be written to the automatic ledger.");
}

if (!log.publications.some((entry) => entry.contentId === summary.contentId)) {
  log.publications.push({
    contentId: summary.contentId,
    slug: summary.slug,
    pullRequest: process.env.GITHUB_SERVER_URL && process.env.GITHUB_REPOSITORY
      ? `${process.env.GITHUB_SERVER_URL}/${process.env.GITHUB_REPOSITORY}/actions/runs/${process.env.GITHUB_RUN_ID}`
      : "local",
    mode: "automatic",
    publishedAt: new Date().toISOString()
  });
}

fs.writeFileSync(logPath, `${JSON.stringify(log, null, 2)}\n`);
