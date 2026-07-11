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
  if (n.length !== 10) return "Please enter a valid 10-digit number.";
  if (!/^[6-9]/.test(n)) return "Please enter a valid Indian mobile number.";
  return null;
}

const inputClass =
  "w-full rounded-lg border border-white/10 bg-white/[0.05] px-4 py-3 text-white placeholder-slate-500 outline-none transition focus:border-gold/50 focus:ring-1 focus:ring-gold/30 text-sm";
const errorClass = "mt-1 text-xs text-red-400";

type Step = "form" | "otp" | "done";

export function GuideForm() {
  const [step, setStep] = useState<Step>("form");
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [otp, setOtp] = useState("");
  const [sessionId, setSessionId] = useState("");
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [sending, setSending] = useState(false);
  const [otpError, setOtpError] = useState("");
  const [countdown, setCountdown] = useState(0);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);

  function startCountdown(s = 30) {
    setCountdown(s);
    if (timerRef.current) clearInterval(timerRef.current);
    timerRef.current = setInterval(() => {
      setCountdown((c) => {
        if (c <= 1) { clearInterval(timerRef.current!); return 0; }
        return c - 1;
      });
    }, 1000);
  }

  function validate() {
    const errs: Record<string, string> = {};
    if (!name.trim()) errs.name = "Please enter your name.";
    const phoneErr = validatePhone(phone);
    if (phoneErr) errs.phone = phoneErr;
    setErrors(errs);
    return Object.keys(errs).length === 0;
  }

  async function handleSendOtp(e: FormEvent) {
    e.preventDefault();
    if (!validate()) return;
    setSending(true);
    setOtpError("");
    try {
      const res = await fetch("/api/otp/send", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ phone: normalizePhone(phone) }),
      });
      const data = await res.json() as { ok: boolean; sessionId?: string; message?: string };
      if (!data.ok || !data.sessionId) {
        setOtpError(data.message ?? "Could not send OTP. Please try again.");
      } else {
        setSessionId(data.sessionId);
        setStep("otp");
        startCountdown(30);
      }
    } catch {
      setOtpError("Could not send OTP. Please try again.");
    } finally {
      setSending(false);
    }
  }

  async function handleVerifyOtp(e: FormEvent) {
    e.preventDefault();
    if (!otp || otp.length < 4) { setOtpError("Please enter the OTP."); return; }
    setSending(true);
    setOtpError("");
    try {
      const vRes = await fetch("/api/otp/verify", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ sessionId, otp }),
      });
      const vData = await vRes.json() as { ok: boolean; message?: string };
      if (!vData.ok) {
        setOtpError(vData.message ?? "Incorrect OTP. Please try again.");
        setSending(false);
        return;
      }

      await fetch("/api/leads", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          niche: "ai-guide",
          page: "free-guide",
          pagePath: "/free-guide",
          formType: "lead_magnet",
          consentStatus: "contact_consent_accepted",
          phoneVerified: true,
          answers: {
            name: name.trim(),
            whatsapp: normalizePhone(phone),
            source: "google_ai_guide",
          },
          utm: getStoredUtmParameters(),
        }),
      });

      const w = window as Window & { fbq?: (...a: unknown[]) => void };
      if (w.fbq) {
        w.fbq("track", "Lead", { content_name: "Free Google AI Marketing Stack Guide" });
        w.fbq("trackCustom", "guide_download");
      }
      trackEvent("audit_form_complete", { guide: "google_ai_marketing_stack" });

      setStep("done");
    } catch {
      setOtpError("Verification failed. Please try again.");
      setSending(false);
    }
  }

  async function handleResend() {
    if (countdown > 0) return;
    setSending(true);
    setOtpError("");
    try {
      const res = await fetch("/api/otp/send", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ phone: normalizePhone(phone) }),
      });
      const data = await res.json() as { ok: boolean; sessionId?: string; message?: string };
      if (!data.ok || !data.sessionId) {
        setOtpError(data.message ?? "Could not resend OTP.");
      } else {
        setSessionId(data.sessionId);
        startCountdown(30);
      }
    } catch {
      setOtpError("Could not resend OTP.");
    } finally {
      setSending(false);
    }
  }

  if (step === "done") {
    return (
      <div className="text-center">
        <div className="mx-auto mb-5 flex h-16 w-16 items-center justify-center rounded-full bg-emerald-500/10 text-3xl">
          ✓
        </div>
        <h3 className="mb-2 text-xl font-bold text-white">Your guide is ready!</h3>
        <p className="mb-6 text-sm text-slate-400">
          We&apos;ll also send you the link on WhatsApp so you don&apos;t lose it.
        </p>
        <a
          href="/guides/google-ai-marketing-stack.pdf"
          download="Free-Google-AI-Marketing-Stack-Guide.pdf"
          className="inline-block w-full rounded-xl bg-gold px-6 py-4 text-center font-bold text-ink transition hover:bg-gold-soft"
        >
          ↓ Download Free Guide (PDF)
        </a>
        <p className="mt-4 text-xs text-slate-500">
          Want this system built for your business?{" "}
          <a href="/audit" className="text-gold underline underline-offset-2">
            Book a free audit →
          </a>
        </p>
      </div>
    );
  }

  if (step === "otp") {
    return (
      <form onSubmit={handleVerifyOtp} noValidate className="flex flex-col gap-4">
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
          <label className="mb-1.5 block text-sm font-medium text-slate-300">Enter OTP</label>
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
          disabled={sending}
          className="w-full rounded-xl bg-gold py-4 font-bold text-ink transition hover:bg-gold-soft disabled:opacity-60"
        >
          {sending ? "Verifying…" : "Verify & Get Guide →"}
        </button>

        <p className="text-center text-xs text-slate-500">
          Didn&apos;t receive it?{" "}
          {countdown > 0 ? (
            <span className="text-slate-400">Resend in {countdown}s</span>
          ) : (
            <button
              type="button"
              onClick={handleResend}
              disabled={sending}
              className="text-gold underline underline-offset-2 disabled:opacity-50"
            >
              Resend OTP
            </button>
          )}
        </p>
      </form>
    );
  }

  return (
    <form onSubmit={handleSendOtp} noValidate className="flex flex-col gap-4">
      <div>
        <input
          type="text"
          placeholder="Your name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className={inputClass}
          autoComplete="given-name"
        />
        {errors.name && <p className={errorClass}>{errors.name}</p>}
      </div>

      <div>
        <input
          type="tel"
          placeholder="WhatsApp number (+91)"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          className={inputClass}
          autoComplete="tel"
        />
        {errors.phone && <p className={errorClass}>{errors.phone}</p>}
      </div>

      {otpError && (
        <p className="rounded-lg border border-red-500/20 bg-red-500/10 px-4 py-3 text-sm text-red-400">
          {otpError}
        </p>
      )}

      <button
        type="submit"
        disabled={sending}
        className="w-full rounded-xl bg-gold py-4 font-bold text-ink transition hover:bg-gold-soft disabled:opacity-60"
      >
        {sending ? "Sending OTP…" : "Send Me the Free Guide →"}
      </button>

      <p className="text-center text-xs text-slate-500">
        OTP verify करें · No spam · Guide instantly on WhatsApp
      </p>
    </form>
  );
}
