module.exports = (req, res) => {
  res.send(`
    <head>
      <link href="https://fonts.googleapis.com/css?family=Quicksand:300,500" rel="stylesheet">
      <link href="./styles.css" rel="stylesheet">
    </head>

    <body>
      <div id="splash"></div>

      <section>
        <main>
          <h1>
            👋 Howdy from <kbd>polydev</kbd>
          </h1>

          <h3>Examples</h3>
          <ul>
            <li>
              <a href="/does-not-exist"><code>404</code> page</a>.
            </li>
            <li>
              <a href="/apollo-server">Apollo Server</a>
            </li>
            <li>
              <a href="/express">Express</a>
            </li>
            <li>
              <a href="/graphql">GraphQL</a>
            </li>
            <li>
              <a href="/next">Next.js</a>
            </li>
          </ul>
        </main>
      </section>
    </body>
  `)
}
