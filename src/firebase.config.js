// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getFirestore} from 'firebase/firestore'

const firebaseConfig = {
  apiKey: "AIzaSyDxrrYj9auUDN4eYd4xacD1WEeAoyGVUJM",
  authDomain: "house-market-app-ottawa.firebaseapp.com",
  projectId: "house-market-app-ottawa",
  storageBucket: "house-market-app-ottawa.appspot.com",
  messagingSenderId: "362590643214",
  appId: "1:362590643214:web:94dc32ebeec1104686485f"
};

// Initialize Firebase
initializeApp(firebaseConfig)
export const db = getFirestore()