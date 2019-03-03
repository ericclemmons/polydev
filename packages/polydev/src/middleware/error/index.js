const Youch = require("youch")
const forTerminal = require("youch-terminal")

module.exports = function errorHandler(error, req, res, next) {
  const { status = "", statusCode = 500 } = error

  const youch = new Youch(error, req)

  youch.toHTML().then((html) => {
    res.status(statusCode).send(html)
  })

  youch
    .toJSON()
    .then(forTerminal)
    .then(console.log)
}
