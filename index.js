const index = require('electron');
const { app, BrowserWindow, Menu, ipcMain } = index;

let mainWindow;
// these settings enables html to have access to node API
const preferences = {
    nodeIntegration: true,
    contextIsolation: false,
    enableRemoteModule: true,
};

app.on('ready', () => {
    mainWindow = new BrowserWindow({
        width: 900,
        height: 700,
        webPreferences: preferences
    });
    mainWindow.loadURL(`file://${__dirname}/index.html`);

    const mainMenu = Menu.buildFromTemplate(menuTemplate);
    mainWindow.setMenu(mainMenu);
})

// ========================================
// ............... the menu ...............
// ========================================

const menuTemplate = [
    {
        label: 'Intro',
        submenu: [
            {
                label: 'Searchable Encryption',
                click() {
                    // TODO
                    console.log('TODO');
                }
            },
            {
                label: 'Song et al(2000)',
                click() {
                    // TODO
                    console.log('TODO');
                }
            }
        ]
    },
    {
        label: 'Scheme',
        submenu: [
            {
                label: 'Song et al(2000)',
                click() {
                    // TODO
                    mainWindow.loadURL(`file://${__dirname}/song1.html`);
                    console.log('TODO');
                }
            }
        ]
    },
    {
        role: 'viewMenu'
    }
];