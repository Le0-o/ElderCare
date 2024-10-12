// Import the functions you need from the Firebase SDKs
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore"; // Import Firestore
// import { getAuth } from 'firebase/auth';

// web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDHcUv41kY-QH2HWieOKXuJCTMnS2kitE8",
  authDomain: "eldercare-698b3.firebaseapp.com",
  projectId: "eldercare-698b3",
  storageBucket: "eldercare-698b3.appspot.com",
  messagingSenderId: "92185014377",
  appId: "1:92185014377:web:3ee916aa53754f51a372f8"
  };
// Initialize Firebase
// initializeApp(firebaseConfig);
// Initialize Firestore
// const db = getFirestore(); 
// Export the Firestore instance
// export default db;
const firebaseApp=initializeApp(firebaseConfig)
const db = getFirestore();
// const auth = getAuth();
// console.log('Firebase initialized:', firebaseApp);
export { db,firebaseApp };