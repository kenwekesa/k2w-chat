// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getAuth} from 'firebase/auth'
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyAtad2qNtch31G43VlTanuxz0-V_DH-6ck",
    authDomain: "k2w-chat.firebaseapp.com",
    projectId: "k2w-chat",
    storageBucket: "k2w-chat.appspot.com",
    messagingSenderId: "874823110111",
    appId: "1:874823110111:web:574fd385a2754c3823086a",
    measurementId: "G-QFT4D97931"
  };

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

export const auth = getAuth(app)
export const db = getFirestore(app)
export default app 