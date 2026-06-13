import type { Metadata } from "next";
import { CookieConsentBanner } from "@/components/CookieConsentBanner";
import { TrackingScripts } from "@/components/TrackingScripts";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL("https://technocratsdigimate.com"),
  title: {
    template: "%s | Technocrats Digimate",
    default: "Technocrats Digimate | Performance Marketing & Lead Generation Agency"
  },
  description:
    "Technocrats Digimate builds predictable lead-generation systems for real estate and study abroad businesses using Meta Ads, Google Ads, landing pages, and CRM tracking.",
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true
    }
  },
  twitter: {
    card: "summary_large_image",
    title: "Technocrats Digimate | Performance Marketing & Lead Generation Agency",
    description:
      "Predictable lead-generation systems for real estate & study abroad businesses. Meta Ads, Google Ads, landing pages, tracking, WhatsApp follow-up."
  },
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
        <TrackingScripts />
        {children}
        <CookieConsentBanner />
      </body>
    </html>
  );
}
