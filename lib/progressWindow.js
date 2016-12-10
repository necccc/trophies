const path = require('path')
const url = require('url')
const electron = require('electron')
const ProgressEvents = require('./progressEvents')
const { app, Menu, BrowserWindow, ipcMain } = electron;

class ProgressWindow {
    constructor (parent) {
        this.parent = parent
    }

    open () {
        this.window = new BrowserWindow({
            parent: this.parent,
            modal: true,
            width: 500,
            height: 280,
            webPreferences: {
                devTools: true
            }
        })

        this.window.on('closed', () => {
            this.window = null
        })

        this.window.loadURL(url.format({
            pathname: path.join(__dirname, 'progressWindow.html'),
            protocol: 'file:',
            slashes: true
        }))

        // ready
        ipcMain.on('asynchronous-message', (event, arg) => this.onReady(event, arg))
    }

    onReady (event, arg) {
        if (arg !== 'progressReady') return;

        this.window.webContents.send('progress', JSON.stringify(ProgressEvents.getProgress()))
        ProgressEvents.on('progress', (progress) => this.onProgress(progress))
    }

    onProgress (progress) {
        this.window.webContents.send('progress', JSON.stringify(progress))
    }

    close () {
        ProgressEvents.removeAllListeners('progress')
        this.window.destroy()
    }


}


module.exports = ProgressWindow