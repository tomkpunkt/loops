// Loops desktop shell: one window around the unchanged browser game, plus an optional Steam bridge.
const { app, BrowserWindow, ipcMain, shell, Menu } = require('electron');
const path = require('path');
const fs = require('fs');
const steam = require('./steam');

const argv = process.argv.slice(1);
// Steam Deck: Steam sets SteamDeck=1; --deck forces the same behaviour for testing
const onDeck = process.env.SteamDeck === '1' || argv.includes('--deck');

if (!app.requestSingleInstanceLock()) app.quit();

// window state (size, fullscreen) next to the save data
const statePath = () => path.join(app.getPath('userData'), 'window.json');
function readState() { try { return JSON.parse(fs.readFileSync(statePath(), 'utf8')); } catch (e) { return {}; } }
function writeState(s) { try { fs.writeFileSync(statePath(), JSON.stringify(s)); } catch (e) {} }

let win = null;
function createWindow() {
  const st = readState();
  win = new BrowserWindow({
    width: st.w || 1280, height: st.h || 800, minWidth: 640, minHeight: 480,
    fullscreen: onDeck || !!st.fs,
    backgroundColor: '#000000', title: 'Loops', autoHideMenuBar: true, show: false,
    webPreferences: {
      preload: path.join(__dirname, 'preload.js'),
      contextIsolation: true, nodeIntegration: false, sandbox: true,
      backgroundThrottling: false, autoplayPolicy: 'no-user-gesture-required'
    }
  });
  Menu.setApplicationMenu(null);
  win.once('ready-to-show', () => win.show());
  win.loadFile(path.join(__dirname, 'app', 'index.html'));

  // the game never navigates; anything that tries to leave opens in the system browser
  win.webContents.setWindowOpenHandler(({ url }) => { if (/^https?:/.test(url)) shell.openExternal(url); return { action: 'deny' }; });
  win.webContents.on('will-navigate', (e, url) => { if (!url.startsWith('file:')) { e.preventDefault(); if (/^https?:/.test(url)) shell.openExternal(url); } });

  // F11 / Alt+Enter toggle full screen, Ctrl+Shift+I opens dev tools in unpackaged runs
  win.webContents.on('before-input-event', (e, inp) => {
    if (inp.type !== 'keyDown') return;
    if (inp.key === 'F11' || (inp.alt && inp.key === 'Enter')) { win.setFullScreen(!win.isFullScreen()); e.preventDefault(); }
    if (!app.isPackaged && inp.control && inp.shift && inp.key.toLowerCase() === 'i') win.webContents.toggleDevTools();
  });
  const save = () => { if (!win || win.isDestroyed()) return; const b = win.getNormalBounds(); writeState({ w: b.width, h: b.height, fs: win.isFullScreen() }); };
  win.on('resize', save); win.on('enter-full-screen', save); win.on('leave-full-screen', save); win.on('close', save);
}

ipcMain.on('loops:achieve', (_e, id) => steam.achieve(String(id)));
ipcMain.on('loops:quit', () => app.quit());
ipcMain.on('loops:fullscreen', (_e, mode) => {
  if (!win) return;
  win.setFullScreen(mode === 'toggle' ? !win.isFullScreen() : !!mode);
});
ipcMain.on('loops:info', e => { e.returnValue = { steam: steam.available(), deck: onDeck, version: app.getVersion() }; });

app.commandLine.appendSwitch('autoplay-policy', 'no-user-gesture-required');
steam.init();
app.whenReady().then(() => {
  steam.enableOverlay();
  createWindow();
});
app.on('second-instance', () => { if (win) { if (win.isMinimized()) win.restore(); win.focus(); } });
app.on('window-all-closed', () => app.quit());
