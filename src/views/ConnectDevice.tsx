import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { startBT } from '../utils/bluetooth';
import Button from '@mui/material/Button';
import ScanningView from './Scanning';

export default function ConnectDevice() {
  useEffect(() => {}, []);
  return (
    <>
      <Button onClick={startBT}>Connect Device</Button>
      <Link to="/">
        <Button variant="contained">Back</Button>
      </Link>
    </>
  );
}
