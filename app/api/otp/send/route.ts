import { NextRequest, NextResponse } from "next/server";
import { setOtp, getOtp } from "@/lib/otpStore";

function generateOtp(): string {
  return Math.floor(100000 + Math.random() * 900000).toString();
}

export async function POST(request: NextRequest) {
  const body = await request.json() as { phone?: string };
  const phone = (body.phone ?? "").replace(/\D/g, "").slice(-10);

  if (!/^[6-9]\d{9}$/.test(phone)) {
    return NextResponse.json({ ok: false, message: "Invalid phone number." }, { status: 400 });
  }

  const existing = getOtp(phone);
  if (existing && Date.now() - existing.sentAt < 30_000) {
    return NextResponse.json({ ok: false, message: "Please wait 30 seconds before requesting another OTP." }, { status: 429 });
  }

  const otp = generateOtp();
  setOtp(phone, otp);

  const apiKey = process.env.FAST2SMS_API_KEY;
  if (!apiKey) {
    return NextResponse.json({ ok: false, message: "SMS service not configured." }, { status: 500 });
  }

  try {
    const res = await fetch(
      `https://www.fast2sms.com/dev/bulkV2?authorization=${apiKey}&variables_values=${otp}&route=otp&numbers=${phone}`,
      { cache: "no-store" }
    );
    const data = await res.json() as { return: boolean; message?: string[] };

    if (!data.return) {
      console.error("[OTP Send] Fast2SMS error:", data);
      return NextResponse.json({ ok: false, message: "Failed to send OTP. Please try again." }, { status: 500 });
    }

    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error("[OTP Send] Fetch error:", err);
    return NextResponse.json({ ok: false, message: "Failed to send OTP. Please try again." }, { status: 500 });
  }
}
