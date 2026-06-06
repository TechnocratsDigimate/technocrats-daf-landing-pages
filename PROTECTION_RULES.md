# TECHNOCRATS DIGIMATE — PROTECTION RULES
Last updated: 2026-06-06

## FULLY PROTECTED PAGES — NEVER MODIFY

These two pages are LIVE, generating real business leads daily.

  app/real-estate-growth-audit/page.tsx
  app/study-abroad-growth-audit/page.tsx

## WHAT "NEVER MODIFY" MEANS

- Do not open these files to edit anything
- Do not refactor, rename, or move them
- Do not change their imports
- Do not extract logic from them into new files
- Do not copy code from them into new pages
- Do not import anything FROM these directories into other files
- The only permitted operation is READ (for reference only)

If any Claude Code task, script, or developer action
accidentally modifies these files:
  1. Run: git diff app/real-estate-growth-audit/
  2. Run: git diff app/study-abroad-growth-audit/
  3. If changes found: git checkout -- app/real-estate-growth-audit/
                       git checkout -- app/study-abroad-growth-audit/
  4. Run a full QA of both pages immediately after restoring.

## SHARED FILES — ADDITIVE CHANGES ONLY

These files are used by the protected pages AND by new pages.
Any change must be purely additive. Never remove or rename
anything that already exists.

| File                              | Allowed changes                                 |
|-----------------------------------|-------------------------------------------------|
| components/BrandHeader.tsx        | New props with defaults, new nav elements       |
| components/Footer.tsx             | New links, new sections — never remove existing |
| components/WhatsAppLink.tsx       | New optional props with defaults only           |
| lib/tracking.ts                   | Append to ConversionEventName type only         |
| lib/funnel-data.ts                | New exports OK — never change existing exports  |

## DO NOT TOUCH AT ALL

These shared files are used by protected pages and are NOT
needed by any new page. Leave them completely alone.

  components/FunnelPage.tsx
  components/MultiStepAuditForm.tsx

## VERIFICATION STEPS AFTER ANY SHARED FILE CHANGE

After editing BrandHeader, Footer, WhatsAppLink, tracking.ts,
or funnel-data.ts, run ALL of the following before committing:

  1. git diff app/real-estate-growth-audit/
     → Expected: no output

  2. git diff app/study-abroad-growth-audit/
     → Expected: no output

  3. npm run build
     → Expected: exits with code 0, no TypeScript errors

  4. Visit /real-estate-growth-audit in the browser
     → Confirm: page loads, form is visible, submit works

  5. Visit /study-abroad-growth-audit in the browser
     → Confirm: page loads, form is visible, submit works

## HOW TO ADD A NEW PAGE SAFELY

  1. Create app/[page-name]/ folder
  2. Create app/[page-name]/page.tsx (Server Component)
  3. Export metadata: Metadata with title + description
  4. Import BrandHeader and Footer — render both
  5. Apply pt-28 to <main> (absolute header offset)
  6. Apply bg-ink to <main>
  7. Wrap content in mx-auto max-w-[1320px]
  8. Use only existing Tailwind tokens
  9. Extract interactive parts to a 'use client' component
  10. New form: POST to /api/leads with niche+page+answers shape
  11. New tracking events: append to ConversionEventName type
      (show change + get approval before editing tracking.ts)
  12. Run: npm run build
  13. Run: git diff on protected pages — must show no changes

## ENVIRONMENT VARIABLE RULES

  LEAD_WEBHOOK_URL       → SERVER ONLY. Never prefix NEXT_PUBLIC_.
                           Never log it. Never send to browser.
  .env.local             → Never commit. Already in .gitignore.
  All NEXT_PUBLIC_ vars  → Safe for browser. Still never hardcode.

## APPROVED BY

Gautam Punj — Technocrats Digimate Pvt Ltd
