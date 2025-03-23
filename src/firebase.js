// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyD_V1_o_1G_d5psBwmA_Q4iSwrkfT66Gts",
  authDomain: "ambulance-tracker-33294.firebaseapp.com",
  databaseURL: "https://ambulance-tracker-33294-default-rtdb.firebaseio.com",
  projectId: "ambulance-tracker-33294",
  storageBucket: "ambulance-tracker-33294.firebasestorage.app",
  messagingSenderId: "1017004249105",
  appId: "1:1017004249105:web:71ad3bf76a29af34c1e1b0",
  measurementId: "G-W6EDVZL527"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const googleProvider = new GoogleAuthProvider();
const db = getFirestore(app);

export { auth, googleProvider, db };