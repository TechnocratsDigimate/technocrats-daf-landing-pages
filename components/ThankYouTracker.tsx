"use client";

import { useEffect } from "react";
import { trackThankYouPageView } from "@/lib/tracking";

export function ThankYouTracker({ niche }: { niche: string }) {
  useEffect(() => {
    trackThankYouPageView(niche);
    // book_call is intentionally NOT fired here.
    // It fires only on actual booking/Calendly click via trackBookingClicked() in ThankYouActions.tsx.
  }, [niche]);

  return null;
}
