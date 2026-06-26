"use client";

import { useEffect, useState } from "react";
import Script from "next/script";
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

  if (!consentGiven) return null;

  return (
    <Script id="meta-pixel" strategy="afterInteractive">
      {`!function(f,b,e,v,n,t,s){if(f.fbq)return;n=f.fbq=function(){n.callMethod?n.callMethod.apply(n,arguments):n.queue.push(arguments)};if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';n.queue=[];t=b.createElement(e);t.async=!0;t.src=v;s=b.getElementsByTagName(e)[0];s.parentNode.insertBefore(t,s)}(window,document,'script','https://connect.facebook.net/en_US/fbevents.js');fbq('init','${META_PIXEL_ID}');fbq('track','PageView');`}
    </Script>
  );
}
