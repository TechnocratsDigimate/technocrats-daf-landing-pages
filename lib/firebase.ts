import type { Auth } from "firebase/auth";

let _auth: Auth | null = null;

export async function getFirebaseAuth(): Promise<Auth> {
  if (_auth) return _auth;
  const { initializeApp, getApps } = await import("firebase/app");
  const { getAuth } = await import("firebase/auth");
  const app =
    getApps().length === 0
      ? initializeApp({
          apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
          authDomain: "technocrats-digimate.firebaseapp.com",
          projectId: "technocrats-digimate",
          storageBucket: "technocrats-digimate.firebasestorage.app",
          messagingSenderId: "531405439042",
          appId: "1:531405439042:web:409e37c37e288d974ceddb",
        })
      : getApps()[0];
  _auth = getAuth(app);
  return _auth;
}
