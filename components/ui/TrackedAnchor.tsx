"use client";

import { trackEvent } from "@/lib/tracking";
import { type ReactNode } from "react";

type Props = {
  href: string;
  children: ReactNode;
  className?: string;
  target?: string;
  rel?: string;
  /** Location label fired as trackEvent("whatsapp_click", { location }) */
  trackLocation: string;
};

/**
 * Thin client wrapper around <a> that fires a whatsapp_click conversion event
 * on click. Use this in Server Component pages where a plain <a> can't fire
 * tracking — import TrackedAnchor, pass the custom href and trackLocation.
 */
export function TrackedAnchor({
  href,
  children,
  className,
  target,
  rel,
  trackLocation,
}: Props) {
  return (
    <a
      href={href}
      className={className}
      target={target}
      rel={rel}
      onClick={() => trackEvent("whatsapp_click", { location: trackLocation })}
    >
      {children}
    </a>
  );
}
