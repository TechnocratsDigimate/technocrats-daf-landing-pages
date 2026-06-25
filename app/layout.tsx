import type { Metadata } from "next";
import { GoogleTagManager } from "@next/third-parties/google";
import { CookieConsentBanner } from "@/components/CookieConsentBanner";
import { ConsentAwareTracking } from "@/components/ConsentAwareTracking";
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
      <GoogleTagManager gtmId="GTM-T55Z3JH6" />
      <body>
        <ConsentAwareTracking />
        {children}
        <CookieConsentBanner />
      </body>
    </html>
  );
}
