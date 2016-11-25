const xjs = require('./util/xjs')





// title
// document.querySelector('title').text.replace(/ \[+(.*)+\]/, '')

// next 
// document.querySelector('.sbo-next a').getAttribute('href')

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
    }

  }

}