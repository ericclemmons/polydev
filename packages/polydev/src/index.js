const express = require("express")
const path = require("path")

const middleware = require("./middleware")

const { NODE_ENV = "development" } = process.env

module.exports.polydev = (options = {}) => {
  const { assets = "public", routes = "routes" } = options
  const app = express()

  app.use(middleware.assets(assets))
  app.use(middleware.router(routes))

  // TODO Merge 404 & errors together
  if (NODE_ENV === "development") {
    app.use("/_polydev", middleware.assets(path.resolve(__dirname, "./public")))
    app.use(middleware.notFound)
    app.use(middleware.error)
  }

  return app
}
