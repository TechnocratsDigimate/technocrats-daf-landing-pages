"use client";

import { useEffect, useState } from "react";
import {
  captureUtmParameters,
  hasTrackingConsent,
  onTrackingConsentChange,
  trackPageView
} from "@/lib/tracking";

const GTM_ID = process.env.NEXT_PUBLIC_GTM_ID ?? "GTM-T55Z3JH6";
const META_PIXEL_ID = process.env.NEXT_PUBLIC_META_PIXEL_ID ?? "357870675925394";
const HUBSPOT_PORTAL_ID = "246581458";

type TrackingWindow = Window & {
  dataLayer?: Record<string, unknown>[];
};

function initialiseDeniedConsent() {
  const trackedWindow = window as TrackingWindow;
  trackedWindow.dataLayer = trackedWindow.dataLayer || [];
  trackedWindow.dataLayer.push({
    event: "consent_default",
    consent: {
      analytics_storage: "denied",
      ad_storage: "denied",
      ad_user_data: "denied",
      ad_personalization: "denied"
    }
  });
}

function loadGtm() {
  if (document.getElementById("gtm-script")) return;
  const script = document.createElement("script");
  script.id = "gtm-script";
  script.async = true;
  script.src = `https://www.googletagmanager.com/gtm.js?id=${encodeURIComponent(GTM_ID)}`;
  document.head.appendChild(script);
}

function loadHubSpot() {
  if (document.getElementById("hs-script-loader")) return;
  const script = document.createElement("script");
  script.id = "hs-script-loader";
  script.async = true;
  script.defer = true;
  script.src = `https://js-na2.hs-scripts.com/${HUBSPOT_PORTAL_ID}.js`;
  document.body.appendChild(script);
}

export function ConsentAwareTracking() {
  const [consentGiven, setConsentGiven] = useState(false);

  useEffect(() => {
    initialiseDeniedConsent();
    captureUtmParameters();
    const timer = window.setTimeout(() => {
      setConsentGiven(hasTrackingConsent());
    }, 0);
    const remove = onTrackingConsentChange(() => {
      setConsentGiven(hasTrackingConsent());
    });
    return () => {
      window.clearTimeout(timer);
      remove();
    };
  }, []);

  useEffect(() => {
    if (!consentGiven) return;
    const trackedWindow = window as TrackingWindow;
    trackedWindow.dataLayer = trackedWindow.dataLayer || [];
    trackedWindow.dataLayer.push({
      event: "consent_granted",
      pixel_id: META_PIXEL_ID,
      consent: {
        analytics_storage: "granted",
        ad_storage: "granted",
        ad_user_data: "granted",
        ad_personalization: "granted"
      }
    });
    loadGtm();
    loadHubSpot();
    const timer = window.setTimeout(() => trackPageView(), 600);
    return () => window.clearTimeout(timer);
  }, [consentGiven]);

  return null;
}
