import { initializeApp } from 'firebase/app'
import { getAuth } from 'firebase/auth'
import { getFirestore } from 'firebase/firestore'
import { getStorage } from 'firebase/storage'


const firebaseConfig = {
  apiKey: "AIzaSyAVM0ngydbZT0PCUQYSCBqH3DEtwkGMv5o",
  authDomain: "autotrax-ml.firebaseapp.com",
  projectId: "autotrax-ml",
  storageBucket: "autotrax-ml.firebasestorage.app",
  messagingSenderId: "732647089201",
  appId: "1:732647089201:web:264b3389c93704b72ee110",
  measurementId: "G-FB4G5HCGZD"
};


const app = initializeApp(firebaseConfig)

export const auth = getAuth(app)
export const db = getFirestore(app)
export const storage = getStorage(app)