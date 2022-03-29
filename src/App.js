import React from "react";
import './App.css';
import Button from '@mui/material/Button';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Redirect,
} from "react-router-dom";
import Home from "./home"
import Session from "./session"
import Login from "./login"

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loggedIn: false,
      
    };
  }
  handleLogin = () => {
    console.log("login")
  };

  handleStartSession = () => {
    console.log("starting paymodoro")
  };

  render() {
    return (
      <div>
        <Router>
          <Routes>
            <Route exact path="/" element={<Home/>} />
            <Route path="/session" element={<Session/>} />
            <Route path="/login" element={<Login/>} />
          </Routes>
        </Router>
      </div>
        
    );
  }
}

export default App;
