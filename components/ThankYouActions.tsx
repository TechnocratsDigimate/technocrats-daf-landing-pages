"use client";

import { trackBookingClicked, trackEvent, trackWhatsAppClicked } from "@/lib/tracking";
import { WhatsAppLink } from "@/components/WhatsAppLink";

const whatsappNumber = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER;

function buildWhatsAppHref(message: string) {
  if (!whatsappNumber) return "/thank-you#whatsapp-setup";
  const cleaned = whatsappNumber.replace(/\D/g, "");
  return `https://wa.me/${cleaned}?text=${encodeURIComponent(message)}`;
}

export function ThankYouActions({ niche, name }: { niche: string; name?: string }) {
  const bookingUrl = process.env.NEXT_PUBLIC_BOOKING_URL;

  const fallbackHref = buildWhatsAppHref("I want to confirm my diagnostic audit slot.");

  const nicheMessage =
    niche === "Study Abroad"
      ? "Hi Technocrats Digimate, I have submitted my Study Abroad Growth Audit form. Please confirm my audit slot."
      : "Hi Technocrats Digimate, I have submitted my Real Estate Growth Audit form. Please confirm my audit slot.";
  const confirmationMessage = name ? `${nicheMessage} My name is ${name}.` : nicheMessage;
  const confirmationHref = buildWhatsAppHref(confirmationMessage);

  return (
    <div className="mt-8 grid gap-4 lg:grid-cols-[1fr_0.7fr]">
      <div className="rounded-md border border-white/12 bg-panel p-5 md:p-6">
        <div className="flex items-center justify-between gap-4">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.22em] text-gold">Booking</p>
            <h2 className="mt-3 text-2xl font-semibold text-white">Want to move faster? Book your audit call now →</h2>
            <p className="mt-1.5 text-sm leading-6 text-slate-500">Pick a time that works — we&apos;ll have looked at your setup before the call.</p>
          </div>
        </div>

        {bookingUrl ? (
          <iframe
            className="mt-6 h-[620px] w-full rounded-md border border-white/10 bg-white"
            src={bookingUrl}
            title="Audit booking calendar"
          />
        ) : (
          <div className="mt-6 rounded-md border border-gold/30 bg-gold/10 p-5 text-gold-soft">
            Booking calendar area. Add `NEXT_PUBLIC_BOOKING_URL` in `.env.local` to show your Calendly, TidyCal, or Google Calendar booking page here.
          </div>
        )}

        <div className="mt-5 rounded-md border border-white/10 bg-white/[0.035] p-4 text-center">
          <p className="text-sm leading-6 text-slate-300">
            If the calendar does not load, message us on WhatsApp and we&apos;ll confirm your audit slot manually.
          </p>
          <a
            className="mt-4 inline-block rounded-md bg-gold px-5 py-3 font-semibold text-ink transition hover:bg-gold-soft"
            href={fallbackHref}
            onClick={() => {
              trackWhatsAppClicked("booking_fallback", niche);
              trackEvent("whatsapp_click", { location: "booking_fallback" });
            }}
            rel="noreferrer"
            target={whatsappNumber ? "_blank" : undefined}
          >
            Confirm Slot on WhatsApp
          </a>
        </div>
      </div>

      <aside className="rounded-md border border-gold/25 bg-gold/10 p-5 md:p-6">
        <p className="text-sm font-semibold uppercase tracking-[0.22em] text-gold">WhatsApp</p>
        <h2 className="mt-3 text-2xl font-semibold text-white">Prefer to share details over WhatsApp? Message us here →</h2>
        <p className="mt-4 leading-7 text-slate-300">
          Send your website or ad account and we&apos;ll take a look.
        </p>
        <a
          className="mt-6 block rounded-md bg-gold px-5 py-3 text-center font-semibold text-ink transition hover:bg-gold-soft"
          href={confirmationHref}
          onClick={() => {
            trackWhatsAppClicked("post_submit_confirmation", niche);
            trackEvent("whatsapp_click", { location: "post_submit_confirmation" });
          }}
          rel="noreferrer"
          target={whatsappNumber ? "_blank" : undefined}
        >
          Confirm on WhatsApp
        </a>
        {bookingUrl ? (
          <a
            className="mt-3 block rounded-md border border-gold/40 px-5 py-3 text-center font-semibold text-gold transition hover:border-gold hover:bg-gold/10"
            href={bookingUrl}
            onClick={() => trackBookingClicked("thank-you", niche)}
            rel="noreferrer"
            target="_blank"
          >
            Open Booking Page
          </a>
        ) : (
          <p className="mt-5 text-sm leading-6 text-slate-400" id="whatsapp-setup">
            Add `NEXT_PUBLIC_WHATSAPP_NUMBER` and `NEXT_PUBLIC_BOOKING_URL` before launch.
          </p>
        )}
        <div className="mt-5 border-t border-white/10 pt-5">
          <WhatsAppLink
            className="block rounded-md border border-gold/40 px-5 py-3 text-center font-semibold text-gold transition hover:border-gold hover:bg-gold/10"
            funnelType={niche}
            label="Ask a question on WhatsApp"
            source="thank-you"
          />
        </div>
      </aside>
    </div>
  );
}
