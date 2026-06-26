# Recommended Tool Stack

**Growth AI SEO Audit Framework™**
Version 1.0.0 — Technocrats Digimate Pvt. Ltd.

---

## Overview

This document lists the tools referenced throughout the framework, organized by category. All procedures in this framework are tool-agnostic — where a specific tool provides a unique capability, alternatives are noted.

No commercial relationship exists between Technocrats Digimate and any tool listed here. Recommendations are based on capability assessment as of the framework publication date.

---

## Category 1: Crawl Tools

| Tool | Type | Primary Use | Notes |
|------|------|-------------|-------|
| Screaming Frog SEO Spider | Desktop | Full-site crawl, technical analysis | Industry standard; JavaScript rendering requires configuration |
| Sitebulb | Desktop | Full-site crawl with visualization | Strong visualization; crawl hints system |
| Ahrefs Site Audit | Cloud | Technical health monitoring | Good for ongoing monitoring; not a replacement for on-demand crawl tools |
| Semrush Site Audit | Cloud | Technical health monitoring | Similar to Ahrefs Site Audit |

**Framework recommendation:** Screaming Frog for one-time audits; supplement with a cloud tool for ongoing monitoring.

---

## Category 2: Backlink Analysis

| Tool | Type | Primary Use | Notes |
|------|------|-------------|-------|
| Ahrefs | Cloud | Backlink analysis, competitor research | Largest known link index; strongest for backlink research |
| Semrush | Cloud | Backlink analysis, traffic estimation | Strong for traffic estimation and keyword research |
| Moz Link Explorer | Cloud | Domain authority, backlink analysis | Moz DA metric widely used as a reference point |
| Majestic | Cloud | Trust flow, backlink metrics | Unique Trust Flow / Citation Flow metrics |

**Framework recommendation:** Ahrefs as primary for backlink analysis; Semrush as secondary for cross-validation and traffic estimation.

---

## Category 3: Google Ecosystem

| Tool | Cost | Primary Use |
|------|------|-------------|
| Google Search Console | Free | Indexation, coverage, performance, manual actions, Core Web Vitals |
| Google Analytics 4 | Free | Traffic, conversions, user behavior |
| PageSpeed Insights | Free | Core Web Vitals field and lab data |
| Google Rich Results Test | Free | Structured data validation |
| Google Mobile-Friendly Test | Free | Mobile usability |
| Google Tag Manager | Free | Tag management |
| Chrome DevTools | Free | Performance profiling, rendering analysis |

All Google tools listed are required for a complete audit. Access to Search Console and GA4 must be provisioned before the audit begins.

---

## Category 4: Performance and Core Web Vitals

| Tool | Type | Primary Use | Notes |
|------|------|-------------|-------|
| PageSpeed Insights | Web | CWV field data + Lighthouse lab data | Primary for CWV assessment |
| Lighthouse | Chrome DevTools | Lab performance audit | Run from Chrome DevTools for detailed diagnostics |
| WebPageTest | Web | Advanced performance waterfall | Strong for waterfall analysis and filmstrip view |
| Chrome User Experience Report | BigQuery | Population-level CWV data | Requires BigQuery access |

---

## Category 5: Accessibility

| Tool | Type | Primary Use | Notes |
|------|------|-------------|-------|
| axe DevTools | Browser extension | Automated accessibility testing | Most comprehensive automated scanner |
| Lighthouse Accessibility | Chrome DevTools | Automated accessibility audit | Subset of axe; available in all Chrome instances |
| WAVE | Browser extension | Accessibility visualization | Good for visual representation of issues |
| NVDA | Desktop | Screen reader testing (Windows) | Free; most-used Windows screen reader |
| VoiceOver | Built-in (macOS/iOS) | Screen reader testing | Available natively on Apple devices |

---

## Category 6: Keyword and Content Research

| Tool | Type | Primary Use | Notes |
|------|------|-------------|-------|
| Ahrefs Keywords Explorer | Cloud | Keyword research, SERP analysis | Strong intent classification and SERP feature data |
| Semrush Keyword Magic | Cloud | Keyword research, keyword gap | Large keyword database |
| Google Keyword Planner | Cloud | Search volume reference | Requires Google Ads account; volumes are bucketed |
| Clearscope / Surfer | Cloud | Content optimization | Useful for content depth analysis; secondary tool |
| Google Search (manual) | Web | SERP analysis, intent verification | Cannot be replaced by tool-based approximations |

---

## Category 7: Entity and Schema

| Tool | Type | Primary Use | Notes |
|------|------|-------------|-------|
| Google Rich Results Test | Web | Schema validation | Primary for schema validation |
| Schema.org Validator | Web | JSON-LD validation | Validates against Schema.org specification |
| Google's Structured Data Markup Helper | Web | Schema generation | Useful for creating initial schema markup |
| Wikidata | Web | Entity lookup and editing | For checking and updating entity records |
| Google's Knowledge Panel feedback | Web | Panel correction | For submitting corrections to Knowledge Panels |

---

## Category 8: AI Visibility

| Tool | Type | Primary Use | Notes |
|------|------|-------------|-------|
| Google Search (manual) | Web | AI Overview testing | No automation currently available; manual testing required |
| Perplexity.ai | Web | AI search response testing | Manually test brand and topic mentions |
| ChatGPT with Browse | Web | AI search response testing | Test across major AI platforms |
| BrightEdge / Conductor | Cloud | AI Overview tracking at scale | Enterprise tools with limited AI visibility reporting |

*Note: AI visibility tooling is rapidly evolving. New monitoring tools are expected in the 2026–2027 period. This section should be reviewed at each framework edition.*

---

## Category 9: Log File Analysis

| Tool | Type | Primary Use | Notes |
|------|------|-------------|-------|
| Screaming Frog Log File Analyser | Desktop | Log analysis for SEO | Purpose-built for SEO log analysis |
| Botify | Cloud | Log-level technical SEO at scale | Enterprise; required for very large sites (1M+ URLs) |
| Excel / Google Sheets | Desktop/Cloud | Custom log analysis | Suitable for smaller log files with custom filtering |

---

## Category 10: Local SEO

| Tool | Type | Primary Use | Notes |
|------|------|-------------|-------|
| Google Business Profile | Web | GBP management | Primary local entity management |
| BrightLocal | Cloud | Citation audit, rank tracking | Strong for citation consistency checking |
| Whitespark | Cloud | Citation building, tracking | Alternative to BrightLocal |
| Yext | Cloud | Listing management at scale | Enterprise-grade NAP management |

---

## Category 11: Reputation and Brand Monitoring

| Tool | Type | Primary Use | Notes |
|------|------|-------------|-------|
| Google Alerts | Free | Brand mention monitoring | Basic; good for volume check |
| Ahrefs Alerts | Cloud | Backlink and mention alerts | Better quality filtering than Google Alerts |
| Mention | Cloud | Brand monitoring | More comprehensive social + web monitoring |
| Brandwatch | Cloud | Enterprise brand monitoring | Enterprise-grade sentiment analysis |

---

## Minimum Viable Tool Stack for a Full Audit

The following tools are the minimum required to complete a full audit using this framework:

| Category | Tool | Cost |
|----------|------|------|
| Crawl | Screaming Frog SEO Spider | Paid (annual) |
| Backlinks | Ahrefs | Paid (monthly) |
| Google tools | Search Console + GA4 + PageSpeed Insights | Free |
| Performance | Chrome DevTools + Lighthouse | Free |
| Schema | Google Rich Results Test | Free |
| Accessibility | axe DevTools | Free (basic) |
| Keyword/Content | Semrush or Ahrefs (same subscription as backlinks) | Included above |
| AI visibility | Manual testing (Google, Perplexity) | Free |

---

*Tool Stack — Growth AI SEO Audit Framework™ v1.0.0*
