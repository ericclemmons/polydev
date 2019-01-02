const { sse } = require("@toverux/expresse")
const express = require("express")
const path = require("path")

const time = () => new Date().toLocaleTimeString("en-US")

module.exports = express()
  .get("/", (req, res) => {
    const eventUrl = path.join(req.originalUrl, "time")

    res.send(`
      <link href="https://fonts.googleapis.com/css?family=Quicksand:300,500" rel="stylesheet">
      <link href="/styles.css" rel="stylesheet">

      <div id="splash"></div>

      <section>
        <main>
          <h1>
            👇 Server-Sent Events (SSE)
          </h1>

          <p>
            The time is <kbd id="time">${time()}</kbd>
          </p>

          <p>
            <em>(View the console for more)</em>
          </p>
        </main>

        <footer>
          <a href="/">&laquo; Back</a>
        </footer>
      </section>

      <script>
        const source = new EventSource(${JSON.stringify(eventUrl)})

        source.addEventListener("message", (message) => {
          console.log(message)

          document.getElementById("time").innerHTML = JSON.parse(message.data)
        })
      </script>
    `)
  })
  .get("/time", sse(), (req, res) => {
    let messageId = parseInt(req.header("Last-Event-ID"), 10) || 0

    setInterval(() => {
      messageId++
      const message = time()

      res.sse.data(message, messageId)
      res.sse.event("time", message, messageId)
      res.sse.comment(message)
    }, 1000)
  })
