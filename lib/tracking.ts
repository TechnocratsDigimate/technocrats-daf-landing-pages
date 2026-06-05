"use client";

export type TrackingConsentChoice = "accepted" | "rejected";
export type FunnelType = "real_estate" | "study_abroad" | "growth";

type TrackingEventName =
  | "PageView"
  | "FormStarted"
  | "StepCompleted"
  | "FormAbandoned"
  | "LeadSubmitted"
  | "ThankYouPageView"
  | "WhatsAppClicked"
  | "BookingClicked"
  | "DuplicateLeadDetected";

type WindowWithTracking = Window & {
  fbq?: (...args: unknown[]) => void;
  gtag?: (...args: unknown[]) => void;
  dataLayer?: Record<string, unknown>[];
};

type TrackingProperties = {
  funnelType?: FunnelType | string;
  pagePath?: string;
  stepNumber?: number;
  totalSteps?: number;
  lastCompletedStep?: number;
  timestamp?: string;
  abandoned?: boolean;
  ctaLocation?: string;
  [key: string]: unknown;
};

const CONSENT_KEY = "td_tracking_consent";
const UTM_STORAGE_KEY = "td_utm_attribution";
const CONSENT_CHANGED_EVENT = "td-cookie-consent-changed";
const OPEN_PREFERENCES_EVENT = "td-open-cookie-preferences";
const UTM_KEYS = ["utm_source", "utm_medium", "utm_campaign", "utm_content", "utm_term"] as const;

const GA4_EVENT_NAMES: Record<TrackingEventName, string> = {
  PageView: "page_view",
  FormStarted: "form_started",
  StepCompleted: "step_completed",
  FormAbandoned: "form_abandoned",
  LeadSubmitted: "lead_submitted",
  ThankYouPageView: "thank_you_page_view",
  WhatsAppClicked: "whatsapp_clicked",
  BookingClicked: "booking_clicked",
  DuplicateLeadDetected: "duplicate_lead_detected"
};

const META_CUSTOM_EVENTS = new Set<TrackingEventName>([
  "FormStarted",
  "StepCompleted",
  "FormAbandoned",
  "LeadSubmitted",
  "ThankYouPageView",
  "WhatsAppClicked",
  "BookingClicked",
  "DuplicateLeadDetected"
]);

function canUseBrowser() {
  return typeof window !== "undefined";
}

function getStorageValue(key: string) {
  if (!canUseBrowser()) {
    return null;
  }

  try {
    return window.localStorage.getItem(key);
  } catch {
    return null;
  }
}

function setStorageValue(key: string, value: string) {
  if (!canUseBrowser()) {
    return;
  }

  try {
    window.localStorage.setItem(key, value);
  } catch {
    // Consent and attribution storage should never break page functionality.
  }
}

function normalizeFunnelType(input?: string | FunnelType): FunnelType {
  const value = (input || "").toLowerCase().replace(/[-\s]+/g, "_");

  if (value.includes("study")) {
    return "study_abroad";
  }

  if (value.includes("real") || value.includes("property")) {
    return "real_estate";
  }

  return "growth";
}

function currentPagePath() {
  if (!canUseBrowser()) {
    return "";
  }

  return window.location.pathname;
}

function toGa4Params(payload: TrackingProperties) {
  return {
    funnel_type: payload.funnelType,
    page_path: payload.pagePath,
    step_number: payload.stepNumber,
    total_steps: payload.totalSteps,
    last_completed_step: payload.lastCompletedStep,
    abandoned: payload.abandoned,
    cta_location: payload.ctaLocation,
    timestamp: payload.timestamp,
    utm_source: payload.utm_source,
    utm_medium: payload.utm_medium,
    utm_campaign: payload.utm_campaign,
    utm_content: payload.utm_content,
    utm_term: payload.utm_term
  };
}

function cleanPayload(payload: TrackingProperties) {
  return Object.fromEntries(Object.entries(payload).filter(([, value]) => value !== undefined && value !== "")) as TrackingProperties;
}

function consentCookieValue(choice: TrackingConsentChoice) {
  const maxAge = 60 * 60 * 24 * 365;
  return `${CONSENT_KEY}=${choice}; Max-Age=${maxAge}; Path=/; SameSite=Lax`;
}

export function getTrackingConsent() {
  const storedChoice = getStorageValue(CONSENT_KEY);

  if (storedChoice === "accepted" || storedChoice === "rejected") {
    return storedChoice;
  }

  if (!canUseBrowser()) {
    return null;
  }

  const cookieChoice = document.cookie
    .split("; ")
    .find((cookie) => cookie.startsWith(`${CONSENT_KEY}=`))
    ?.split("=")[1];

  return cookieChoice === "accepted" || cookieChoice === "rejected" ? cookieChoice : null;
}

export function hasTrackingConsent() {
  return getTrackingConsent() === "accepted";
}

export function setTrackingConsent(choice: TrackingConsentChoice) {
  if (!canUseBrowser()) {
    return;
  }

  setStorageValue(CONSENT_KEY, choice);
  document.cookie = consentCookieValue(choice);
  window.dispatchEvent(new CustomEvent(CONSENT_CHANGED_EVENT, { detail: { choice } }));
}

export function onTrackingConsentChange(callback: () => void) {
  if (!canUseBrowser()) {
    return () => undefined;
  }

  window.addEventListener(CONSENT_CHANGED_EVENT, callback);
  return () => window.removeEventListener(CONSENT_CHANGED_EVENT, callback);
}

export function openCookiePreferences() {
  if (!canUseBrowser()) {
    return;
  }

  window.dispatchEvent(new Event(OPEN_PREFERENCES_EVENT));
}

export function onOpenCookiePreferences(callback: () => void) {
  if (!canUseBrowser()) {
    return () => undefined;
  }

  window.addEventListener(OPEN_PREFERENCES_EVENT, callback);
  return () => window.removeEventListener(OPEN_PREFERENCES_EVENT, callback);
}

export function captureUtmParameters() {
  if (!canUseBrowser()) {
    return {};
  }

  const searchParams = new URLSearchParams(window.location.search);
  const utms = UTM_KEYS.reduce<Record<string, string>>((current, key) => {
    const value = searchParams.get(key);

    if (value) {
      current[key] = value;
    }

    return current;
  }, {});

  if (Object.keys(utms).length === 0) {
    return getStoredUtmParameters();
  }

  const serialized = JSON.stringify(utms);

  try {
    window.sessionStorage.setItem(UTM_STORAGE_KEY, serialized);
    window.localStorage.setItem(UTM_STORAGE_KEY, serialized);
  } catch {
    // Attribution storage is optional and must not affect form submission.
  }

  return utms;
}

export function getStoredUtmParameters() {
  if (!canUseBrowser()) {
    return {};
  }

  try {
    const stored = window.sessionStorage.getItem(UTM_STORAGE_KEY) || window.localStorage.getItem(UTM_STORAGE_KEY);
    return stored ? (JSON.parse(stored) as Record<string, string>) : {};
  } catch {
    return {};
  }
}

function buildPayload(funnelInput?: string | FunnelType, properties: TrackingProperties = {}) {
  const { funnelType: propertyFunnelType, ...eventProperties } = properties;
  const funnelType = normalizeFunnelType(propertyFunnelType?.toString() || funnelInput);

  return cleanPayload({
    ...getStoredUtmParameters(),
    pagePath: eventProperties.pagePath || currentPagePath(),
    timestamp: eventProperties.timestamp || new Date().toISOString(),
    ...eventProperties,
    funnelType
  });
}

function pushEvent(eventName: TrackingEventName, funnelInput?: string | FunnelType, properties: TrackingProperties = {}) {
  if (!canUseBrowser() || !hasTrackingConsent()) {
    return false;
  }

  const trackedWindow = window as WindowWithTracking;
  const payload = buildPayload(funnelInput, properties);

  trackedWindow.dataLayer = trackedWindow.dataLayer || [];
  trackedWindow.dataLayer.push({ event: eventName, ...payload });

  if (trackedWindow.gtag && process.env.NEXT_PUBLIC_GA4_ID) {
    trackedWindow.gtag("event", GA4_EVENT_NAMES[eventName], cleanPayload(toGa4Params(payload)));
  }

  if (trackedWindow.fbq && process.env.NEXT_PUBLIC_META_PIXEL_ID && META_CUSTOM_EVENTS.has(eventName)) {
    trackedWindow.fbq("trackCustom", eventName, payload);
  }

  return true;
}

export function trackPageView(funnelInput?: string | FunnelType) {
  return pushEvent("PageView", funnelInput);
}

export function trackFormStarted(funnelInput?: string | FunnelType) {
  return pushEvent("FormStarted", funnelInput);
}

export function trackStepCompleted({
  funnelType,
  stepNumber,
  totalSteps
}: {
  funnelType: string | FunnelType;
  stepNumber: number;
  totalSteps: number;
}) {
  return pushEvent("StepCompleted", funnelType, {
    stepNumber,
    totalSteps
  });
}

export function trackFormAbandoned({
  funnelType,
  lastCompletedStep,
  totalSteps
}: {
  funnelType: string | FunnelType;
  lastCompletedStep: number;
  totalSteps: number;
}) {
  return pushEvent("FormAbandoned", funnelType, {
    abandoned: true,
    lastCompletedStep,
    totalSteps
  });
}

export function trackLeadSubmitted(funnelInput?: string | FunnelType) {
  return pushEvent("LeadSubmitted", funnelInput);
}

export function trackThankYouPageView(funnelInput?: string | FunnelType) {
  return pushEvent("ThankYouPageView", funnelInput);
}

export function trackBookingClicked(ctaLocation?: string, funnelInput?: string | FunnelType) {
  return pushEvent("BookingClicked", funnelInput || ctaLocation, { ctaLocation });
}

export function trackWhatsAppClicked(ctaLocation?: string, funnelInput?: string | FunnelType) {
  return pushEvent("WhatsAppClicked", funnelInput || ctaLocation, { ctaLocation });
}

export function trackDuplicateLeadDetected(funnelInput?: string | FunnelType) {
  return pushEvent("DuplicateLeadDetected", funnelInput);
}

// ─── GTM conversion events ────────────────────────────────────────────────────
// Pushes named conversion events directly to window.dataLayer.
// GTM container is already loaded by TrackingScripts.tsx — no second loader needed.
// All events are consent-gated via hasTrackingConsent().

type ConversionEventName =
  | "audit_form_start"
  | "audit_form_complete"
  | "book_call"
  | "whatsapp_click";

type ConversionEventProperties = {
  page?: string;
  niche?: string;
  budget?: string;
  lead_source?: string;
  intent?: string;
  country?: string;
  location?: string;
  [key: string]: unknown;
};

export function trackEvent(event: ConversionEventName, properties: ConversionEventProperties = {}) {
  if (!canUseBrowser() || !hasTrackingConsent()) return;
  const w = window as WindowWithTracking;
  w.dataLayer = w.dataLayer || [];
  w.dataLayer.push({ event, ...properties });
}
