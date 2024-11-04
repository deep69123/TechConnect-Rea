// firebase.js
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore"; // Firestore
import { getDatabase } from "firebase/database"; // Realtime Database (if needed)
import { getAuth } from 'firebase/auth';

// Your Firebase configuration object
const firebaseConfig = {
    apiKey: "AIzaSyB5HqR_YX0jWkNpO3v_VWLCf9JwMna__PQ",
    authDomain: "techconnect-e1e16.firebaseapp.com",
    projectId: "techconnect-e1e16",
    storageBucket: "techconnect-e1e16.appspot.com",
    messagingSenderId: "724188834907",
    appId: "1:724188834907:web:42ffe97c2e4aa68f44e37e",
    measurementId: "G-2EV14R5YFT"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);



// Initialize Firestore and Database instances
export const db = getFirestore(app); // Firestore instance
export const realtimeDb = getDatabase(app); // Realtime Database instance (if you use it)
export const auth = getAuth(app);