// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCFcehXzDR5vIta82dYhoRqbqGjz7zHOsQ",
  authDomain: "scholarship-management-c82d9.firebaseapp.com",
  projectId: "scholarship-management-c82d9",
  storageBucket: "scholarship-management-c82d9.appspot.com",
  messagingSenderId: "896964872873",
  appId: "1:896964872873:web:b1c52ca48378d671eff7b8",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
export default auth;
