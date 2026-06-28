"use client";

import { FormEvent, useRef, useState } from "react";
import { getStoredUtmParameters, trackEvent } from "@/lib/tracking";

function normalizePhone(raw: string): string {
  let cleaned = raw.trim().replace(/\s+/g, "");
  if (cleaned.startsWith("+91")) cleaned = cleaned.slice(3);
  else if (cleaned.startsWith("0091")) cleaned = cleaned.slice(4);
  else if (cleaned.startsWith("91") && cleaned.length === 12) cleaned = cleaned.slice(2);
  return cleaned.replace(/\D/g, "");
}

function validatePhone(raw: string): string | null {
  const n = normalizePhone(raw);
  if (!n) return "Please enter your WhatsApp number.";
  if (n.length !== 10) return "Please enter a valid 10-digit WhatsApp number.";
  if (!/^[6-9]/.test(n)) return "Please enter a valid Indian mobile number.";
  return null;
}

const INDUSTRIES = [
  { value: "real-estate", label: "Real Estate / Property" },
  { value: "study-abroad", label: "Study Abroad / Immigration" },
  { value: "clinic-healthcare", label: "Clinic / Healthcare" },
  { value: "edtech-coaching", label: "EdTech / Coaching" },
  { value: "financial-services", label: "Financial Services" },
  { value: "ecommerce", label: "E-commerce / D2C" },
  { value: "other", label: "Other" },
];

const inputClass =
  "w-full rounded-lg border border-white/10 bg-white/[0.05] px-4 py-3 text-white placeholder-slate-500 outline-none transition focus:border-gold/50 focus:ring-1 focus:ring-gold/30";
const errorClass = "mt-1 text-xs text-red-400";

interface AuditShortFormProps {
  formId?: string;
}

export function AuditShortForm({ formId = "audit-top" }: AuditShortFormProps) {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [industry, setIndustry] = useState("");
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [submitting, setSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const startFired = useRef(false);

  function fireFormStart() {
    if (startFired.current) return;
    startFired.current = true;
    const w = window as Window & { fbq?: (...a: unknown[]) => void; dataLayer?: Record<string, unknown>[] };
    if (w.fbq) w.fbq("trackCustom", "audit_form_start");
  }

  function validate(): boolean {
    const errs: Record<string, string> = {};
    if (!name.trim()) errs.name = "Please enter your name.";
    const phoneErr = validatePhone(phone);
    if (phoneErr) errs.phone = phoneErr;
    if (!industry) errs.industry = "Please select your industry.";
    setErrors(errs);
    return Object.keys(errs).length === 0;
  }

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    if (!validate()) return;

    setSubmitting(true);
    setSubmitError("");

    const w = window as Window & { fbq?: (...a: unknown[]) => void; dataLayer?: Record<string, unknown>[] };

    try {
      const res = await fetch("/api/leads", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          niche: industry,
          page: "audit",
          pagePath: "/audit",
          formType: "ad_short_form",
          consentStatus: "contact_consent_accepted",
          answers: {
            name: name.trim(),
            whatsapp: normalizePhone(phone),
            businessType: industry,
            source: "ad_short_form",
          },
          utm: getStoredUtmParameters(),
        }),
      });

      const data = (await res.json()) as { ok: boolean; message?: string };

      if (!data.ok) {
        setSubmitError(data.message ?? "Something went wrong. Please try again or message us on WhatsApp.");
        setSubmitting(false);
        return;
      }

      // Fire pixel events after confirmed success
      if (w.fbq) {
        w.fbq("track", "Lead", {
          content_name: "Free Growth Audit - Ad Traffic",
          content_category: industry,
        });
        w.fbq("trackCustom", "audit_form_complete");
      }

      // GA4 dataLayer push
      w.dataLayer = w.dataLayer || [];
      w.dataLayer.push({
        event: "generate_lead",
        form_name: "audit_short_form",
        industry,
      });

      trackEvent("audit_form_complete", { page: "audit", industry });

      setSubmitted(true);
    } catch {
      setSubmitError("Could not reach the server. Please try again or message us on WhatsApp.");
      setSubmitting(false);
    }
  }

  if (submitted) {
    return (
      <div className="rounded-2xl border border-gold/30 bg-gold/5 p-8 text-center">
        <div className="mb-3 text-3xl">✓</div>
        <h3 className="mb-2 text-xl font-bold text-white">
          You&apos;re in. We&apos;ll reach out on WhatsApp within 24 hours.
        </h3>
        <p className="mb-6 text-slate-300">
          Gautam will personally review your situation before the call. Check your WhatsApp — we&apos;ll send a confirmation shortly.
        </p>
        <a
          href="https://wa.me/919467744000?text=Hi%2C%20I%20just%20submitted%20the%20audit%20form."
          rel="noreferrer"
          target="_blank"
          className="inline-block rounded-lg bg-[#25D366] px-6 py-3 font-semibold text-white transition hover:bg-[#1ebe5d]"
        >
          Open WhatsApp Now →
        </a>
      </div>
    );
  }

  return (
    <form id={formId} onSubmit={handleSubmit} noValidate className="flex flex-col gap-4">
      <p className="text-sm font-semibold uppercase tracking-widest text-gold">
        Where should we send your audit findings?
      </p>

      {/* Name */}
      <div>
        <input
          type="text"
          placeholder="First name is fine"
          value={name}
          onChange={(e) => setName(e.target.value)}
          onFocus={fireFormStart}
          className={inputClass}
          autoComplete="given-name"
        />
        {errors.name && <p className={errorClass}>{errors.name}</p>}
      </div>

      {/* WhatsApp */}
      <div>
        <input
          type="tel"
          placeholder="+91 98765 43210"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          className={inputClass}
          autoComplete="tel"
        />
        {errors.phone && <p className={errorClass}>{errors.phone}</p>}
      </div>

      {/* Industry */}
      <div>
        <select
          value={industry}
          onChange={(e) => setIndustry(e.target.value)}
          style={{ background: "#0d1828", color: "#fff" }}
          className={`${inputClass} cursor-pointer`}
        >
          <option value="" disabled style={{ background: "#0d1828", color: "#94a3b8" }}>
            Select your industry
          </option>
          {INDUSTRIES.map((i) => (
            <option key={i.value} value={i.value} style={{ background: "#0d1828", color: "#fff" }}>
              {i.label}
            </option>
          ))}
        </select>
        {errors.industry && <p className={errorClass}>{errors.industry}</p>}
      </div>

      {submitError && (
        <p className="rounded-lg border border-red-500/20 bg-red-500/10 px-4 py-3 text-sm text-red-400">
          {submitError}
        </p>
      )}

      <button
        type="submit"
        disabled={submitting}
        className="w-full rounded-lg bg-gold px-5 py-4 text-center font-bold text-ink transition hover:bg-gold-soft disabled:opacity-60"
      >
        {submitting ? "Submitting…" : "Claim My Free Audit →"}
      </button>

      <p className="text-center text-xs text-slate-500">
        Takes 30 seconds · No pitch · Founder-reviewed by Gautam Punj
      </p>

      <p className="text-center text-xs text-slate-500">
        Prefer to ask a question first?{" "}
        <a
          href="https://wa.me/919467744000?text=Hi%2C%20I%20saw%20your%20ad%20and%20want%20to%20ask%20about%20the%20free%20audit."
          rel="noreferrer"
          target="_blank"
          className="text-gold underline underline-offset-2 hover:text-gold-soft"
        >
          Message us on WhatsApp
        </a>
      </p>
    </form>
  );
}
