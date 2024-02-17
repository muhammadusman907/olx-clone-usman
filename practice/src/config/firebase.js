import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import {
  getAuth,
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signOut,
} from "firebase/auth";
import {
  getStorage,
  ref,
  uploadBytesResumable,
  getDownloadURL,
} from "firebase/storage";
import {
  getFirestore,
  collection,
  addDoc,
  query,
  where,
  getDocs,
  getDoc,
  doc,
  setDoc,
  serverTimestamp,
  onSnapshot,
  orderBy,
} from "firebase/firestore";
import { getDatabase, set } from "firebase/database";
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
const storage = getStorage();
const db = getFirestore(app);
const database = getDatabase();
export {
  auth,
  getAuth,
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signOut,
  getStorage,
  ref,
  uploadBytesResumable,
  getDownloadURL,
  storage,
  db,
  collection,
  addDoc,
  query,
  where,
  getDoc,
  doc,
  getDocs,
  setDoc,
  serverTimestamp,
  onSnapshot,
  orderBy,
  database,
  set,
};
