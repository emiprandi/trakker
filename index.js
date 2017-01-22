console.time('init');

const {app, Tray, BrowserWindow, ipcMain} = require('electron');
const path = require('path');

const appIconDefault = path.join(__dirname, 'static', 'appIcon.png');
const isDev = process.env.NODE_ENV !== "build";
const appUrl = isDev ? 'http://localhost:8080' : `file://${__dirname}/dist/index.html`;

let tray;
let win;

const calculateWinPos = (bounds) => {
  return {
    x: (bounds.x + (bounds.width / 2)) - 175,
    y: bounds.y
  };
};

app.on('ready', () => {
  app.dock.hide();

  tray = new Tray(appIconDefault);
  tray.setToolTip('TogglApp');

  win = new BrowserWindow({
    title: 'TogglApp',
    width: 350,
    height: 200,
    frame: false,
    resizable: false,
    movable: false,
    show: isDev ? true : false,
    alwaysOnTop: true
  });

  win.loadURL(appUrl);

  tray.on('click', (e, bounds) => {
    let pos = calculateWinPos(bounds);

    win.setPosition(pos.x, pos.y);
    win.show();
  });

  win.on('blur', () => {
    if (!isDev) {
      win.hide();
    }
  });

  ipcMain.once('close-app', () => {
    app.quit();
  });

  console.timeEnd('init');
});
