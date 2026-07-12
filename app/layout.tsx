import type { Metadata } from "next";
import { CookieConsentBanner } from "@/components/CookieConsentBanner";
import { ConsentAwareTracking } from "@/components/ConsentAwareTracking";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL("https://technocratsdigimate.com"),
  title: "Technocrats Digimate | Diagnostic Growth Audit",
  description:
    "Diagnostic audit funnels for real estate and study abroad businesses running paid ads without enough qualified leads.",
  icons: {
    icon: "/assets/brand/favicon.png.svg",
  },
  openGraph: {
    siteName: "Technocrats Digimate",
    type: "website",
    images: [
      {
        url: "/opengraph-image",
        width: 1200,
        height: 630,
        alt: "Technocrats Digimate — Performance Marketing & Lead Generation",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    site: "@technocratsdigimate",
    images: ["/opengraph-image"],
  },
};

const orgSchema = {
  "@context": "https://schema.org",
  "@type": ["Organization", "LocalBusiness"],
  name: "Technocrats Digimate",
  url: "https://technocratsdigimate.com",
  logo: "https://technocratsdigimate.com/assets/brand/logo-white.svg",
  description: "Performance marketing agency in India specialising in Meta Ads, Google Ads, lead generation, and conversion tracking for Indian businesses.",
  telephone: "+919467744000",
  email: "info@technocratsdigimate.com",
  address: {
    "@type": "PostalAddress",
    addressCountry: "IN",
    addressRegion: "Punjab",
    addressLocality: "Chandigarh",
  },
  areaServed: ["IN"],
  priceRange: "₹₹",
  contactPoint: {
    "@type": "ContactPoint",
    telephone: "+919467744000",
    contactType: "customer support",
    areaServed: "IN",
    availableLanguage: ["English", "Hindi"],
  },
  sameAs: [
    "https://www.instagram.com/technocratsdigimate",
    "https://www.linkedin.com/company/technocratsdigimate",
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(orgSchema) }}
        />
      </head>
      <body>
        <ConsentAwareTracking />
        {children}
        <CookieConsentBanner />
      </body>
    </html>
  );
}
