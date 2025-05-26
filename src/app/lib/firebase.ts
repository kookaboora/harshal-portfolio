// lib/firebase.ts
import { initializeApp } from 'firebase/app'
import { getFirestore } from 'firebase/firestore'
import { getAuth } from 'firebase/auth'

const firebaseConfig = {
  apiKey: "AIzaSyAdTE6p3d8He_cawigijwi1evDuAe3OepY",
  authDomain: "harshal-portfolio-de593.firebaseapp.com",
  projectId: "harshal-portfolio-de593",
  storageBucket: "harshal-portfolio-de593.firebasestorage.app",
  messagingSenderId: "125774550349",
  appId: "1:125774550349:web:7eef89ea3af17f66a29304",
  measurementId: "G-ZYBX2NY06Q"
};

const app = initializeApp(firebaseConfig)
export const db = getFirestore(app)
export const auth = getAuth(app)
