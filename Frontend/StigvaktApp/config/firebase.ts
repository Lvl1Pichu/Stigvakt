// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// Firebase configuration - fallback to direct values for now
const firebaseConfig = {
  apiKey: process.env.REACT_APP_FIREBASE_API_KEY || "AIzaSyBcTNIhiZelID2uzED3XIPzaazc6K4dNs0",
  authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN || "stigvakt-ad307.firebaseapp.com",
  projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID || "stigvakt-ad307",
  storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET || "stigvakt-ad307.firebasestorage.app",
  messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGING_SENDER_ID || "778088096854",
  appId: process.env.REACT_APP_FIREBASE_APP_ID || "1:778088096854:web:58820a14f5a4fda8b147f7",
  measurementId: process.env.REACT_APP_FIREBASE_MEASUREMENT_ID || "G-XV56J71ZJ4"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase Authentication and get a reference to the service
export const auth = getAuth(app);

// Initialize Firestore and get a reference to the service
export const db = getFirestore(app);

export default app;
