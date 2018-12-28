import { Server } from "http"
import opn from "opn"
import handler from "./handler"

const server = new Server(handler)
const { PORT = 3000 } = process.env

process.on("uncaughtException", error => {
  // TODO Youch
  console.error("uncaughtException", error)
})

process.on("unhandledRejection", error => {
  // TODO Youch
  console.error("unhandledRejection", error)
})

server.listen(PORT, () => {
  const url = `http://localhost:${server.address().port}/`

  console.log(`🚀 Ready! ${url}`)
  opn(url)
})
