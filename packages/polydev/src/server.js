const express = require("express")
const opn = require("opn")

const { polydev } = require(".")
const { PORT = 3000 } = process.env

process.on("uncaughtException", (error) => {
  // TODO Youch
  console.error("uncaughtException", error)
})

process.on("unhandledRejection", (error) => {
  // TODO Youch
  console.error("unhandledRejection", error)
})

const proxy = express()

proxy.use(polydev())

const server = proxy.listen(PORT, () => {
  const url = `http://localhost:${server.address().port}/`

  console.log(`🚀 Ready! ${url}`)

  if (process.argv.includes("--open")) {
    opn(url)
  }
})
