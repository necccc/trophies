const Epub = require("./epub-gen")
const async = require('async')
const { app } = require('electron')


let overlay = function (webcontents, toggle, saveTo = '') {
    if (toggle) {
        xjs(webcontents,
            `
                var d = document.createElement('div');
                d.id = "TrophiesNotification";
                d.className = "trophies";
                d.style.cssText = "position: fixed;padding: 25px 50px 50px;top: 50%;left: 50%;background: white;border: 1px solid rgb(221, 221, 221);border-radius: 2px;box-shadow: rgba(0, 0, 0, .5) 0px 0px 20px 5px;font-size: 72px;transform: translate(-50%, -50%);z-index: 101;font-family: 'source sans pro',sans-serif,AvenirNextCondensed-Medium,HelveticaNeue-CondensedBold,'Droid Sans',Helvetica,Arial,sans-serif!important";
                var h = document.createElement('h1');
                h.innerText = "Working, please wait...";
                h.style.cssText = "line-height: 64px;font-size: 32px;";
                var p = document.createElement('p'); p.innerText = "Saving to ${saveTo}";
                d.appendChild(h); d.appendChild(p);
                var c = document.createElement('div');
                c.id = "TrophiesNotificationCover";
                c.style.cssText = "position: fixed;padding: 0;top: 0;left: 0;background: rgba(0,0,0,.3);z-index: 100;width: 100%;height: 100%;";
                c.className = "trophies";
                document.querySelector('body').appendChild(d);
                document.querySelector('body').appendChild(c);
            `
        )
    } else {
        xjs(webcontents,`[...document.querySelectorAll('.trophies')].map((node) => {node.parentNode.removeChild(node)})`)
    }
}

module.exports = {
    getInstance: function (title, mainWindow) {
        return function (authors, err, data) {

                if (err) throw err;

                let saveTo = app.getPath('desktop') + `/${title}.epub`
                
                content = data.map((page) => {
                    return {
                        // beforeToc: true //  if is shown before Table of content, such like copyright pages
                        // excludeFromToc: true,
                        title: page.bookmark,
                        // fix code example indents
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

                // todo inject "working" overlay
                // separate window with progress bar?
                // https://getmdl.io/components/#loading-section

                overlay(mainWindow.webContents, true, saveTo)

                new Epub(option, saveTo).promise
                    .then(() => {
                        console.log('Done!')
                        overlay(mainWindow.webContents, false)
                    })
                    .catch((err) => {
                        console.log(err)
                    });
            }
    }
}