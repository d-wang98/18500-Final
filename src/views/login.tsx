import React, { useState } from 'react';
import './App.css';
import Button from '@mui/material/Button';
import { Link } from 'react-router-dom';
import * as nearAPI from 'near-api-js';
import { getThemeProps } from '@mui/system';
import { useStore } from 'react-stores';
import { defaultRedirectUrl, myStore } from './store';

export default function Login({ isLoggedIn }) {
  const [state, setState] = useState({
    emailOrUsername: '',
    password: '',
  });

  const handleBack = () => {
    console.log('back');
  };

  const myStoreState = useStore(myStore);

  const handleLogout = async () => {
    myStoreState.wallet.signOut();
  };

  const handleLogin = async () => {
    //signin
    console.log(window.location.href);
    console.log(myStoreState.wallet.isSignedIn());
    console.log(myStoreState.wallet);
    if (!myStoreState.wallet.isSignedIn()) {
      console.log('trying signin');
      isLoggedIn = true;

      myStoreState.wallet.requestSignIn(
        'dev-1649192632895-28253046722360', // contract requesting access
        defaultRedirectUrl,
        defaultRedirectUrl
      );
      console.log('slajfldsajlkfjsdoiagnadosibnoaidsnboia');
    } else {
      console.log('signedin');
    }
  };

  return (
    <div style={{ display: 'grid', gap: '1rem' }}>
      <h2>Please login to your NEAR account</h2>
      <div>
        {myStoreState.wallet.isSignedIn() ? (
          <Button variant="contained" onClick={handleLogout}>
            Log out
          </Button>
        ) : (
          <Button variant="contained" onClick={handleLogin}>
            Log in
          </Button>
        )}
      </div>
      <Link to="/">
        <Button variant="contained">Back</Button>
      </Link>
    </div>
  );
}
