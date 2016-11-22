




// title
// document.querySelector('title').text.replace(/ \[+(.*)+\]/, '')

// next 
// document.querySelector('.sbo-next a').getAttribute('href')


const xjs = function (content, code) {

  console.log('xjs', code)

  return content.executeJavaScript(code, true)


}

/*
content.executeJavaScript(`
      document.querySelectorAll('.js-login-modal')[0].className += ' active'
    `, true)


      .then((result) => {
        console.log(result)
      })
      .catch((e) => {
        console.error(e)
      })

*/


module.exports = function (content) {

  return {

    isBook () {
      return xjs(content, `!!document.querySelector('.sbo-title h1')`)
        .then((result) => {
          if (result) return Promise.resolve()

          throw new Error('not a book');
        })
    },

    getTitle () {
      return xjs(content, `document.querySelector('.sbo-title h1').innerText.replace(document.querySelector('.sbo-title h1 div').innerText, '').replace(/^ */, '')`)
    }
  }

}