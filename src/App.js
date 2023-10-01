import React, { useEffect, useState } from 'react';
import { Route, Routes, Navigate } from 'react-router-dom';
import Login from './components/login';
import Register from './components/register';
import Dashboard from './components/Dashboard';
import DeviceOne from './page-device/DeviceOne';
import DeviceTwo from './page-device/DeviceTwo';
import DeviceThree from './page-device/DeviceThree';
import DeviceFour from './page-device/DeviceFour';
import { onAuthStateChanged } from 'firebase/auth'; // Import onAuthStateChanged function
import { auth } from './firebase'; // Import Firebase auth instance

function App() {
  // Initialize the user state
  const [user, setUser] = useState(null);

  useEffect(() => {
    // Listen for changes in authentication state
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        // User is signed in.
        setUser(user);
      } else {
        // No user is signed in.
        setUser(null);
      }
    });

    // Clean up the listener when the component unmounts
    return () => unsubscribe();
  }, []);

  // Determine authentication status based on the user state
  const isAuthenticated = !!user; // true if user is not null, false otherwise

  return (
    <div className="App">
      <Routes>
        {/* Default route, redirects to login if not authenticated */}
        <Route
          element={
            isAuthenticated ? (
              <Navigate to="/dashboard" />
            ) : (
              <Navigate to="/login" />
            )
          }
        />

        <Route path="/" element={<Login />} />
        <Route path="/register" element={<Register />} />

        <Route path="/DeviceOne" element={<DeviceOne />} />
        <Route path="/DeviceTwo" element={<DeviceTwo />} />
        <Route path="/DeviceThree" element={<DeviceThree />} />
        <Route path="/DeviceFour" element={<DeviceFour />} />

        <Route path="/dashboard" element={<Dashboard />} />
      </Routes>
    </div>
  )
}

export default App;