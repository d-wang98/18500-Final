import React, { useState } from 'react';
import './App.css';
import Button2 from '@mui/material/Button';
import { Link } from 'react-router-dom';
import * as nearAPI from 'near-api-js';

export default function Login() {
  const [state, setState] = useState({
    emailOrUsername: '',
    password: '',
  });

  const handleBack = () => {
    console.log('back');
  };

  const handleLogin = async () => {
    console.log('clicked!');

    const { connect, keyStores, WalletConnection } = nearAPI;

    const config: nearAPI.ConnectConfig = {
      networkId: 'testnet',
      keyStore: new keyStores.BrowserLocalStorageKeyStore(),
      nodeUrl: 'https://rpc.testnet.near.org',
      walletUrl: 'https://wallet.testnet.near.org',
      helperUrl: 'https://helper.testnet.near.org',
      headers: {},
    };

    // connect to NEAR
    const near = await connect(config);

    // create wallet connection
    const wallet = new WalletConnection(near, null);
    console.log(wallet);

    const signIn = () => {
      wallet.requestSignIn(
        "dev-1649192632895-28253046722360.testnet", // contract requesting access
      );
    };
    if(wallet.isSignedIn()) {
      console.log("signedin")
    }

  };

  return (
    <div>
      <form>
        <label>Email or username</label>
        <label>Password</label>
        <Button2 onClick={handleLogin}>Log in</Button2>
      </form>
      <Link to="/">
        <Button2 onClick={handleBack} variant="contained">
          Back
        </Button2>
      </Link>
    </div>
  );
}
