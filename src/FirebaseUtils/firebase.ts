// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from 'firebase/firestore/lite';
import {getStorage} from "@firebase/storage";

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCftGmZ7sWCwaQs61pmFW05Q34sXDvOZT4",
  authDomain: "loket-127b7.firebaseapp.com",
  projectId: "loket-127b7",
  storageBucket: "loket-127b7.appspot.com",
  messagingSenderId: "412488421997",
  appId: "1:412488421997:web:0cb7cac2c5ef369c2da564",
  measurementId: "G-9FWZYJZDBE"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const storage = getStorage(app);
// const analytics = getAnalytics(app);