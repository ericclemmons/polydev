import { fork } from "child_process"
import { existsSync } from "fs"
import path from "path"
import rawBody from "raw-body"
import generateId from "uuid/v1"
import waitOn from "wait-on"
import findAvailablePort from "./findAvailablePort"

const cwd = process.cwd()
const { NODE_ENV = "development" } = process.env
const handlers = new Map()
const launcherPath = path.resolve(__dirname, "./launcher.js")
const responses = new Map()

export default async function router(req, res, next) {
  const routePath = req.path
  const handlerPath = path.join(cwd, "routes", routePath, "index.js")

  if (!existsSync(handlerPath)) {
    return next()
  }

  const env = { NODE_ENV, PORT: await findAvailablePort() }

  let child

  // TODO Don't kill these with every request
  if (handlers.has(handlerPath)) {
    handlers.get(handlerPath).kill()
    handlers.delete(handlerPath)
  }

  if (handlers.has(handlerPath)) {
    child = handlers.get(handlerPath)
  } else {
    // TODO Wait for `env.PORT` to become available?
    child = fork(launcherPath, [handlerPath, routePath], {
      cwd,
      env
    })
    handlers.set(handlerPath, child)

    // Some things have a build step like Next and aren't ready yet.
    // TODO This takes ~1-1.5s every time, but I don't know why.
    // This can be removed & work for most examples _except_ next.
    await waitOn({ interval: 10, resources: [`tcp:${env.PORT}`] }, undefined)

    child.on("message", payload => {
      const {
        body,
        encoding = "utf8",
        headers = {},
        statusCode = 200,
        uuid
      } = payload

      if (!uuid) {
        throw new Error(
          `Handlers must respond with the corresponding request's UUID`
        )
      }

      const response = responses.get(payload.uuid)

      if (!response) {
        throw new Error(`No response exists for UUID "${uuid}"`)
      }

      response.set(headers)
      response.status(statusCode)
      response.send(Buffer.from(body, encoding))

      responses.delete(uuid)
    })
  }

  const event = {
    body: (await rawBody(req)).toString("utf8"),
    headers: req.headers,
    host: req.headers.host,
    method: req.method,
    // Remove `./routes/...` prefix
    // path: `/${req.url.slice(req.path.length)}`,
    path: req.url,
    uuid: generateId()
  }

  responses.set(event.uuid, res)
  child.send(event)
}
