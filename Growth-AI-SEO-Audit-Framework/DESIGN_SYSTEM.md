# Design System

**Growth AI SEO Audit Framework™**
Version 1.0.0 — Technocrats Digimate Pvt. Ltd.

---

## Purpose

This document specifies the visual and typographic standards for all framework documents, client deliverables, templates, and published materials associated with the Growth AI SEO Audit Framework™. Consistent application of these standards ensures that all materials produced under this framework are recognizable as Technocrats Digimate intellectual property and maintain the professional quality expected of an enterprise consulting methodology.

---

## Brand Identity

**Organization:** Technocrats Digimate Pvt. Ltd.
**Framework name:** Growth AI SEO Audit Framework™
**Short form:** GAISAF (internal reference only — not used in client materials)
**Trademark notice:** Growth AI SEO Audit Framework™ and Growth AI Score™ are trademarks of Technocrats Digimate Pvt. Ltd.

---

## Color System

### Primary Palette

| Name | Hex | Usage |
|------|-----|-------|
| Deep Ink | `#040E18` | Primary background, headers, body text on light backgrounds |
| Signal Red | `#F02D2B` | Accent, call-to-action, pillar indicators, score highlights |
| Pure White | `#FFFFFF` | Text on dark backgrounds, page backgrounds, card fills |

### Secondary Palette

| Name | Hex | Usage |
|------|-----|-------|
| Mist Grey | `#F4F5F7` | Section dividers, alternate row fills, subtle backgrounds |
| Slate Grey | `#64748B` | Secondary text, captions, labels, metadata |
| Border Grey | `#E2E8F0` | Table borders, card borders, dividers |
| Success Green | `#16A34A` | Pass indicators, positive findings |
| Warning Amber | `#D97706` | Partial indicators, caution states |
| Error Red | `#DC2626` | Fail indicators, critical findings |

### Score Color Mapping

| Classification | Color | Hex |
|---------------|-------|-----|
| Elite (90–100) | Deep Teal | `#0F766E` |
| Advanced (75–89) | Success Green | `#16A34A` |
| Proficient (60–74) | Signal Blue | `#2563EB` |
| Developing (40–59) | Warning Amber | `#D97706` |
| Critical (0–39) | Error Red | `#DC2626` |

---

## Typography

### Primary Typeface

**Axiforma** — preferred for all headings, subheadings, and display text.

Weights used:
- Axiforma Regular (400) — body text
- Axiforma Medium (500) — labels and captions
- Axiforma SemiBold (600) — subheadings
- Axiforma Bold (700) — section headings
- Axiforma ExtraBold (800) — document titles and pillar names

### Fallback Typeface

**Inter** — used when Axiforma is unavailable (web delivery, exported documents, client systems).

CSS font stack:
```css
font-family: 'Axiforma', 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
```

### Monospace Typeface

**JetBrains Mono** or **Fira Code** — used for code blocks, technical outputs, URLs, and checkpoint IDs.

```css
font-family: 'JetBrains Mono', 'Fira Code', 'Courier New', monospace;
```

### Type Scale

| Level | Size | Weight | Use |
|-------|------|--------|-----|
| Document Title | 36px / 2.25rem | ExtraBold 800 | Cover page, major section openers |
| Chapter Title | 28px / 1.75rem | Bold 700 | Chapter headings (H1) |
| Section Heading | 22px / 1.375rem | SemiBold 600 | Section headings (H2) |
| Subsection Heading | 18px / 1.125rem | SemiBold 600 | Subsection headings (H3) |
| Body Text | 16px / 1rem | Regular 400 | All paragraph text |
| Label / Caption | 13px / 0.8125rem | Medium 500 | Table headers, captions, metadata |
| Code | 14px / 0.875rem | Regular 400 | All monospace content |

### Line Height

- Body text: 1.6
- Headings: 1.2
- Captions and labels: 1.4

### Paragraph Width

For long-form documentation: 65–75 characters per line (approximately 640–720px at 16px body text). This matches the reading-comfort range documented in typographic research and mirrors the standards used in Stripe and Apple documentation.

---

## Spacing System

All spacing follows an 8-point base grid.

| Token | Value | Use |
|-------|-------|-----|
| space-1 | 4px | Tight — icon padding, inline tags |
| space-2 | 8px | Base unit — internal component spacing |
| space-3 | 12px | Related element grouping |
| space-4 | 16px | Standard paragraph spacing |
| space-6 | 24px | Section component spacing |
| space-8 | 32px | Section separation |
| space-12 | 48px | Major section breaks |
| space-16 | 64px | Chapter separations |
| space-24 | 96px | Page top/bottom margins |

---

## Component Standards

### Tables

- Header row: Deep Ink background, Pure White text, SemiBold 600
- Alternate rows: White and Mist Grey (#F4F5F7)
- Border: 1px Border Grey (#E2E8F0)
- Cell padding: 12px horizontal, 10px vertical
- Numeric columns: right-aligned
- Text columns: left-aligned

### Code Blocks

- Background: #0F172A (very dark navy)
- Text: #E2E8F0 (light grey)
- Border radius: 6px
- Padding: 16px
- Font: JetBrains Mono 14px
- Include a language label in the top-right corner

### Callout Blocks

Four types, each with a left border (4px) and light background fill:

| Type | Border Color | Background | Icon |
|------|-------------|------------|------|
| Note | Signal Blue #2563EB | #EFF6FF | info |
| Warning | Warning Amber #D97706 | #FFFBEB | alert |
| Critical | Error Red #DC2626 | #FEF2F2 | x-circle |
| Insight | Deep Teal #0F766E | #F0FDF9 | lightbulb |

### Score Badges

Score badges appear in scorecards and report headers.

Structure: [Pillar name] [Score] [Classification]

Example:
```
Technical Intelligence™    74 / 100    Proficient
```

Badge styling:
- Container: 1px Border Grey border, Mist Grey background, 6px border radius
- Score number: 24px Bold, Signal Red
- Classification label: 13px Medium, Slate Grey

---

## Diagrams

### Diagram Tool

All framework diagrams are built in Mermaid. Mermaid source files are stored in `/assets/diagrams/`. Each diagram file is named with the checkpoint or chapter it belongs to.

### Mermaid Configuration

Use the following base theme configuration for all diagrams:

```
%%{init: {
  'theme': 'base',
  'themeVariables': {
    'primaryColor': '#040E18',
    'primaryTextColor': '#FFFFFF',
    'primaryBorderColor': '#F02D2B',
    'lineColor': '#64748B',
    'secondaryColor': '#F4F5F7',
    'tertiaryColor': '#E2E8F0',
    'fontFamily': 'Inter, sans-serif',
    'fontSize': '14px'
  }
}}%%
```

### Diagram Types in This Framework

| Type | Use Case |
|------|----------|
| `flowchart TD` | Process flows, decision trees, audit workflows |
| `flowchart LR` | Data pipelines, crawl flows, rendering paths |
| `graph LR` | Entity relationships, site architecture |
| `sequenceDiagram` | Tool interaction sequences, API flows |
| `pie` | Score breakdowns, traffic distributions |
| `xychart-beta` | Score trends, before/after comparisons |

---

## Markdown Formatting Standards

All framework documents are written in GitHub-flavored Markdown. The following rules apply:

### Headings

- H1 (`#`): Document title only — one per file
- H2 (`##`): Major sections
- H3 (`###`): Subsections
- H4 (`####`): Checkpoint sub-items only
- No heading levels below H4

### Lists

- Unordered lists: Use `-` as the bullet character (not `*` or `+`)
- Ordered lists: Use sequential numbers (`1.`, `2.`, `3.`)
- Nested lists: Maximum two levels of nesting
- No punctuation at end of list items unless the item is a complete sentence

### Emphasis

- Bold (`**text**`): Key terms, findings, criteria
- Italic (`*text*`): Titles of external publications, first introduction of a defined term
- Code (`\`text\``): Tool names, commands, URLs, file names, checkpoint IDs

### Links

- Internal links: Relative paths (`[SCORING.md](SCORING.md)`)
- No bare URLs — all URLs must be wrapped in link syntax
- External links: Include the source name in the link text

---

## Document Structure Standards

### Core Framework Files

Every core framework file (README, INTRODUCTION, PHILOSOPHY, METHODOLOGY, SCORING, DESIGN_SYSTEM) follows this structure:

1. H1 title
2. Document subtitle block (bold, with version and org)
3. Horizontal rule
4. Body content
5. Horizontal rule
6. Navigation footer linking to the next document

### Chapter Files

Every chapter file follows this structure:

1. H1 title (pillar name)
2. Document subtitle block
3. Horizontal rule
4. Pillar overview (purpose, scope, weight)
5. Horizontal rule
6. Mermaid architecture diagram
7. Horizontal rule
8. Checkpoint index (table of all checkpoints in the pillar)
9. Horizontal rule
10. Checkpoint detail sections (one per checkpoint)
11. Horizontal rule
12. Pillar scoring summary
13. Navigation footer

### Checkpoint Files

See `/templates/checkpoint-template.md` for the standard checkpoint file structure.

---

## Report Design Standards

### Client Reports

Client-facing audit reports are produced as PDF documents exported from the framework's markdown source. The PDF layout follows:

- Cover page: Document title, client name, date, Technocrats Digimate branding
- Table of contents: Auto-generated with page numbers
- Executive summary: 2–4 pages
- Pillar sections: One section per pillar evaluated
- Appendix: Tool outputs, evidence references

### Page Layout

- Paper size: A4 or Letter (depending on client geography)
- Top margin: 25mm
- Bottom margin: 25mm
- Left margin: 30mm
- Right margin: 25mm
- Header: Document title + client name (running header)
- Footer: Page number + version + confidentiality notice

### Confidentiality Notice

All client reports carry a footer confidentiality notice:

```
Confidential — Prepared by Technocrats Digimate Pvt. Ltd. for [Client Name] — [Year]
Not for distribution without written authorization.
```

---

## Naming Conventions

### Files

- Framework files: UPPERCASE with hyphens (`DESIGN_SYSTEM.md`, `SCORING.md`)
- Chapter files: Numbered with lowercase hyphenated names (`01-foundations.md`)
- Checkpoint files: Pillar prefix + zero-padded number (`TI-001.md`, `CI-012.md`)
- Template files: Descriptive lowercase hyphenated names (`checkpoint-template.md`)
- Asset files: Type prefix + descriptive name (`diagram-crawl-lifecycle.mmd`)

### Checkpoint IDs

| Pillar | Prefix | Range |
|--------|--------|-------|
| Technical Intelligence™ | TI | TI-001 – TI-020 |
| Content Intelligence™ | CI | CI-001 – CI-015 |
| Entity Intelligence™ | EI | EI-001 – EI-010 |
| Authority Intelligence™ | AI | AI-001 – AI-012 |
| AI Visibility Intelligence™ | AV | AV-001 – AV-010 |
| UX Intelligence™ | UX | UX-001 – UX-010 |
| Conversion Intelligence™ | CV | CV-001 – CV-010 |
| Analytics Intelligence™ | AN | AN-001 – AN-010 |
| Competitive Intelligence™ | CO | CO-001 – CO-008 |

---

*Next: [chapters/01-foundations.md](chapters/01-foundations.md) — Framework foundations*
