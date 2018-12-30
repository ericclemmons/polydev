const { request } = require("http")

module.exports = (port = process.env.PORT) => {
  if (!port) {
    throw new Error(`Cannot bridge connections without an explicit PORt`)
  }

  return async function bridge(event) {
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
  }
}
