const express = require("express")
const opn = require("opn")

const { assets, error, notFound, router } = require("./middleware")

const { NODE_ENV = "development", PORT = 3000 } = process.env

process.on("uncaughtException", (error) => {
  // TODO Youch
  console.error("uncaughtException", error)
})

process.on("unhandledRejection", (error) => {
  // TODO Youch
  console.error("unhandledRejection", error)
})

const proxy = express()

proxy.use(assets("public"))
proxy.use(router("routes"))

// TODO Merge 404 & errors together
if (NODE_ENV === "development") {
  proxy.use(notFound)
  proxy.use(error)
}

const server = proxy.listen(PORT, () => {
  const url = `http://localhost:${server.address().port}/`

  console.log(`🚀 Ready! ${url}`)

  if (process.argv.includes("--open")) {
    opn(url)
  }
})
