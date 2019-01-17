const bodyParser = require("body-parser")
const express = require("express")
const jetpack = require("fs-jetpack")
const opn = require("opn")
const path = require("path")
const generateId = require("uuid/v1")
const waitOn = require("wait-on")

const nonce = generateId()

module.exports = express()
  // req.body is needed
  .use(bodyParser.urlencoded({ extended: false }))
  .use(bodyParser.json())

  // This handler only responds to GET/POST, not HEAD/OPTIONS/etc.
  .use(
    function onlyGetPost(req, res, next) {
      if (["GET", "POST"].includes(req.method)) {
        return next()
      }

      return next("route")
    },
    function getNotFound(req, res, next) {
      if (req.method !== "GET") {
        return next()
      }

      const filepath = path
        .join(process.cwd(), "routes", req.path, "index.js")
        .replace(process.cwd(), ".")

      res.status(404).send(`
        <head>
          <link href="https://fonts.googleapis.com/css?family=Quicksand:300,500" rel="stylesheet">
          <link href="/styles.css" rel="stylesheet">
        </head>
        <body class="error">

          <div id="splash"></div>

          <section>
            <main>
              <h1>
                <code>404</code> Not Found
              </h1>

              <p>
                <kbd>${req.path}</kbd>
              </p>

              <form method="post">
                <input name="nonce" type="hidden" value="${nonce}" />
                <input name="path" type="hidden" value="${req.path}" />

                <button>Create <code>${filepath}</code></button>
              </form>
            </main>

            <footer>
              <a href="/">&laquo; Back</a>
            </footer>
          </section>
        </body>
      `)
    },
    async function postCreateRoute(req, res, next) {
      if (req.method !== "POST") {
        return next()
      }

      if (req.body.nonce !== nonce) {
        throw new Error(`Invalid "nonce" value`)
      }

      if (req.body.path !== req.path) {
        throw new Error(
          `Expected ${JSON.stringify(req.path)}, not ${JSON.stringify(
            req.body.path
          )}`
        )
      }

      const filepath = path.join(process.cwd(), "routes", req.path, "index.js")

      if (jetpack.exists(filepath)) {
        throw new Error(`Route already exists at ${filepath}`)
      }

      const content = `
module.exports = (req, res) => {
  res.send("📝 ${req.path}")
}
`.trimLeft()

      // Create the file exists
      jetpack.file(filepath, { content })

      // Wait for the file to exist
      await waitOn({ resources: [filepath] }, undefined)

      // Wait for the file to open
      await opn(`vscode://file/${filepath}`, { wait: false })

      // Reload the requested URL
      // ! Hopefully the router has been re-created by this point!
      res.redirect(req.originalUrl)
    }
  )
