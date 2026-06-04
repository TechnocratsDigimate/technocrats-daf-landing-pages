"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { getTrackingConsent, onOpenCookiePreferences, setTrackingConsent, type TrackingConsentChoice } from "@/lib/tracking";

export function CookieConsentBanner() {
  const [isVisible, setIsVisible] = useState(false);

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

  function chooseConsent(choice: TrackingConsentChoice) {
    setTrackingConsent(choice);
    setIsVisible(false);
  }

  if (!isVisible) {
    return null;
  }

  return (
    <div className="fixed inset-x-0 bottom-0 z-50 border-t border-gold/25 bg-[linear-gradient(145deg,rgba(5,7,13,0.98),rgba(13,24,40,0.98))] px-5 py-4 text-white shadow-[0_-20px_70px_rgba(0,0,0,0.42)] md:px-8">
      <div className="mx-auto flex max-w-[1320px] flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div className="max-w-3xl">
          <p className="text-sm font-semibold uppercase tracking-[0.18em] text-gold">Cookie Consent</p>
          <p className="mt-2 text-sm leading-6 text-slate-200 md:text-base">
            We use cookies and tracking technologies to improve this website, measure campaign performance, and show relevant ads. You can accept or reject non-essential tracking.
          </p>
        </div>

        <div className="flex flex-col gap-2 sm:flex-row sm:items-center">
          <button
            className="rounded-md bg-[linear-gradient(90deg,#d6a84f,#f3d58a)] px-5 py-3 text-sm font-bold text-ink shadow-gold transition hover:brightness-110"
            onClick={() => chooseConsent("accepted")}
            type="button"
          >
            Accept
          </button>
          <button
            className="rounded-md border border-white/15 px-5 py-3 text-sm font-bold text-slate-100 transition hover:border-white/35 hover:bg-white/[0.04]"
            onClick={() => chooseConsent("rejected")}
            type="button"
          >
            Reject
          </button>
          <Link
            className="rounded-md border border-gold/30 px-5 py-3 text-center text-sm font-bold text-gold transition hover:border-gold hover:bg-gold/10"
            href="/privacy-policy"
          >
            Privacy Policy
          </Link>
        </div>
      </div>
    </div>
  );
}
