const express = require("express")

module.exports = express()
  .use((req, res, next) => {
    console.log(req.path, req.url)
    next()
  })
  .get("/express", (req, res) => {
    res.send(`
      <link href="https://fonts.googleapis.com/css?family=Quicksand:300,500" rel="stylesheet">
      <link href="./styles.css" rel="stylesheet">

      <div id="splash"></div>

      <main>
        <h1>
          👋 Howdy from <kbd>express</kbd>
        </h1>
      </main>
    `)
  })
