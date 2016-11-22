const electron = require('electron')

const { app, Menu, BrowserWindow } = electron;

const path = require('path')
const url = require('url')

// Keep a global reference of the window object, if you don't, the window will
// be closed automatically when the JavaScript object is garbage collected.
let mainWindow

let ctxMenuTemplate = [
    {
      role: 'quit'
    }
]

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

  contents.openDevTools()

  contents.on('did-finish-load', () => {

  })

  contents.on('context-menu', (event, params)=> {
    console.log(event, params)


    let ctxTpl = [...ctxMenuTemplate]
    let ctxMenu = {}

    ctxTpl.unshift({
      label: 'Go back to Safari Books Online',
      click () {
        ctxMenu = null
        ctxTpl = null
        mainWindow.loadURL('https://www.safaribooksonline.com/')
      }
    })

    ctxTpl.unshift({
      label: 'Save to EPUB',
      enabled: false,
      click () {

// van e konyv epp megnyitva - ha nincs, akkor disabled
// mi a cime
// Save 'BOOK TITLE' as [EPUB]

        console.log('clicked Save to EPUB')
        ctxMenu = null
        ctxTpl = null
      }
    })
    ctxMenu = Menu.buildFromTemplate(ctxTpl)

    ctxMenu.popup(mainWindow, params.x, params.y)
  })

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