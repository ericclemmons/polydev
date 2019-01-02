const express = require("express")

let hits = 0

module.exports = express().get("/", (req, res) => {
  hits++

  res.send(`
    <link href="https://fonts.googleapis.com/css?family=Quicksand:300,500" rel="stylesheet">
    <link href="/styles.css" rel="stylesheet">

    <div id="splash"></div>

    <section>
      <main>
        <h1>
          👋 Howdy from <kbd>express</kbd>
        </h1>

        <p>
          <kbd>${hits}</kbd> ${hits ? "hits" : "hit"}
        </p>
      </main>

      <footer>
        <a href="/">&laquo; Back</a>
      </footer>
    </section>
  `)
})
