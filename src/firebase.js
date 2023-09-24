// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import firebase from "firebase/app";
import "firebase/auth";
import AuthDetails from "./components/AuthDetails";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCf5aYNEUafpBd64vPxsn3A9bEKlr-G7IQ",
  authDomain: "fire-test-be742.firebaseapp.com",
  projectId: "fire-test-be742",
  storageBucket: "fire-test-be742.appspot.com",
  messagingSenderId: "808774097027",
  appId: "1:808774097027:web:f33547fd0b133338a923b6"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase Authentication and get a reference to the service

const auth = getAuth(app);

export { auth };

