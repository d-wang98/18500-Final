import React, { useState } from 'react';
import './App.css';
import Button from '@mui/material/Button';
import { Link } from 'react-router-dom';
import * as nearAPI from 'near-api-js';

export default function Login() {
  const [state, setState] = useState({
    emailOrUsername: '',
    password: '',
  });

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

    const baseUrl = 'file:///home/lev/code/18500/18500-Final';
    //signin
    console.log(window.location.href);
    console.log(wallet.isSignedIn());
    if (!wallet.isSignedIn()) {
      console.log('trying signin');
      wallet.requestSignIn(
        'dev-1649192632895-28253046722360', // contract requesting access
        `${baseUrl}/build/index.html`,
        `${baseUrl}/build/index.html`
      );
    } else {
      console.log('signedin');
    }
  };

  return (
    <div>
      <form>
        <label>Email or username</label>
        <label>Password</label>
        <Button onClick={handleLogin}>Log in</Button>
      </form>
      <Link to="/">
        <Button variant="contained">Back</Button>
      </Link>
    </div>
  );
}
