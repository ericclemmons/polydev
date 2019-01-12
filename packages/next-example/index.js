const express = require("express")
const next = require("next")

const port = parseInt(process.env.PORT, 10) || 3000
const dev = process.env.NODE_ENV !== "production"
const pages = next({
  dev,
  // ! Explicitly override the default of process.cwd()
  dir: __dirname
})

pages.setAssetPrefix("/next")

const handle = pages.getRequestHandler()

module.exports = pages.prepare().then(() => {
  return express().use(
    "/next",
    express().get("*", (req, res) => handle(req, res))
  )
})
