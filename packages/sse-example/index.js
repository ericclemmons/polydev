const { sse } = require("@toverux/expresse")
const express = require("express")
const path = require("path")

module.exports = express()
  .get("/", (req, res) => {
    const eventUrl = path.join(req.originalUrl, "time")

    res.send(`
      📝 /event-stream

      <script>
        const source = new EventSource(${JSON.stringify(eventUrl)})
        source.addEventListener("message", console.log)
      </script>
    `)
  })
  .get("/time", sse(), (req, res) => {
    let messageId = parseInt(req.header("Last-Event-ID"), 10) || 0

    setInterval(() => {
      messageId++
      const message = new Date().toLocaleTimeString("en-US")

      res.sse.data(message, messageId)
      res.sse.event("time", message, messageId)
      res.sse.comment(message)
    }, 1000)
  })
