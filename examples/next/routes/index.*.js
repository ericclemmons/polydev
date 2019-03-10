const express = require("express")
const next = require("next")

const dev = process.env.NODE_ENV !== "production"
const pages = next({ dev })
const handle = pages.getRequestHandler()

module.exports = pages.prepare().then(() => {
  return express().get("*", (req, res) => handle(req, res))
})
