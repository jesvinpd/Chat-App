// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getFirestore} from 'firebase/firestore';
import { getDatabase } from "firebase/database";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCOwgF03faXuXafUYHZCbHmm7LViNSJQfI",
  authDomain: "dbms-7fe88.firebaseapp.com",
  databaseURL:"https://dbms-7fe88-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "dbms-7fe88",
  storageBucket: "dbms-7fe88.firebasestorage.app",
  messagingSenderId: "1008579309980",
  appId: "1:1008579309980:web:c2672f2d90c7f41c9f9859",
  measurementId: "G-JP1P9BF0GJ",
};
// const firebaseConfig = {
//   apiKey: process.env.REACT_APP_API_KEY,
//   authDomain: process.env.REACT_APP_AUTH_DOMAIN,
//   databaseURL: process.env.REACT_APP_DATA_BASE_URL,
//   projectId: process.env.REACT_APP_PROJECT_ID,
//   storageBucket: process.env.REACT_APP_STORAGE_BUCKET,
//   messagingSenderId: process.env.REACT_APP_MESSAGING_SENDER_ID,
//   appId: process.env.REACT_APP_APP_ID,
//   measurementId: process.env.REACT_APP_MEASUREMENT_ID,
// };

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const database = getDatabase(app);
export const firestore = getFirestore(app);