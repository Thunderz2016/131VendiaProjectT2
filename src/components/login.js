// Import necessary dependencies from React and Firebase
import React, { useState } from "react";
import { auth } from "../firebase";
import { signInWithEmailAndPassword } from "firebase/auth";
import { Link, useNavigate } from "react-router-dom";

function Login() {
// Initialize state variables to store email and password
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  // handle the login process
  const login = (e) => {
    e.preventDefault(); // Prevent the default form submission behavior

    // Use Firebase's signInWithEmailAndPassword function to sign in a user
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // If registration is successful, log the user credential
        console.log(userCredential);
        navigate('/Demo'); // to redirect to the demo page, if the login is successful
      })
      // If there's an error during registration, log the error
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <div>
      <h2>Login</h2>
      <form onSubmit={login}>

        {/* Input field for entering login email */}
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
        <button type="submit">Log In</button>

      </form>
      <p className="py-2">
        Don't have an account? <Link to='/register'>Register.</Link>
      </p>
    </div>
  );
}

// Export the Login component for use in other parts of the application
export default Login;