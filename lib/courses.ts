export interface Course {
  slug: string;
  title: string;
  subtitle: string;
  type: "webinar" | "course" | "program" | "mentorship";
  badge: string;
  price: number;
  originalPrice: number;
  duration: string;
  description: string;
  painPoints: string[];
  includes: string[];
  curriculum: { module: string; lessons: string[] }[];
  forWho: string[];
  cta: string;
  urgency: string;
  thankYouMessage: string;
}

export const COURSES: Course[] = [
  {
    slug: "meta-ads-quality-leads-webinar",
    title: "Why Your Meta Ads Get Clicks But Zero Quality Leads",
    subtitle: "Live 2-hour webinar with Gautam Punj — diagnose your exact leakage point",
    type: "webinar",
    badge: "Live Webinar · ₹99",
    price: 99,
    originalPrice: 499,
    duration: "2 hours live",
    description:
      "You're spending ₹30,000–₹2,00,000 a month on Meta Ads. The clicks are coming. But the leads are either fake, unresponsive, or completely wrong. In this live 2-hour session, Gautam will break down the exact 3 reasons this happens — and show you how to fix each one before your next campaign.",
    painPoints: [
      "Getting 50 leads but only 2-3 respond on WhatsApp",
      "CPL keeps rising every week with no explanation",
      "Agency says 'optimization takes time' but nothing improves",
      "Fake numbers, wrong names, random leads from irrelevant cities",
    ],
    includes: [
      "2-hour live session with Gautam Punj",
      "Live Q&A — ask about your specific campaign",
      "Recording access for 30 days",
      "Lead Quality Audit Checklist (PDF)",
      "WhatsApp group access post-webinar",
    ],
    curriculum: [
      {
        module: "Part 1 — Why Clicks Don't Convert",
        lessons: [
          "The message-to-market mismatch killing your campaigns",
          "Audience signals Meta is actually optimizing for",
          "Why broad targeting works for some and fails for others",
        ],
      },
      {
        module: "Part 2 — The Landing Page Leak",
        lessons: [
          "Above-the-fold mistakes that repel quality leads",
          "Form friction vs. form qualification",
          "Mobile speed and why 3 seconds costs you 60% of leads",
        ],
      },
      {
        module: "Part 3 — The Follow-Up Gap",
        lessons: [
          "Why leads go cold in 15 minutes",
          "WhatsApp response scripts that actually get replies",
          "Building a simple CRM pipeline that works",
        ],
      },
    ],
    forWho: [
      "Business owners spending ₹20,000+ on Meta Ads monthly",
      "Real estate agents, clinic owners, coaches, consultants",
      "Anyone getting leads but not conversions",
      "Marketing managers frustrated with agency results",
    ],
    cta: "Reserve My Spot — ₹99",
    urgency: "Limited to 100 seats. Price goes to ₹499 after this batch.",
    thankYouMessage:
      "You're registered! Webinar details will be sent to your WhatsApp within 24 hours. Save Gautam's number +91 94677 44000 to receive updates.",
  },
  {
    slug: "meta-ads-mastery-course",
    title: "Meta Ads Mastery for Indian Service Businesses",
    subtitle: "The complete system to run profitable lead generation campaigns — from scratch to scale",
    type: "course",
    badge: "Self-Paced Course · ₹4,999",
    price: 4999,
    originalPrice: 9999,
    duration: "6 weeks self-paced",
    description:
      "A complete A-to-Z Meta Ads course built specifically for Indian service businesses — real estate, clinics, coaching, study abroad, financial services. Not generic theory. Every module is built around the exact campaigns Gautam runs for clients paying ₹50,000+/month.",
    painPoints: [
      "Tried running ads yourself but wasted money",
      "Can't afford an agency but know ads work",
      "Your current agency won't explain what they're doing",
      "Want to build an in-house performance marketing skill",
    ],
    includes: [
      "40+ video lessons (Hindi + English)",
      "Campaign templates for 6 industries",
      "Ad copy swipe file (50+ proven hooks)",
      "Landing page wireframe templates",
      "WhatsApp follow-up script library",
      "Lifetime access + future updates",
      "Private community access",
      "1 live Q&A session per month",
    ],
    curriculum: [
      {
        module: "Module 1 — Foundation",
        lessons: [
          "How Meta's algorithm actually works in 2025",
          "Business Manager setup the right way",
          "Pixel installation + CAPI setup",
          "Understanding your audience before spending ₹1",
        ],
      },
      {
        module: "Module 2 — Campaign Architecture",
        lessons: [
          "Campaign, Ad Set, Ad — what to control at each level",
          "Budget allocation strategy for Indian markets",
          "The 3-campaign structure that scales predictably",
          "Testing framework — creative, audience, offer",
        ],
      },
      {
        module: "Module 3 — Creative That Converts",
        lessons: [
          "Hook formulas for Indian audiences",
          "Video vs. image — when to use what",
          "Ad copy templates for service businesses",
          "Creative fatigue — how to spot it and fix it fast",
        ],
      },
      {
        module: "Module 4 — Landing Pages",
        lessons: [
          "Page structure for maximum form fills",
          "Form design — how many fields, which questions",
          "Mobile-first design principles",
          "A/B testing your pages without budget waste",
        ],
      },
      {
        module: "Module 5 — Lead Quality & Follow-Up",
        lessons: [
          "Filtering fake leads at the ad level",
          "WhatsApp automation for instant response",
          "CRM setup for tracking lead journey",
          "Retargeting warm audiences profitably",
        ],
      },
      {
        module: "Module 6 — Scaling",
        lessons: [
          "When and how to scale a winning campaign",
          "Lookalike audiences that actually work",
          "Reading your data — which numbers actually matter",
          "Building a repeatable monthly growth system",
        ],
      },
    ],
    forWho: [
      "Business owners who want to run their own ads profitably",
      "Marketing executives managing ad campaigns",
      "Freelancers building a performance marketing service",
      "Agency owners wanting to improve client results",
    ],
    cta: "Enroll Now — ₹4,999",
    urgency: "Price increases to ₹9,999 after this cohort. Lifetime access included.",
    thankYouMessage:
      "Welcome to the course! You'll receive login credentials and course access link on WhatsApp within 2 hours. Questions? WhatsApp Gautam directly at +91 94677 44000.",
  },
  {
    slug: "performance-marketing-implementation-program",
    title: "Performance Marketing Implementation Program",
    subtitle: "Done-with-you. 4 weeks. Gautam builds your entire ads system alongside you.",
    type: "program",
    badge: "Premium Program · ₹24,999",
    price: 24999,
    originalPrice: 49999,
    duration: "4 weeks intensive",
    description:
      "This is not a course. This is a 4-week implementation sprint where Gautam personally works with you to build, launch, and optimise your Meta Ads system. Limited to 5 businesses per cohort. You leave with a fully running, profitable campaign — not just knowledge.",
    painPoints: [
      "Have tried courses but can't implement alone",
      "Spending ₹1L+/month on an agency with poor ROI",
      "Need someone senior to build the system, not just teach",
      "Want accountability and hands-on execution support",
    ],
    includes: [
      "8 live 1:1 sessions with Gautam (2 per week)",
      "Full campaign audit and rebuild",
      "Landing page review and copy rewrite",
      "WhatsApp automation setup",
      "Custom dashboard to track your numbers",
      "30-day post-program WhatsApp support",
      "Recording of all sessions",
      "All templates from the Mastery Course included",
    ],
    curriculum: [
      {
        module: "Week 1 — Audit & Strategy",
        lessons: [
          "Deep audit of your current campaigns and pages",
          "Define your ICP and offer positioning",
          "Build your 90-day ads roadmap",
          "Fix all technical foundations (Pixel, CAPI, BM)",
        ],
      },
      {
        module: "Week 2 — Build",
        lessons: [
          "Launch new campaign structure together",
          "Create and test 3 ad creatives",
          "Optimise your landing page for conversions",
          "Set up lead follow-up automation",
        ],
      },
      {
        module: "Week 3 — Optimise",
        lessons: [
          "Analyse first week's data together",
          "Kill losers, scale winners",
          "Launch retargeting campaigns",
          "Improve lead quality with audience refinement",
        ],
      },
      {
        module: "Week 4 — Scale & Handoff",
        lessons: [
          "Build a sustainable scaling playbook for your business",
          "Train your team or yourself on ongoing management",
          "Set up monthly reporting dashboard",
          "30-day check-in plan post-program",
        ],
      },
    ],
    forWho: [
      "Business owners spending ₹50,000+ on ads monthly",
      "Companies with a sales team ready to handle more leads",
      "Founders who want to own their marketing, not outsource it",
      "Anyone who has tried courses but needs guided execution",
    ],
    cta: "Apply for the Program — ₹24,999",
    urgency: "Only 5 spots per cohort. Currently 2 spots remaining.",
    thankYouMessage:
      "Application received! Gautam will personally WhatsApp you within 4 hours to schedule your onboarding call. Save his number: +91 94677 44000.",
  },
];

export function getCourseBySlug(slug: string): Course | undefined {
  return COURSES.find((c) => c.slug === slug);
}
