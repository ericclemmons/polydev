module.exports = (req, res) => {
  res.writeHead(200, { "Content-Type": "text/html; charset=utf-8" })
  res.end(`
    <link href="https://fonts.googleapis.com/css?family=Quicksand:300,500" rel="stylesheet">
    <link href="./styles.css" rel="stylesheet">

    <div id="splash"></div>

    <main>
      <h1>
        👋 Howdy from <kbd>polydev</kbd>
      </h1>

      <h3>Examples</h3>
      <ul>
        <li>
          <a href="/apollo-server">Apollo Server</a>
        </li>
      </ul>
    </main>
  `)
}
