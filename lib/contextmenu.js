const fs = require('fs')

const { Menu, app } = require('electron')
const getChapters = require('./getchapters')
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

        let saveEPUB = function (title, authors) {
            console.log('clicked Save to EPUB')
            ctxMenu = null
            ctxTpl = null

            getChapters(mainWindow, function (err, data) {

                console.log('done!', err, data)

                var Epub = require("epub-gen")

                content = data.map((page) => {
                    return {
                            // beforeToc: true //  if is shown before Table of content, such like copyright pages
                            // excludeFromToc: true,
                            title: page.bookmark,
                            author: authors,
                            data: page.chapter.replace(/( {4}|\t)/g, '  ')
                        }
                })



                var option = {
                    //css: '',
                    //output: '',
                    appendChapterTitles: false,
                    title: title,
                    author: authors,
                    publisher: "Safari Books Online", // optional
                    content: content
                };

                new Epub(option, app.getPath('desktop') + "/first.epub");
            })


            //saveBook(mainWindow)
        }

        site.isLoggedin()
            .then(() => book.isBook())
            .then(() => book.getTitle())
            .then((title) => book.getAuthor(title))
            .then(([title, authors]) => {

                title = title.replace('Table of Contents for ', '')

                ctxTpl.unshift({
                    label: `Save "${title}" as`,
                    submenu: [
                        {
                            label: 'EPUB',
                            click: saveEPUB.bind(null, title, authors)
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
