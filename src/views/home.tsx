import React, { useState } from 'react';
import './App.css';
import Button from '@mui/material/Button';
import { Link } from 'react-router-dom';

export default function Home() {
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
      <p>Tokens Earned: 0</p>
      <p>Sessions Completed: 0</p>
      <p>Sessions Failed: 0</p>
      <Link to="/session">
        <Button onClick={handleStartSession} variant="contained">
          Start Paymodoro
        </Button>
      </Link>
      <Link to="/connect-device">
        <Button  variant="text">
        Connect Device
        </Button>
      </Link>
      <Link to="/login">
        <Button onClick={handleLogin} variant="text">
          Login/Signup
        </Button>
      </Link>
    </div>
  );
}
