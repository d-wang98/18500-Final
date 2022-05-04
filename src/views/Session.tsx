import React, { useState, useEffect } from 'react';
import './App.css';
import Button from '@mui/material/Button';
import { Link, useNavigate } from 'react-router-dom';
import { csv } from 'd3';
import {
  defaultRedirectUrl,
  myStore,
  SESSION_ENDED,
  SESSION_STARTED,
} from './store';
import { useStore } from 'react-stores';
import { utils } from 'near-api-js';
import { calculateIsFocused } from '../utils/algorithm';

const totalTimeMs = 10 * 1000; // 10 s

export default function Session() {
  const store = useStore(myStore);
  const nav = useNavigate();

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
  const [hr, setHr] = useState(0);
  const [time, setTime] = useState(0);
  const [acc, setAcc] = useState(0);
  const [sound, setSound] = useState(0);
  const [currentStatus, setCurrentStatus] = useState(true);
  const [currentFailed, setCurrentFailed] = useState<string[]>([]);

  useEffect(() => {
    setInterval(async () => {
      const timeEnd = Date.now();
      const timeStart = Date.now() - 3 * 1000;
      const { success, criteriaFailed } = await calculateIsFocused(
        timeStart,
        timeEnd
      );
      setCurrentStatus(success);
      setCurrentFailed(criteriaFailed);
    }, 1000);
  }, []);

  const startSession = async () => {
    if (!store.contract) {
      alert('Please connect your NEAR account');
      return;
    }
    await (store.contract as any).start_session({
      args: {},
      gas: '300000000000000',
      amount: utils.format.parseNearAmount('0.2'),
      callbackUrl: `${defaultRedirectUrl}#/${SESSION_STARTED}`,
    });
    toggle();
  };

  const endSession = async (endTime?: number) => {
    if (!store.contract) {
      alert('Please connect your NEAR account');
      return;
    }
    const _endTime = endTime || Date.now();
    const startTime = _endTime - seconds * 1000;

    const success = await calculateIsFocused(startTime, _endTime);
    console.log(success);
    setIsActive(false);
    alert(
      `Your pomodoro session is complete. You ${
        success ? 'succeeded' : 'failed'
      }`
    );
    await (store.contract as any).end_session({
      args: {
        success,
      },
      gas: '300000000000000',
      callbackUrl: `${defaultRedirectUrl}#/${SESSION_ENDED}`,
    });
    nav('/');
  };

  function toggle() {
    setIsActive(!isActive);
  }

  function reset() {
    setSeconds(0);
    setIsActive(false);
  }

  useEffect(() => {
    const baseUrl =
      '/Users/localoldman/Documents/CMU_Spring_22/18500/final/18500-final-project';
    csv(`${baseUrl}/data.csv`).then((data) => {
      setData(data);
    });
    if (window.location.href.includes('#started')) {
      setIsActive(true);
    }
  }, []);

  useEffect(() => {
    if (data[data.length - 1] === undefined) {
      setTime(0);
      setAcc(0);
      setHr(0);
    } else {
      const recData = data[data.length - 1];
      const acceleration = recData.aX + recData.aY + recData.aZ;
      setTime(recData.time);
      setAcc(acc - acceleration);
      setHr(recData.hr);
      setSound(recData.soundDB);
    }
  });

  useEffect(() => {
    if (seconds > totalTimeMs / 1000) {
      endSession();
      setSeconds(0);
    }
  }, [seconds]);

  useEffect(() => {
    let interval = null;
    if (isActive) {
      interval = setInterval(() => {
        setSeconds((seconds) => seconds + 1);
      }, 1000);
    } else if (!isActive && seconds !== 0) {
      clearInterval(interval);
    }
    return () => clearInterval(interval);
  }, [isActive, seconds]);

  return (
    <div
      style={{
        display: 'grid',
      }}
    >
      <h3>
        Time Elapsed:{' '}
        {Math.floor(seconds / 60)
          .toString()
          .padStart(2, '0')}
        :{(seconds % 60).toString().padStart(2, '0')} /
        {Math.floor(totalTimeMs / 60000)}:{Math.floor(totalTimeMs / 1000) % 60}
      </h3>
      <h3>Heart Rate: {hr} BPM</h3>
      <h3>Sound: {sound} dB</h3>
      <h3>Movement: {acc} ms^-2</h3>

      <div>
        <button
          className={`button button-primary button-primary-${
            isActive ? 'active' : 'inactive'
          }`}
          onClick={() => startSession()}
          disabled={isActive}
        >
          {isActive ? 'Running' : 'Start'}
        </button>
        <button onClick={() => endSession()}>End Session</button>
      </div>
      <Link to="/">
        <Button>Back</Button>
      </Link>
      <div>
        {currentStatus && (
          <div
            className="currentStatus success"
            style={{
              background: 'rgb(150, 240, 146)',
              borderRadius: '1rem',
              padding: '1rem',
            }}
          >
            <h2>Looks like you are currently succeeding!</h2>
          </div>
        )}
        {!currentStatus && (
          <div
            className="currentStatus fail"
            style={{ background: 'red', borderRadius: '1rem', padding: '1rem' }}
          >
            <h2>
              Looks like you are currently failing. You can do better; try
              improving on
            </h2>
            <ul>
              {currentFailed.map((crit) => (
                <>{crit}</>
              ))}
            </ul>
          </div>
        )}
      </div>
      <img src="mario.png" alt="" />
    </div>
  );
}
