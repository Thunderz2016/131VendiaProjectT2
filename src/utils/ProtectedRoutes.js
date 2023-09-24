import '../App.css';
import {Demo} from "../components/Demo";
import Login from '../components/login';
import Register from '../components/register';
import AuthDetails from '../components/AuthDetails';
import ProtectedRoutes from '../utils/ProtectedRoutes';
import React from 'react';
import {BrowserRouter as Router, Route, Routes} from 'react-router-dom';

function App() {
  return (
    <div className="App">
      <Router>
        <Routes>

          <Route element={<ProtectedRoutes/>}>
           
            <Route element={<Login />} path='/login'/>
            <Route element={<Register/>} path="/register" />
            
          </Route>
          <Route element={<Demo/>} path="/Demo" />
        </Routes>
      </Router>
    </div>
  );
}

export default App