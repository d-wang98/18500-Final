import { app, BrowserWindow } from 'electron';
import { readCSV } from './utils/algorithm';
import { setupBluetooth } from './utils/bluetooth';
app.commandLine.appendSwitch('enable-web-bluetooth', 'true');
app.commandLine.appendSwitch('enable-experimental-web-platform-features', 'true');

function createWindow() {
  // Create the browser window.
  let window = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      nodeIntegration: true,
      webSecurity: false,
    },
  });

  // and load the index.html of the app.
  window.loadFile('./index.html');
  //setupBluetooth(window);
  readCSV()
}

app.on('ready', createWindow);
