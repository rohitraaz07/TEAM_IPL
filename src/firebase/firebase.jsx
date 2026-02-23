import { initializeApp } from "firebase/app"
import { getAuth } from "firebase/auth"
import { getFirestore } from "firebase/firestore"

const firebaseConfig = {
  apiKey: "AIzaSyD6UOwwaekqwZ1kpOFynfNlPT61klIvpnQ",
  authDomain: "teamipl-4df45.firebaseapp.com",
  projectId: "teamipl-4df45",
  storageBucket: "teamipl-4df45.firebasestorage.app",
  messagingSenderId: "641267263245",
  appId: "1:641267263245:web:3639d118432a15063c3244",
  measurementId: "G-FV7Y7L9PMF"
};
const app = initializeApp(firebaseConfig)

export const auth = getAuth(app)
export const db = getFirestore(app)
