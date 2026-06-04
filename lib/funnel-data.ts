export type Question = {
  id: string;
  label: string;
  type: "text" | "phone" | "email" | "single" | "multi";
  options?: string[];
  placeholder?: string;
  helper?: string;
};

export type FunnelConfig = {
  slug: string;
  niche: string;
  eyebrow: string;
  heroHeadline: string;
  heroSubheadline: string;
  cta: string;
  finalButton: string;
  heroAudit: {
    title: string;
    items: {
      label: string;
      status: string;
    }[];
  };
  painPoints: string[];
  caseStudy: {
    title: string;
    label: string;
    description: string[];
    audited: string[];
    outcome: string;
    snapshot: {
      label: string;
      value: string;
    }[];
    bullets: string[];
  };
  assets: {
    hero: string;
    caseStudy: string;
    dashboard: string;
    testimonial: string;
  };
  questions: Question[];
};

const sharedBudgetOptions = [
  "Not running ads",
  "Under ₹1,00,000",
  "₹1,00,000 – ₹5,00,000",
  "₹5,00,000 – ₹10,00,000",
  "₹10,00,000 – ₹25,00,000",
  "Over ₹25,00,000"
];

const readinessOptions = ["Yes, immediately", "Within 15 days", "Within 30 days", "Just exploring"];
const callTimeOptions = ["Morning", "Afternoon", "Evening", "Anytime"];
const languageOptions = ["English", "Hindi", "Hinglish", "Punjabi"];

export const realEstateFunnel: FunnelConfig = {
  slug: "real-estate-growth-audit",
  niche: "Real Estate",
  eyebrow: "Free Diagnostic Growth Audit for Property Businesses",
  heroHeadline: "Burning Money on Property Leads That Don't Convert?",
  heroSubheadline:
    "We help real estate brokers, builders, developers, and agencies diagnose why their Meta and Google Ads are not generating serious buyers, site visits, and conversions.",
  cta: "Start Free Property Lead Audit",
  finalButton: "Book My Free Real Estate Growth Audit",
  heroAudit: {
    title: "Real Estate Funnel Audit Snapshot",
    items: [
      { label: "Lead Quality Score", status: "Low Intent Leads" },
      { label: "CPL Leakage", status: "High Risk" },
      { label: "Landing Page Drop-off", status: "Needs Review" },
      { label: "Follow-up Delay", status: "Slow Follow-up" },
      { label: "Site Visit Tracking Missing", status: "Missing Tracking" },
      { label: "WhatsApp Response Gap", status: "Needs Review" }
    ]
  },
  painPoints: [
    "Paid ads are running, but quality leads are not coming.",
    "Your team is chasing enquiries that do not answer, visit, or qualify.",
    "Campaigns, landing pages, WhatsApp follow-up, and tracking are not working as one system."
  ],
  caseStudy: {
    label: "Real Estate Case Study",
    title: "From Paid Ad Spend to Better Buyer Intent",
    description: [
      "A real estate business was running paid campaigns, but the sales team was still struggling with lead quality, delayed call response, unclear buyer budgets, and low site-visit readiness.",
      "Technocrats Digimate reviewed the complete lead journey — from ad targeting and creative message to landing page filtration, WhatsApp follow-up, and site visit tracking."
    ],
    audited: [
      "Campaign targeting and offer clarity",
      "Landing page lead filtration",
      "WhatsApp and call follow-up speed",
      "Buyer intent and site-visit tracking"
    ],
    outcome:
      "The audit helped shift the focus from more enquiries to better buyer intent and stronger sales conversations.",
    snapshot: [
      { label: "Lead Quality", value: "Needs filtration" },
      { label: "Landing Page", value: "Weak qualification" },
      { label: "Follow-up Speed", value: "Manual process" },
      { label: "Site Visit Tracking", value: "Missing source clarity" }
    ],
    bullets: [
      "Enquiries were coming, but buyer intent was unclear.",
      "Follow-up needed faster prioritization.",
      "Site visit tracking needed better source clarity."
    ]
  },
  assets: {
    hero: "/assets/real-estate/real-estate-hero-placeholder.jpg.png",
    caseStudy: "/assets/real-estate/real-estate-client-visual.jpg.png",
    dashboard: "/assets/real-estate/real-estate-dashboard-proof.svg",
    testimonial: "/assets/testimonials/testimonial-placeholder.jpg"
  },
  questions: [
    { id: "name", label: "Your Name", type: "text", placeholder: "Enter your full name" },
    { id: "businessName", label: "Business Name", type: "text", placeholder: "Enter your business name" },
    { id: "location", label: "City / Location", type: "text", placeholder: "Enter your city" },
    { id: "whatsapp", label: "WhatsApp Number", type: "phone", placeholder: "Enter WhatsApp number" },
    { id: "email", label: "Email ID", type: "email", placeholder: "Enter email address" },
    {
      id: "businessType",
      label: "What best describes your business?",
      type: "single",
      options: ["Real Estate Broker / Agent", "Builder / Developer", "Real Estate Agency", "Freelancer / Consultant", "Other"]
    },
    {
      id: "propertyType",
      label: "What type of properties do you deal in?",
      type: "multi",
      options: ["Residential Flats / Villas", "Commercial Shops / Offices", "Plots / Land", "Luxury Properties", "Mixed"]
    },
    {
      id: "leadSource",
      label: "How are you currently getting leads?",
      type: "multi",
      options: [
        "Facebook / Instagram Ads",
        "Google Ads",
        "Property Portals like 99acres, MagicBricks etc.",
        "Referrals / Network",
        "Not running any ads"
      ]
    },
    {
      id: "biggestProblem",
      label: "What is your biggest problem right now?",
      type: "multi",
      options: [
        "Not getting enough leads",
        "Leads are coming but quality is poor",
        "Leads are not answering calls",
        "CPL is too high",
        "Ads are spending but no site visits",
        "No proper follow-up system",
        "Not sure what is wrong"
      ]
    },
    {
      id: "monthlyBudget",
      label: "What is your current monthly ad budget?",
      type: "single",
      options: sharedBudgetOptions,
      helper: "Approximate monthly paid ads budget is enough."
    },
    {
      id: "helpNeeded",
      label: "What do you want help with?",
      type: "multi",
      options: ["Meta Ads", "Google Ads", "Landing Page", "WhatsApp Automation", "CRM / Lead Tracking", "Complete Lead Generation Funnel"]
    },
    {
      id: "readyToInvest",
      label: "If we show you the problem and a clear growth plan, are you ready to invest?",
      type: "single",
      options: readinessOptions
    },
    { id: "preferredCallTime", label: "Preferred call time", type: "single", options: callTimeOptions },
    { id: "preferredLanguage", label: "Preferred language", type: "single", options: languageOptions }
  ]
};

export const studyAbroadFunnel: FunnelConfig = {
  slug: "study-abroad-growth-audit",
  niche: "Study Abroad",
  eyebrow: "Free Diagnostic Growth Audit for Education and Visa Brands",
  heroHeadline: "Running Ads for Study Abroad But Not Getting Serious Student Leads?",
  heroSubheadline:
    "We help study abroad consultants, immigration consultants, IELTS/PTE institutes, and education brands diagnose why their ads are not generating qualified student enquiries, counselling appointments, and walk-ins.",
  cta: "Start Free Student Lead Audit",
  finalButton: "Book My Free Study Abroad Growth Audit",
  heroAudit: {
    title: "Student Lead Audit Snapshot",
    items: [
      { label: "Lead Seriousness", status: "Needs Review" },
      { label: "Country Fit", status: "Low Intent Leads" },
      { label: "Eligibility Gap", status: "High Risk" },
      { label: "Counsellor Follow-up", status: "Slow Follow-up" },
      { label: "Appointment Tracking", status: "Missing Tracking" },
      { label: "WhatsApp Response Gap", status: "Needs Review" }
    ]
  },
  painPoints: [
    "Paid ads are spending, but students are not serious enough to book counselling.",
    "Enquiries ask for free information and disappear before a real conversation.",
    "There is no country-specific funnel, qualification layer, or structured follow-up."
  ],
  caseStudy: {
    label: "Study Abroad Case Study",
    title: "From Student Enquiries to Qualified Counselling Conversations",
    description: [
      "A study abroad business was running paid campaigns, but counsellors were spending time on low-fit students, casual enquiries, and prospects without clear country, intake, budget, or eligibility intent.",
      "Technocrats Digimate reviewed the complete student acquisition journey — from campaign message and country targeting to student qualification, WhatsApp follow-up, and counselling appointment tracking."
    ],
    audited: [
      "Country-specific campaign messaging",
      "Student eligibility and intent filtration",
      "WhatsApp and counsellor follow-up speed",
      "Counselling appointment tracking"
    ],
    outcome:
      "The audit helped separate casual enquiries from serious students and gave counsellors better context before every call.",
    snapshot: [
      { label: "Student Intent", value: "Needs qualification" },
      { label: "Country Fit", value: "Needs clarity" },
      { label: "Follow-up Speed", value: "Manual process" },
      { label: "Appointment Tracking", value: "Missing stage visibility" }
    ],
    bullets: [
      "Enquiries were coming, but student intent was unclear.",
      "Follow-up needed faster prioritization.",
      "Appointment tracking needed better stage visibility."
    ]
  },
  assets: {
    hero: "/assets/study-abroad/study-abroad-hero-placeholder.jpg.png",
    caseStudy: "/assets/study-abroad/study-abroad-hero-placeholder.jpg.png",
    dashboard: "/assets/study-abroad/study-abroad-leadgen-dashboard.svg",
    testimonial: "/assets/testimonials/testimonial-placeholder.jpg"
  },
  questions: [
    { id: "name", label: "Your Name", type: "text", placeholder: "Enter your full name" },
    { id: "businessName", label: "Business / Institute Name", type: "text", placeholder: "Enter your institute name" },
    { id: "location", label: "City / Location", type: "text", placeholder: "Enter your city" },
    { id: "whatsapp", label: "WhatsApp Number", type: "phone", placeholder: "Enter WhatsApp number" },
    { id: "email", label: "Email ID", type: "email", placeholder: "Enter email address" },
    {
      id: "businessType",
      label: "What best describes your business?",
      type: "single",
      options: [
        "Study Abroad Consultant",
        "Immigration Consultant",
        "IELTS / PTE Institute",
        "Coaching Institute",
        "Education Franchise",
        "University Representative",
        "Visa Consultant",
        "Freelancer / Independent Consultant",
        "Other"
      ]
    },
    {
      id: "services",
      label: "What services do you provide?",
      type: "multi",
      options: [
        "Study Visa Counselling",
        "University / College Applications",
        "IELTS / PTE Coaching",
        "Visitor Visa",
        "Spouse Visa",
        "PR / Immigration Services",
        "Loan / Scholarship Assistance",
        "Complete Study Abroad Services"
      ]
    },
    {
      id: "countries",
      label: "Which countries do you mainly promote?",
      type: "multi",
      options: ["Canada", "UK", "Australia", "USA", "Germany", "New Zealand", "Europe", "Ireland", "Multiple Countries"]
    },
    {
      id: "leadSource",
      label: "How are you currently getting student leads?",
      type: "multi",
      options: [
        "Facebook / Instagram Ads",
        "Google Ads",
        "Organic Instagram / Facebook",
        "YouTube",
        "Referrals / Student Network",
        "School / College Tie-ups",
        "WhatsApp Groups",
        "Walk-ins",
        "Not running any ads"
      ]
    },
    {
      id: "biggestProblem",
      label: "What is your biggest marketing problem right now?",
      type: "single",
      options: [
        "Not getting enough student leads",
        "Leads are coming but not serious",
        "Students don't answer calls",
        "Students only ask for free information",
        "CPL is too high",
        "Low walk-ins / low appointments",
        "No proper follow-up system",
        "No country-specific funnel",
        "Not sure what is wrong"
      ]
    },
    {
      id: "monthlyBudget",
      label: "What is your current monthly ad budget?",
      type: "single",
      options: sharedBudgetOptions,
      helper: "Approximate monthly paid ads budget is enough."
    },
    {
      id: "helpNeeded",
      label: "What do you want help with?",
      type: "multi",
      options: [
        "Meta Ads",
        "Google Ads",
        "Landing Page",
        "WhatsApp Automation",
        "CRM / Lead Tracking",
        "Reels / Social Media Content",
        "Complete Student Lead Generation Funnel"
      ]
    },
    {
      id: "readyToInvest",
      label: "If we show you the problem and a clear growth plan, are you ready to invest?",
      type: "single",
      options: readinessOptions
    },
    { id: "preferredCallTime", label: "Preferred call time", type: "single", options: callTimeOptions },
    { id: "preferredLanguage", label: "Preferred language", type: "single", options: languageOptions }
  ]
};

export const processSteps = [
  {
    title: "Filtration Form",
    description: "We collect niche, budget, lead source, intent, and the current bottleneck before booking the audit.",
    output: "Qualified audit context"
  },
  {
    title: "Booker",
    description: "Qualified prospects move toward a dedicated audit slot instead of a vague callback request.",
    output: "Confirmed meeting slot"
  },
  {
    title: "Call Confirmation",
    description: "The prospect is sent to WhatsApp and calendar actions so the audit does not get lost.",
    output: "Higher show-up readiness"
  },
  {
    title: "Growth Audit Meeting",
    description: "We diagnose campaign, landing page, follow-up, CRM, and tracking gaps as one funnel.",
    output: "Clear growth plan"
  }
];
