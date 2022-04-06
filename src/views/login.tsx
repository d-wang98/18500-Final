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
      headers: {},
    };

    // connect to NEAR
    const near = await connect(config);

    // create wallet connection
    const wallet = new WalletConnection(near, null);
    console.log(wallet);

    //signin
    console.log(window.location.href)
    console.log(wallet.isSignedIn())
    if (!wallet.isSignedIn()) {
      console.log("trying signin")
      wallet.requestSignIn(
      "dev-1649192632895-28253046722360", // contract requesting access
      "file:///Users/localoldman/Documents/CMU_Spring_22/18500/final/18500-final-project/build/index.html",
      "file:///Users/localoldman/Documents/CMU_Spring_22/18500/final/18500-final-project/build/index.html"
      
    ); 
    } else {
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
