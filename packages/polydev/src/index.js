const express = require("express")
const path = require("path")

const middleware = require("./middleware")

const { NODE_ENV = "development" } = process.env

const verify = (req, res, buffer, encoding = "utf8") => {
  if (buffer && buffer.length) {
    req.rawBody = buffer.toString(encoding)
  }
}

module.exports.polydev = (options = {}) => {
  const { assets = "public", routes = "routes" } = options
  const app = express()

  // req.body is needed
  app.use(express.urlencoded({ extended: true, verify }))
  app.use(express.json({ verify }))

  app.use(middleware.assets(assets))
  app.use(middleware.router(routes))

  // TODO Merge 404 & errors together
  if (NODE_ENV === "development") {
    app.use("/_polydev", middleware.assets(path.resolve(__dirname, "./public")))
    app.use(middleware.router(path.resolve(__dirname, "./routes")))
    app.use(middleware.notFound)
    app.use(middleware.error)
  }

  return app
}
