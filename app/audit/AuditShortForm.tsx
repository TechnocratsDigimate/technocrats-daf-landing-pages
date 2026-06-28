"use client";

import { FormEvent, useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { RecaptchaVerifier, signInWithPhoneNumber, ConfirmationResult } from "firebase/auth";
import { getFirebaseAuth } from "@/lib/firebase";
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

function CustomSelect({
  value,
  onChange,
  error,
}: {
  value: string;
  onChange: (v: string) => void;
  error?: string;
}) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClick(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    }
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, []);

  const selected = INDUSTRIES.find((i) => i.value === value);

  return (
    <div ref={ref} className="relative">
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        className={`w-full rounded-lg border px-4 py-3 text-left transition outline-none ${
          error ? "border-red-500/50" : "border-white/10"
        } bg-navy text-white focus:border-gold/50 focus:ring-1 focus:ring-gold/30`}
      >
        <span className={selected ? "text-white" : "text-slate-500"}>
          {selected ? selected.label : "Select your industry"}
        </span>
        <span className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400">
          {open ? "▲" : "▼"}
        </span>
      </button>
      {open && (
        <ul className="absolute z-50 mt-1 w-full rounded-lg border border-white/10 bg-navy py-1 shadow-xl">
          {INDUSTRIES.map((i) => (
            <li
              key={i.value}
              onClick={() => { onChange(i.value); setOpen(false); }}
              className={`cursor-pointer px-4 py-2.5 text-sm transition hover:bg-gold/10 hover:text-gold ${
                value === i.value ? "text-gold" : "text-white"
              }`}
            >
              {i.label}
            </li>
          ))}
        </ul>
      )}
      {error && <p className="mt-1 text-xs text-red-400">{error}</p>}
    </div>
  );
}

type Step = "form" | "otp" | "submitting";

interface AuditShortFormProps {
  formId?: string;
}

export function AuditShortForm({ formId = "audit-top" }: AuditShortFormProps) {
  const router = useRouter();
  const [step, setStep] = useState<Step>("form");
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [industry, setIndustry] = useState("");
  const [otp, setOtp] = useState("");
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [sendingOtp, setSendingOtp] = useState(false);
  const [otpError, setOtpError] = useState("");
  const [countdown, setCountdown] = useState(0);
  const confirmationRef = useRef<ConfirmationResult | null>(null);
  const recaptchaRef = useRef<RecaptchaVerifier | null>(null);
  const startFired = useRef(false);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);

  function fireFormStart() {
    if (startFired.current) return;
    startFired.current = true;
    const w = window as Window & { fbq?: (...a: unknown[]) => void };
    if (w.fbq) w.fbq("trackCustom", "audit_form_start");
  }

  function startCountdown(seconds = 30) {
    setCountdown(seconds);
    if (timerRef.current) clearInterval(timerRef.current);
    timerRef.current = setInterval(() => {
      setCountdown((c) => {
        if (c <= 1) { clearInterval(timerRef.current!); return 0; }
        return c - 1;
      });
    }, 1000);
  }

  useEffect(() => () => { if (timerRef.current) clearInterval(timerRef.current); }, []);

  function validate(): boolean {
    const errs: Record<string, string> = {};
    if (!name.trim()) errs.name = "Please enter your name.";
    const phoneErr = validatePhone(phone);
    if (phoneErr) errs.phone = phoneErr;
    if (!industry) errs.industry = "Please select your industry.";
    setErrors(errs);
    return Object.keys(errs).length === 0;
  }

  async function handleSendOtp(e: FormEvent) {
    e.preventDefault();
    if (!validate()) return;
    setSendingOtp(true);
    setOtpError("");

    try {
      const auth = await getFirebaseAuth();
      if (!recaptchaRef.current) {
        recaptchaRef.current = new RecaptchaVerifier(auth, "recaptcha-container", {
          size: "invisible",
        });
      }
      const phoneNumber = `+91${normalizePhone(phone)}`;
      const result = await signInWithPhoneNumber(auth, phoneNumber, recaptchaRef.current);
      confirmationRef.current = result;
      setStep("otp");
      startCountdown(30);
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : String(err);
      const code = (err as { code?: string })?.code ?? "";
      console.error("[OTP] Firebase error:", code, msg);
      if (code.includes("too-many-requests")) {
        setOtpError("Too many attempts. Please try again after some time.");
      } else if (code.includes("invalid-phone-number")) {
        setOtpError("Invalid phone number. Please check and try again.");
      } else if (code.includes("app-not-authorized") || code.includes("unauthorized-domain")) {
        setOtpError(`Domain not authorized in Firebase. (${code})`);
      } else {
        setOtpError(`Could not send OTP. Error: ${code || msg}`);
      }
      recaptchaRef.current = null;
    } finally {
      setSendingOtp(false);
    }
  }

  async function handleVerifyOtp(e: FormEvent) {
    e.preventDefault();
    if (!otp || otp.length < 6) {
      setOtpError("Please enter the 6-digit OTP.");
      return;
    }
    if (!confirmationRef.current) {
      setOtpError("Session expired. Please go back and try again.");
      return;
    }

    setStep("submitting");
    setOtpError("");

    try {
      await confirmationRef.current.confirm(otp);
    } catch {
      setStep("otp");
      setOtpError("Incorrect OTP. Please check and try again.");
      return;
    }

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
          phoneVerified: true,
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
      if (!data.ok) throw new Error(data.message);

      if (w.fbq) {
        w.fbq("track", "Lead", { content_name: "Free Growth Audit - Ad Traffic", content_category: industry });
        w.fbq("trackCustom", "audit_form_complete");
      }
      w.dataLayer = w.dataLayer || [];
      w.dataLayer.push({ event: "generate_lead", form_name: "audit_short_form", industry });
      trackEvent("audit_form_complete", { page: "audit", industry });

      router.push(`/thank-you/audit?name=${encodeURIComponent(name.trim())}`);
    } catch {
      setStep("otp");
      setOtpError("Submission failed. Please try again or message us on WhatsApp.");
    }
  }

  async function handleResendOtp() {
    if (countdown > 0) return;
    setSendingOtp(true);
    setOtpError("");
    try {
      const auth = await getFirebaseAuth();
      if (!recaptchaRef.current) {
        recaptchaRef.current = new RecaptchaVerifier(auth, "recaptcha-container", { size: "invisible" });
      }
      const result = await signInWithPhoneNumber(auth, `+91${normalizePhone(phone)}`, recaptchaRef.current);
      confirmationRef.current = result;
      startCountdown(30);
    } catch {
      setOtpError("Could not resend OTP. Please try again.");
      recaptchaRef.current = null;
    } finally {
      setSendingOtp(false);
    }
  }

  // ── OTP Step ──────────────────────────────────────────────────────────────
  if (step === "otp" || step === "submitting") {
    return (
      <form id={formId} onSubmit={handleVerifyOtp} noValidate className="flex flex-col gap-4">
        <div className="rounded-lg border border-gold/20 bg-gold/5 px-4 py-3">
          <p className="text-sm text-slate-300">
            OTP sent to <span className="font-semibold text-white">+91 {normalizePhone(phone)}</span>
          </p>
          <button
            type="button"
            onClick={() => { setStep("form"); setOtp(""); setOtpError(""); }}
            className="mt-0.5 text-xs text-gold underline underline-offset-2"
          >
            Change number
          </button>
        </div>

        <div>
          <label className="mb-1.5 block text-sm font-medium text-slate-300">
            Enter 6-digit OTP
          </label>
          <input
            type="number"
            inputMode="numeric"
            placeholder="_ _ _ _ _ _"
            value={otp}
            onChange={(e) => setOtp(e.target.value.slice(0, 6))}
            className={`${inputClass} text-center text-xl tracking-[0.5em]`}
            autoFocus
          />
        </div>

        {otpError && (
          <p className="rounded-lg border border-red-500/20 bg-red-500/10 px-4 py-3 text-sm text-red-400">
            {otpError}
          </p>
        )}

        <button
          type="submit"
          disabled={step === "submitting"}
          className="w-full rounded-lg bg-gold px-5 py-4 text-center font-bold text-ink transition hover:bg-gold-soft disabled:opacity-60"
        >
          {step === "submitting" ? "Verifying…" : "Verify & Claim Audit →"}
        </button>

        <p className="text-center text-xs text-slate-500">
          Didn&apos;t receive it?{" "}
          {countdown > 0 ? (
            <span className="text-slate-400">Resend in {countdown}s</span>
          ) : (
            <button
              type="button"
              onClick={handleResendOtp}
              disabled={sendingOtp}
              className="text-gold underline underline-offset-2 disabled:opacity-50"
            >
              {sendingOtp ? "Sending…" : "Resend OTP"}
            </button>
          )}
        </p>

        <div id="recaptcha-container" />
      </form>
    );
  }

  // ── Form Step ─────────────────────────────────────────────────────────────
  return (
    <form id={formId} onSubmit={handleSendOtp} noValidate className="flex flex-col gap-4">
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
      <CustomSelect value={industry} onChange={setIndustry} error={errors.industry} />

      {otpError && (
        <p className="rounded-lg border border-red-500/20 bg-red-500/10 px-4 py-3 text-sm text-red-400">
          {otpError}
        </p>
      )}

      <button
        type="submit"
        disabled={sendingOtp}
        className="w-full rounded-lg bg-gold px-5 py-4 text-center font-bold text-ink transition hover:bg-gold-soft disabled:opacity-60"
      >
        {sendingOtp ? "Sending OTP…" : "Send OTP →"}
      </button>

      <p className="text-center text-xs text-slate-500">
        We&apos;ll send a 6-digit OTP to verify your number · No pitch · Founder-reviewed
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

      <div id="recaptcha-container" />
    </form>
  );
}
