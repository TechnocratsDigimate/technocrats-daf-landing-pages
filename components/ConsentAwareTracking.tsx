"use client";

import { useEffect, useState } from "react";
import { captureUtmParameters, hasTrackingConsent, onTrackingConsentChange, trackPageView } from "@/lib/tracking";

const GTM_ID = "GTM-T55Z3JH6";
const META_PIXEL_ID = process.env.NEXT_PUBLIC_META_PIXEL_ID ?? "357870675925394";

export function ConsentAwareTracking() {
  const [consentGiven, setConsentGiven] = useState(false);

  // GTM — inject immediately on mount, no consent required
  useEffect(() => {
    if (document.getElementById("gtm-script")) return;
    const s = document.createElement("script");
    s.id = "gtm-script";
    s.innerHTML = `(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src='https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);})(window,document,'script','dataLayer','${GTM_ID}');`;
    document.head.appendChild(s);
  }, []);

  // HubSpot — inject immediately on mount, no consent required
  useEffect(() => {
    if (document.getElementById("hs-script-loader")) return;
    const s = document.createElement("script");
    s.id = "hs-script-loader";
    s.type = "text/javascript";
    s.async = true;
    s.defer = true;
    s.src = "//js-na2.hs-scripts.com/246581458.js";
    document.body.appendChild(s);
  }, []);

  useEffect(() => {
    captureUtmParameters();
    setConsentGiven(hasTrackingConsent());
    const remove = onTrackingConsentChange(() => setConsentGiven(hasTrackingConsent()));
    return remove;
  }, []);

  useEffect(() => {
    if (!consentGiven) return;
    // Signal consent to GTM — Meta Pixel base tag in GTM fires on this event
    const w = window as Window & { dataLayer?: Record<string, unknown>[] };
    w.dataLayer = w.dataLayer || [];
    w.dataLayer.push({ event: "consent_granted", pixel_id: META_PIXEL_ID });
    const timer = window.setTimeout(() => { trackPageView(); }, 600);
    return () => window.clearTimeout(timer);
  }, [consentGiven]);

  return null;
}
