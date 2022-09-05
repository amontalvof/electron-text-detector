const { app, BrowserWindow, Menu, ipcMain } = require('electron');
const path = require('path');
const getImageText = require('./src/service/getImageText');
const saveScreenShot = require('./src/service/saveScreenShot');
const copyToClipboard = require('./src/service/copyToClipboard');

const menuItems = [
    {
        label: 'Menu',
    },
    {
        label: 'File',
        submenu: [
            {
                role: 'minimize',
            },
            {
                role: 'close',
            },
        ],
    },
];

const menu = Menu.buildFromTemplate(menuItems);
Menu.setApplicationMenu(menu);

const createWindow = () => {
    const win = new BrowserWindow({
        width: 1920,
        height: 1080,
        webPreferences: {
            preload: path.join(__dirname, 'preload.js'),
        },
    });
    ipcMain.on('take-screen-shoot', async (event, devicePixelRatio) => {
        const sources = await saveScreenShot(devicePixelRatio);
        win.webContents.send('get-images', sources);
    });
    ipcMain.on('get-text', async (event, imageBase64) => {
        const text = await getImageText(imageBase64);
        await copyToClipboard(text);
        win.webContents.send('text-copied');
    });
    // win.webContents.openDevTools();
    win.loadFile('src/view/index.html');
};

app.whenReady().then(() => {
    createWindow();
    app.on('activate', () => {
        if (BrowserWindow.getAllWindows().length === 0) createWindow();
    });
});

app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') app.quit();
});
