const async = require('async')
const bookModel = require('./bookmodel')

const loadPage  = function (mainWindow, pageUrl) {
    return new Promise(function (resolve, reject) {
        mainWindow.webContents.once('did-finish-load', function () {
            console.log('did-finish-load')
            resolve()
        })
        mainWindow.loadURL("https://www.safaribooksonline.com" + pageUrl)
    })
}

const chapterSave = function (book, mainWindow, url) {
    return function (callback) {

        console.log('load', url)

        loadPage(mainWindow, url)
            .then(() => book.getCurrentChapter())
            .then(result => JSON.parse(result))
            .then(result => {
                callback(null, result)
            })
    }
}

module.exports = function (mainWindow, done) {
    const book = bookModel(mainWindow.webContents)

    book.getTOC()
        .then((tocJson) => {
            let toc = JSON.parse(tocJson)

            console.log(toc.map(chapterSave.bind(null, book, mainWindow)))

            async.series(toc.map(chapterSave.bind(null, book, mainWindow)), done)
        })
}