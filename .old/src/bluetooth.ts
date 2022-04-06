import { BrowserWindow } from "electron";

export const connectToDevice = async () => {
  const mainWindow = new BrowserWindow({
    width: 800,
    height: 600,
  });
  //@ts-ignore
  mainWindow.webContents.on(
    "select-bluetooth-device",
    (event, deviceList, callback) => {
      event.preventDefault();
      if (deviceList && deviceList.length > 0) {
        callback(deviceList[0].deviceId);
      }
    }
  );
  // Request the Bluetooth device through browser
  // const device = await navigator.bluetooth.requestDevice({
  //   optionalServices: ["battery_service", "device_information"],
  //   filters: [{ namePrefix: "hc" }],
  //   acceptAllDevices: true,
  // });
  // return device;
};
