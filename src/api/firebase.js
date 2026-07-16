import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyA9Tkr1MEaR9LKsWY0VSBJtjclm-Wyr-Mw",
  authDomain: "tgkk-779af.firebaseapp.com",
  projectId: "tgkk-779af",
  storageBucket: "tgkk-779af.firebasestorage.app",
  messagingSenderId: "922242789105",
  appId: "1:922242789105:web:64f237c9c6af71501f8350"
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db = getFirestore(app);