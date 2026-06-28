import { initializeApp, getApps } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: "technocrats-digimate.firebaseapp.com",
  projectId: "technocrats-digimate",
  storageBucket: "technocrats-digimate.firebasestorage.app",
  messagingSenderId: "531405439042",
  appId: "1:531405439042:web:409e37c37e288d974ceddb",
  measurementId: "G-58T165Y07M",
};

const app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApps()[0];
export const auth = getAuth(app);
