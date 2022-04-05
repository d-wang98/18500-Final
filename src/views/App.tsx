import React, { useState } from 'react';
import './App.css';
import Button from '@mui/material/Button';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './home';
import Session from './Session';
import Login from './login';
import ConnectDevice from './ConnectDevice';

export default function App() {
  const [state, setState] = useState({
    loggedIn: false,
  });
  const handleLogin = () => {
    console.log('login');
  };

  const handleStartSession = () => {
    console.log('starting paymodoro');
  };

  return (
    <div>
      <Router>
        <Routes>
          {/* @ts-ignore */}
          <Route path="/session" element={<Session />} />
          <Route path="/login" element={<Login />} />
          <Route path="/connect-device" element={<ConnectDevice />} />
          <Route path="/*" element={<Home />} />
        </Routes>
      </Router>
    </div>
  );
}
