import logo from './logo.svg';
import AuthDetails from './components/AuthDetails';
import { Auth } from 'firebase/auth';
import { useState } from 'react';

import './App.css';
import { Route, Routes, BrowserRouter } from 'react-router-dom';
import Demo from './components/Demo';
import Login from './components/login';
import Register from './components/register';
import Dashboard from './components/Dashboard';
import RootLayout from './components/RootLayout';
import Account from  './components/Account';

function App() {

  return (

    <div className="App">
      <h1></h1>
      {/* <onAuthStateChanged> */}


      <Routes>
      <Route path="" element={<Login />} />
      <Route path="/register" element={<Register />} />
        <Route path="/" element={<RootLayout />} >
          <Route path="/dashboard" element={<Dashboard />}/>
          <Route path="/demo" element={<Demo />} />
          <Route path="/account" element={<Account />} />
        </Route>
      </Routes>



      {/* </onAuthStateChanged> */}
    </div>
  );
}

export default App;