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
      return xjs(content,`
        let inChapter = !!document.querySelector('.annotator-wrapper .chapter'),
        element = inChapter ? document.querySelector('.annotator-wrapper .chapter') : document.querySelector('.annotator-wrapper'),
        titleEl = document.querySelector('[data-pdf-bookmark]'),
        title = titleEl ? titleEl.dataset.pdfBookmark : document.querySelector('.title').innerText;
        JSON.stringify({
          chapter: element.innerHTML,
          bookmark: title
        })`)
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

    getAuthor (...prev) {
      return xjs(content, `document.querySelector('.sbo-toc-thumb').click()`)
        .then(() => {
          return new Promise((resolve, reject) => {
            setTimeout(() => {
              xjs(content, `document.querySelector('.sbo-book-meta .authors').innerText`)
                .then((result) => {
                  let author = result.replace(/^by /, '')
                  resolve(prev.concat([author]))
                })
            }, 1000)
          })
        });
    }

  }

}