import express from "express"
import jetpack from "fs-jetpack"
import opn from "opn"
import path from "path"

export default express().use(
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
              <button>Create <code>./routes${req.path}/index.js</code></button>
            </form>
          </footer>
        </section>
      </body>
    `)
  },
  function postCreateRoute(req, res, next) {
    if (req.method !== "POST") {
      return next()
    }

    throw new Error(
      "Don't do this until we can verify the user actually said create this page! Just because an errant 404 got POST'd doesn't mean we create a page, _especially_ if it exists!"
    )

    const filepath = path.join(process.cwd(), "routes", req.path, "index.js")
    const content = `
module.exports = (req, res) => {
  res.send("📝 ${req.path}")
}
`.trimLeft()

    // Ensure the file exists
    jetpack.file(filepath, { content })

    // Open the file
    opn(`vscode://file/${filepath}`)

    // Reload the page by going to the path in the browser
    // (we don't want the port!)
    res.redirect(req.originalUrl)
  }
)
