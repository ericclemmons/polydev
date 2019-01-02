import bodyParser from "body-parser"
import express from "express"
import jetpack from "fs-jetpack"
import opn from "opn"
import path from "path"
import generateId from "uuid/v1"
import waitOn from "wait-on"

const nonce = generateId()

export default express()
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

      res.status(404).send(`
        <head>
          <link href="https://fonts.googleapis.com/css?family=Quicksand:300,500" rel="stylesheet">
          <link href="./styles.css" rel="stylesheet">
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
            </main>

            <footer>
              <form method="post">
                <input name="nonce" type="hidden" value="${nonce}" />
                <input name="path" type="hidden" value="${req.path}" />

                <button>Create <code>./routes${
                  req.path
                }/index.js</code></button>
              </form>
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
