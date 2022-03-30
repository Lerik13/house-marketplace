// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getFirestore} from 'firebase/firestore';

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBywUFPiuoo6N-kOVn33b1kl_RUzR7MWSM",
  authDomain: "house-marketplace-e0e76.firebaseapp.com",
  projectId: "house-marketplace-e0e76",
  storageBucket: "house-marketplace-e0e76.appspot.com",
  messagingSenderId: "972693109843",
  appId: "1:972693109843:web:e0ea3190ff88f87ece1aa6"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db  = getFirestore()