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
  if (FAKE_EMAILS.has(t)) return "Please enter a valid email address.";
  const domain = t.split("@")[1];
  if (domain && DISPOSABLE_DOMAINS.has(domain)) return "Please enter a valid email address.";
  return null;
}

// ─── Styles ────────────────────────────────────────────────────────────────

const inputCls =
  "w-full rounded-lg border border-white/15 bg-white/[0.05] px-4 py-3 text-sm text-white placeholder-slate-500 transition-all duration-200 focus:border-blue-500/50 focus:outline-none focus:ring-1 focus:ring-blue-500/30";
const errorCls = "mt-1.5 text-xs text-red-400";
const labelCls = "mb-1.5 block text-sm font-medium text-slate-300";

// ─── Component ─────────────────────────────────────────────────────────────

export function PmskForm() {
  const router = useRouter();
  const hasStartedRef = useRef(false);

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [consent, setConsent] = useState(false);

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [submitting, setSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState("");

  function handleFirstInteraction() {
    if (!hasStartedRef.current) {
      hasStartedRef.current = true;
      trackFormStarted("pmsk-lead-magnet");
      trackEvent("audit_form_start", { page: "pmsk" });
    }
  }

  function validate(): boolean {
    const e: Record<string, string> = {};
    if (!name.trim()) e.name = "Please enter your name.";
    const emailErr = validateEmail(email);
    if (emailErr) e.email = emailErr;
    const phoneErr = validatePhone(phone);
    if (phoneErr) e.phone = phoneErr;
    if (!consent) e.consent = "Please accept the terms to continue.";
    setErrors(e);
    return Object.keys(e).length === 0;
  }

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    if (!validate()) return;

    setSubmitting(true);
    setSubmitError("");

    trackLeadSubmitted("pmsk-lead-magnet");
    trackEvent("audit_form_complete", { page: "pmsk" });

    try {
      const res = await fetch("/api/leads", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          niche: "PMSK Lead Magnet",
          page: "performance-marketing-survival-kit",
          pagePath: "/performance-marketing-survival-kit",
          consentStatus: "contact_consent_accepted",
          answers: {
            name: name.trim(),
            email: email.trim().toLowerCase(),
            whatsapp: normalizePhone(phone),
            source: "pmsk-lead-magnet",
          },
          utm: getStoredUtmParameters(),
        }),
      });

      const data = (await res.json()) as { ok: boolean };

      if (!data.ok) {
        setSubmitError("Something went wrong. Please try again.");
        setSubmitting(false);
        return;
      }

      router.push(
        `/thank-you?type=ebook&name=${encodeURIComponent(name.trim())}`
      );
    } catch {
      setSubmitError("Something went wrong. Please try again.");
      setSubmitting(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} noValidate className="space-y-5">

      {/* Name */}
      <div>
        <label className={labelCls} htmlFor="pmsk-name">
          Full Name <span className="text-blue-400">*</span>
        </label>
        <input
          id="pmsk-name"
          type="text"
          autoComplete="name"
          placeholder="Rahul Sharma"
          value={name}
          onChange={(ev) => setName(ev.target.value)}
          onFocus={handleFirstInteraction}
          className={inputCls}
        />
        {errors.name && <p className={errorCls}>{errors.name}</p>}
      </div>

      {/* Email */}
      <div>
        <label className={labelCls} htmlFor="pmsk-email">
          Email Address <span className="text-blue-400">*</span>
        </label>
        <input
          id="pmsk-email"
          type="email"
          autoComplete="email"
          placeholder="rahul@company.com"
          value={email}
          onChange={(ev) => setEmail(ev.target.value)}
          onFocus={handleFirstInteraction}
          className={inputCls}
        />
        {errors.email && <p className={errorCls}>{errors.email}</p>}
      </div>

      {/* WhatsApp */}
      <div>
        <label className={labelCls} htmlFor="pmsk-phone">
          WhatsApp Number <span className="text-blue-400">*</span>
        </label>
        <input
          id="pmsk-phone"
          type="tel"
          autoComplete="tel"
          placeholder="9XXXXXXXXX"
          value={phone}
          onChange={(ev) => setPhone(ev.target.value)}
          onFocus={handleFirstInteraction}
          className={inputCls}
        />
        {errors.phone && <p className={errorCls}>{errors.phone}</p>}
        <p className="mt-1.5 text-xs text-slate-600">
          We&apos;ll send your download link directly on WhatsApp.
        </p>
      </div>

      {/* Consent */}
      <div>
        <button
          type="button"
          onClick={() => {
            handleFirstInteraction();
            setConsent((c) => !c);
          }}
          className="flex items-start gap-3 text-left"
        >
          <div
            className={`mt-0.5 flex h-5 w-5 flex-shrink-0 items-center justify-center rounded border transition-all duration-200 ${
              consent
                ? "border-blue-500 bg-blue-500"
                : "border-white/30 bg-transparent"
            }`}
          >
            {consent && (
              <svg className="h-3 w-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
              </svg>
            )}
          </div>
          <p className="text-sm leading-6 text-slate-400">
            I agree to receive the PMSK guide and occasional performance marketing insights from Technocrats Digimate. No spam.{" "}
            <Link
              href="/privacy-policy"
              className="text-blue-400 underline underline-offset-2 hover:text-blue-300"
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

      {/* Submit */}
      <button
        type="submit"
        disabled={submitting}
        className="w-full rounded-md bg-blue-600 py-4 text-base font-semibold text-white transition-all duration-200 hover:bg-blue-500 hover:shadow-[0_0_24px_rgba(59,130,246,0.35)] disabled:cursor-not-allowed disabled:opacity-60"
      >
        {submitting ? (
          <span className="flex items-center justify-center gap-2">
            <svg className="h-4 w-4 animate-spin" viewBox="0 0 24 24" fill="none">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z" />
            </svg>
            Sending…
          </span>
        ) : (
          "Send Me the Free Guide →"
        )}
      </button>

      <p className="text-center text-xs text-slate-600">
        Free forever · No credit card · Delivered via WhatsApp
      </p>
    </form>
  );
}
