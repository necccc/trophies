module.exports = function xjs (content, code) {
  console.log('xjs', code)

  return content.executeJavaScript(code, true)
}