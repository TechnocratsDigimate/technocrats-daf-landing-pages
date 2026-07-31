"use client";

import { openCookiePreferences } from "@/lib/tracking";

export function CookiePreferencesLink() {
  return (
    <button
      className="min-h-11 w-fit rounded-md border border-white/15 px-4 py-2 font-medium text-white transition hover:border-signal hover:text-signal"
      onClick={openCookiePreferences}
      type="button"
    >
      Cookie Preferences
    </button>
  );
}
