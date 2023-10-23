import React, { useEffect, useState } from 'react';
import { Route, Routes, Navigate } from 'react-router-dom';
import Login from './components/login';
import Register from './components/register';
import Device from './page-device/Device';
import { onAuthStateChanged } from 'firebase/auth'; // Import onAuthStateChanged function
import { auth } from './firebase'; // Import Firebase auth instance
import NavbarLayout from './components/NavbarLayout';
import DynamicList from './components/DynamicList';
import DeviceUpdate from './page-device/DeviceUpdate';
import DeleteDevice from './page-device/DeleteDevice';
import ListDevice from './page-device/ListDevice';

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
          <Route index element={<Login />} />
          <Route path="/register" element={<Register />} />

          <Route element={<NavbarLayout />}>
           <Route path="/ListDevice" element={<ListDevice />} />
           <Route path="/Device" element={<Device />} />
           <Route path="/DeviceUpdate" element={<DeviceUpdate />} />
           <Route path="/DeleteDevice" element={<DeleteDevice />} />
           <Route path="/dynamicList" element={<DynamicList />} />
           <Route path="/profile" element={<></>}/>
          </Route>

      </Routes>      
    </div>
  )
}

export default App;

