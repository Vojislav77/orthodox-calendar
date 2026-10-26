const { app, BrowserWindow, Tray, Menu, nativeImage, nativeTheme, ipcMain } = require('electron');
const path = require('path');
const fs = require('fs');
const os = require('os');

let mainWindow = null;
let tray = null;
let isQuitting = false;
let trayScript = 'cyr';

const TRAY_STRINGS = {
    cyr: {
        tooltip: 'Православни календар 2026',
        showHide: 'Прикажи/Сакриј',
        quit: 'Изађи'
    },
    lat: {
        tooltip: 'Pravoslavni kalendar 2026',
        showHide: 'Prikaži/sakrij',
        quit: 'Izađi'
    }
};

function buildTrayMenu() {
    const labels = TRAY_STRINGS[trayScript] || TRAY_STRINGS.cyr;
    return Menu.buildFromTemplate([
        {
            label: labels.showHide,
            click: () => toggleWindow()
        },
        { type: 'separator' },
        {
            label: labels.quit,
            click: () => {
                isQuitting = true;
                app.quit();
            }
        }
    ]);
}

function applyTrayScript(script) {
    trayScript = script === 'lat' ? 'lat' : 'cyr';
    if (!tray) return;
    const labels = TRAY_STRINGS[trayScript];
    tray.setToolTip(labels.tooltip);
    tray.setContextMenu(buildTrayMenu());
}

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

        ipcMain.on('calendar:set-script', (_event, script) => {
            if (script === 'cyr' || script === 'lat') {
                applyTrayScript(script);
            }
        });

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
                preload: path.join(__dirname, 'preload.js'),
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
        applyTrayScript(trayScript);

        tray.on('click', () => toggleWindow());
        tray.on('double-click', () => toggleWindow());

        // Restore the tray language from the persisted app preference. The
        // renderer also sends this over IPC whenever the script changes.
        mainWindow.webContents.once('did-finish-load', async () => {
            try {
                const savedScript = await mainWindow.webContents.executeJavaScript(
                    "localStorage.getItem('script') || 'cyr'"
                );
                applyTrayScript(savedScript);
            } catch (e) {}
        });

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
