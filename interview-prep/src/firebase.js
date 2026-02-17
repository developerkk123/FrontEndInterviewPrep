// Import the functions you need from the SDKs you need
// import { initializeApp } from "firebase/app";
// import { getAnalytics } from "firebase/analytics";
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth, signInAnonymously } from "firebase/auth";
import { onAuthStateChanged } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBk5C4mmE5ijVk3nu1sr-5VaDMgUawKYl8",
  authDomain: "chat-app-e07d9.firebaseapp.com",
  projectId: "chat-app-e07d9",
  storageBucket: "chat-app-e07d9.firebasestorage.app",
  messagingSenderId: "91920121870",
  appId: "1:91920121870:web:3e9bd466b64cbe37d7bc5f",
  measurementId: "G-16XRSCT7PH"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);




export const db = getFirestore(app)
export const auth = getAuth(app)
// auth check
onAuthStateChanged(auth, (user)=>{
    if(!user){
        signInAnonymously(auth)
    }
})
// signInAnonymously(auth).catch(console.error);
// npm install -g firebase-tools