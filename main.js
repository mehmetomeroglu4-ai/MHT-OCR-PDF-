const { app, BrowserWindow } = require('electron');
const path = require('path');
const { baslat } = require('./server');

if (!app.requestSingleInstanceLock()) app.quit();

let pencere = null;
async function ac() {
  const sunucu = await baslat(path.join(__dirname, 'app'));
  const port = sunucu.address().port;
  pencere = new BrowserWindow({
    width: 1150, height: 820, minWidth: 900, minHeight: 600,
    title: 'OCR ve PDF Aracı', autoHideMenuBar: true,
    webPreferences: { contextIsolation: true, nodeIntegration: false }
  });
  pencere.loadURL(`http://127.0.0.1:${port}/index.html`);
  pencere.on('closed', () => { pencere = null; sunucu.close(); });
}
app.whenReady().then(ac);
app.on('second-instance', () => { if (pencere) { if (pencere.isMinimized()) pencere.restore(); pencere.focus(); } });
app.on('window-all-closed', () => app.quit());
