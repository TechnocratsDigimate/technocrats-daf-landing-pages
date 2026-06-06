"use client";

import { trackEvent } from "@/lib/tracking";

type Props = {
  href: string;
  download?: string;
  target?: string;
  rel?: string;
  className?: string;
  children: React.ReactNode;
  eventName: "pdf_download" | "resource_preview_click";
  resource: string;
  page?: string;
};

/**
 * Drop-in replacement for <a> when you need a tracked PDF download or preview link.
 * Fires trackEvent on click — consent-gated, no change to href / download / target / rel.
 */
export function TrackedPdfLink({
  href,
  download,
  target,
  rel,
  className,
  children,
  eventName,
  resource,
  page,
}: Props) {
  return (
    <a
      href={href}
      download={download}
      target={target}
      rel={rel}
      className={className}
      onClick={() => trackEvent(eventName, { resource, ...(page ? { page } : {}) })}
    >
      {children}
    </a>
  );
}
