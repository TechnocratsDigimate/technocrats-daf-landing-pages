"use client";

import { useEffect, useState } from "react";
import Script from "next/script";
import { captureUtmParameters, hasTrackingConsent, onTrackingConsentChange, trackPageView } from "@/lib/tracking";

const GTM_ID = "GTM-T55Z3JH6";

export function TrackingScripts() {
  const ga4Id = process.env.NEXT_PUBLIC_GA4_ID;
  const metaPixelId = process.env.NEXT_PUBLIC_META_PIXEL_ID;
  const [trackingEnabled, setTrackingEnabled] = useState(false);

  useEffect(() => {
    captureUtmParameters();
    const timer = window.setTimeout(() => {
      setTrackingEnabled(hasTrackingConsent());
    }, 0);

    const removeConsentListener = onTrackingConsentChange(() => {
      setTrackingEnabled(hasTrackingConsent());
    });

    return () => {
      window.clearTimeout(timer);
      removeConsentListener();
    };
  }, []);

  useEffect(() => {
    if (!trackingEnabled) return;
    const timer = window.setTimeout(() => { trackPageView(); }, 600);
    return () => window.clearTimeout(timer);
  }, [trackingEnabled]);

  return (
    <>
      {/* GTM — loads immediately, no consent required */}
      <Script id="gtm-base" strategy="afterInteractive">
        {`(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src='https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);})(window,document,'script','dataLayer','${GTM_ID}');`}
      </Script>

      {/* GA4 + Meta Pixel — only after consent */}
      {trackingEnabled ? (
        <>
          {ga4Id ? (
            <>
              <Script src={`https://www.googletagmanager.com/gtag/js?id=${ga4Id}`} strategy="afterInteractive" />
              <Script id="ga4-base" strategy="afterInteractive">
                {`window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments);}window.gtag=gtag;gtag('js',new Date());gtag('config','${ga4Id}',{send_page_view:false});`}
              </Script>
            </>
          ) : null}

          {metaPixelId ? (
            <Script id="meta-pixel-base" strategy="afterInteractive">
              {`!function(f,b,e,v,n,t,s){if(f.fbq)return;n=f.fbq=function(){n.callMethod?n.callMethod.apply(n,arguments):n.queue.push(arguments)};if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';n.queue=[];t=b.createElement(e);t.async=!0;t.src=v;s=b.getElementsByTagName(e)[0];s.parentNode.insertBefore(t,s)}(window,document,'script','https://connect.facebook.net/en_US/fbevents.js');fbq('init','${metaPixelId}');fbq('track','PageView');`}
            </Script>
          ) : null}
        </>
      ) : null}
    </>
  );
}
