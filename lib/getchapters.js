const async = require('async')
const bookModel = require('./bookmodel')
const ProgressEvents = require('./progressEvents')

const loadPage  = function (mainWindow, pageUrl) {
    return new Promise(function (resolve, reject) {
        mainWindow.webContents.once('did-finish-load', () => resolve())
        mainWindow.loadURL(`https://www.safaribooksonline.com${pageUrl}/?ts=${+new Date()}`)
    })
}

const createChapterSave = function (book, mainWindow, url) {
    return function (callback) {
        loadPage(mainWindow, url)
            .then(() => book.getCurrentChapter())
            .then(result => JSON.parse(result))
            .then(result => {
                ProgressEvents.next()
                callback(null, result)
            })
            .catch(err => { throw err })
    }
}

module.exports = function (mainWindow) {
    const book = bookModel(mainWindow.webContents)

    book.getTOC()
        .then((tocJson) => book.getAuthor(tocJson))
        .then(([tocJson, authors]) => {
            let toc = JSON.parse(tocJson)

            ProgressEvents.items = toc.map((url, i) => `Chapter ${i+1}`)

            return new Promise((reject, resolve) => {
                async.series(
                    toc.map(createChapterSave.bind(null, book, mainWindow)),
                    (err, results) => {
                        if (err) return reject(err)

                        resolve({authors, results})
                    }
                )
            })
        })
}