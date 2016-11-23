




// title
// document.querySelector('title').text.replace(/ \[+(.*)+\]/, '')

// next 
// document.querySelector('.sbo-next a').getAttribute('href')


const xjs = function (content, code) {
  console.log('xjs', code)

  return content.executeJavaScript(code, true)
}

module.exports = function (content) {

  return {

    isBook () {
      return xjs(content, `!!document.querySelector('.sbo-title h1')`)
        .then((result) => {
          if (result) return Promise.resolve();
          throw new Error('not a book');
        })
    },

    isLoggedin () {
      return xjs(content, `!!document.querySelector('html').dataset.userUuid`)
        .then(result => {
          if (result) return Promise.resolve();
          throw new Error('not logged in')
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