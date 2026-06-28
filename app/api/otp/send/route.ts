import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  const body = await request.json() as { phone?: string };
  const phone = (body.phone ?? "").replace(/\D/g, "").slice(-10);

  if (!/^[6-9]\d{9}$/.test(phone)) {
    return NextResponse.json({ ok: false, message: "Invalid phone number." }, { status: 400 });
  }

  const apiKey = process.env.TWOFACTOR_API_KEY;
  if (!apiKey) {
    return NextResponse.json({ ok: false, message: "SMS service not configured." }, { status: 500 });
  }

  try {
    const res = await fetch(
      `https://2factor.in/API/V1/${apiKey}/SMS/${phone}/AUTOGEN/OTP1`,
      { cache: "no-store" }
    );
    const data = await res.json() as { Status: string; Details: string };

    if (data.Status !== "Success") {
      console.error("[OTP Send] 2factor error:", data);
      return NextResponse.json({ ok: false, message: "Failed to send OTP. Please try again." }, { status: 500 });
    }

    // Details contains the session_id needed for verification
    return NextResponse.json({ ok: true, sessionId: data.Details });
  } catch (err) {
    console.error("[OTP Send] Fetch error:", err);
    return NextResponse.json({ ok: false, message: "Failed to send OTP. Please try again." }, { status: 500 });
  }
}
