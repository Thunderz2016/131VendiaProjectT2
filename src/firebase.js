// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { getFirestore, doc, getDoc } from "firebase/firestore";
import { useEffect, useState } from "react";

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

// ... (other imports and initializations)

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

const auth = getAuth(app);

let currentUserEmail = null;
let currentUserId = null;

onAuthStateChanged(auth, async (user) => {
  if (user) {
      currentUserEmail = user.email;
      currentUserId = user.uid;
      const role = await getUserRole(user.email);
  }
}, (error) => {
  console.error("Error in onAuthStateChanged:", error);
});

const fetchDataFromSubcollection = async (userEmail, subcollectionName, documentId) => {
  try {
      const docRef = doc(db, 'users', userEmail, "users", documentId);
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
          return docSnap.data();
      } else {
          console.error("No such document!");
          return null;
      }
  } catch (error) {
      console.error("Error fetching data:", error);
      return null;
  }
};

const getUserRole = async (Email) => {
  try {
      const userRef = doc(db, "users", Email); // Assuming you have a "users" collection and user's Email as the document ID
      const userSnap = await getDoc(userRef);

      if (userSnap.exists()) {
          return userSnap.data().role; // Assuming you store the role in a field named "role"
      } else {
          console.error("No such user!");
          return null;
      }
  } catch (error) {
      console.error("Error fetching user role:", error);
      return null;
  }
};

const YourComponent = () => {
  const [role, setRole] = useState(null); // Define state variable and setter

  useEffect(() => {
    if (currentUserEmail) {
        const fetchUserRole = async () => {
            const userDoc = doc(db, 'users', currentUserEmail);
            const userDocSnap = await getDoc(userDoc);

            if (userDocSnap.exists()) {
                const userData = userDocSnap.data();
                setRole(userData.role);
            }
        };

        fetchUserRole();
    }
  }, [currentUserEmail]);

  // ... rest of your component ...
}

export { auth, currentUserEmail, getUserRole, currentUserId, app, db };



{/*
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const docRef = doc(db, 'users', userEmail, 'someSubcollection', documentId);

const auth = getAuth(app);

let currentUserEmail = null;
let currentUserId = null;

onAuthStateChanged(auth, async (user) => {
  if (user) {
      currentUserEmail = user.email;
      currentUserId = user.uid;
      const role = await getUserRole(user.email);
  }
}, (error) => {
  console.error("Error in onAuthStateChanged:", error);
});

const YourComponent = () => {
  const [role, setRole] = useState(null); // Define state variable and setter

  useEffect(() => {
    if (currentUserEmail) {
        const fetchUserRole = async () => {
            const userDoc = doc(db, 'users', currentUserEmail);
            const userDocSnap = await getDoc(userDoc);

            if (userDocSnap.exists()) {
                const userData = userDocSnap.data();
                setRole(userData.role);
            }
        };

        fetchUserRole();
    }
}, [currentUserEmail]);

const fetchDataFromSubcollection = async (userEmail, subcollectionName, documentId) => {
  try {
      const docRef = doc(db, 'users', userEmail, subcollectionName, documentId);
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
          return docSnap.data();
      } else {
          console.error("No such document!");
          return null;
      }
  } catch (error) {
      console.error("Error fetching data:", error);
      return null;
  }
};

const getUserRole = async (Email) => {
  try {
      const userRef = doc(db, "users", Email); // Assuming you have a "users" collection and user's Email as the document ID
      const userSnap = await getDoc(userRef);

      if (userSnap.exists()) {
          return userSnap.data().role; // Assuming you store the role in a field named "role"
      } else {
          console.error("No such user!");
          return null;
      }
  } catch (error) {
      console.error("Error fetching user role:", error);
      return null;
  }
};
}

export { auth, currentUserEmail, getUserRole, currentUserId};
export { app, db };
*/}