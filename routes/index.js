module.exports = (req, res) => {
  res.send(`
    <head>
      <link href="https://fonts.googleapis.com/css?family=Quicksand:300,500" rel="stylesheet">
      <link href="/_polydev/styles.css" rel="stylesheet">
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
              <a href="/does-not-exist">Error <code>404</code> page</a>.
            </li>
            <li>
              <a href="/error">Error <code>500</code> page</a>.
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
              <a href="/logo">Logo</a>
            </li>
            <li>
              <a href="/next">Next.js</a>
            </li>
            <li>
              <a href="/users/example">Parameterized Routes</a>
            </li>
            <li>
              <a href="/sse">Server-Sent Events (SSE)</a>
            </li>
          </ul>
        </main>
      </section>
    </body>
  `)
}
