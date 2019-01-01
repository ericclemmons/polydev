const { request } = require("http")

module.exports = async function bridge(port = process.env.PORT, event) {
  if (!port) {
    throw new Error(`Cannot bridge connections without an explicit PORt`)
  }

  const { body, headers, method, path, uuid } = event
  const options = {
    headers,
    method,
    port,
    path
  }

  return new Promise(resolve => {
    const req = request(options, res => {
      const chunks = []

      res.on("data", chunk => chunks.push(Buffer.from(chunk)))
      res.on("error", error => {
        throw error
      })

      res.on("end", () => {
        delete res.headers.connection
        delete res.headers["content-length"]

        resolve({
          body: Buffer.concat(chunks).toString("base64"),
          encoding: "base64",
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
  })
}
