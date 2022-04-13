import React, { useState } from 'react';
import './App.css';
import Button2 from '@mui/material/Button';
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

    //signin
    console.log(window.location.href)
    console.log(myStoreState.wallet.isSignedIn())
    console.log(myStoreState.wallet)
    if (!myStoreState.wallet.isSignedIn()) {
      console.log("trying signin")
      isLoggedIn = true;


      myStoreState.wallet.requestSignIn(
      "dev-1649192632895-28253046722360", // contract requesting access
      "file:///Users/localoldman/Documents/CMU_Spring_22/18500/final/18500-final-project/build/index.html",
      "file:///Users/localoldman/Documents/CMU_Spring_22/18500/final/18500-final-project/build/index.html"
      
    ); 
      console.log("slajfldsajlkfjsdoiagnadosibnoaidsnboia")
    } else {
      console.log("signedin")
    }

  };

  return (
    <div>
      <form>
        <label>Email or username</label>
        <label>Password</label>
        {myStoreState.wallet.isSignedIn() ? <Button2 onClick={handleLogout}>Log out</Button2> : <Button2 onClick={handleLogin}>Log in</Button2>}
      </form>
      <Link to="/">
        <Button2 onClick={handleBack} variant="contained">
          Back
        </Button2>
      </Link>
    </div>
  );
}
