import React, { useEffect, useState } from "react";
import { Route, Routes, Navigate, useNavigate } from "react-router-dom";
import Login from "./components/login";
import Register from "./components/register";
import Device from "./page-device/Device";
import { onAuthStateChanged } from "firebase/auth"; // Import onAuthStateChanged function
import { auth } from "./firebase"; // Import Firebase auth instance
import DeviceUpdate from "./page-device/DeviceUpdate";
import DeleteDevice from "./page-device/DeleteDevice";
import ListDevice from "./page-device/ListDevice";
import ListID from "./page-device/ListID";
import OrgCreation from "./Device-Schema/orgCreation";
import NavbarLayout from "./Navbar/NavbarLayout";
import Homepage from "./Device-Schema/Homepage";
import AgGridTable from "./page-device/AgGridTable";
import UniversalSearch from "./components/Search";

function App() {
  // Initialize the user state
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    // Listen for changes in authentication state
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        // User is signed in.
        setUser(user);
        //navigate("/homepage");
      } else {
        // No user is signed in.
        setUser(null);
        navigate("/");
      }
    });
    //console.log(user);

    // Clean up the listener when the component unmounts
    return () => unsubscribe();
  }, []);

  useEffect(() => {
    console.log("auth2 is: ", auth.currentUser);
  }, [user]);

  // Determine authentication status based on the user state
  const isAuthenticated = !!user; // true if user is not null, false otherwise

  return (
    <div className="App">
      <Routes>
        <Route index element={<Login />} />
        <Route path="/register" element={<Register />} />

        {isAuthenticated && (
          <Route element={<NavbarLayout />}>
            <Route path="/ListDevice" element={<ListDevice />} />
            <Route path="/ListID" element={<ListID />} />
            <Route path="/Device" element={<Device />} />
            <Route path="/DeviceUpdate" element={<DeviceUpdate />} />
            <Route path="/DeleteDevice" element={<DeleteDevice />} />
            <Route path="/Homepage" element={<Homepage />} />
            <Route path="/OrgCreation" element={<OrgCreation />} />
            <Route path="/AgGridTable" element={<AgGridTable />} />
            <Route path="/profile" element={<></>} />
            <Route path="/Search" element={<UniversalSearch />} />
          </Route>
        )}
      </Routes>
    </div>
  );
}

export default App;
