import type { Metadata } from "next";
import { CookieConsentBanner } from "@/components/CookieConsentBanner";
import { TrackingScripts } from "@/components/TrackingScripts";
import "./globals.css";

export const metadata: Metadata = {
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
        <TrackingScripts />
        {children}
        <CookieConsentBanner />
      </body>
    </html>
  );
}
