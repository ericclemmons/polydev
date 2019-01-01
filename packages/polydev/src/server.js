import express from "express"
import opn from "opn"

import { assets, error, notFound, router } from "./middleware"

const { PORT = 3000 } = process.env

const proxy = express()
  .use(assets)
  .use(router)
  .use(notFound)
  .use(error)

const server = proxy.listen(PORT, () => {
  const url = `http://localhost:${server.address().port}/`

  console.log(`🚀 Ready! ${url}`)

  if (process.argv.includes("--open")) {
    opn(url)
  }
})
