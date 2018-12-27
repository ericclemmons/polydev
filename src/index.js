import { fork } from "child_process"
import { Server } from "http"
import opn from "opn"
import path from "path"
import rawBody from "raw-body"

import findAvailablePort from "./findAvailablePort"

const server = new Server()
const cwd = process.cwd()
const { NODE_ENV = "development", PORT = 3000 } = process.env
const lambdaPath = path.join(__dirname, "./lambda.js")
const processes = new Map()

server.on("request", async (req, res) => {
  const { url } = req
  const handler = path.join(cwd, "routes", url, "index.js")
  const env = {
    NODE_ENV,
    PORT: await findAvailablePort()
  }

  if (processes.has(handler)) {
    processes.get(handler).kill()
    processes.delete(handler)
  }

  const child = fork(lambdaPath, [handler], {
    cwd,
    env
  })

  // TODO Wait for `env.PORT` to become available?
  processes.set(handler, child)

  const event = {
    host: req.headers.host,
    path: req.url,
    method: req.method,
    headers: req.headers,
    body: (await rawBody(req)).toString("utf8")
  }

  child.send(event)
  child.on("message", payload => {
    const { body, encoding, headers, statusCode } = payload

    res.writeHead(statusCode, {
      "Content-Type": "text/html; charset=utf-8",
      ...headers
    })

    if (encoding === "base64") {
      res.write(Buffer.from(body, encoding))
    } else if (encoding === undefined) {
      res.write(Buffer.from(body))
    } else {
      throw new Error(`Unsupported encoding: ${encoding}`)
    }

    res.end()
  })
})

process.on("uncaughtException", error => {
  console.error(error)
})

process.on("unhandledRejection", error => {
  console.error(error)
})

server.listen(PORT, () => {
  const url = `http://localhost:${server.address().port}/`

  console.log(`🚀 Ready! ${url}`)
  opn(url)
})
