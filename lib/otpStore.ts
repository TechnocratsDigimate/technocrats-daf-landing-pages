interface OtpEntry {
  otp: string;
  expiry: number;
  sentAt: number;
  attempts: number;
}

// Module-level Map shared across API routes in the same Node.js process
const otpStore = new Map<string, OtpEntry>();

export function setOtp(phone: string, otp: string) {
  otpStore.set(phone, {
    otp,
    expiry: Date.now() + 10 * 60 * 1000, // 10 min
    sentAt: Date.now(),
    attempts: 0,
  });
}

export function getOtp(phone: string): OtpEntry | undefined {
  return otpStore.get(phone);
}

export function incrementAttempts(phone: string) {
  const entry = otpStore.get(phone);
  if (entry) entry.attempts += 1;
}

export function deleteOtp(phone: string) {
  otpStore.delete(phone);
}
