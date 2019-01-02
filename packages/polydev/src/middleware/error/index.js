export default function errorHandler(error, req, res, next) {
  const { status, statusCode = 500 } = error

  res.status(statusCode).send(`
    <body class="error">
      <link href="https://fonts.googleapis.com/css?family=Quicksand:300,500" rel="stylesheet">
      <link href="/styles.css" rel="stylesheet">

      <div id="splash"></div>

      <main>
        <h1>
          <code>${statusCode}</code> ${status}
        </h1>

        <pre>
          <code>${error.message}</code>
        </pre>
      </main>
    </body>
  `)
}
