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

  let missing

  if (error.code === "MODULE_NOT_FOUND") {
    missing = error.message.match(/'(.*)'/)[1]
  }

  if (error.message.includes("TS2307")) {
    missing = error.message.match(/TS2307: Cannot find module '(.*?)'/)[1]
  }

  if (error.message.includes("TS7016")) {
    missing = error.message.match(
      /TS7016: Could not find a declaration file for module '(.*?)'/
    )[1]

    // Rename @feathersjs/express to @types/feathersjs__express
    if (missing.startsWith("@")) {
      missing = missing.slice(1).replace("/", "__")
    }

    missing = `@types/${missing}`
  }

  if (missing && !missing.startsWith(".")) {
    missing = missing
      .split("/")
      .slice(0, missing.startsWith("@") ? 2 : 1)
      .join("/")

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
