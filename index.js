console.time('init');

const {app, Tray, BrowserWindow, ipcMain} = require('electron');
const path = require('path');

const appIconDefault = path.join(__dirname, 'static', 'appIconTemplate.png');
const appIconActive = path.join(__dirname, 'static', 'appIconActive.png');

const isDev = process.env.NODE_ENV !== "build";
const appUrl = isDev ? 'http://localhost:8080' : `file://${__dirname}/dist/index.html`;

let tray;
let win;

const calculateWinPos = (bounds) => {
  return {
    x: (bounds.x + (bounds.width / 2)) - 150,
    y: bounds.y
  };
};

app.on('ready', () => {
  app.dock.hide();

  tray = new Tray(appIconDefault);
  tray.setToolTip('Trakker');

  win = new BrowserWindow({
    title: 'Trakker',
    width: 300,
    height: 240,
    frame: false,
    resizable: false,
    movable: false,
    show: false,
    alwaysOnTop: true,
    webPreferences: {
      preload: path.join(__dirname, 'processPreload.js')
    }
  });

  win.loadURL(appUrl);

  tray.on('click', (e, bounds) => {
    let pos = calculateWinPos(bounds);

    win.setPosition(pos.x, pos.y);
    win.show();
  });

  win.on('blur', () => {
    win.hide();
  });

  ipcMain.on('timer-on', () => {
    tray.setImage(appIconActive);
    win.setSize(300, 120, true);
  });

  ipcMain.on('timer-off', () => {
    tray.setImage(appIconDefault);
    win.setSize(300, 240, true);
  });

  ipcMain.once('close-app', () => {
    app.quit();
  });

  console.timeEnd('init');
});
