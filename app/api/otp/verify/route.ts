import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  const body = await request.json() as { sessionId?: string; otp?: string };
  const sessionId = (body.sessionId ?? "").trim();
  const otp = (body.otp ?? "").trim();

  if (!sessionId || !otp) {
    return NextResponse.json({ ok: false, message: "Session and OTP are required." }, { status: 400 });
  }

  const apiKey = process.env.TWOFACTOR_API_KEY;
  if (!apiKey) {
    return NextResponse.json({ ok: false, message: "SMS service not configured." }, { status: 500 });
  }

  try {
    const res = await fetch(
      `https://2factor.in/API/V1/${apiKey}/SMS/VERIFY/${sessionId}/${otp}`,
      { cache: "no-store" }
    );
    const data = await res.json() as { Status: string; Details: string };

    if (data.Status !== "Success") {
      return NextResponse.json({ ok: false, message: "Incorrect OTP. Please try again." }, { status: 400 });
    }

    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error("[OTP Verify] Fetch error:", err);
    return NextResponse.json({ ok: false, message: "Verification failed. Please try again." }, { status: 500 });
  }
}
