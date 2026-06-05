"use client";

import { FormEvent, useEffect, useMemo, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import type { FunnelConfig, Question } from "@/lib/funnel-data";
import {
  captureUtmParameters,
  getStoredUtmParameters,
  trackDuplicateLeadDetected,
  trackEvent,
  trackFormAbandoned,
  trackFormStarted,
  trackLeadSubmitted,
  trackStepCompleted,
  trackWhatsAppClicked
} from "@/lib/tracking";

type FormState = Record<string, string | string[]>;

// ─── Phone validation ────────────────────────────────────────────────────────

const FAKE_PHONES = new Set([
  "0000000000", "1111111111", "2222222222", "3333333333", "4444444444",
  "5555555555", "6666666666", "7777777777", "8888888888", "9999999999",
  "1234567890", "9876543210"
]);

const FAKE_EMAILS = new Set([
  "test@test.com", "test@gmail.com", "abc@abc.com",
  "noemail@gmail.com", "example@example.com", "fake@gmail.com"
]);

const DISPOSABLE_DOMAINS = new Set([
  "mailinator.com", "10minutemail.com", "tempmail.com", "guerrillamail.com"
]);

function parseIndianPhone(raw: string): { digits: string; valid: boolean } {
  let s = raw.replace(/[\s\-\.\(\)]/g, "");

  if (s.startsWith("+91")) s = s.slice(3);
  else if (s.startsWith("0091")) s = s.slice(4);
  else if (s.startsWith("91") && s.length === 12) s = s.slice(2);

  if (s.length !== 10 || !/^[6-9]\d{9}$/.test(s) || FAKE_PHONES.has(s)) {
    return { digits: s, valid: false };
  }

  return { digits: s, valid: true };
}

// ─── Duplicate prevention ────────────────────────────────────────────────────

const THIRTY_DAYS_MS = 30 * 24 * 60 * 60 * 1000;

function localDuplicateKey(funnelSlug: string, normalizedPhone: string) {
  return `td_lead_${funnelSlug}_${normalizedPhone}`;
}

function checkLocalDuplicate(funnelSlug: string, normalizedPhone: string): boolean {
  try {
    const stored = window.localStorage.getItem(localDuplicateKey(funnelSlug, normalizedPhone));
    if (!stored) return false;
    const ts = parseInt(stored, 10);
    return !isNaN(ts) && Date.now() - ts < THIRTY_DAYS_MS;
  } catch {
    return false;
  }
}

function storeLocalSubmission(funnelSlug: string, normalizedPhone: string) {
  try {
    window.localStorage.setItem(localDuplicateKey(funnelSlug, normalizedPhone), String(Date.now()));
  } catch {
    // localStorage write failures must never block submission
  }
}

// ─── Form validation ─────────────────────────────────────────────────────────

function validateQuestion(question: Question, value: string | string[]) {
  if (question.type === "multi") {
    if (!Array.isArray(value) || value.length === 0) {
      return "Please select at least one option.";
    }
    return "";
  }

  const trimmed = (value as string).trim();

  if (!trimmed) {
    return "This field is required.";
  }

  if (question.type === "email") {
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(trimmed)) {
      return "Please enter a valid business email address.";
    }
    const lower = trimmed.toLowerCase();
    const domain = lower.split("@")[1] ?? "";
    if (FAKE_EMAILS.has(lower) || DISPOSABLE_DOMAINS.has(domain)) {
      return "Please enter a valid business email address.";
    }
  }

  if (question.type === "phone") {
    const { valid } = parseIndianPhone(trimmed);
    if (!valid) {
      return "Please enter a valid WhatsApp mobile number.";
    }
  }

  return "";
}

function emptyValue(question: Question): string | string[] {
  return question.type === "multi" ? [] : "";
}

// ─── Duplicate message panel ─────────────────────────────────────────────────

function buildDuplicateWaHref(niche: string): string {
  const number = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER;
  if (!number) return "#";
  const cleaned = number.replace(/\D/g, "");
  const message =
    niche === "Study Abroad"
      ? "Hi Technocrats Digimate, I had already submitted my Study Abroad Growth Audit form earlier. Please continue my audit request."
      : "Hi Technocrats Digimate, I had already submitted my Real Estate Growth Audit form earlier. Please continue my audit request.";
  return `https://wa.me/${cleaned}?text=${encodeURIComponent(message)}`;
}

function DuplicatePanel({ niche }: { niche: string }) {
  const waHref = buildDuplicateWaHref(niche);
  const hasNumber = Boolean(process.env.NEXT_PUBLIC_WHATSAPP_NUMBER);

  return (
    <div className="relative overflow-hidden rounded-md border border-gold/25 bg-[linear-gradient(145deg,rgba(13,24,40,0.98),rgba(5,7,13,0.98))] p-5 shadow-gold md:p-8">
      <div className="absolute inset-x-0 top-0 h-1 bg-gold" />
      <div className="py-4 text-center">
        <p className="text-sm font-semibold uppercase tracking-[0.22em] text-gold">Already Submitted</p>
        <h2 className="mt-4 text-2xl font-semibold leading-tight text-white md:text-3xl">
          Looks like you&apos;ve already submitted an audit request with this number.
        </h2>
        <p className="mt-4 text-base leading-7 text-slate-300">
          To avoid duplicate entries, please continue your audit conversation on WhatsApp.
        </p>
        <a
          className="mt-7 inline-block rounded-md bg-[linear-gradient(90deg,#d6a84f,#f3d58a)] px-6 py-4 font-semibold text-ink shadow-gold transition hover:brightness-110"
          href={waHref}
          onClick={() => {
          trackWhatsAppClicked("duplicate_lead_continue", niche);
          trackEvent("whatsapp_click", { location: "duplicate_lead_continue" });
        }}
          rel="noreferrer"
          target={hasNumber ? "_blank" : undefined}
        >
          Continue on WhatsApp
        </a>
      </div>
    </div>
  );
}

// ─── Main form component ─────────────────────────────────────────────────────

export function MultiStepAuditForm({ funnel }: { funnel: FunnelConfig }) {
  const router = useRouter();
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState<FormState>({});
  const [error, setError] = useState("");
  const [consent, setConsent] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [submitWarning, setSubmitWarning] = useState("");
  const [isDuplicate, setIsDuplicate] = useState(false);
  const hasStartedRef = useRef(false);
  const hasSubmittedRef = useRef(false);
  const abandonmentSentRef = useRef(false);
  const lastCompletedStepRef = useRef(0);
  const inactivityTimerRef = useRef<number | null>(null);

  const question = funnel.questions[step];
  const isFinalStep = step === funnel.questions.length - 1;
  const progress = useMemo(() => Math.round(((step + 1) / funnel.questions.length) * 100), [step, funnel.questions.length]);

  function fireFormAbandoned() {
    if (!hasStartedRef.current || hasSubmittedRef.current || abandonmentSentRef.current) {
      return;
    }

    abandonmentSentRef.current = true;
    trackFormAbandoned({
      funnelType: funnel.niche,
      lastCompletedStep: lastCompletedStepRef.current,
      totalSteps: funnel.questions.length
    });
  }

  function resetInactivityTimer() {
    if (inactivityTimerRef.current) {
      window.clearTimeout(inactivityTimerRef.current);
    }

    if (!hasStartedRef.current || hasSubmittedRef.current) {
      return;
    }

    inactivityTimerRef.current = window.setTimeout(() => {
      fireFormAbandoned();
    }, 5 * 60 * 1000);
  }

  function markFormStarted() {
    if (!hasStartedRef.current) {
      hasStartedRef.current = true;
      trackFormStarted(funnel.niche);
      trackEvent("audit_form_start", {
        page: funnel.slug === "real-estate-growth-audit" ? "real-estate-audit" : "study-abroad-audit",
        niche: funnel.niche
      });
    }

    resetInactivityTimer();
  }

  function updateAnswer(value: string) {
    markFormStarted();
    setAnswers((current) => ({ ...current, [question.id]: value }));
    setError("");
  }

  function toggleMultiAnswer(option: string) {
    markFormStarted();
    setAnswers((current) => {
      const existing = current[question.id];
      const selected: string[] = Array.isArray(existing) ? existing : [];
      const next = selected.includes(option) ? selected.filter((v) => v !== option) : [...selected, option];
      return { ...current, [question.id]: next };
    });
    setError("");
  }

  function goNext() {
    const currentAnswer = answers[question.id] ?? emptyValue(question);
    const validationMessage = validateQuestion(question, currentAnswer);

    if (validationMessage) {
      setError(validationMessage);
      return;
    }

    const completedStep = step + 1;
    lastCompletedStepRef.current = completedStep;
    trackStepCompleted({
      funnelType: funnel.niche,
      stepNumber: completedStep,
      totalSteps: funnel.questions.length
    });
    setStep((current) => Math.min(current + 1, funnel.questions.length - 1));
    setError("");
    resetInactivityTimer();
  }

  function goBack() {
    setStep((current) => Math.max(current - 1, 0));
    setError("");
  }

  async function submitForm(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const currentAnswer = answers[question.id] ?? emptyValue(question);
    const validationMessage = validateQuestion(question, currentAnswer);
    if (validationMessage) {
      setError(validationMessage);
      return;
    }

    if (!consent) {
      setError("Please accept the consent checkbox to submit your audit request.");
      return;
    }

    setSubmitting(true);
    setSubmitWarning("");

    // Normalize phone first so we can use it for the duplicate key
    const normalizedAnswers = { ...answers };
    const rawPhone = typeof normalizedAnswers.whatsapp === "string" ? normalizedAnswers.whatsapp : "";
    let normalizedPhone = "";
    if (rawPhone) {
      const { digits, valid } = parseIndianPhone(rawPhone);
      if (valid) {
        normalizedPhone = `+91${digits}`;
        normalizedAnswers.whatsapp = normalizedPhone;
      }
    }

    // ── Client-side soft block (localStorage) ───────────────────────────────
    if (normalizedPhone && checkLocalDuplicate(funnel.slug, normalizedPhone)) {
      setSubmitting(false);
      trackDuplicateLeadDetected(funnel.niche);
      setIsDuplicate(true);
      return;
    }

    try {
      const response = await fetch("/api/leads", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          niche: funnel.niche,
          page: funnel.slug,
          pagePath: `/${funnel.slug}`,
          consentStatus: "contact_consent_accepted",
          answers: normalizedAnswers,
          utm: getStoredUtmParameters()
        })
      });

      const result = (await response.json()) as {
        ok?: boolean;
        warning?: string;
        message?: string;
        duplicate?: boolean;
      };

      if (!response.ok || !result.ok) {
        throw new Error(result.message || "Unable to submit your audit request right now.");
      }

      // ── Server-side duplicate detected ────────────────────────────────────
      if (result.duplicate === true) {
        trackDuplicateLeadDetected(funnel.niche);
        setIsDuplicate(true);
        return;
      }

      // ── Successful non-duplicate submission ───────────────────────────────
      if (normalizedPhone) {
        storeLocalSubmission(funnel.slug, normalizedPhone);
      }

      if (result.warning) {
        setSubmitWarning(result.warning);
      }

      hasSubmittedRef.current = true;
      trackLeadSubmitted(funnel.niche);
      trackEvent("audit_form_complete", {
        page: funnel.slug === "real-estate-growth-audit" ? "real-estate-audit" : "study-abroad-audit",
        niche: funnel.niche,
        budget: typeof normalizedAnswers.monthlyBudget === "string" ? normalizedAnswers.monthlyBudget : "",
        lead_source: typeof normalizedAnswers.leadSource === "string" ? normalizedAnswers.leadSource : "",
        intent: typeof normalizedAnswers.readyToInvest === "string" ? normalizedAnswers.readyToInvest : "",
        ...(funnel.niche === "Study Abroad" && {
          country: Array.isArray(normalizedAnswers.countries)
            ? normalizedAnswers.countries.join(", ")
            : typeof normalizedAnswers.countries === "string"
            ? normalizedAnswers.countries
            : ""
        })
      });
      const submittedName = typeof answers.name === "string" ? answers.name.trim() : "";
      const redirectUrl = `/thank-you?niche=${encodeURIComponent(funnel.niche)}${submittedName ? `&name=${encodeURIComponent(submittedName)}` : ""}`;
      router.push(redirectUrl);
    } catch (submissionError) {
      // Network/API errors must never block the user — fall through to normal error display
      setError(submissionError instanceof Error ? submissionError.message : "Unable to submit your audit request right now.");
    } finally {
      setSubmitting(false);
    }
  }

  useEffect(() => {
    captureUtmParameters();

    function fireAnonymousAbandonment() {
      if (!hasStartedRef.current || hasSubmittedRef.current || abandonmentSentRef.current) {
        return;
      }

      abandonmentSentRef.current = true;
      trackFormAbandoned({
        funnelType: funnel.niche,
        lastCompletedStep: lastCompletedStepRef.current,
        totalSteps: funnel.questions.length
      });
    }

    function handlePageHide() {
      fireAnonymousAbandonment();
    }

    function handleVisibilityChange() {
      if (document.visibilityState === "hidden") {
        fireAnonymousAbandonment();
      }
    }

    window.addEventListener("pagehide", handlePageHide);
    document.addEventListener("visibilitychange", handleVisibilityChange);

    return () => {
      if (inactivityTimerRef.current) {
        window.clearTimeout(inactivityTimerRef.current);
      }

      window.removeEventListener("pagehide", handlePageHide);
      document.removeEventListener("visibilitychange", handleVisibilityChange);
    };
  }, [funnel.niche, funnel.questions.length]);

  // ── Duplicate panel replaces the form ─────────────────────────────────────
  if (isDuplicate) {
    return <DuplicatePanel niche={funnel.niche} />;
  }

  const rawValue = answers[question.id];
  const currentValue = rawValue ?? emptyValue(question);

  return (
    <form
      className="relative overflow-hidden rounded-md border border-gold/25 bg-[linear-gradient(145deg,rgba(13,24,40,0.98),rgba(5,7,13,0.98))] p-5 shadow-gold md:p-8"
      onClick={markFormStarted}
      onFocus={markFormStarted}
      onSubmit={submitForm}
    >
      <div className="absolute inset-x-0 top-0 h-1 bg-gold" />
      <div className="mb-7 rounded-md border border-white/10 bg-white/[0.035] p-4">
        <div className="flex items-center justify-between gap-4 text-sm text-slate-300">
          <span className="font-medium text-white">
            Question {step + 1} of {funnel.questions.length}
          </span>
          <span className="rounded-md bg-gold/12 px-2.5 py-1 font-semibold text-gold">{progress}% complete</span>
        </div>
        <div className="mt-4 h-2.5 overflow-hidden rounded-full bg-ink">
          <div className="h-full rounded-full bg-[linear-gradient(90deg,#d6a84f,#f3d58a)] transition-all duration-300" style={{ width: `${progress}%` }} />
        </div>
      </div>

      <fieldset>
        <legend className="text-2xl font-semibold leading-tight text-white md:text-3xl">{question.label}</legend>

        {question.type === "multi" ? (
          <div className="mt-6 grid gap-3">
            {question.options?.map((option) => {
              const selected = Array.isArray(currentValue) && currentValue.includes(option);
              return (
                <label
                  className={`flex cursor-pointer items-center gap-3 rounded-md border p-4 text-left transition ${
                    selected
                      ? "border-gold bg-gold/15 text-white shadow-[inset_0_0_0_1px_rgba(214,168,79,0.38)]"
                      : "border-white/10 bg-white/[0.035] text-slate-300 hover:border-gold/60 hover:bg-gold/10"
                  }`}
                  key={option}
                >
                  <input
                    checked={selected}
                    className="h-4 w-4 accent-gold"
                    name={question.id}
                    onChange={() => toggleMultiAnswer(option)}
                    type="checkbox"
                    value={option}
                  />
                  <span className="leading-6">{option}</span>
                </label>
              );
            })}
          </div>
        ) : question.type === "single" ? (
          <div className="mt-6 grid gap-3">
            {question.options?.map((option) => (
              <label
                className={`flex cursor-pointer items-center gap-3 rounded-md border p-4 text-left transition ${
                  currentValue === option
                    ? "border-gold bg-gold/15 text-white shadow-[inset_0_0_0_1px_rgba(214,168,79,0.38)]"
                    : "border-white/10 bg-white/[0.035] text-slate-300 hover:border-gold/60 hover:bg-gold/10"
                }`}
                key={option}
              >
                <input
                  checked={currentValue === option}
                  className="h-4 w-4 accent-gold"
                  name={question.id}
                  onChange={() => updateAnswer(option)}
                  type="radio"
                  value={option}
                />
                <span className="leading-6">{option}</span>
              </label>
            ))}
          </div>
        ) : (
          <input
            className="mt-6 w-full rounded-md border border-white/12 bg-white/[0.055] px-4 py-4 text-white outline-none transition placeholder:text-slate-500 focus:border-gold focus:bg-white/[0.075]"
            inputMode={question.type === "phone" ? "tel" : undefined}
            onChange={(event) => updateAnswer(event.target.value)}
            placeholder={question.placeholder}
            type={question.type === "phone" ? "tel" : question.type}
            value={currentValue as string}
          />
        )}

        {question.helper ? (
          <p className="mt-3 text-sm leading-6 text-slate-400">{question.helper}</p>
        ) : null}
      </fieldset>

      {isFinalStep ? (
        <label className="mt-6 flex items-start gap-3 text-sm leading-6 text-slate-300">
          <input
            checked={consent}
            className="mt-1 h-4 w-4 accent-gold"
            onChange={(event) => setConsent(event.target.checked)}
            type="checkbox"
          />
          <span>
            I agree to be contacted by Technocrats Digimate Pvt Ltd by phone, email, or WhatsApp about my diagnostic audit request.
          </span>
        </label>
      ) : null}

      {error ? <p className="mt-5 rounded-md border border-red-400/30 bg-red-500/10 px-4 py-3 text-sm text-red-100">{error}</p> : null}
      {submitWarning ? <p className="mt-5 rounded-md border border-gold/30 bg-gold/10 px-4 py-3 text-sm text-gold-soft">{submitWarning}</p> : null}

      <div className="mt-7 flex flex-col-reverse gap-3 sm:flex-row sm:justify-between">
        <button
          className="rounded-md border border-white/15 px-5 py-3 font-semibold text-slate-200 transition hover:border-white/35 hover:bg-white/[0.035] disabled:cursor-not-allowed disabled:opacity-40 sm:min-w-28"
          disabled={step === 0 || submitting}
          onClick={goBack}
          type="button"
        >
          Back
        </button>

        {isFinalStep ? (
          <button
            className="rounded-md bg-[linear-gradient(90deg,#d6a84f,#f3d58a)] px-5 py-3 font-semibold text-ink shadow-gold transition hover:brightness-110 disabled:cursor-wait disabled:opacity-70 sm:min-w-64"
            disabled={submitting}
            type="submit"
          >
            {submitting ? "Submitting..." : funnel.finalButton}
          </button>
        ) : (
          <button
            className="rounded-md bg-[linear-gradient(90deg,#d6a84f,#f3d58a)] px-5 py-3 font-semibold text-ink shadow-gold transition hover:brightness-110 sm:min-w-28"
            onClick={goNext}
            type="button"
          >
            Next
          </button>
        )}
      </div>
    </form>
  );
}
