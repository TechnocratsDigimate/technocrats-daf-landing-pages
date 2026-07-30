"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import {
  getTrackingConsent,
  onOpenCookiePreferences,
  setTrackingConsent,
  type TrackingConsentChoice
} from "@/lib/tracking";

export function CookieConsentBanner() {
  const [isVisible, setIsVisible] = useState(false);
  const acceptButtonRef = useRef<HTMLButtonElement>(null);
  const returnFocusRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    const timer = window.setTimeout(() => {
      setIsVisible(!getTrackingConsent());
    }, 0);
    const removePreferenceListener = onOpenCookiePreferences(() => {
      setIsVisible(true);
    });
    return () => {
      window.clearTimeout(timer);
      removePreferenceListener();
    };
  }, []);

  useEffect(() => {
    if (!isVisible) return;
    const activeElement = document.activeElement;
    if (
      activeElement instanceof HTMLElement &&
      activeElement !== document.body &&
      activeElement !== document.documentElement &&
      !activeElement.closest('[role="dialog"]')
    ) {
      returnFocusRef.current = activeElement;
    } else {
      returnFocusRef.current = null;
    }
    window.dispatchEvent(new CustomEvent("td-consent-visibility-changed", { detail: { visible: true } }));
    const timer = window.setTimeout(() => acceptButtonRef.current?.focus(), 0);
    return () => {
      window.clearTimeout(timer);
      window.dispatchEvent(new CustomEvent("td-consent-visibility-changed", { detail: { visible: false } }));
    };
  }, [isVisible]);

  function chooseConsent(choice: TrackingConsentChoice) {
    const previouslyAccepted = getTrackingConsent() === "accepted";
    const returnTarget = returnFocusRef.current;
    setTrackingConsent(choice);
    setIsVisible(false);
    if (choice === "rejected" && previouslyAccepted) {
      window.location.reload();
      return;
    }
    window.setTimeout(() => {
      const fallback = document.querySelector<HTMLElement>('a[aria-label="Technocrats Digimate home"]');
      (returnTarget?.isConnected ? returnTarget : fallback)?.focus();
    }, 0);
  }

  if (!isVisible) return null;

  return (
    <section
      aria-describedby="cookie-consent-description"
      aria-labelledby="cookie-consent-title"
      aria-modal="true"
      className="fixed inset-x-3 bottom-[max(0.75rem,env(safe-area-inset-bottom))] z-50 mx-auto max-w-4xl rounded-2xl border border-line bg-white p-4 text-ink shadow-[0_16px_50px_rgba(4,14,24,0.18)] sm:p-5"
      role="dialog"
    >
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div className="max-w-2xl">
          <h2 className="text-sm font-bold uppercase tracking-[0.14em]" id="cookie-consent-title">
            Your privacy choices
          </h2>
          <p className="mt-1.5 text-sm leading-5 text-slate" id="cookie-consent-description">
            Optional analytics and advertising scripts stay off unless you accept.
            Essential site functions continue either way.
          </p>
        </div>
        <div className="grid grid-cols-2 gap-2 sm:flex sm:items-center">
          <button
            className="min-h-11 rounded-lg border border-ink bg-white px-5 py-2.5 text-sm font-bold text-ink transition hover:bg-mist focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ink"
            onClick={() => chooseConsent("accepted")}
            ref={acceptButtonRef}
            type="button"
          >
            Accept all optional
          </button>
          <button
            className="min-h-11 rounded-lg border border-ink bg-white px-5 py-2.5 text-sm font-bold text-ink transition hover:bg-mist focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ink"
            onClick={() => chooseConsent("rejected")}
            type="button"
          >
            Reject all optional
          </button>
          <Link
            className="col-span-2 min-h-11 px-3 py-2.5 text-center text-sm font-semibold text-slate underline decoration-line underline-offset-4 hover:text-ink sm:min-h-0"
            href="/privacy-policy"
          >
            Privacy policy
          </Link>
        </div>
      </div>
    </section>
  );
}
