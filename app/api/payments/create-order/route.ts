import { NextRequest, NextResponse } from "next/server";
import crypto from "crypto";

export async function POST(request: NextRequest) {
  const body = await request.json() as { amount?: number; slug?: string };
  const { amount, slug } = body;

  if (!amount || amount <= 0 || !slug) {
    return NextResponse.json({ ok: false, message: "Invalid order details." }, { status: 400 });
  }

  const keyId = process.env.RAZORPAY_KEY_ID;
  const keySecret = process.env.RAZORPAY_KEY_SECRET;

  if (!keyId || !keySecret) {
    return NextResponse.json({ ok: false, message: "Payment service not configured." }, { status: 500 });
  }

  try {
    const auth = Buffer.from(`${keyId}:${keySecret}`).toString("base64");
    const receiptId = `rcpt_${Date.now().toString().slice(-10)}`;

    const res = await fetch("https://api.razorpay.com/v1/orders", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Basic ${auth}`,
      },
      body: JSON.stringify({
        amount: amount * 100,
        currency: "INR",
        receipt: receiptId,
      }),
      cache: "no-store",
    });

    const data = await res.json() as { id?: string; error?: { description: string } };

    if (!res.ok || !data.id) {
      console.error("[Razorpay] Order creation failed:", data);
      return NextResponse.json(
        { ok: false, message: data.error?.description ?? "Failed to create order." },
        { status: 500 }
      );
    }

    return NextResponse.json({ ok: true, orderId: data.id, amount });
  } catch (err) {
    console.error("[Razorpay] Error:", err);
    return NextResponse.json({ ok: false, message: "Payment service error. Please try again." }, { status: 500 });
  }
}
