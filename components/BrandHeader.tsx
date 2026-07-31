"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

const NAV_LINKS = [
  { label: "Services", href: "/services/performance-marketing-lead-generation" },
  { label: "Learning Hub", href: "/blog" },
  { label: "Resources", href: "/resources" },
  { label: "Courses", href: "/courses" }
];

function BrandWordmark() {
  return (
    <span className="flex items-center gap-3">
      <span aria-hidden="true" className="grid h-9 w-9 place-items-center rounded-lg bg-signal text-sm font-black text-white">TD</span>
      <span className="leading-none">
        <span className="block text-sm font-black tracking-tight text-ink">Technocrats</span>
        <span className="mt-1 block text-[10px] font-bold uppercase tracking-[0.2em] text-slate">Digimate</span>
      </span>
    </span>
  );
}

export function BrandHeader() {
  const pathname = usePathname();
  const [menuOpen, setMenuOpen] = useState(false);
  const [consentActive, setConsentActive] = useState(false);

  useEffect(() => {
    function handleConsentVisibility(event: Event) {
      const visible = (event as CustomEvent<{ visible?: boolean }>).detail?.visible === true;
      setConsentActive(visible);
      if (visible) setMenuOpen(false);
    }

    window.addEventListener("td-consent-visibility-changed", handleConsentVisibility);
    return () => window.removeEventListener("td-consent-visibility-changed", handleConsentVisibility);
  }, []);

  useEffect(() => {
    if (!menuOpen) return;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    window.dispatchEvent(new CustomEvent("td-mobile-menu-visibility-changed", { detail: { visible: true } }));

    function closeWithEscape(event: KeyboardEvent) {
      if (event.key === "Escape") setMenuOpen(false);
    }

    window.addEventListener("keydown", closeWithEscape);
    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", closeWithEscape);
      window.dispatchEvent(new CustomEvent("td-mobile-menu-visibility-changed", { detail: { visible: false } }));
    };
  }, [menuOpen]);

  return (
    <header className="sticky top-0 z-40 border-b border-line bg-white/95 backdrop-blur">
      <div className="mx-auto flex min-h-[72px] max-w-[1240px] items-center justify-between px-5 md:px-8">
        <Link aria-label="Technocrats Digimate home" className="min-h-11 py-1" href="/"><BrandWordmark /></Link>
        <nav aria-label="Primary navigation" className="hidden items-center gap-7 md:flex">
          {NAV_LINKS.map((link) => {
            const active = pathname === link.href || pathname.startsWith(`${link.href}/`);
            return (
              <Link className={`min-h-11 border-b-2 px-1 py-3 text-sm font-bold transition ${active ? "border-signal text-ink" : "border-transparent text-slate hover:text-ink"}`} href={link.href} key={link.href}>
                {link.label}
              </Link>
            );
          })}
        </nav>
        <div className="flex items-center gap-2">
          <Link className="hidden min-h-11 items-center rounded-lg bg-signal px-5 text-sm font-bold text-white transition hover:bg-signal-dark md:inline-flex" data-cta-id="header-growth-audit" href="/free-growth-audit">
            Book a Growth Audit
          </Link>
          <button
            aria-controls="mobile-navigation"
            aria-expanded={menuOpen}
            aria-label={menuOpen ? "Close menu" : "Open menu"}
            className="grid h-11 w-11 place-items-center rounded-lg border border-line text-ink disabled:cursor-not-allowed disabled:opacity-40 md:hidden"
            disabled={consentActive}
            onClick={() => setMenuOpen((open) => !open)}
            type="button"
          >
            <span aria-hidden="true" className="text-xl">{menuOpen ? "\u00D7" : "\u2630"}</span>
          </button>
        </div>
      </div>
      {menuOpen && (
        <nav aria-label="Mobile navigation" className="border-t border-line bg-white px-5 pb-5 md:hidden" id="mobile-navigation">
          <div className="mx-auto max-w-[1240px] pt-3">
            {NAV_LINKS.map((link) => (
              <Link className="flex min-h-12 items-center border-b border-line text-base font-bold text-ink" href={link.href} key={link.href} onClick={() => setMenuOpen(false)}>{link.label}</Link>
            ))}
            <Link className="mt-4 flex min-h-12 items-center justify-center rounded-lg bg-signal px-5 font-bold text-white" data-cta-id="mobile-header-growth-audit" href="/free-growth-audit" onClick={() => setMenuOpen(false)}>Book a Growth Audit</Link>
          </div>
        </nav>
      )}
    </header>
  );
}
