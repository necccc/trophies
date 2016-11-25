const xjs = require('./util/xjs')

module.exports = function (content) {

  return {

    isBook () {
      return xjs(content, `!!document.querySelector('.sbo-title h1')`)
        .then((result) => {
          if (result) return Promise.resolve();
          throw new Error('not a book');
        })
    },

    getTitle () {
      return xjs(content, `document.querySelector('.sbo-title h1').innerText`)
    },

    getCurrentChapter () {
      return xjs(content,`JSON.stringify({chapter: document.querySelector('.annotator-wrapper section').innerHTML, bookmark: document.querySelector('.annotator-wrapper section').dataset.pdfBookmark})`)
    },

    getFirstPage () {
      return xjs(content, `document.querySelector('.tocList li:first-child a').getAttribute('href')`);
    },

    getTOC () {
      return xjs(content, `document.querySelector('.sbo-toc-thumb').click()`)
        .then(() => {
          return new Promise((resolve, reject) => {
            setTimeout(() => {
              xjs(content, `JSON.stringify([...document.querySelectorAll('.tocList li a')].map((toc) => toc.getAttribute('href')))`)
              .then((result) => {
                resolve(result)
              })
            }, 1000)
          })
        });
    },

    getAuthor (title) {
      return xjs(content, `document.querySelector('.sbo-toc-thumb').click()`)
        .then(() => {
          return new Promise((resolve, reject) => {
            setTimeout(() => {
              xjs(content, `document.querySelector('.sbo-book-meta .authors').innerText`)
              .then((result) => {
                resolve([title,result])
              })
            }, 1000)
          })
        });
//sbo-book-meta

    }

//     JSON.stringify([...document.querySelectorAll('.tocList li a')].map((toc) => toc.getAttribute('href')))

  }

}