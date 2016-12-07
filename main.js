
//const MAIN_URL = 'https://www.safaribooksonline.com/'
const MAIN_URL = 'https://www.safaribooksonline.com/library/view/you-dont-know/9781491905241/ch03.html'

const electron = require('electron')
const contextMenu = require('./lib/contextmenu')
const bookModel = require('./lib/bookmodel')
const siteModel = require('./lib/sitemodel')

const { app, Menu, BrowserWindow } = electron;

const path = require('path')
const url = require('url')

let mainWindow

function createWindow () {

    mainWindow = new BrowserWindow(
        {
            width: 1280,
            height: 900,
            webPreferences: {
            devTools: true,
            nodeIntegration: false
        }
    })

    mainWindow.loadURL(MAIN_URL)

    let contents = mainWindow.webContents

    const book = bookModel(contents)
    const site = siteModel(contents)

    contents.openDevTools()

    contents.on('context-menu', (event, params) => {
        return contextMenu(site, book, mainWindow, params.x, params.y)
    })

    mainWindow.on('closed', function () {
        mainWindow = null
        app.quit()
    })
}


app.on('ready', createWindow)
app.on('window-all-closed', function () {
    if (process.platform !== 'darwin') {
        app.quit()
    }
})

app.on('activate', function () {
    if (mainWindow === null) {
        createWindow()
    }
})