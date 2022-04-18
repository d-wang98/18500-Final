import React, { useState, useEffect } from 'react';
import './App.css';
import Button from '@mui/material/Button';
import { Link } from 'react-router-dom';
import { csv } from 'd3';
export default function Session() {
  const [state, setState] = useState({
    timeElapsed: 0,
    timeFocused: 0,
    heartRate: 0,
    sound: 0,
    movement: 0,
  });


  const [seconds, setSeconds] = useState(0);
  const [isActive, setIsActive] = useState(false);
  const [data, setData] = useState([]);


  function toggle() {
    setIsActive(!isActive);
  }

  function reset() {
    setSeconds(0);
    setIsActive(false);
  }

  useEffect(() => {
    let interval = null;
    if (isActive) {
      interval = setInterval(() => {
        setSeconds(seconds => seconds + 1);
      }, 1000);
    } else if (!isActive && seconds !== 0) {
      clearInterval(interval);
    }
    return () => clearInterval(interval);
  }, [isActive, seconds]);


  const handleStartSession = () => {
    console.log('starting paymodoro');
  };

  return (
    <div>
      <p>Time Elapsed: {Math.floor(seconds/60).toString().padStart(2, '0')}:{(seconds%60).toString().padStart(2, '0')} / 25:00</p>
      <p>Heart Rate: {state.heartRate} BPM</p>
      <p>Sound: {state.sound} dB</p>
      <p>Movement: {state.movement} ms^-2</p>

      <button className={`button button-primary button-primary-${isActive ? 'active' : 'inactive'}`} onClick={toggle}>
        {isActive ? 'Pause' : 'Start'}
      </button>
      <button className="button" onClick={reset}>
        Reset
      </button>
      <Link to="/">
        <Button onClick={handleStartSession} variant="contained">
          End Session
        </Button>
      </Link>
    </div>
  );
}
