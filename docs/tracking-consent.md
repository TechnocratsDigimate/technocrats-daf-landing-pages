# Tracking and consent behavior

## Before optional consent

- Essential Next.js application code
- First-party form code
- First-party storage used to remember a consent decision
- No Google Tag Manager
- No Google Analytics 4
- No Meta Pixel
- No HubSpot analytics, advertising pixel, or collected-form tracking
- No AdSense

The application initializes an internal denied consent state before any optional
vendor is loaded.

## After acceptance

- Google Tag Manager loads once.
- The `consent_granted` data-layer event includes granted analytics and
  advertising storage signals.
- Tags configured inside GTM may load according to the container's consent
  rules.
- HubSpot's loader is added once.
- Existing analytics event names remain unchanged.

## After rejection

Optional scripts remain unloaded. If a visitor changes a previous acceptance to
rejection, the page reloads after saving the decision so already-loaded vendor
scripts cannot continue in the current document.

This implementation keeps a future Google-certified CMP integration possible.
It is not itself represented as a Google-certified CMP. AdSense remains absent
and disabled.
