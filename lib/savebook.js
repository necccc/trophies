const Epub = require("./epub-gen")
const async = require('async')
const { app } = require('electron')
const getChapters = require('./getchapters')
const ProgressWindow = require('./progressWindow')

module.exports = function (type, title, mainWindow) {

console.log(type, title)

    let saveTo = app.getPath('desktop') + `/${title}.epub`

    let progressw = new ProgressWindow(mainWindow)

    progressw.open()

    getChapters(mainWindow)
        .then(({authors, data}) => {

            ProgressEvents.push('Saving book')

            let content = data.map((page) => {
                return {
                    // beforeToc: true //  if is shown before Table of content, such like copyright pages
                    // excludeFromToc: true,
                    title: page.bookmark,
                    // fix code example indents
                    data: page.chapter.replace(/( {4}|\t)/g, '  ')
                }
            })

            let option = {
                //css: '',
                //output: '',
                appendChapterTitles: false,
                title: title,
                author: authors,
                publisher: "Safari Books Online", // optional
                content: content
            };

            return new Epub(option, saveTo).promise
        })
        .then(() => {
                console.log('Done!')
                ProgressEvents.done()
                progressw.close()
                overlay(mainWindow.webContents, false)
            })
        .catch((err) => {})
}