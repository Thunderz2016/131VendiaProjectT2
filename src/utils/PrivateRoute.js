import '../App.css';
import {Demo} from "../components/Demo";
import Login from '../components/login';
import Register from '../components/register';
import AuthDetails from '../components/AuthDetails';
import ProtectedRoutes from './PrivateRoute';
import React from 'react';
import {BrowserRouter as Router, Route, Routes} from 'react-router-dom';
import DeviceOne from '../page-device/DeviceOne';
import DeviceTwo from '../page-device/DeviceTwo';
import DeviceThree from '../page-device/DeviceThree';
import DeviceFour from '../page-device/DeviceFour';

function App() {
  return (
    <div className="App">
      <Router>
        <Routes>

          <Route element={<ProtectedRoutes/>}>
           
            <Route element={<Login />} path='/login'/>
            <Route element={<Register/>} path="/register" />
            
          </Route>
          
          <Route element={<DeviceOne/>} path="/DeviceOne" />
          <Route element={<DeviceTwo/>} path="/DeviceTwo" />
          <Route element={<DeviceThree/>} path="/DeviceThree" />
          <Route element={<DeviceFour/>} path="/DeviceFour" />

        </Routes>
      </Router>
    </div>
  );
}

export default App