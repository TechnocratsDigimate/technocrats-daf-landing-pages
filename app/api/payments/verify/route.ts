import { NextRequest, NextResponse } from "next/server";
import crypto from "crypto";

export async function POST(request: NextRequest) {
  const body = await request.json() as {
    razorpay_order_id?: string;
    razorpay_payment_id?: string;
    razorpay_signature?: string;
    slug?: string;
    name?: string;
    phone?: string;
    email?: string;
    amount?: number;
  };

  const { razorpay_order_id, razorpay_payment_id, razorpay_signature, slug, name, phone, email, amount } = body;

  if (!razorpay_order_id || !razorpay_payment_id || !razorpay_signature) {
    return NextResponse.json({ ok: false, message: "Missing payment details." }, { status: 400 });
  }

  const keySecret = process.env.RAZORPAY_KEY_SECRET;
  if (!keySecret) {
    return NextResponse.json({ ok: false, message: "Payment service not configured." }, { status: 500 });
  }

  const expectedSignature = crypto
    .createHmac("sha256", keySecret)
    .update(`${razorpay_order_id}|${razorpay_payment_id}`)
    .digest("hex");

  if (expectedSignature !== razorpay_signature) {
    return NextResponse.json({ ok: false, message: "Payment verification failed." }, { status: 400 });
  }

  // Log the purchase to Google Sheets webhook if configured
  const webhookUrl = process.env.LEAD_WEBHOOK_URL;
  if (webhookUrl) {
    try {
      await fetch(webhookUrl, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          type: "purchase",
          slug,
          name,
          phone,
          email,
          amount,
          razorpay_payment_id,
          razorpay_order_id,
          timestamp: new Date().toISOString(),
        }),
        signal: AbortSignal.timeout(5000),
      });
    } catch {
      // Non-fatal — payment already verified
    }
  }

  return NextResponse.json({ ok: true, paymentId: razorpay_payment_id });
}
