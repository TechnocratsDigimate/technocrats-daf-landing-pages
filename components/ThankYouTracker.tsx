"use client";

import { useEffect } from "react";
import { trackEvent, trackThankYouPageView } from "@/lib/tracking";

export function ThankYouTracker({ niche }: { niche: string }) {
  useEffect(() => {
    trackThankYouPageView(niche);
    trackEvent("book_call", { page: "thank-you", niche });
  }, [niche]);

  return null;
}
