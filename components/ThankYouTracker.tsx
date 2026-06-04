"use client";

import { useEffect } from "react";
import { trackThankYouPageView } from "@/lib/tracking";

export function ThankYouTracker({ niche }: { niche: string }) {
  useEffect(() => {
    trackThankYouPageView(niche);
  }, [niche]);

  return null;
}
