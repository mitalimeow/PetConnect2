import { initializeApp, getApps, getApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY || "AIzaSyBdWNhDkVvY6X0Z9823YhZ2qBW8Hs57eKM",
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN || "petconnect-491321.firebaseapp.com",
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID || "petconnect-491321",
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET || "petconnect-491321.firebasestorage.app",
  messagingSenderId: import.meta.env.VITE_FIREBASE_SENDER_ID || "218392211032",
  appId: import.meta.env.VITE_FIREBASE_APP_ID || "1:218392211032:web:0e8d60605afe55b021242d"
};

let app;
let db;
let auth;

try {
  if (getApps().length === 0) {
    app = initializeApp(firebaseConfig);
  } else {
    app = getApp();
  }
  db = getFirestore(app);
  auth = getAuth(app);
} catch (error) {
  console.error("Firebase Initialization Error:", error);
  db = null;
  auth = null;
}

export { db, auth };

