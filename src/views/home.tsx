import React, { useEffect, useState } from 'react';
import './App.css';
import Button from '@mui/material/Button';
import { Link, useNavigate } from 'react-router-dom';
import { useStore } from 'react-stores';
import { myStore, SESSION_ENDED, SESSION_STARTED } from './store';

export default function Home() {
  const myStoreState = useStore(myStore);
  const [successes, setSuccesses] = useState(0);
  const [fails, setFails] = useState(0);

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
  let nav = useNavigate();

  useEffect(() => {
    if (window.location.href.includes(SESSION_STARTED)) {
      nav('/session#started');
    }
    if (window.location.href.includes(SESSION_ENDED)) {
      nav('/session#ended');
    }
  }, []);
  useEffect(() => {
    if (myStoreState.wallet && myStoreState.wallet.isSignedIn()) {
      const getData = async () => {
        const r = await (myStoreState.contract as any).get_results({
          user: myStoreState.wallet.getAccountId(),
        });
        setSuccesses(r.successes)
        setFails(r.failures)
      };
      getData();
    }
  }, [myStoreState]);

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
      {myStoreState.wallet && myStoreState.wallet.isSignedIn() && (
        <>
          <h2>Session Successes: {successes}</h2>
          <h2>Sessions Failed: {fails}</h2>
          <h2>Sessions Completed: {successes + fails}</h2>
        </>
      )}
      <img src="tomato.png" alt="" />
    </div>
  );
}
