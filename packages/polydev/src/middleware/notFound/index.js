export default function notFound(req, res) {
  res.status(404).send(`
    <body class="error">
      <link href="https://fonts.googleapis.com/css?family=Quicksand:300,500" rel="stylesheet">
      <link href="./styles.css" rel="stylesheet">

      <div id="splash"></div>

      <main>
        <h1>
          <code>404</code> Not Found
        </h1>

        <p>
          <kbd>${req.url}</kbd>
        </p>
      </main>
    </body>
  `)
}
