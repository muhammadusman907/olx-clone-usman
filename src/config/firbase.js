import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import {
  getAuth,
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  signInWithEmailAndPassword
} from "firebase/auth";
const firebaseConfig = {
  apiKey: "AIzaSyADW9IPRTobhUj6eZpAeDoiU1ne47IIuiM",
  authDomain: "olx-assigment.firebaseapp.com",
  projectId: "olx-assigment",
  storageBucket: "olx-assigment.appspot.com",
  messagingSenderId: "1037929802416",
  appId: "1:1037929802416:web:78e9e20be5b3b622c9e975",
  measurementId: "G-31Y7MVHWD3",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const auth = getAuth(app);

export {
  auth,
  getAuth,
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  signInWithEmailAndPassword
};