import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { startBT } from '../utils/bluetooth';
import Button from '@mui/material/Button';
import ScanningView from './Scanning';

export default function ConnectDevice() {
  useEffect(() => {}, []);
  const [clicked, setClicked] = useState(false);

  const startWrapper = () => {
    setClicked(true);
    startBT();
  };
  return (
    <>
      {!clicked && (
        <>
          <h2>Connection Time!</h2>
          <p>Please connect to your device. It should be blinking blue</p>
        </>
      )}
      {clicked && (
        <>
          <h2>Please Wait</h2>
          <p>
            Please wait until the device's bluetooth indicator light stops
            flashing.
          </p>
          <p>
            Once the flashing stops, please go to the
            <Link to="/session">
              <Button>Sessions Page</Button>
            </Link>
          </p>
        </>
      )}

      <Button onClick={startWrapper} variant="contained">
        {clicked && <>Connecting Device...</>}
        {!clicked && <>Connect Device</>}
      </Button>
      <Link style={{ margin: '1rem' }} to="/">
        <Button variant="contained">Back</Button>
      </Link>
    </>
  );
}
