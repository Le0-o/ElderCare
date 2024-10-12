// Import the functions you need from the Firebase SDKs
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore"; // Import Firestore

// web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyC3eR9acfTRJrY2m3Hq9u7Io2uiWuflWRc",
    authDomain: "week7-chunduo.firebaseapp.com",
    projectId: "week7-chunduo",
    storageBucket: "week7-chunduo.appspot.com",
    messagingSenderId: "554661930452",
    appId: "1:554661930452:web:9df486cc4b79bb69ca6241"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firestore
const db = getFirestore(app); 

// Export the Firestore instance
export default db;
