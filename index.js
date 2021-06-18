const electron = require('electron');
const { app, BrowserWindow, Menu, ipcMain } = electron;

let mainWindow;
let introWindow;

// these settings enables html to have access to node API
const preferences = {
    nodeIntegration: true,
    contextIsolation: false,
    enableRemoteModule: true,
};

app.on('ready', () => {
    mainWindow = new BrowserWindow({
        backgroundColor: '#FFF', // keep white when dev tool is open
        width: 1100,  // for product
        // width: 1300,    // for dev, showing dev tools
        height: 864,
        webPreferences: preferences
    });
    mainWindow.loadURL(`file://${__dirname}/index.html`);

    const mainMenu = Menu.buildFromTemplate(menuTemplate);
    Menu.setApplicationMenu(mainMenu);
    // mainWindow.setMenu(mainMenu);
})



// ========================================
// ............... the URLs ...............
// ========================================
const introSE = 'https://docs.google.com/presentation/d/e/2PACX-1vSuEMTfRVBLid033ISJKMYyK9jF0k09dzoThlUHPvS447lxrujvL7ay4gvIHSWRvtImk39VIqdvqONh/pub?start=true&loop=false&delayms=60000';

const introSong = 'https://docs.google.com/presentation/d/e/2PACX-1vSJZQWeM7ZO9AST_Y2VGz_NHQjXogSaWTlisIXHs5K81fU8Lo34uk6vlweXKSNNtYi0lM5gtHNytT_6/pub?start=true&loop=false&delayms=60000';


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
                    createIntroWindow('Intro to Searchable Encryption', introSE);
                }
            },
            {
                label: 'Song et al(2000)',
                click() {
                    createIntroWindow('Song el al (2000)', introSong);
                }
            }
        ]
    },
    {
        label: 'Schemes',
        submenu: [
            {
                label: 'Song et al(2000)',
                click() {
                    mainWindow.loadURL(`file://${__dirname}/song1.html`);
                }
            },
            // {
            //     label: 'song2(temp-UI only)',
            //     click() {
            //         mainWindow.loadURL(`file://${__dirname}/song2.html`);
            //     }
            // },
            // {
            //     label: 'song3(temp-UI only)',
            //     click() {
            //         mainWindow.loadURL(`file://${__dirname}/song3.html`);
            //     }
            // },
            // {
            //     label: 'song4(temp-UI only)',
            //     click() {
            //         mainWindow.loadURL(`file://${__dirname}/song4.html`);
            //     }
            // }
        ]
    },
    {
        role: 'viewMenu'
    }
];

// ================================================
// ............... helper functions ...............
// ================================================
const createIntroWindow =  (windowTitle, windowURL) => {
    introWindow = new BrowserWindow({
        parent: mainWindow,
        title: windowTitle,
        webPreferences: preferences
    });
    introWindow.loadURL(windowURL);

    introWindow.on('closed', () => {
        introWindow = null;
    })
}

