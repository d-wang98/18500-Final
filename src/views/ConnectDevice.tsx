import React, { useEffect, useState } from 'react';
import { startBT } from '../utils/bluetooth';
import ScanningView from './Scanning';

export default function ConnectDevice() {
  // const [serialPorts, setSerialPorts] = useState<PortInfo[]>([]);
  // const listSerialPorts = async () => {
  //   const ports = await SerialPort.list();

  //   if (ports.length === 0) {
  //     alert('No ports discovered');
  //   }
  //   setSerialPorts(ports);
  // };

  useEffect(() => {}, []);
  return (
    <>
      <button onClick={startBT}>Connect Device</button>
      {/* <ScanningView onConnect={console.log} /> */}
      {/* {serialPorts.map((s) => {
        return (
          <li>
            Serial Number: {s.serialNumber}
            <button>Connect</button>
          </li>
        );
      })} */}
    </>
  );
}
