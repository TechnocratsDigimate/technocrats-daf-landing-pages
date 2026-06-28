import { NextRequest, NextResponse } from "next/server";
import { getOtp, incrementAttempts, deleteOtp } from "@/lib/otpStore";

export async function POST(request: NextRequest) {
  const body = await request.json() as { phone?: string; otp?: string };
  const phone = (body.phone ?? "").replace(/\D/g, "").slice(-10);
  const otp = (body.otp ?? "").trim();

  if (!phone || !otp) {
    return NextResponse.json({ ok: false, message: "Phone and OTP are required." }, { status: 400 });
  }

  const entry = getOtp(phone);

  if (!entry) {
    return NextResponse.json({ ok: false, message: "OTP expired or not found. Please request a new one." }, { status: 400 });
  }

  if (Date.now() > entry.expiry) {
    deleteOtp(phone);
    return NextResponse.json({ ok: false, message: "OTP has expired. Please request a new one." }, { status: 400 });
  }

  if (entry.attempts >= 5) {
    deleteOtp(phone);
    return NextResponse.json({ ok: false, message: "Too many incorrect attempts. Please request a new OTP." }, { status: 400 });
  }

  if (entry.otp !== otp) {
    incrementAttempts(phone);
    return NextResponse.json({ ok: false, message: "Incorrect OTP. Please try again." }, { status: 400 });
  }

  deleteOtp(phone);
  return NextResponse.json({ ok: true });
}
