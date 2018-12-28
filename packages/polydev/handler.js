import { fork } from "child_process"
import path from "path"
import rawBody from "raw-body"
import st from "st"

import findAvailablePort from "./findAvailablePort"

const cwd = process.cwd()
const lambdaPath = path.join(__dirname, "./lambda.js")
const mount = st({
  cache: false,
  index: false,
  passthrough: true,
  path: "./public/",
  url: "/"
})
const { NODE_ENV = "development" } = process.env
const processes = new Map()

// Attempt to serve a static asset
const asset = (req, res) => new Promise(resolve => mount(req, res, resolve))

export default async function handler(req, res) {
  await asset(req, res)

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

  const child = fork(lambdaPath, [handler], { cwd, env })

  child.on("error", error => {
    console.error("error", { error })
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
    const { body, encoding = "utf8", headers = {}, statusCode } = payload

    res.writeHead(statusCode, headers)
    res.write(Buffer.from(body, encoding))
    res.end()
  })
}
