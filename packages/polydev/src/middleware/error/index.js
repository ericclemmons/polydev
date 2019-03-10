const generateId = require("uuid/v1")
const stripAnsi = require("strip-ansi")
const Youch = require("youch")
const forTerminal = require("youch-terminal")

const nonce = generateId()

module.exports = function errorHandler(error, req, res, next) {
  const { status = "", statusCode = 500 } = error

  error.message = stripAnsi(error.message)
    .split("\n")
    .slice(0, 2)
    .join("\n")

  const youch = new Youch(error, req)

  youch.addLink((error) => {
    return `
      <link href="/_polydev/styles.css" rel="stylesheet">
      <div id="splash"></div>
    `
  })

  if (error.code === "MODULE_NOT_FOUND") {
    const [, missing] = error.message.match(/'(.*)'/)

    youch.addLink(
      () => `
      <form action="/_polydev/install-module" method="post">
        <input name="nonce" type="hidden" value="${nonce}" />
        <input name="path" type="hidden" value="${req.path}" />
        <input name="module" type="hidden" value="${missing}" />

        <h3>
          Would you like to install <kbd>${missing}</kbd>?
        </h3>

        <img src="https://img.shields.io/npm/v/${missing}.svg" />
        <img src="https://img.shields.io/npm/dm/${missing}.svg" />

        <hr />

        <button type="submit">
          <code>yarn add ${missing}</code>
        </button>

        <label>
          <input name="dev" type="checkbox" value="true" />
          <code>devDependency</code>
        </label>
      </form>
    `
    )
  }

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
