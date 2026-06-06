"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";

const NAV_LINKS = [
  { label: "Services",     href: "/#services" },
  { label: "Case Studies", href: "/#proof" },
  { label: "Resources",    href: "/performance-marketing-survival-kit" },
];

const CTA = { label: "Book Free Audit", href: "/free-growth-audit" };

export function BrandHeader() {
  const pathname = usePathname();
  const [menuOpen, setMenuOpen] = useState(false);

  function isActive(href: string) {
    return pathname === href;
  }

  function closeMenu() {
    setMenuOpen(false);
  }

  return (
    <header className="absolute left-0 right-0 top-0 z-20 border-b border-white/10 bg-ink/82 backdrop-blur-xl">
      {/* ── Main bar ────────────────────────────────────────────────────── */}
      <div className="mx-auto flex min-h-[72px] max-w-[1320px] items-center justify-between px-5 py-3 md:min-h-[82px] md:px-8 lg:px-10">

        {/* Logo */}
        <Link href="/" onClick={closeMenu}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            alt="Technocrats Digimate"
            className="h-9 w-auto shrink-0 sm:h-10 md:h-11"
            src="/assets/brand/wide-logo.svg"
          />
        </Link>

        {/* Desktop nav */}
        <nav className="hidden items-center gap-1 md:flex" aria-label="Main navigation">
          {NAV_LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={`group relative px-3.5 py-2 text-sm font-medium transition-colors duration-200 ${
                isActive(link.href) ? "text-gold" : "text-slate-400 hover:text-white"
              }`}
            >
              {link.label}
              {/* Sliding underline */}
              <span
                className={`absolute inset-x-3.5 bottom-0 h-px bg-gold transition-all duration-300 ${
                  isActive(link.href) ? "opacity-100" : "opacity-0 group-hover:opacity-60"
                }`}
              />
            </Link>
          ))}
        </nav>

        {/* Desktop CTA + mobile hamburger */}
        <div className="flex items-center gap-3">
          {/* CTA — desktop only */}
          <Link
            href={CTA.href}
            className="hidden rounded-md bg-gold px-4 py-2 text-sm font-semibold text-ink transition-all duration-200 hover:bg-gold-soft hover:shadow-[0_0_16px_rgba(214,168,79,0.3)] md:inline-block"
          >
            {CTA.label} →
          </Link>

          {/* Hamburger — mobile only */}
          <button
            type="button"
            aria-label={menuOpen ? "Close menu" : "Open menu"}
            aria-expanded={menuOpen}
            onClick={() => setMenuOpen((o) => !o)}
            className="flex h-9 w-9 items-center justify-center rounded-md border border-white/10 text-slate-400 transition-colors duration-200 hover:border-white/25 hover:text-white md:hidden"
          >
            {/* Hamburger / close icon */}
            <svg
              className={`h-5 w-5 transition-transform duration-300 ${menuOpen ? "rotate-90" : "rotate-0"}`}
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              {menuOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5M3.75 17.25h16.5" />
              )}
            </svg>
          </button>
        </div>
      </div>

      {/* ── Mobile menu ──────────────────────────────────────────────────── */}
      <div
        className={`overflow-hidden border-b border-white/10 bg-ink/95 backdrop-blur-xl transition-all duration-300 ease-out md:hidden ${
          menuOpen ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
        }`}
        aria-hidden={!menuOpen}
      >
        <nav className="mx-auto max-w-[1320px] px-5 pb-5 pt-2" aria-label="Mobile navigation">
          <ul className="space-y-1">
            {NAV_LINKS.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  onClick={closeMenu}
                  className={`flex items-center justify-between rounded-lg px-4 py-3 text-sm font-medium transition-colors duration-200 ${
                    isActive(link.href)
                      ? "bg-gold/10 text-gold"
                      : "text-slate-300 hover:bg-white/[0.04] hover:text-white"
                  }`}
                >
                  {link.label}
                  {isActive(link.href) && (
                    <span className="h-1.5 w-1.5 rounded-full bg-gold" />
                  )}
                </Link>
              </li>
            ))}
          </ul>

          {/* Mobile CTA */}
          <Link
            href={CTA.href}
            onClick={closeMenu}
            className="mt-3 block rounded-md bg-gold px-4 py-3 text-center text-sm font-semibold text-ink transition-all duration-200 hover:bg-gold-soft"
          >
            {CTA.label} →
          </Link>
        </nav>
      </div>
    </header>
  );
}
