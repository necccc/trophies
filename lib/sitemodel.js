const xjs = require('./util/xjs')

module.exports = function (content) {

  return {

    isLoggedin () {

      return xjs(content, `!!document.querySelector('html').dataset.userUuid`)
        .then(result => {
          if (result) return Promise.resolve();
          throw new Error('not logged in')
        })

    },

  }

}