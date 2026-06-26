# Scoring Specification

**Growth AI Score™**
Version 1.0.0 — Technocrats Digimate Pvt. Ltd.

---

## Overview

The Growth AI Score™ is a composite metric that represents the overall search and conversion health of a web property across nine intelligence pillars. It ranges from 0 to 100. A higher score indicates stronger performance across more dimensions and, consequently, a higher probability of strong organic search and AI search performance.

The score is:

- **Transparent:** Every component of the score is documented, weighted, and explained
- **Reproducible:** Two auditors following this framework should produce equivalent scores for the same property
- **Actionable:** Every score deficit maps to specific checkpoints with defined remediation paths
- **Comparable:** Scores are consistent across engagements, enabling benchmarking across clients, industries, and time periods

---

## Pillar Weights

The nine intelligence pillars contribute to the Growth AI Score™ with the following weights:

| # | Pillar | Weight | Rationale |
|---|--------|--------|-----------|
| 1 | Technical Intelligence™ | 20% | Crawlability and indexation are prerequisites for all other performance |
| 2 | Content Intelligence™ | 18% | Content quality is the primary determinant of ranking eligibility |
| 3 | Authority Intelligence™ | 12% | External trust signals remain a strong ranking factor |
| 4 | Entity Intelligence™ | 10% | Entity associations enable topical authority and knowledge graph presence |
| 5 | AI Visibility Intelligence™ | 10% | AI search inclusion requires distinct structural optimization |
| 6 | UX Intelligence™ | 10% | Page experience signals are confirmed ranking factors |
| 7 | Conversion Intelligence™ | 8% | Conversion performance is the terminal business measure of search investment |
| 8 | Analytics Intelligence™ | 7% | Measurement fidelity determines the reliability of all other data |
| 9 | Competitive Intelligence™ | 5% | Competitive context informs priority and realistic performance targets |
| | **Total** | **100%** | |

---

## Checkpoint Scoring

### Checkpoint Score Values

Each checkpoint is evaluated on a four-point scale:

| Score | Status | Definition |
|-------|--------|------------|
| 3 | Pass | Criterion fully met; no action required |
| 2 | Partial | Criterion partially met; improvement recommended |
| 1 | Fail – Medium | Criterion not met; addresses a secondary priority |
| 0 | Fail – Critical | Criterion not met; addresses a primary or blocking issue |

### Partial Scores

A partial score (2) applies when a checkpoint criterion is met for a significant portion of the evaluated pages or features but not for all of them. For example:

- Canonical tags present on 85% of pages but absent on 15% → Partial
- Core Web Vitals passing on desktop but failing on mobile → Partial
- Structured data implemented on product pages but absent on category pages → Partial

The threshold for partial versus fail varies by checkpoint and is specified in each checkpoint's **Passing Criteria** section.

---

## Pillar Score Calculation

### Formula

The pillar score is calculated as the percentage of total possible checkpoint points achieved within that pillar:

```
Pillar Score = (Sum of checkpoint scores achieved / Maximum possible checkpoint score) × 100
```

### Example

A pillar with eight checkpoints has a maximum possible score of 24 (8 × 3).

If an audit produces checkpoint scores of: 3, 3, 2, 1, 3, 0, 2, 1

Sum achieved = 15
Maximum possible = 24

Pillar Score = (15 / 24) × 100 = 62.5

---

## Growth AI Score Calculation

### Formula

```
Growth AI Score = Σ (Pillar Score × Pillar Weight)
```

### Calculation Table

| Pillar | Pillar Score | Weight | Weighted Score |
|--------|-------------|--------|----------------|
| Technical Intelligence™ | [score] | 0.20 | [score × 0.20] |
| Content Intelligence™ | [score] | 0.18 | [score × 0.18] |
| Authority Intelligence™ | [score] | 0.12 | [score × 0.12] |
| Entity Intelligence™ | [score] | 0.10 | [score × 0.10] |
| AI Visibility Intelligence™ | [score] | 0.10 | [score × 0.10] |
| UX Intelligence™ | [score] | 0.10 | [score × 0.10] |
| Conversion Intelligence™ | [score] | 0.08 | [score × 0.08] |
| Analytics Intelligence™ | [score] | 0.07 | [score × 0.07] |
| Competitive Intelligence™ | [score] | 0.05 | [score × 0.05] |
| **Growth AI Score™** | | | **[sum]** |

---

## Score Classification

### Overall Growth AI Score™

| Score Range | Classification | Interpretation |
|-------------|---------------|----------------|
| 90 – 100 | Elite | Best-in-class performance across all pillars. Marginal gains require sustained effort and competitive intelligence. |
| 75 – 89 | Advanced | Strong foundation with specific optimization gaps. Clear improvement roadmap exists. |
| 60 – 74 | Proficient | Functional performance. Material improvement opportunities exist across multiple pillars. |
| 40 – 59 | Developing | Multiple pillar deficiencies are limiting visibility and conversion. Structured remediation required. |
| 0 – 39 | Critical | Fundamental failures in one or more pillars are actively harming search performance. Immediate action required. |

### Pillar Score Classification

| Score Range | Classification |
|-------------|---------------|
| 85 – 100 | Strong |
| 65 – 84 | Adequate |
| 45 – 64 | Needs Improvement |
| 0 – 44 | Critical |

---

## Checkpoint Checkpoint Database by Pillar

### Technical Intelligence™ (20 checkpoints)

| ID | Checkpoint | Max Score |
|----|-----------|-----------|
| TI-001 | Robots.txt configuration | 3 |
| TI-002 | XML sitemap accuracy | 3 |
| TI-003 | Crawl budget efficiency | 3 |
| TI-004 | Canonical tag implementation | 3 |
| TI-005 | HTTPS and security configuration | 3 |
| TI-006 | Redirect chain integrity | 3 |
| TI-007 | JavaScript rendering impact | 3 |
| TI-008 | Duplicate content and parameter handling | 3 |
| TI-009 | International and hreflang configuration | 3 |
| TI-010 | Mobile configuration | 3 |
| TI-011 | Page indexation accuracy | 3 |
| TI-012 | Internal link architecture | 3 |
| TI-013 | Crawl error diagnosis | 3 |
| TI-014 | Server response integrity | 3 |
| TI-015 | URL structure and format | 3 |
| TI-016 | Log file analysis | 3 |
| TI-017 | Faceted navigation handling | 3 |
| TI-018 | Pagination configuration | 3 |
| TI-019 | Edge delivery and CDN configuration | 3 |
| TI-020 | Structured data technical validity | 3 |
| | **Pillar Maximum** | **60** |

### Content Intelligence™ (15 checkpoints)

| ID | Checkpoint | Max Score |
|----|-----------|-----------|
| CI-001 | Search intent alignment | 3 |
| CI-002 | Information gain and originality | 3 |
| CI-003 | EEAT signal implementation | 3 |
| CI-004 | Content depth and comprehensiveness | 3 |
| CI-005 | Topical authority and coverage | 3 |
| CI-006 | Content freshness and accuracy | 3 |
| CI-007 | Title and meta description quality | 3 |
| CI-008 | Heading architecture | 3 |
| CI-009 | Semantic HTML structure | 3 |
| CI-010 | Thin and duplicate content audit | 3 |
| CI-011 | Content cannibalization | 3 |
| CI-012 | Featured snippet optimization | 3 |
| CI-013 | Internal content linking | 3 |
| CI-014 | Multimedia content optimization | 3 |
| CI-015 | Content accessibility and readability | 3 |
| | **Pillar Maximum** | **45** |

### Entity Intelligence™ (10 checkpoints)

| ID | Checkpoint | Max Score |
|----|-----------|-----------|
| EI-001 | Entity definition and disambiguation | 3 |
| EI-002 | Knowledge Panel presence | 3 |
| EI-003 | Organization schema implementation | 3 |
| EI-004 | Person entity optimization | 3 |
| EI-005 | Product and service entity markup | 3 |
| EI-006 | Local entity and NAP consistency | 3 |
| EI-007 | Topical entity cluster mapping | 3 |
| EI-008 | WikiData and Wikipedia presence | 3 |
| EI-009 | Co-occurrence and entity association | 3 |
| EI-010 | Entity-based content strategy | 3 |
| | **Pillar Maximum** | **30** |

### Authority Intelligence™ (12 checkpoints)

| ID | Checkpoint | Max Score |
|----|-----------|-----------|
| AI-001 | Backlink profile quality | 3 |
| AI-002 | Referring domain diversity | 3 |
| AI-003 | Toxic link identification | 3 |
| AI-004 | Anchor text distribution | 3 |
| AI-005 | Digital PR and brand mention audit | 3 |
| AI-006 | Competitor link gap analysis | 3 |
| AI-007 | Internal PageRank distribution | 3 |
| AI-008 | Broken backlink recovery | 3 |
| AI-009 | Expert and author authority signals | 3 |
| AI-010 | Trust and citation signals | 3 |
| AI-011 | Domain history and manual actions | 3 |
| AI-012 | Outbound link quality | 3 |
| | **Pillar Maximum** | **36** |

### AI Visibility Intelligence™ (10 checkpoints)

| ID | Checkpoint | Max Score |
|----|-----------|-----------|
| AV-001 | AI Overview inclusion readiness | 3 |
| AV-002 | Answer-structured content patterns | 3 |
| AV-003 | FAQ and Q&A schema implementation | 3 |
| AV-004 | LLM readability and content clarity | 3 |
| AV-005 | Source citation and attribution signals | 3 |
| AV-006 | Conversational query alignment | 3 |
| AV-007 | Passage-level content optimization | 3 |
| AV-008 | Factual accuracy and verifiability | 3 |
| AV-009 | AI-readable structured data | 3 |
| AV-010 | Brand mention in AI responses | 3 |
| | **Pillar Maximum** | **30** |

### UX Intelligence™ (10 checkpoints)

| ID | Checkpoint | Max Score |
|----|-----------|-----------|
| UX-001 | Largest Contentful Paint (LCP) | 3 |
| UX-002 | Interaction to Next Paint (INP) | 3 |
| UX-003 | Cumulative Layout Shift (CLS) | 3 |
| UX-004 | First Contentful Paint (FCP) | 3 |
| UX-005 | Mobile usability | 3 |
| UX-006 | Navigation and information architecture | 3 |
| UX-007 | Accessibility audit (WCAG 2.1 AA) | 3 |
| UX-008 | Page load performance | 3 |
| UX-009 | Interstitials and intrusive elements | 3 |
| UX-010 | Search result appearance | 3 |
| | **Pillar Maximum** | **30** |

### Conversion Intelligence™ (10 checkpoints)

| ID | Checkpoint | Max Score |
|----|-----------|-----------|
| CV-001 | Landing page conversion architecture | 3 |
| CV-002 | Call-to-action clarity and placement | 3 |
| CV-003 | Form design and friction reduction | 3 |
| CV-004 | Trust signal placement | 3 |
| CV-005 | Page-to-conversion path integrity | 3 |
| CV-006 | Organic traffic conversion rate baseline | 3 |
| CV-007 | Exit intent and abandonment patterns | 3 |
| CV-008 | Site search optimization | 3 |
| CV-009 | Local conversion signals | 3 |
| CV-010 | Mobile conversion optimization | 3 |
| | **Pillar Maximum** | **30** |

### Analytics Intelligence™ (10 checkpoints)

| ID | Checkpoint | Max Score |
|----|-----------|-----------|
| AN-001 | GA4 implementation accuracy | 3 |
| AN-002 | Conversion event configuration | 3 |
| AN-003 | Search Console and GA4 integration | 3 |
| AN-004 | UTM parameter governance | 3 |
| AN-005 | Data sampling and retention | 3 |
| AN-006 | Custom dimension and event taxonomy | 3 |
| AN-007 | Bot and spam traffic filtering | 3 |
| AN-008 | Cross-domain tracking | 3 |
| AN-009 | Server-side tagging assessment | 3 |
| AN-010 | Reporting and attribution model | 3 |
| | **Pillar Maximum** | **30** |

### Competitive Intelligence™ (8 checkpoints)

| ID | Checkpoint | Max Score |
|----|-----------|-----------|
| CO-001 | Primary competitor identification | 3 |
| CO-002 | Organic traffic share comparison | 3 |
| CO-003 | Content gap analysis | 3 |
| CO-004 | Backlink gap analysis | 3 |
| CO-005 | SERP feature capture comparison | 3 |
| CO-006 | AI visibility competitor assessment | 3 |
| CO-007 | Technical benchmark comparison | 3 |
| CO-008 | Brand search and sentiment comparison | 3 |
| | **Pillar Maximum** | **24** |

---

## Score Normalization

All pillar scores are normalized to a 0–100 scale before applying pillar weights. This ensures that pillars with different numbers of checkpoints contribute proportionally rather than numerically.

```
Normalized Pillar Score = (Raw pillar score / Pillar maximum) × 100
```

---

## Handling Inapplicable Checkpoints

Some checkpoints are not applicable to all site types. For example, the hreflang configuration checkpoint (TI-009) does not apply to single-language sites, and the local entity checkpoint (EI-006) does not apply to e-commerce-only sites with no physical locations.

When a checkpoint is not applicable:

- Mark it as N/A in the scorecard
- Exclude it from both the numerator and denominator of the pillar score calculation
- Document the reason for exclusion in the audit report

This ensures that non-applicable checkpoints do not inflate or depress scores artificially.

---

## Benchmark Reference Ranges

The following ranges represent approximate observed Growth AI Score™ distributions across site categories. These are illustrative reference ranges based on audit experience, not empirical population statistics.

| Site Category | Typical Range | Common Deficiencies |
|--------------|---------------|---------------------|
| Enterprise (100k+ pages) | 45 – 70 | Crawl budget, duplicate content, analytics data quality |
| Mid-market SaaS | 55 – 75 | Entity intelligence, AI visibility, conversion architecture |
| E-commerce | 40 – 65 | Technical complexity, content thin pages, structured data |
| Local business | 50 – 72 | Entity signals, local schema, authority building |
| Content publisher | 55 – 78 | Content freshness, authority, AI visibility |

---

## Year-Over-Year Comparison

When conducting annual audits for the same client, use the prior year's scorecard as a baseline. The composite Growth AI Score™ change between years provides the primary measure of improvement velocity.

Document:
- Score delta by pillar
- Resolved checkpoints (pass where previously fail)
- Regressed checkpoints (fail where previously pass)
- New issues identified since prior audit

---

*Next: [DESIGN_SYSTEM.md](DESIGN_SYSTEM.md) — Visual and documentation standards*
