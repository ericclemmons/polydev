// TODO Enable ESM here?
const { request, Server } = require("http")

module.exports = (req, res) => {
  res.writeHead(200, { "Content-Type": "text/html; charset=utf-8" })
  res.end("👋 Howdy from Polydev!")
}

// TODO This should be a bridge
const server = new Server(module.exports)

server.listen(process.env.PORT, () => {
  const { port } = server.address()

  if (process.send) {
    process.on("message", async event => {
      const { body, headers, method, path } = event
      const options = {
        headers,
        method,
        port,
        path
      }

      const req = request(options, res => {
        const chunks = []

        res.on("data", chunk => chunks.push(Buffer.from(chunk)))
        res.on("error", error => {
          throw error
        })

        res.on("end", () => {
          delete res.headers.connection
          delete res.headers["content-length"]

          process.send({
            statusCode: res.statusCode,
            headers: res.headers,
            body: Buffer.concat(chunks).toString("base64"),
            encoding: "base64"
          })
        })
      })

      if (body) {
        req.write(body)
      }

      req.end()
    })
  }
})
