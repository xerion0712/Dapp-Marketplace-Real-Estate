// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getAuth, createUserWithEmailAndPassword} from "firebase/auth";
import {getFirestore} from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDMLlziBcQ0BG7ECf-b2hb1N8MicRqScqQ",
  authDomain: "testing-c3226.firebaseapp.com",
  projectId: "testing-c3226",
  storageBucket: "testing-c3226.appspot.com",
  messagingSenderId: "448269261380",
  appId: "1:448269261380:web:bfca76e103a6e1ecd27a11"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth();
export const db = getFirestore();
