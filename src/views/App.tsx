import React, { useState, useEffect } from 'react';
import './App.css';
import Button from '@mui/material/Button';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './home';
import Session from './Session';
import Login from './login';
import ConnectDevice from './ConnectDevice';
import * as nearAPI from 'near-api-js';
import { useStore } from 'react-stores';
import { myStore } from './store';


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

  const handleWallet = async () => {

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

    const contract = new nearAPI.Contract(
      wallet.account(), // the account object that is connecting
      "dev-1649192632895-28253046722360.testnet",
      {
        // name of contract you're connecting to
        viewMethods: ["get_active_users","get_results"], // view methods do not change state but usually return a value
        changeMethods: ["start_session","end_session","prune_stale_users"], // change methods modify state
        //sender: wallet.account(), // account object to initialize and sign transactions.
      }
    );

    myStore.setState({
      wallet: wallet,
      contract: contract,
    });
    console.log(myStore)
  };

  useEffect(() => {
    handleWallet()
  });

  return (
    <div>
      <Router>
        <Routes>
          {/* @ts-ignore */}
          <Route path="/session" element={<Session />} />
          <Route path="/login" element={<Login isLoggedIn={state.loggedIn} />} />
          <Route path="/connect-device" element={<ConnectDevice />} />
          <Route path="/*" element={<Home />} />
        </Routes>
      </Router>
    </div>
  );
}
