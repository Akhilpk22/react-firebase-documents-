// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyAiN1fPh0LPQlloZ8w2CoC_b_gKdV_YUkA",
  authDomain: "documentdb-4aba6.firebaseapp.com",
  projectId: "documentdb-4aba6",
  storageBucket: "documentdb-4aba6.appspot.com",
  messagingSenderId: "928631842847",
  appId: "1:928631842847:web:db3865188fa10550058d2a",
  measurementId: "G-6J5TXB2L8F"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const database = getFirestore(app)
