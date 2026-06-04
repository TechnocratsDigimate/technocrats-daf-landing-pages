# Assets Required

This file lists every asset, integration, and configuration needed to make the Diagnostic Audit Funnel ready to use for Technocrats Digimate Pvt Ltd. Hosting and domain setup are intentionally excluded for now.

## 1. Brand Assets

- [x] Logo SVG/PNG
  - Current file: `public/assets/brand/logo-white.svg.svg`
- [x] Favicon
  - Current file: `public/assets/brand/favicon.png.svg`
- [ ] Brand colors
  - Current placeholder palette: black/navy background, white text, gold accent
- [ ] Font choices
  - Current placeholder fonts: Inter/system sans-serif
- [ ] Company short description
- [ ] Company address if available
- [x] Business email
  - `gautam.punj@technocratsdigimate.com`
- [x] Business WhatsApp number
  - `919467744000`

## 2. Landing Page Assets

- [ ] Hero section copy
  - Current draft copy is included in the code and can be edited per niche
- [ ] Approved hero visuals
  - Current placeholders:
    - `public/assets/real-estate/real-estate-hero-placeholder.jpg`
    - `public/assets/study-abroad/study-abroad-hero-placeholder.jpg`
- [ ] Real Estate case study
  - Placeholder copy only; no fake numbers are used
- [ ] Study Abroad case study
  - Placeholder copy only; no fake numbers are used
- [ ] Approved case study visuals
  - Current placeholders:
    - `public/assets/case-studies/real-estate-case-study-placeholder.jpg`
    - `public/assets/case-studies/study-abroad-case-study-placeholder.jpg`
- [ ] Approved dashboard screenshot
  - Current placeholder: `public/assets/case-studies/ads-dashboard-placeholder.jpg`
- [ ] Testimonials if available
- [ ] Client logos if available
- [ ] Approved testimonial/client proof visual
  - Current placeholder: `public/assets/testimonials/testimonial-placeholder.jpg`
- [ ] Founder/agency image if available
- [ ] Service icons if needed

Image usage rules:

- Do not copy, download, or reuse images from the Fitelo reference page.
- Do not use random stock images without approval.
- Do not use copyrighted third-party images.
- Replace placeholders only with final approved Technocrats Digimate assets or client-approved proof images.

## 3. Integration Assets

- [x] WhatsApp number
  - Environment variable: `NEXT_PUBLIC_WHATSAPP_NUMBER`
- [x] Booking link: Calendly/TidyCal/Google Calendar
  - Environment variable: `NEXT_PUBLIC_BOOKING_URL`
- [ ] Form destination: Google Sheet, webhook, CRM, or email
  - Server-only environment variable: `LEAD_WEBHOOK_URL`
  - Google Sheet destination recorded in `LEAD_GOOGLE_SHEET_URL`
  - Automatic lead writing still requires a Google Apps Script webhook or CRM webhook URL
- [x] Notification email address
  - Environment variable: `NOTIFICATION_EMAIL`
- [ ] Thank-you page booking embed link
  - Uses `NEXT_PUBLIC_BOOKING_URL` until a dedicated embed URL is provided

## 4. Tracking Assets

- [x] Meta Pixel ID
  - Environment variable: `NEXT_PUBLIC_META_PIXEL_ID`
- [x] GA4 Measurement ID
  - Environment variable: `NEXT_PUBLIC_GA4_ID`
- [x] Google Tag Manager ID
  - Environment variable: `NEXT_PUBLIC_GTM_ID`
- [ ] Conversion event names
  - [ ] `PageView`
  - [ ] `FormStarted`
  - [ ] `StepCompleted`
  - [ ] `LeadSubmitted`
  - [ ] `BookingClicked`
  - [ ] `WhatsAppClicked`

## 5. Legal/Compliance Assets

- [x] Privacy policy link/page
  - Policy page exists at `/privacy-policy`
  - Source document: `https://docs.google.com/document/d/1X9hv6cZrWE5ii9xEuz-pcZ5J7949jvd44Q6s0KAtjYw/edit?tab=t.0`
- [ ] Consent checkbox copy
  - Current placeholder copy is included in the form
- [ ] Terms link if available

## 6. Launch Readiness Checklist

- [ ] Mobile responsive
- [ ] Form validation
- [ ] Lead submission tested
- [ ] Tracking tested
- [ ] Booking link tested
- [ ] WhatsApp click tested
- [ ] Thank-you page tested

## Setup Notes

- Real secrets must be stored in `.env.local`.
- Do not commit production API keys, private webhook URLs, CRM credentials, or private email credentials.
- The app is designed to work with safe placeholders until the missing assets are supplied.
