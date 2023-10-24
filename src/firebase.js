// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth, onAuthStateChanged } from "firebase/auth";

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

const app = initializeApp(firebaseConfig);

const auth = getAuth(app);

let currentUserEmail = null;

onAuthStateChanged(auth, (user) => {
  if (user) {
      currentUserEmail = user.email;
  }
});

export { auth, currentUserEmail };