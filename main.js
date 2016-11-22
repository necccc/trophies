const electron = require('electron')
const contextMenu = require('./lib/contextmenu')
const safaribooks = require('./lib/safaribooks') 

const { app, Menu, BrowserWindow } = electron;

const path = require('path')
const url = require('url')

let mainWindow

function createWindow () {
  mainWindow = new BrowserWindow({
    width: 1280,
    height: 900,
    webPreferences: {
      devTools: true,
      nodeIntegration: false
    }
  })

  mainWindow.loadURL('https://www.safaribooksonline.com/')

  let contents = mainWindow.webContents

  const book = safaribooks(contents) 

  contents.openDevTools()

  contents.on('did-finish-load', () => {
  })

  contents.on('context-menu', (event, params) => contextMenu(book, mainWindow, params.x, params.y))

  mainWindow.on('closed', function () {
    mainWindow = null
    app.quit()
  })
}



// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
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