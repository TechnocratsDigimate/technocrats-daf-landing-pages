"use client";

import { FormEvent, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import {
  getStoredUtmParameters,
  trackEvent,
  trackFormStarted,
  trackLeadSubmitted,
} from "@/lib/tracking";

// ─── Validation helpers ────────────────────────────────────────────────────

function normalizePhone(raw: string): string {
  let cleaned = raw.trim().replace(/\s+/g, "");
  if (cleaned.startsWith("+91")) cleaned = cleaned.slice(3);
  else if (cleaned.startsWith("0091")) cleaned = cleaned.slice(4);
  else if (cleaned.startsWith("91") && cleaned.length === 12) cleaned = cleaned.slice(2);
  return cleaned.replace(/\D/g, "");
}

const FAKE_PHONES = new Set([
  "9999999999",
  "8888888888",
  "7777777777",
  "9876543210",
  "1234567890",
  "0000000000",
]);

function validatePhone(raw: string): string | null {
  const n = normalizePhone(raw);
  if (!n) return "Please enter your WhatsApp number.";
  if (n.length !== 10) return "Please enter a valid 10-digit WhatsApp number.";
  if (!/^[6-9]/.test(n)) return "Please enter a valid Indian mobile number.";
  if (FAKE_PHONES.has(n)) return "Please enter a real WhatsApp number.";
  return null;
}

const FAKE_EMAILS = new Set([
  "test@test.com",
  "test@gmail.com",
  "abc@abc.com",
  "noemail@gmail.com",
  "example@example.com",
  "fake@gmail.com",
]);
const DISPOSABLE_DOMAINS = new Set([
  "mailinator.com",
  "10minutemail.com",
  "tempmail.com",
  "guerrillamail.com",
]);

function validateEmail(email: string): string | null {
  const t = email.trim().toLowerCase();
  if (!t) return "Please enter your email address.";
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(t)) return "Please enter a valid email address.";
  if (FAKE_EMAILS.has(t)) return "Please enter a valid business email.";
  const domain = t.split("@")[1];
  if (domain && DISPOSABLE_DOMAINS.has(domain)) return "Please enter a valid business email.";
  return null;
}

// ─── Types ─────────────────────────────────────────────────────────────────

type FormState = {
  name: string;
  businessName: string;
  phone: string;
  email: string;
  website: string;
  industry: string;
  budget: string;
  platforms: string[];
  biggestProblem: string;
  preferredContact: string;
  consent: boolean;
};

const INITIAL: FormState = {
  name: "",
  businessName: "",
  phone: "",
  email: "",
  website: "",
  industry: "",
  budget: "",
  platforms: [],
  biggestProblem: "",
  preferredContact: "",
  consent: false,
};

// ─── Options ───────────────────────────────────────────────────────────────

const INDUSTRIES = [
  { value: "real-estate", label: "Real Estate / Property" },
  { value: "study-abroad", label: "Study Abroad / Immigration" },
  { value: "clinic-healthcare", label: "Clinic / Healthcare" },
  { value: "edtech-coaching", label: "EdTech / Coaching" },
  { value: "financial-services", label: "Financial Services" },
  { value: "ecommerce", label: "E-commerce / D2C" },
  { value: "other", label: "Other" },
];

const BUDGETS = [
  { value: "not-running", label: "Not running ads yet" },
  { value: "under-30k", label: "Under ₹30,000/month" },
  { value: "30k-75k", label: "₹30,000 – ₹75,000/month" },
  { value: "75k-2l", label: "₹75,000 – ₹2,00,000/month" },
  { value: "above-2l", label: "Above ₹2,00,000/month" },
];

const PLATFORMS = [
  { value: "meta-ads", label: "Meta Ads (Facebook / Instagram)" },
  { value: "google-ads", label: "Google Ads" },
  { value: "youtube-ads", label: "YouTube Ads" },
  { value: "whatsapp-automation", label: "WhatsApp Automation" },
  { value: "seo-content", label: "SEO / Content" },
  { value: "none-yet", label: "None yet — starting fresh" },
];

const PROBLEMS = [
  { value: "high-cpl", label: "Cost per lead is too high" },
  { value: "low-quality-leads", label: "Leads don't convert to sales" },
  { value: "tracking-broken", label: "Tracking / attribution is broken" },
  { value: "slow-followup", label: "Slow or manual lead follow-up" },
  { value: "no-clarity", label: "No visibility into what's working" },
  { value: "scaling-stuck", label: "Stuck — can't scale what's working" },
];

const CONTACT_METHODS = [
  { value: "whatsapp", label: "WhatsApp" },
  { value: "call", label: "Phone Call" },
  { value: "email", label: "Email" },
];

// ─── Input style helpers ───────────────────────────────────────────────────

const inputCls =
  "w-full rounded-lg border border-white/15 bg-white/[0.05] px-4 py-3 text-sm text-white placeholder-slate-500 transition-all duration-200 focus:border-gold/50 focus:outline-none focus:ring-1 focus:ring-gold/30";

const selectCls =
  "w-full appearance-none rounded-lg border border-white/15 bg-[#0d1828] px-4 py-3 text-sm text-white transition-all duration-200 focus:border-gold/50 focus:outline-none focus:ring-1 focus:ring-gold/30 [&>option]:bg-[#0d1828]";

const errorCls = "mt-1.5 text-xs text-red-400";
const labelCls = "mb-1.5 block text-sm font-medium text-slate-300";

// ─── Component ─────────────────────────────────────────────────────────────

export function AuditForm() {
  const router = useRouter();
  const hasStartedRef = useRef(false);

  const [form, setForm] = useState<FormState>(INITIAL);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [submitting, setSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState("");
  const [notQualified, setNotQualified] = useState(false);

  // ── Track form start (once) ──────────────────────────────────────────────
  function handleFirstInteraction() {
    if (!hasStartedRef.current) {
      hasStartedRef.current = true;
      trackFormStarted("free-growth-audit");
      trackEvent("audit_form_start", { page: "free-growth-audit" });
    }
  }

  // ── Platform toggle ──────────────────────────────────────────────────────
  function togglePlatform(value: string) {
    handleFirstInteraction();
    setForm((prev) => {
      if (value === "none-yet") {
        return {
          ...prev,
          platforms: prev.platforms.includes("none-yet") ? [] : ["none-yet"],
        };
      }
      const withoutNone = prev.platforms.filter((p) => p !== "none-yet");
      return {
        ...prev,
        platforms: withoutNone.includes(value)
          ? withoutNone.filter((p) => p !== value)
          : [...withoutNone, value],
      };
    });
  }

  // ── Validation ───────────────────────────────────────────────────────────
  function validate(): boolean {
    const e: Record<string, string> = {};
    if (!form.name.trim()) e.name = "Please enter your name.";
    if (!form.businessName.trim()) e.businessName = "Please enter your business name.";
    const phoneErr = validatePhone(form.phone);
    if (phoneErr) e.phone = phoneErr;
    const emailErr = validateEmail(form.email);
    if (emailErr) e.email = emailErr;
    if (!form.industry) e.industry = "Please select your industry.";
    if (!form.budget) e.budget = "Please select your monthly ad budget.";
    if (form.platforms.length === 0) e.platforms = "Please select at least one platform.";
    if (!form.biggestProblem) e.biggestProblem = "Please select your biggest problem.";
    if (!form.preferredContact) e.preferredContact = "Please select a preferred contact method.";
    if (!form.consent) e.consent = "Please accept the terms to continue.";
    setErrors(e);
    return Object.keys(e).length === 0;
  }

  // ── Submit ───────────────────────────────────────────────────────────────
  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    if (!validate()) return;

    // Budget disqualification
    if (form.budget === "not-running") {
      setNotQualified(true);
      return;
    }

    setSubmitting(true);
    setSubmitError("");

    trackLeadSubmitted("free-growth-audit");
    trackEvent("audit_form_complete", {
      page: "free-growth-audit",
      niche: form.industry,
      budget: form.budget,
    });

    try {
      const res = await fetch("/api/leads", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          niche: "Free Growth Audit",
          page: "free-growth-audit",
          pagePath: "/free-growth-audit",
          consentStatus: "contact_consent_accepted",
          answers: {
            name: form.name.trim(),
            businessName: form.businessName.trim(),
            whatsapp: normalizePhone(form.phone),
            email: form.email.trim().toLowerCase(),
            website: form.website.trim(),
            businessType: form.industry,
            helpNeeded: form.platforms,
            biggestProblem: form.biggestProblem,
            preferredContact: form.preferredContact,
            source: "free-growth-audit",
          },
          utm: getStoredUtmParameters(),
        }),
      });

      const data = (await res.json()) as { ok: boolean };

      if (!data.ok) {
        setSubmitError(
          "Something went wrong. Please try again or message us on WhatsApp."
        );
        setSubmitting(false);
        return;
      }

      router.push(
        `/thank-you?type=audit&name=${encodeURIComponent(form.name.trim())}`
      );
    } catch {
      setSubmitError(
        "Something went wrong. Please try again or message us on WhatsApp."
      );
      setSubmitting(false);
    }
  }

  // ── Budget disqualification message ─────────────────────────────────────
  if (notQualified) {
    const whatsappNumber = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER;
    const waHref = whatsappNumber
      ? `https://wa.me/${whatsappNumber.replace(/\D/g, "")}?text=${encodeURIComponent("Hi, I'm interested in getting started with ads. Can you help?")}`
      : "/free-growth-audit";

    return (
      <div className="rounded-2xl border border-amber-500/30 bg-amber-500/10 p-8 text-center">
        <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full border border-amber-500/40 bg-amber-500/15">
          <svg className="h-7 w-7 text-amber-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126zM12 15.75h.007v.008H12v-.008z" />
          </svg>
        </div>
        <h3 className="text-lg font-semibold text-amber-300">
          Our Audit Works Best With Active Ad Spend
        </h3>
        <p className="mt-3 leading-7 text-slate-400">
          The free growth audit is designed for businesses already running Meta Ads or Google Ads — so we have real data to diagnose. If you&apos;re just getting started, let&apos;s have a quick conversation about the right first step for your business.
        </p>
        <div className="mt-6 flex flex-col items-center gap-3 sm:flex-row sm:justify-center">
          <a
            href={waHref}
            target={whatsappNumber ? "_blank" : undefined}
            rel={whatsappNumber ? "noreferrer" : undefined}
            className="inline-block rounded-md border border-amber-500/50 px-6 py-3 text-sm font-semibold text-amber-300 transition-all duration-200 hover:border-amber-400 hover:bg-amber-500/15"
          >
            Chat on WhatsApp →
          </a>
          <button
            type="button"
            onClick={() => setNotQualified(false)}
            className="text-sm text-slate-500 underline hover:text-slate-300"
          >
            Go back and change budget
          </button>
        </div>
      </div>
    );
  }

  // ── Form render ──────────────────────────────────────────────────────────
  return (
    <form onSubmit={handleSubmit} noValidate className="space-y-7">

      {/* Row 1: Name + Business Name */}
      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <label className={labelCls} htmlFor="afa-name">
            Your Name <span className="text-gold">*</span>
          </label>
          <input
            id="afa-name"
            type="text"
            autoComplete="name"
            placeholder="Rahul Sharma"
            value={form.name}
            onChange={(ev) => setForm((p) => ({ ...p, name: ev.target.value }))}
            onFocus={handleFirstInteraction}
            className={inputCls}
          />
          {errors.name && <p className={errorCls}>{errors.name}</p>}
        </div>
        <div>
          <label className={labelCls} htmlFor="afa-biz">
            Business Name <span className="text-gold">*</span>
          </label>
          <input
            id="afa-biz"
            type="text"
            placeholder="Sharma Properties"
            value={form.businessName}
            onChange={(ev) => setForm((p) => ({ ...p, businessName: ev.target.value }))}
            onFocus={handleFirstInteraction}
            className={inputCls}
          />
          {errors.businessName && <p className={errorCls}>{errors.businessName}</p>}
        </div>
      </div>

      {/* Row 2: Phone + Email */}
      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <label className={labelCls} htmlFor="afa-phone">
            WhatsApp Number <span className="text-gold">*</span>
          </label>
          <input
            id="afa-phone"
            type="tel"
            autoComplete="tel"
            placeholder="9XXXXXXXXX"
            value={form.phone}
            onChange={(ev) => setForm((p) => ({ ...p, phone: ev.target.value }))}
            onFocus={handleFirstInteraction}
            className={inputCls}
          />
          {errors.phone && <p className={errorCls}>{errors.phone}</p>}
        </div>
        <div>
          <label className={labelCls} htmlFor="afa-email">
            Email Address <span className="text-gold">*</span>
          </label>
          <input
            id="afa-email"
            type="email"
            autoComplete="email"
            placeholder="rahul@company.com"
            value={form.email}
            onChange={(ev) => setForm((p) => ({ ...p, email: ev.target.value }))}
            onFocus={handleFirstInteraction}
            className={inputCls}
          />
          {errors.email && <p className={errorCls}>{errors.email}</p>}
        </div>
      </div>

      {/* Row 3: Website */}
      <div>
        <label className={labelCls} htmlFor="afa-website">
          Website / Landing Page{" "}
          <span className="text-xs font-normal text-slate-500">(optional)</span>
        </label>
        <input
          id="afa-website"
          type="url"
          placeholder="https://yourwebsite.com"
          value={form.website}
          onChange={(ev) => setForm((p) => ({ ...p, website: ev.target.value }))}
          onFocus={handleFirstInteraction}
          className={inputCls}
        />
      </div>

      {/* Row 4: Industry + Budget */}
      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <label className={labelCls} htmlFor="afa-industry">
            Industry <span className="text-gold">*</span>
          </label>
          <div className="relative">
            <select
              id="afa-industry"
              value={form.industry}
              onChange={(ev) => {
                handleFirstInteraction();
                setForm((p) => ({ ...p, industry: ev.target.value }));
              }}
              className={selectCls}
            >
              <option value="" disabled>Select your industry</option>
              {INDUSTRIES.map((o) => (
                <option key={o.value} value={o.value}>{o.label}</option>
              ))}
            </select>
            <div className="pointer-events-none absolute inset-y-0 right-3 flex items-center text-slate-500">
              <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
              </svg>
            </div>
          </div>
          {errors.industry && <p className={errorCls}>{errors.industry}</p>}
        </div>
        <div>
          <label className={labelCls} htmlFor="afa-budget">
            Monthly Ad Budget <span className="text-gold">*</span>
          </label>
          <div className="relative">
            <select
              id="afa-budget"
              value={form.budget}
              onChange={(ev) => {
                handleFirstInteraction();
                setForm((p) => ({ ...p, budget: ev.target.value }));
              }}
              className={selectCls}
            >
              <option value="" disabled>Select your budget range</option>
              {BUDGETS.map((o) => (
                <option key={o.value} value={o.value}>{o.label}</option>
              ))}
            </select>
            <div className="pointer-events-none absolute inset-y-0 right-3 flex items-center text-slate-500">
              <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
              </svg>
            </div>
          </div>
          {errors.budget && <p className={errorCls}>{errors.budget}</p>}
        </div>
      </div>

      {/* Row 5: Platforms */}
      <div>
        <label className={labelCls}>
          Where are you running ads? <span className="text-gold">*</span>{" "}
          <span className="text-xs font-normal text-slate-500">(select all that apply)</span>
        </label>
        <div className="grid grid-cols-1 gap-2.5 sm:grid-cols-2 lg:grid-cols-3">
          {PLATFORMS.map((platform) => {
            const active = form.platforms.includes(platform.value);
            return (
              <button
                key={platform.value}
                type="button"
                onClick={() => togglePlatform(platform.value)}
                className={`flex items-center gap-3 rounded-lg border px-4 py-3 text-left text-sm transition-all duration-200 ${
                  active
                    ? "border-gold/40 bg-gold/10 text-gold"
                    : "border-white/10 bg-white/[0.03] text-slate-300 hover:border-white/25 hover:text-white"
                }`}
              >
                <div
                  className={`flex h-4 w-4 flex-shrink-0 items-center justify-center rounded border transition-all duration-200 ${
                    active ? "border-gold bg-gold" : "border-white/30"
                  }`}
                >
                  {active && (
                    <svg className="h-2.5 w-2.5 text-ink" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                  )}
                </div>
                {platform.label}
              </button>
            );
          })}
        </div>
        {errors.platforms && <p className={errorCls}>{errors.platforms}</p>}
      </div>

      {/* Row 6: Biggest Problem */}
      <div>
        <label className={labelCls}>
          Biggest problem right now <span className="text-gold">*</span>
        </label>
        <div className="grid grid-cols-1 gap-2.5 sm:grid-cols-2">
          {PROBLEMS.map((problem) => {
            const active = form.biggestProblem === problem.value;
            return (
              <button
                key={problem.value}
                type="button"
                onClick={() => {
                  handleFirstInteraction();
                  setForm((p) => ({ ...p, biggestProblem: problem.value }));
                }}
                className={`flex items-center gap-3 rounded-lg border px-4 py-3 text-left text-sm transition-all duration-200 ${
                  active
                    ? "border-gold/40 bg-gold/10 text-gold"
                    : "border-white/10 bg-white/[0.03] text-slate-300 hover:border-white/25 hover:text-white"
                }`}
              >
                <div
                  className={`flex h-4 w-4 flex-shrink-0 items-center justify-center rounded-full border-2 transition-all duration-200 ${
                    active ? "border-gold" : "border-white/30"
                  }`}
                >
                  {active && <div className="h-2 w-2 rounded-full bg-gold" />}
                </div>
                {problem.label}
              </button>
            );
          })}
        </div>
        {errors.biggestProblem && <p className={errorCls}>{errors.biggestProblem}</p>}
      </div>

      {/* Row 7: Preferred Contact */}
      <div>
        <label className={labelCls}>
          Preferred way to receive the audit <span className="text-gold">*</span>
        </label>
        <div className="flex flex-wrap gap-2.5">
          {CONTACT_METHODS.map((method) => {
            const active = form.preferredContact === method.value;
            return (
              <button
                key={method.value}
                type="button"
                onClick={() => {
                  handleFirstInteraction();
                  setForm((p) => ({ ...p, preferredContact: method.value }));
                }}
                className={`flex items-center gap-2.5 rounded-lg border px-5 py-3 text-sm transition-all duration-200 ${
                  active
                    ? "border-gold/40 bg-gold/10 text-gold"
                    : "border-white/10 bg-white/[0.03] text-slate-300 hover:border-white/25 hover:text-white"
                }`}
              >
                <div
                  className={`flex h-4 w-4 flex-shrink-0 items-center justify-center rounded-full border-2 transition-all duration-200 ${
                    active ? "border-gold" : "border-white/30"
                  }`}
                >
                  {active && <div className="h-2 w-2 rounded-full bg-gold" />}
                </div>
                {method.label}
              </button>
            );
          })}
        </div>
        {errors.preferredContact && <p className={errorCls}>{errors.preferredContact}</p>}
      </div>

      {/* Consent */}
      <div>
        <button
          type="button"
          onClick={() => {
            handleFirstInteraction();
            setForm((p) => ({ ...p, consent: !p.consent }));
          }}
          className="flex items-start gap-3 text-left"
        >
          <div
            className={`mt-0.5 flex h-5 w-5 flex-shrink-0 items-center justify-center rounded border transition-all duration-200 ${
              form.consent ? "border-gold bg-gold" : "border-white/30 bg-transparent"
            }`}
          >
            {form.consent && (
              <svg className="h-3 w-3 text-ink" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
              </svg>
            )}
          </div>
          <p className="text-sm leading-6 text-slate-400">
            I agree to be contacted by Technocrats Digimate about my audit request. No spam — ever.{" "}
            <Link
              href="/privacy-policy"
              className="text-gold underline underline-offset-2 hover:text-gold-soft"
              onClick={(ev) => ev.stopPropagation()}
            >
              Privacy Policy
            </Link>
          </p>
        </button>
        {errors.consent && <p className={errorCls}>{errors.consent}</p>}
      </div>

      {/* Submit error */}
      {submitError && (
        <div className="rounded-lg border border-red-500/30 bg-red-500/10 px-4 py-3 text-sm text-red-400">
          {submitError}
        </div>
      )}

      {/* Submit button */}
      <button
        type="submit"
        disabled={submitting}
        className="w-full rounded-md bg-gold py-4 text-base font-semibold text-ink transition-all duration-200 hover:bg-gold-soft hover:shadow-[0_0_28px_rgba(214,168,79,0.4)] disabled:cursor-not-allowed disabled:opacity-60"
      >
        {submitting ? (
          <span className="flex items-center justify-center gap-2">
            <svg className="h-4 w-4 animate-spin" viewBox="0 0 24 24" fill="none">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z" />
            </svg>
            Submitting…
          </span>
        ) : (
          "Request My Free Growth Audit →"
        )}
      </button>

      <p className="text-center text-xs text-slate-600">
        Takes under 2 minutes · Founder-reviewed · No obligation
      </p>
    </form>
  );
}
