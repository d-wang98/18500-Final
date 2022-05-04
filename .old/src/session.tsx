import React from 'react';
import './App.css';
import Button from '@mui/material/Button';
import { Link } from 'react-router-dom';

const totalTimeMs = 10 * 1000 // 10 s

class Session extends React.Component<any, any> {
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
    console.log('login');
  };

  handleStartSession = () => {
    console.log('starting paymodoro');
  };

  render() {
    return (
      <div>
        <p>
          Time Elapsed: {this.state.timeElapsed} /{' '}
          {Math.floor(totalTimeMs / 60000)}:
          {Math.floor(totalTimeMs / 1000) % 60}
        </p>
        {/* <p>Time Focused: {this.state.timeFocused} / 25:00</p> */}
        {/* <p>Heart Rate: {this.state.heartRate} BPM</p>
        <p>Sound: {this.state.sound} dB</p>
        <p>Movement: {this.state.movement} ms^-2</p> */}
        <Link to="/">
          <Button onClick={this.handleStartSession} variant="contained">
            End Session
          </Button>
        </Link>
      </div>
    );
  }
}

export default Session;
