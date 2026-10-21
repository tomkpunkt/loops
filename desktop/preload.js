// The only thing the game sees of the desktop shell: window.loopsPlatform
const { contextBridge, ipcRenderer } = require('electron');
const info = ipcRenderer.sendSync('loops:info');
contextBridge.exposeInMainWorld('loopsPlatform', {
  name: 'desktop',
  steam: info.steam,
  deck: info.deck,
  version: info.version,
  achieve: id => ipcRenderer.send('loops:achieve', String(id)),
  setFullscreen: on => ipcRenderer.send('loops:fullscreen', !!on),
  toggleFullscreen: () => ipcRenderer.send('loops:fullscreen', 'toggle'),
  quit: () => ipcRenderer.send('loops:quit')
});
