const express = require("express")

module.exports = express().get("/", (req, res) => {
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
