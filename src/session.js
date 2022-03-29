import React from "react";
import './App.css';
import Button from '@mui/material/Button';
import { Link } from "react-router-dom";


class Session extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      timeElapsed: 0,
      timeFocused: 0,
      heartRate: 0,
      sound: 0,
      movement: 0,

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
        <p>Time Elapsed: {this.state.timeElapsed} / 25:00</p>
        <p>Time Focused: {this.state.timeFocused} / 25:00</p>
        <p>Heart Rate: {this.state.heartRate} BPM</p>
        <p>Sound: {this.state.sound} dB</p>
        <p>Movement: {this.state.movement} ms^-2</p>
        <Link to="/">
          <Button onClick={this.handleStartSession} variant="contained">End Session</Button>
        </Link>
      </div>
        
    );
  }
}

export default Session;
