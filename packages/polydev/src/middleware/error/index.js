const Youch = require("youch")
const forTerminal = require("youch-terminal")

module.exports = function errorHandler(error, req, res, next) {
  const { status = "", statusCode = 500 } = error

  const youch = new Youch(error, req)

  youch.addLink((error) => {
    return `
      <link href="/_polydev/styles.css" rel="stylesheet">
      <div id="splash"></div>
    `
  })

  youch.addLink(({ message }) => {
    const url = `https://google.com/search?q=${encodeURIComponent(message)}`

    return `<a href="${url}" target="_blank" title="Search Google"><i class="fab fa-google"></i></a>`
  })

  youch.addLink(({ message }) => {
    const url = `https://stackoverflow.com/search?q=${encodeURIComponent(
      message
    )}`

    return `<a href="${url}" target="_blank" title="Search Stack Overflow"><i class="fab fa-stack-overflow"></i></a>`
  })

  youch.toHTML().then((html) => {
    res.status(statusCode).send(html)
  })

  youch
    .toJSON()
    .then(forTerminal)
    .then(console.log)
}
