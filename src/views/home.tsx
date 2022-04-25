import React, { useEffect, useState } from 'react';
import './App.css';
import Button from '@mui/material/Button';
import { Link } from 'react-router-dom';
import { useStore } from 'react-stores';
import { myStore } from './store';

export default function Home() {
  const [state, setState] = useState({
    loggedIn: false,
  });
  const myStoreState = useStore(myStore);

  const handleLogin = () => {
    console.log('login');
  };

  const handleStartSession = () => {
    console.log('starting paymodoro');
  };

  const handleCheck = () => {
    console.log(myStoreState.wallet.account());
    console.log(myStoreState.contract);
  };

  return (
    <div className="main-wrapper">
      <h1>Paymadoro</h1>
      <div
        style={{
          display: 'grid',
          alignItems: 'center',
          justifyContent: 'center',
          gridTemplateColumns: '1fr 1fr 1fr 1fr',
          textAlign: 'left',
          gap: '1rem',
          width: 'auto',
        }}
      >
        <Link to="/session">
          <Button onClick={handleStartSession} variant="contained">
            Start Paymodoro
          </Button>
        </Link>
        <Link to="/connect-device">
          <Button variant="contained">Connect Device</Button>
        </Link>
        <Link to="/login">
          <Button variant="contained" onClick={handleLogin}>
            Login/Signup
          </Button>
        </Link>
      </div>
      <h2>Tokens Earned: 4</h2>
      <h2>Sessions Completed: 6</h2>
      <h2>Sessions Failed: 2</h2>
    </div>
  );
}
