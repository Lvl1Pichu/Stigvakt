// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// Your web app's Firebase configuration
// Replace these with your actual Firebase config values
const firebaseConfig = {
  apiKey: "AIzaSyBcTNIhiZelID2uzED3XIPzaazc6K4dNs0",
  authDomain: "stigvakt-ad307.firebaseapp.com",
  projectId: "stigvakt-ad307",
  storageBucket: "stigvakt-ad307.firebasestorage.app",
  messagingSenderId: "778088096854",
  appId: "1:778088096854:web:58820a14f5a4fda8b147f7",
  measurementId: "G-XV56J71ZJ4"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase Authentication and get a reference to the service
export const auth = getAuth(app);

// Initialize Firestore and get a reference to the service
export const db = getFirestore(app);

export default app;
