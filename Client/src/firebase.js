// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "mern-auth-a1164.firebaseapp.com",
  projectId: "mern-auth-a1164",
  storageBucket: "mern-auth-a1164.appspot.com",
  messagingSenderId: "774244206456",
  appId: "1:774244206456:web:f64b646498194486026a8d"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);