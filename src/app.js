console.time('init');

const {app, Tray, BrowserWindow, ipcMain} = require('electron');

const path = require('path');
const url = require('url');

const appIconDefault = path.join(__dirname, 'static', 'appIcon.png');

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
    show: false,
    alwaysOnTop: true
  });

  win.loadURL(url.format({
    pathname: path.join(__dirname, 'index.html'),
    protocol: 'file:',
    slashes: true
  }));

  tray.on('click', (e, bounds) => {
    let pos = calculateWinPos(bounds);

    win.setPosition(pos.x, pos.y);
    win.show();
  });

  win.on('blur', () => {
    win.hide();
  });

  ipcMain.once('close-app', () => {
    app.quit();
  });

  console.timeEnd('init');
});
