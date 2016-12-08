
const electron = require('electron')

const { app, Menu, BrowserWindow } = electron;

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
                devTools: false
            }
        })

        //this.window.loadURL(MAIN_URL)


    }

    close () {
        this.window.destroy()
    }


}


module.exports = ProgressWindow