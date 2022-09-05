const { contextBridge, ipcRenderer } = require('electron');

contextBridge.exposeInMainWorld('electronAPI', {
    getImages: (callback) => ipcRenderer.on('get-images', callback),
    showNotification: (callback) => ipcRenderer.on('text-copied', callback),
    takeScreenShoot: (devicePixelRatio) =>
        ipcRenderer.send('take-screen-shoot', devicePixelRatio),
    getText: (imageBase64) => ipcRenderer.send('get-text', imageBase64),
});
