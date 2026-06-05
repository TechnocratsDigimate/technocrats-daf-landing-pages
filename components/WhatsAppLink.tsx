"use client";

import { trackEvent, trackWhatsAppClicked } from "@/lib/tracking";

type WhatsAppLinkProps = {
  label?: string;
  source: string;
  className?: string;
  funnelType?: string;
};

export function WhatsAppLink({ label = "Chat on WhatsApp", source, className, funnelType }: WhatsAppLinkProps) {
  const whatsappNumber = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER;
  const href = whatsappNumber
    ? `https://wa.me/${whatsappNumber.replace(/\D/g, "")}?text=${encodeURIComponent("I want to book a diagnostic growth audit.")}`
    : "/thank-you#whatsapp-setup";

  return (
    <a
      className={className}
      href={href}
      onClick={() => {
        trackWhatsAppClicked(source, funnelType);
        trackEvent("whatsapp_click", { location: source });
      }}
      rel="noreferrer"
      target={whatsappNumber ? "_blank" : undefined}
    >
      {label}
    </a>
  );
}
