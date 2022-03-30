import React from "react";
import './App.css';
import Button from '@mui/material/Button';
import { Link } from "react-router-dom";


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
        <p>Tokens Earned: 0</p>
        <p>Sessions Completed: 0</p>
        <p>Sessions Failed: 0</p>
        <Link to="/session">
          <Button onClick={this.handleStartSession} variant="contained">Start Paymodoro</Button>
        </Link>
        <Link to="/login">
          <Button onClick={this.handleLogin} variant="text">Login/Signup</Button>
        </Link>
      </div>
        
    );
  }
}

export default App;
