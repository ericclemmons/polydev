import { fork } from "child_process"
import { existsSync } from "fs"
import path from "path"
import rawBody from "raw-body"

import findAvailablePort from "./findAvailablePort"

const cwd = process.cwd()
const { NODE_ENV = "development" } = process.env
const handlers = new Map()
const launcherPath = path.resolve(__dirname, "./launcher.js")

export default async function router(req, res, next) {
  const routePath = req.path
  const handlerPath = path.join(cwd, "routes", routePath, "index.js")

  if (!existsSync(handlerPath)) {
    return next()
  }

  const env = {
    NODE_ENV,
    PORT: await findAvailablePort()
  }

  if (handlers.has(handlerPath)) {
    handlers.get(handlerPath).kill()
    handlers.delete(handlerPath)
  }

  const child = fork(launcherPath, [handlerPath, routePath], { cwd, env })
  handlers.set(handlerPath, child)

  // TODO Wait for `env.PORT` to become available?

  const event = {
    host: req.headers.host,
    path: req.url,
    method: req.method,
    headers: req.headers,
    body: (await rawBody(req)).toString("utf8")
  }

  child.send(event)

  // Wait for bridge to respond back
  child.on("message", payload => {
    const { body, encoding = "utf8", headers = {}, statusCode } = payload

    res.writeHead(statusCode, headers)
    res.write(Buffer.from(body, encoding))
    res.end()
  })
}
