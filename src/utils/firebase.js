// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: process.env.FIREBASE,
    authDomain: "blog-d1b44.firebaseapp.com",
    projectId: "blog-d1b44",
    storageBucket: "blog-d1b44.appspot.com",
    messagingSenderId: "294800757221",
    appId: "1:294800757221:web:d48f8d7958c25d75751f0c"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);