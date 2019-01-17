module.exports = function errorHandler(error, req, res, next) {
  const { status = "", statusCode = 500 } = error

  res.status(statusCode).send(`
    <body class="error">
      <link href="https://fonts.googleapis.com/css?family=Quicksand:300,500" rel="stylesheet">
      <link href="/_polydev/styles.css" rel="stylesheet">

      <div id="splash"></div>

      <section>
        <main>
          <h1>
            <code>${statusCode}</code> ${status}
          </h1>

          <pre><code>${error.message}</code></pre>
        </main>

        ${
          error.stack
            ? `
        <footer>
          <pre><code>${error.stack}</code></pre>
        </footer>
        `
            : ""
        }
      </section>
    </body>
  `)
}
