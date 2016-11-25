const fs = require('fs')

const { Menu, app } = require('electron')
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

        let saveEPUB = function () {
            console.log('clicked Save to EPUB')
            ctxMenu = null
            ctxTpl = null


            book.getCurrentChapter()
                .then(result => JSON.parse(result))
                .then(result => {
                    var Epub = require("epub-gen")

                    result.chapter = result.chapter.replace(/( {4}|\t)/g, '  ')

                    var option = {
                        //css: '',
                        //output: '',
                        appendChapterTitles: false,
                        title: "Some title", // *Required, title of the book.
                        author: "Lewis Carroll", // *Required, name of the author.
                        publisher: "Macmillan & Co.", // optional
                        content: [
                            {
                                // beforeToc: true //  if is shown before Table of content, such like copyright pages
                                // excludeFromToc: true,
                                title: result.bookmark,
                                author: "John Doe", // Optional
                                data: result.chapter
                            }
                        ]
                    };

                    new Epub(option, app.getPath('desktop') + "/first.epub");
                })

            //saveBook(mainWindow)
        }

        site.isLoggedin()
            .then(() => book.isBook())
            .then(() => book.getTitle())
            .then((title) => {

                title = title.replace('Table of Contents for ', '')

                ctxTpl.unshift({
                    label: `Save "${title}" as`,
                    submenu: [
                        {
                            label: 'EPUB',
                            click: saveEPUB
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
                // display contextmenu in the final catch
                return Promise.reject()
            })
            .catch(() => {
                ctxMenu = Menu.buildFromTemplate(ctxTpl)
                ctxMenu.popup(mainWindow, x, y)
            })


    }
