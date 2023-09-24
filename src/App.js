import logo from './logo.svg';
import './App.css';
import Login from './components/login';
import Register from './components/register';
import AuthDetails from './components/AuthDetails';
import { Auth } from 'firebase/auth';
import { Route, Routes } from 'react-router-dom';
import Demo from './components/Demo';
import { BrowserRouter } from 'react-router-dom';

function App() {
  return (
    <div className="App">
      <h1>
        Firebase Auth
      </h1>
      {/* <onAuthStateChanged> */}
        <Routes>
          <Route path='/login' element={<Login />} />
          <Route path='/register' element={<Register />} />
          <Route path='/demo' element={<Demo />} />

        </Routes>
      {/* </onAuthStateChanged> */}
    </div>
  );
}

export default App;