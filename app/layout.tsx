import type { Metadata } from "next";
import { CookieConsentBanner } from "@/components/CookieConsentBanner";
import { TrackingScripts } from "@/components/TrackingScripts";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL("https://technocratsdigimate.com"),
  title: "Technocrats Digimate | Diagnostic Growth Audit",
  description:
    "Diagnostic audit funnels for real estate and study abroad businesses running paid ads without enough qualified leads.",
  icons: {
    icon: "/assets/brand/favicon.png.svg"
  }
};

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <script
          dangerouslySetInnerHTML={{
            __html: `(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src='https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);})(window,document,'script','dataLayer','GTM-T55Z3JH6');`
          }}
        />
        <noscript>
          <iframe
            src="https://www.googletagmanager.com/ns.html?id=GTM-T55Z3JH6"
            height="0"
            width="0"
            style={{ display: "none", visibility: "hidden" }}
          />
        </noscript>
        <TrackingScripts />
        {children}
        <CookieConsentBanner />
      </body>
    </html>
  );
}
