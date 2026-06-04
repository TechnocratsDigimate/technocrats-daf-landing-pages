import Link from "next/link";
import { CookiePreferencesLink } from "@/components/CookiePreferencesLink";

export function Footer() {
  return (
    <footer className="border-t border-white/10 bg-ink px-5 py-10 md:px-8 lg:px-10">
      <div className="mx-auto flex max-w-[1320px] flex-col gap-5 text-sm text-slate-400 md:flex-row md:items-center md:justify-between">
        <div>
          <p className="font-semibold text-white">Technocrats Digimate Pvt Ltd</p>
          <p className="mt-2">&copy; {new Date().getFullYear()} All rights reserved.</p>
        </div>
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
          <CookiePreferencesLink />
          <Link
            className="w-fit rounded-md border border-white/10 px-4 py-2 font-medium text-gold transition hover:border-gold/40 hover:text-gold-soft"
            href="/privacy-policy"
          >
            Privacy Policy
          </Link>
        </div>
      </div>
    </footer>
  );
}
