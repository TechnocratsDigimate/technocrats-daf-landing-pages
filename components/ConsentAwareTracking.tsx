"use client";

import { useEffect, useState } from "react";
import Script from "next/script";
import { captureUtmParameters, hasTrackingConsent, onTrackingConsentChange, trackPageView } from "@/lib/tracking";

const META_PIXEL_ID = process.env.NEXT_PUBLIC_META_PIXEL_ID ?? "357870675925394";

export function ConsentAwareTracking() {
  const [consentGiven, setConsentGiven] = useState(false);

  useEffect(() => {
    captureUtmParameters();
    setConsentGiven(hasTrackingConsent());
    const remove = onTrackingConsentChange(() => setConsentGiven(hasTrackingConsent()));
    return remove;
  }, []);

  useEffect(() => {
    if (!consentGiven) return;
    const timer = window.setTimeout(() => { trackPageView(); }, 600);
    return () => window.clearTimeout(timer);
  }, [consentGiven]);

  if (!consentGiven || !META_PIXEL_ID) return null;

  return (
    <Script id="meta-pixel" strategy="afterInteractive">
      {`!function(f,b,e,v,n,t,s){if(f.fbq)return;n=f.fbq=function(){n.callMethod?n.callMethod.apply(n,arguments):n.queue.push(arguments)};if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';n.queue=[];t=b.createElement(e);t.async=!0;t.src=v;s=b.getElementsByTagName(e)[0];s.parentNode.insertBefore(t,s)}(window,document,'script','https://connect.facebook.net/en_US/fbevents.js');fbq('init','${META_PIXEL_ID}');fbq('track','PageView');`}
    </Script>
  );
}
