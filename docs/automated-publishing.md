# Guarded automatic publishing

## Automatic path

1. The scheduled workflow checks Google Trends and approved evergreen fallback topics.
2. Topic candidates are compared with legacy articles, structured articles and open automation pull requests.
3. The model produces a structured JSON draft.
4. Independent validation checks metadata, intent, title/slug/query similarity, heading and body overlap, source markers, approved primary-source domains, internal links, placeholders, repeated paragraphs and policy risks.
5. An eligible record is written to `content/blog/automated`.
6. The workflow creates an isolated `automation/blog-*` branch.
7. Clean install, lint, type-check, tests, SEO checks and production build must all pass.
8. One article is committed and pushed to its isolated branch.
9. A pull request is created.
10. Only `automatic` content is registered for squash auto-merge.
11. GitHub merges only after every protected-branch check succeeds, then
    deletes the temporary branch.

Hostinger can deploy only after that validated merge reaches `main`.

## Repository prerequisites

- Store a fine-grained token as `AUTO_BLOG_GITHUB_TOKEN`. Scope it only to this
  repository with **Contents: read/write** and **Pull requests: read/write**.
  The workflow's default `GITHUB_TOKEN` remains read-only.
- Enable repository auto-merge.
- Protect `main` and require the `quality` check before merging.
- Keep the Hostinger integration scoped to deployments from `main`.

The fine-grained token is required because pull requests created with the
default Actions token do not start another Actions workflow. A pull request
created with `AUTO_BLOG_GITHUB_TOKEN` starts the required quality workflow,
allowing the registered auto-merge to complete without a human click.

## Manual-review path

Performance claims, client results, precise benchmarks, pricing, named case
studies, sensitive advice, commercial comparisons or uncertain sourcing create
an unmerged draft pull request. Automated validation is never described as
human fact-checking.

## Rejected and skipped paths

- Duplicate, unsupported, thin or technically invalid drafts are rejected.
- A collision produces an update recommendation for the existing canonical article.
- A run with no differentiated topic exits as a successful skip.
- A failed install, test, build, SEO or link check cannot reach the merge step.

## Frequency and retries

`config/auto-blog.json` controls the minimum publication interval and rolling
limit. Workflow concurrency prevents simultaneous publishers. Content hashes,
slug checks, pending-PR checks and the repository publication ledger make
retries idempotent.

The branch name contains the workflow run ID and attempt. Open automation pull
requests participate in duplicate detection. If pull-request creation fails
after a push, the workflow deletes the orphan branch. If a pull request exists,
a retry sees it and skips the colliding topic. If the article already merged,
the next checkout and publication ledger prevent a second article.

## Deployment boundary

The workflow does not call Hostinger directly. A successful merge updates
`main`, after which the existing Hostinger integration owns deployment. A
Hostinger failure does not roll back the merge or create another article; the
repository remains the source of truth and Hostinger must retry the same
commit. Deployment monitoring and retry policy remain an external hosting
operation, not an automatic-content permission.

## Discovery after publication

Ordinary marketing pages are not submitted through Google's Indexing API.
Discovery uses internal links, the XML sitemap, RSS when implemented, and normal
Search Console crawling.
