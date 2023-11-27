// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore/lite";
import { getAuth } from "firebase/auth";
const firebaseConfig = {
  apiKey: "AIzaSyBrOB_1qyfLLs-_c_kGOmImq8pIRKqu59s",
  authDomain: "appbaset-89957.firebaseapp.com",
  projectId: "appbaset-89957",
  storageBucket: "appbaset-89957.appspot.com",
  messagingSenderId: "507621915993",
  appId: "1:507621915993:web:fc1ac8058bebdfb07d6048",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const DB = getFirestore(app);
const auth = getAuth(app);
export { auth, DB };
