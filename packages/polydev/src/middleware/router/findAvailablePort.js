const { Server } = require("http")

module.exports = async function findAvailablePort(port = 4000) {
  return new Promise((resolve, reject) => {
    const server = new Server()

    server.on("error", (err) => {
      if (err.code !== "EADDRINUSE") {
        return reject(err)
      }

      server.listen(++port)
    })

    server.on("listening", () => {
      server.close(() => resolve(port))
    })

    server.listen(port)
  })
}
