"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

interface RazorpayCheckoutProps {
  slug: string;
  title: string;
  price: number;
}

declare global {
  interface Window {
    Razorpay: new (options: Record<string, unknown>) => { open(): void };
  }
}

function loadRazorpayScript(): Promise<boolean> {
  return new Promise((resolve) => {
    if (document.getElementById("razorpay-script")) { resolve(true); return; }
    const script = document.createElement("script");
    script.id = "razorpay-script";
    script.src = "https://checkout.razorpay.com/v1/checkout.js";
    script.onload = () => resolve(true);
    script.onerror = () => resolve(false);
    document.body.appendChild(script);
  });
}

export function RazorpayCheckout({ slug, title, price }: RazorpayCheckoutProps) {
  const router = useRouter();
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  function validate() {
    const errs: Record<string, string> = {};
    if (!name.trim()) errs.name = "Please enter your name.";
    const ph = phone.replace(/\D/g, "").slice(-10);
    if (!ph || ph.length !== 10 || !/^[6-9]/.test(ph)) errs.phone = "Please enter a valid 10-digit mobile number.";
    setErrors(errs);
    return Object.keys(errs).length === 0;
  }

  async function handlePay() {
    if (!validate()) return;
    setLoading(true);
    setError("");

    try {
      const loaded = await loadRazorpayScript();
      if (!loaded) throw new Error("Could not load payment gateway. Please check your internet connection.");

      const orderRes = await fetch("/api/payments/create-order", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ amount: price, slug }),
      });
      const orderData = await orderRes.json() as { ok: boolean; orderId?: string; message?: string };
      if (!orderData.ok || !orderData.orderId) throw new Error(orderData.message ?? "Could not initiate payment.");

      const keyId = process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID;

      const options = {
        key: keyId,
        amount: price * 100,
        currency: "INR",
        name: "Technocrats Digital",
        description: title,
        order_id: orderData.orderId,
        prefill: {
          name: name.trim(),
          contact: phone.replace(/\D/g, "").slice(-10),
          email: email.trim() || undefined,
        },
        theme: { color: "#d6a84f" },
        handler: async (response: {
          razorpay_order_id: string;
          razorpay_payment_id: string;
          razorpay_signature: string;
        }) => {
          try {
            const verifyRes = await fetch("/api/payments/verify", {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({
                razorpay_order_id: response.razorpay_order_id,
                razorpay_payment_id: response.razorpay_payment_id,
                razorpay_signature: response.razorpay_signature,
                slug,
                name: name.trim(),
                phone: phone.replace(/\D/g, "").slice(-10),
                email: email.trim() || undefined,
                amount: price,
              }),
            });
            const verifyData = await verifyRes.json() as { ok: boolean; message?: string };
            if (!verifyData.ok) throw new Error(verifyData.message ?? "Payment verification failed.");

            const w = window as Window & { fbq?: (...a: unknown[]) => void };
            if (w.fbq) {
              w.fbq("track", "Purchase", { value: price, currency: "INR", content_name: title });
            }

            router.push(`/thank-you/course?slug=${encodeURIComponent(slug)}&name=${encodeURIComponent(name.trim())}`);
          } catch (err) {
            setError(err instanceof Error ? err.message : "Payment verification failed. Please contact us on WhatsApp.");
            setLoading(false);
          }
        },
        modal: {
          ondismiss: () => setLoading(false),
        },
      };

      const rzp = new window.Razorpay(options);
      rzp.open();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong. Please try again.");
      setLoading(false);
    }
  }

  const inputClass =
    "w-full rounded-lg border border-white/10 bg-white/[0.05] px-4 py-3 text-white placeholder-slate-500 outline-none transition focus:border-gold/50 focus:ring-1 focus:ring-gold/30 text-sm";
  const errorClass = "mt-1 text-xs text-red-400";

  return (
    <div className="rounded-2xl border border-gold/20 bg-white/[0.03] p-6">
      <p className="mb-5 text-sm font-semibold uppercase tracking-widest text-gold">Secure Checkout</p>

      <div className="mb-4 space-y-3">
        <div>
          <input
            type="text"
            placeholder="Your name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className={inputClass}
            autoComplete="given-name"
          />
          {errors.name && <p className={errorClass}>{errors.name}</p>}
        </div>

        <div>
          <input
            type="tel"
            placeholder="WhatsApp number (+91)"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            className={inputClass}
            autoComplete="tel"
          />
          {errors.phone && <p className={errorClass}>{errors.phone}</p>}
        </div>

        <div>
          <input
            type="email"
            placeholder="Email (optional)"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className={inputClass}
            autoComplete="email"
          />
        </div>
      </div>

      {error && (
        <p className="mb-4 rounded-lg border border-red-500/20 bg-red-500/10 px-4 py-3 text-sm text-red-400">
          {error}
        </p>
      )}

      <div className="mb-4 flex items-center justify-between rounded-lg bg-white/[0.03] px-4 py-3">
        <span className="text-sm text-slate-400">Total</span>
        <span className="text-xl font-extrabold text-white">₹{price.toLocaleString("en-IN")}</span>
      </div>

      <button
        onClick={handlePay}
        disabled={loading}
        className="w-full rounded-xl bg-gold py-4 text-center font-bold text-ink transition hover:bg-gold-soft disabled:opacity-60"
      >
        {loading ? "Opening payment…" : `Pay ₹${price.toLocaleString("en-IN")} →`}
      </button>

      <p className="mt-3 text-center text-xs text-slate-500">
        Secured by Razorpay · UPI · Cards · Net Banking
      </p>
    </div>
  );
}
