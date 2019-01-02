const { request } = require("http")

module.exports = (port = process.env.PORT) => {
  if (!port) {
    throw new Error(`Cannot bridge connections without an explicit PORt`)
  }

  return function bridge(event) {
    const { body, headers, method, path, uuid } = event
    const options = {
      headers,
      method,
      port,
      path
    }

    const req = request(options, (res) => {
      const chunks = []

      process.send({
        headers: res.headers,
        statusCode: res.statusCode,
        uuid
      })

      res.on("data", (chunk) => {
        process.send({
          body: chunk.toString("base64"),
          encoding: "base64",
          event: "data",
          headers: res.headers,
          statusCode: res.statusCode,
          uuid
        })

        chunks.push(Buffer.from(chunk))
      })

      res.on("error", (error) => {
        throw error
      })

      res.on("end", () => {
        delete res.headers.connection
        delete res.headers["content-length"]

        process.send({
          body: Buffer.concat(chunks).toString("base64"),
          encoding: "base64",
          event: "end",
          headers: res.headers,
          statusCode: res.statusCode,
          uuid
        })
      })
    })

    if (body) {
      req.write(body)
    }

    req.end()
  }
}
