import React, { useState } from 'react';
import './App.css';
import Button from '@mui/material/Button';
import { Link } from 'react-router-dom';

export default function Session() {
  const [state, setState] = useState({
    timeElapsed: 0,
    timeFocused: 0,
    heartRate: 0,
    sound: 0,
    movement: 0,
  });

  const handleLogin = () => {
    console.log('login');
  };

  const handleStartSession = () => {
    console.log('starting paymodoro');
  };

  return (
    <div>
      <p>Time Elapsed: {state.timeElapsed} / 25:00</p>
      <p>Time Focused: {state.timeFocused} / 25:00</p>
      <p>Heart Rate: {state.heartRate} BPM</p>
      <p>Sound: {state.sound} dB</p>
      <p>Movement: {state.movement} ms^-2</p>
      <Link to="/">
        <Button onClick={handleStartSession} variant="contained">
          End Session
        </Button>
      </Link>
    </div>
  );
}
