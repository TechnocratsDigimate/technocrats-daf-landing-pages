"use client";

import { openCookiePreferences } from "@/lib/tracking";

export function CookiePreferencesLink() {
  return (
    <button
      className="w-fit rounded-md border border-white/10 px-4 py-2 font-medium text-gold transition hover:border-gold/40 hover:text-gold-soft"
      onClick={openCookiePreferences}
      type="button"
    >
      Cookie Preferences
    </button>
  );
}
