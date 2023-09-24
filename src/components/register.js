// Import necessary dependencies from React and Firebase
import React, { useState } from "react";
import { auth } from "../firebase";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { Link, useNavigate } from "react-router-dom";

function Register() {
// Initialize state variables to store email and password
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  // handle the registration process
  const register = (e) => {
    e.preventDefault(); // Prevent the default form submission behavior

    // Use Firebase's createUserWithEmailAndPassword function to create a user
    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // If registration is successful, log the user credential
        console.log(userCredential);
        navigate('/login');
      })
       // If there's an error during registration, log the error
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <div>
      <h2>Register for a free acoount</h2>
      <form onSubmit={register}> {/* When the form is submitted, call the register function */}

        {/* Input field for entering email */}
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        ></input>

        {/* Input field for entering password */}
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        ></input>

        {/* Submit button for registration */}
        <button type="submit">Register</button>

      </form>
      <p className="py-2">
        Already have an account? <Link to='/login'>Login.</Link>
      </p>

    </div>
  );
}

// Export the Register component for use in other parts of the application
export default Register;