# Glossary

**Growth AI SEO Audit Framework™**
Version 1.0.0 — Technocrats Digimate Pvt. Ltd.

---

## Usage

This glossary defines terms as they are used in the Growth AI SEO Audit Framework™. Where a term has a common industry usage that differs from its usage in this framework, the distinction is noted.

Terms are listed alphabetically.

---

**AI Overview**
Google's AI-generated search result feature that synthesizes information from multiple sources and presents it as a direct answer above traditional results. Formerly referred to as Search Generative Experience (SGE) during its testing period.

**Anchor text**
The visible, clickable text of a hyperlink. In the context of external links (backlinks), anchor text provides topical context signals to search engines. In internal links, descriptive anchor text helps distribute topical relevance to destination pages.

**Authority (domain authority)**
A general term for the trust and ranking strength that a domain has accumulated through the quality and quantity of external links pointing to it. Not a specific Google metric — domain authority scores from tools like Ahrefs (Domain Rating) and Moz (Domain Authority) are approximations, not Google's actual internal metrics.

**Canonical URL**
The preferred version of a URL when multiple URLs serve the same or substantially similar content. Specified via the `rel="canonical"` tag in the HTML head or via HTTP Link header. Google uses canonical signals to consolidate duplicate content.

**Click-through rate (CTR)**
The percentage of search result impressions that result in a click. In organic search, CTR varies significantly by SERP position, query type, and presence of SERP features.

**CLS (Cumulative Layout Shift)**
A Core Web Vitals metric that measures the visual stability of a page. Reports the total unexpected layout shift of visible content during the page load. A score of 0.1 or below is classified as Good.

**Content gap**
A topic or query that primary competitors rank for but the evaluated site does not. Content gaps represent organic traffic opportunities.

**Conversion**
Any user action that represents a business outcome: purchase, lead form submission, phone call, email click, sign-up, or other defined action. In GA4, conversions are tracked as key events.

**Conversion rate**
The percentage of sessions or users who complete a defined conversion action. Organic conversion rate measures conversion from organic search sessions specifically.

**Core Web Vitals**
A set of three user experience metrics that Google uses as ranking signals: Largest Contentful Paint (LCP), Interaction to Next Paint (INP), and Cumulative Layout Shift (CLS). Measured from real-user data in the Chrome User Experience Report (CrUX).

**Crawl budget**
The number of URLs Googlebot will crawl on a site within a given timeframe. Determined by the site's crawl rate limit (server capacity) and crawl demand (how much Google wants to crawl the site). Most relevant for large sites (10,000+ pages).

**CrUX (Chrome User Experience Report)**
A dataset of real user performance data collected from Chrome browsers. Google uses CrUX data for Core Web Vitals ranking signal assessment.

**Digital PR**
The practice of earning media coverage and links from online publications through news, research, campaigns, or expert commentary. In the context of this framework, evaluated as an authority building and co-occurrence signal.

**Disavow**
The process of asking Google to ignore specific backlinks when assessing a site's authority. Performed via the Google Search Console Disavow Links tool. Should only be used for links that are genuinely unnatural or harmful.

**EEAT**
Experience, Expertise, Authoritativeness, and Trustworthiness. Google's documented quality assessment framework from the Search Quality Rater Guidelines. Influences how content is evaluated for quality and how ranking is adjusted for YMYL topics.

**Entity**
A named, uniquely identifiable thing: a person, organization, product, place, event, or concept. Google's Knowledge Graph is built around entities and the relationships between them.

**Entity disambiguation**
The process of making clear which specific entity a web page or brand represents, distinguishing it from other entities with similar names. Achieved through consistent NAP data, sameAs schema links, and authoritative citations.

**FCP (First Contentful Paint)**
The time from when a page starts loading to when any content is first rendered on screen. Not a Core Web Vitals metric but a useful diagnostic performance indicator. Good threshold: ≤ 1.8 seconds.

**Faceted navigation**
A filtering system that allows users to refine browsing by multiple attributes (color, size, price, category). Common on e-commerce sites. Can generate large numbers of URL combinations that cause crawl budget and duplicate content problems.

**Featured snippet**
A selected search result appearing above regular results, showing a direct answer extracted from a web page. Featured snippets can be paragraph, list, or table format.

**GA4 (Google Analytics 4)**
The current version of Google's web and app analytics platform. Event-based data model, replacing Universal Analytics (which was sunset in 2024).

**Growth AI Score™**
The composite metric produced by this framework. Calculated as the weighted sum of all nine pillar scores. Range: 0–100. A higher score indicates stronger performance across more dimensions of search and conversion health.

**Hreflang**
An HTML attribute that signals the language and geographic target of a page to search engines. Used on multilingual or multi-regional sites to direct users to the appropriate language version.

**Information gain**
The degree to which content adds information not already available in competing sources for the same query. A documented quality signal in Google's research.

**INP (Interaction to Next Paint)**
A Core Web Vitals metric that measures the latency of the slowest user interaction with a page. Replaced FID (First Input Delay) in March 2024. Good threshold: ≤ 200 milliseconds.

**Indexation**
The inclusion of a URL in a search engine's index, making it eligible to appear in search results. A page can be crawled but not indexed.

**JSON-LD (JavaScript Object Notation for Linked Data)**
The preferred encoding format for structured data (schema.org) in web pages. Placed in a `<script type="application/ld+json">` tag in the HTML head.

**Knowledge Graph**
Google's database of entities and the relationships between them. Used to understand queries and pages at a semantic level, beyond keyword matching.

**Knowledge Panel**
A rich search result panel that appears for recognized entities (people, organizations, places) in Google Search. Indicates that Google has added the entity to its Knowledge Graph.

**LCP (Largest Contentful Paint)**
A Core Web Vitals metric that measures loading performance. Reports the render time of the largest visible content element in the viewport. Good threshold: ≤ 2.5 seconds.

**Manual action**
A penalty applied by Google's human reviewers to a specific URL or site, typically for violating Google's spam policies. Manual actions are visible in Google Search Console.

**NAP (Name, Address, Phone)**
The three primary data points used for local business entity verification. Consistency of NAP across directories and the website is a local SEO ranking signal.

**Noindex**
A directive that instructs search engines not to include a page in their index. Can be specified via meta robots tag (`<meta name="robots" content="noindex">`) or HTTP X-Robots-Tag header.

**Organic search**
Search traffic from non-paid search results. Traffic from Google, Bing, and other search engines that was not directly purchased via advertising.

**PageRank**
Google's foundational algorithm for assessing the importance of a page based on the quantity and quality of links pointing to it. Still a significant component of ranking, though the modern implementation is substantially more sophisticated than the original formulation.

**Passage indexing**
Google's capability to index and rank individual passages within a page independently, enabling the page to rank for specific queries even when the overall page topic is broader.

**Rendering**
The process of executing a page's HTML, CSS, and JavaScript to produce the Document Object Model (DOM) that users and search engines see. Google renders JavaScript asynchronously via Web Rendering Service (WRS).

**Robots.txt**
A text file at the root of a domain (`/robots.txt`) that instructs crawlers about which URLs they are allowed or disallowed from crawling.

**sameAs**
A Schema.org property used in JSON-LD markup to connect an entity to its profiles on other authoritative websites. Used for organization disambiguation and Knowledge Graph association.

**Schema.org**
A vocabulary of structured data markup types collaboratively maintained by Google, Microsoft, Yahoo, and Yandex. Used to communicate structured information about entities, content, and relationships to search engines.

**Search Console**
Google Search Console (GSC) is a free tool provided by Google that allows site owners to monitor indexation status, search performance, Core Web Vitals, and technical issues.

**Search intent**
The underlying goal or need behind a search query. Google categorizes intent as informational, navigational, commercial investigation, or transactional.

**SERP (Search Engine Results Page)**
The page returned by a search engine in response to a query. Contains organic results, paid results, and various features (featured snippets, Knowledge Panels, image packs, etc.).

**Topical authority**
The degree to which a website is recognized as a comprehensive and reliable source on a given subject area. Built through content depth and breadth, internal linking, entity associations, and external citations.

**UTM parameters**
Query string tags added to URLs to track traffic sources in analytics. Defined by Google for use with Google Analytics. Standard parameters: `utm_source`, `utm_medium`, `utm_campaign`, `utm_content`, `utm_term`.

**WCAG (Web Content Accessibility Guidelines)**
An international standard for web accessibility published by the W3C. WCAG 2.1 Level AA is the widely adopted minimum standard for accessible web content.

**XML sitemap**
An XML file that explicitly lists URLs on a website, helping search engines discover and index content. Can include additional metadata (priority, last modified date).

**YMYL (Your Money or Your Life)**
A category designation in Google's Quality Rater Guidelines for content that, if inaccurate, could significantly impact a user's health, financial stability, safety, or wellbeing. YMYL content is subject to stricter quality evaluation standards.

---

*Glossary — Growth AI SEO Audit Framework™ v1.0.0*
