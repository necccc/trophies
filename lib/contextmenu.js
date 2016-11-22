const { Menu } = require('electron')
const ctxMenuTemplate = [
    {
      role: 'quit'
    }
]

module.exports = function (book, mainWindow, x, y) {

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


        book.isBook()
            .then(book.getTitle())
            .then((title) => {
                
                console.log('has title', title)
                
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
                ctxMenu.popup(mainWindow, x, y)
            })
            .catch(() => {
                ctxMenu = Menu.buildFromTemplate(ctxTpl)
                ctxMenu.popup(mainWindow, x, y)
            })

    
    }
