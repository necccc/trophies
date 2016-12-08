const fs = require('fs')
const { Menu, app } = require('electron')
const xjs = require('./util/xjs')
const saveBook = require('./savebook')

const ctxMenuTemplate = [
    {
      role: 'quit'
    }
]

module.exports = function (site, book, mainWindow, x, y) {

        let ctxTpl = [...ctxMenuTemplate]
        let ctxMenu

        ctxTpl.unshift({
            label: 'Go back to Safari Books Online',
            click () {
                ctxMenu = null
                ctxTpl = null
                mainWindow.loadURL('https://www.safaribooksonline.com/')
            }
        })

        const saveAs = function (type, title) {
            ctxMenu = null
            ctxTpl = null
            saveBook(type, title, mainWindow)
        }

        site.isLoggedin()
            .then(() => book.isBook())
            .then(() => book.getTitle())
            .then(title => {
                title = title.replace('Table of Contents for ', '')
                ctxTpl.unshift({
                    label: `Save "${title}" as`,
                    submenu: [
                        {
                            label: 'EPUB',
                            click: saveAs.bind(null, 'epub', title)
                        },
                        {
                            label: 'MOBI',
                            enabled: false
                        },
                        {
                            label: 'PDF',
                            enabled: false
                        },
                    ],
                })
                // displaying contextmenu at the final catch below
                return Promise.reject()
            })
            .catch(() => {
                ctxMenu = Menu.buildFromTemplate(ctxTpl)
                ctxMenu.popup(mainWindow, x, y)
            })


    }
