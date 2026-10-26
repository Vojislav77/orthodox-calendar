const { app, BrowserWindow, Tray, Menu, nativeImage, nativeTheme } = require('electron');
const path = require('path');
const fs = require('fs');
const os = require('os');

let mainWindow = null;
let tray = null;
let isQuitting = false;

app.setName('orthodox-calendar');

const gotLock = app.requestSingleInstanceLock();

if (!gotLock) {
    app.quit();
} else {
    app.on('second-instance', () => {
        if (mainWindow) {
            if (mainWindow.isMinimized()) mainWindow.restore();
            mainWindow.show();
            mainWindow.focus();
        }
    });

    app.whenReady().then(() => {
        Menu.setApplicationMenu(null);

        mainWindow = new BrowserWindow({
            width: 1380,
            height: 1065,
            minWidth: 700,
            minHeight: 500,
            title: 'Православни календар 2026',
            icon: path.join(__dirname, 'logo.png'),
            backgroundColor: '#fafafa',
            autoHideMenuBar: true,
            show: false,
            webPreferences: {
                contextIsolation: true,
                nodeIntegration: false
            }
        });

        mainWindow.loadFile(path.join(__dirname, 'index.html'));
        mainWindow.webContents.on('dom-ready', () => {
            mainWindow.webContents.insertCSS(
                '::-webkit-scrollbar{display:none!important}html{scrollbar-width:none!important}'
            );
        });
        mainWindow.once('ready-to-show', () => {
            mainWindow.show();
        });

        mainWindow.on('close', (event) => {
            if (!isQuitting) {
                event.preventDefault();
                mainWindow.hide();
            }
        });

        mainWindow.on('closed', () => {
            mainWindow = null;
        });

        // Initialize Tray
        const initialIcon = nativeImage.createFromPath(getTrayIconPath());
        tray = new Tray(initialIcon);
        tray.setToolTip('Православни календар 2026');

        const contextMenu = Menu.buildFromTemplate([
            {
                label: 'Прикажи/Сакриј',
                click: () => toggleWindow()
            },
            { type: 'separator' },
            {
                label: 'Изађи',
                click: () => {
                    isQuitting = true;
                    app.quit();
                }
            }
        ]);
        tray.setContextMenu(contextMenu);

        tray.on('click', () => toggleWindow());
        tray.on('double-click', () => toggleWindow());

        // Dynamic theme switching: automatically adapts to Light / Dark KDE theme
        nativeTheme.on('updated', () => {
            updateTrayIcon();
        });

        try {
            const kdeglobals = path.join(os.homedir(), '.config/kdeglobals');
            if (fs.existsSync(kdeglobals)) {
                fs.watchFile(kdeglobals, { interval: 2000 }, () => {
                    updateTrayIcon();
                });
            }
        } catch (e) {}
    });
}

function isKdeOrSystemDark() {
    try {
        const kdeglobalsPath = path.join(os.homedir(), '.config/kdeglobals');
        if (fs.existsSync(kdeglobalsPath)) {
            const content = fs.readFileSync(kdeglobalsPath, 'utf8');
            const match = content.match(/\[Colors:(?:Window|View|Header)\][\s\S]*?BackgroundNormal=([0-9]+),([0-9]+),([0-9]+)/);
            if (match) {
                const r = parseInt(match[1], 10);
                const g = parseInt(match[2], 10);
                const b = parseInt(match[3], 10);
                const lum = 0.299 * r + 0.587 * g + 0.114 * b;
                return lum < 128;
            }
        }
    } catch (e) {}
    return nativeTheme ? nativeTheme.shouldUseDarkColors : false;
}

function getTrayIconPath() {
    // If system is dark, use light/white icon; if system is light, use dark/black icon
    const iconName = isKdeOrSystemDark() ? 'tray-icon-light.png' : 'tray-icon-dark.png';
    return path.join(__dirname, iconName);
}

function updateTrayIcon() {
    if (!tray) return;
    try {
        const iconPath = getTrayIconPath();
        const icon = nativeImage.createFromPath(iconPath);
        tray.setImage(icon);
    } catch (e) {
        console.error('Failed to update tray icon:', e);
    }
}

function toggleWindow() {
    if (!mainWindow) return;
    if (mainWindow.isVisible()) {
        mainWindow.hide();
    } else {
        mainWindow.show();
        mainWindow.focus();
    }
}

app.on('before-quit', () => {
    isQuitting = true;
});

app.on('window-all-closed', () => {
    if (!isQuitting) {
        // Keep running in the system tray
    }
});
