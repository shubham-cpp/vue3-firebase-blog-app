// Import the functions you need from the SDKs you need

import { initializeApp } from 'firebase/app'
import { getAuth } from 'firebase/auth'
import { getFirestore } from 'firebase/firestore'
import { getAnalytics } from 'firebase/analytics'

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY, //'AIzaSyDXA_nzU_gcsH-EEGXyKQTLCwXXBUNfQSs',
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN, //'fir-vue-blogs-f7b95.firebaseapp.com',
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID, // 'fir-vue-blogs-f7b95',
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET, // 'fir-vue-blogs-f7b95.appspot.com',
  messagingSenderId: import.meta.env.VITE_FIREBASE_MSG_SENDER_ID, // '572453262235',
  appId: import.meta.env.VITE_FIREBASE_APP_ID, // '1:572453262235:web:b4cfddfbaf99de9ab6073e',
  measurementId: import.meta.env.VITE_FIREBASE_MEASUREMENT_ID // 'G-H3FKT9X6HT'
}

// Initialize Firebase

const app = initializeApp(firebaseConfig)
export const auth = getAuth(app)
export const db = getFirestore(app)

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const analytics = getAnalytics(app)
