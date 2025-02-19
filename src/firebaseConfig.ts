// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {  initializeFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAXDOz0I8idJI-BA0ehxPwA3SCtM2rntZs",
  authDomain: "todo-example-8f0e9.firebaseapp.com",
  projectId: "todo-example-8f0e9",
  storageBucket: "todo-example-8f0e9.firebasestorage.app",
  messagingSenderId: "356451068834",
  appId: "1:356451068834:web:7156bc39b8bef5b59520fb",
  measurementId: "G-V1LMEZ0T3V"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = initializeFirestore(app, {
    experimentalForceLongPolling: true
  })

