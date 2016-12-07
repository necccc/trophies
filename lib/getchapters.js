const async = require('async')
const bookModel = require('./bookmodel')

const loadPage  = function (mainWindow, pageUrl) {
    return new Promise(function (resolve, reject) {
        mainWindow.webContents.once('did-finish-load', () => resolve())
        mainWindow.loadURL("https://www.safaribooksonline.com" + pageUrl)
    })
}

const createChapterSave = function (book, mainWindow, url) {
    return function (callback) {
        loadPage(mainWindow, url)
            .then(() => book.getCurrentChapter())
            .then(result => JSON.parse(result))
            .then(result => {
                callback(null, result)
            })
            .catch(err => { throw err })
    }
}

module.exports = function (mainWindow, done) {
    const book = bookModel(mainWindow.webContents)

    book.getTOC()
        .then((tocJson) => book.getAuthor(tocJson))
        .then(([tocJson, authors]) => {
            let toc = JSON.parse(tocJson)
            async.series(
                toc.map(createChapterSave.bind(null, book, mainWindow)), 
                done.bind(null, authors)
            )
        })
}