const { contextBridge, ipcRenderer } = require('electron');

contextBridge.exposeInMainWorld('calendarDesktop', {
    // Tell the main process which script the web app is currently using so the
    // tray menu and tooltip can follow Cyrillic / Latin switching.
    setScript: (script) => {
        if (script === 'cyr' || script === 'lat') {
            ipcRenderer.send('calendar:set-script', script);
        }
    }
});
