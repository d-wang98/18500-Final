import React, { useState } from 'react';
import './App.css';
import Button from '@mui/material/Button';
import { Link } from 'react-router-dom';
import * as nearAPI from 'near-api-js';
import { getThemeProps } from '@mui/system';
import { useStore } from 'react-stores';
import { myStore } from './store';


export default function Login({isLoggedIn}) {
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

    const baseUrl = 'file:///home/lev/code/18500/18500-Final';
    //signin
    console.log(window.location.href)
    console.log(myStoreState.wallet.isSignedIn())
    console.log(myStoreState.wallet)
    if (!myStoreState.wallet.isSignedIn()) {
      console.log("trying signin")
      isLoggedIn = true;


      myStoreState.wallet.requestSignIn(
      "dev-1649192632895-28253046722360", // contract requesting access
      `${baseUrl}/build/index.html`,
      `${baseUrl}/build/index.html`,
    ); 
      console.log("slajfldsajlkfjsdoiagnadosibnoaidsnboia")
    } else {
      console.log('signedin');
    }
  };

  return (
    <div>
      <form>
        <label>Email or username</label>
        <label>Password</label>
        {myStoreState.wallet.isSignedIn() ? <Button onClick={handleLogout}>Log out</Button> : <Button onClick={handleLogin}>Log in</Button  >}
      </form>
      <Link to="/">
        <Button variant="contained">Back</Button>
      </Link>
    </div>
  );
}
