import { fork } from "child_process"
import path from "path"
import rawBody from "raw-body"
import generateId from "uuid/v1"
import waitOn from "wait-on"

import findAvailablePort from "./findAvailablePort"

const { NODE_ENV = "development" } = process.env

const handlers = new Map()
const launcherPath = path.resolve(__dirname, "./launcher.js")
const responses = new Map()
const cwd = process.cwd()

export default function handle(file) {
  return async function handler(req, res, next) {
    // TODO Replace with `route`?
    const routePath = req.path
    const env = {
      NODE_ENV,
      PORT: await findAvailablePort(),
      ROUTE_PATH: routePath
    }

    let child = handlers.get(file)

    if (!child || !child.connected) {
      // TODO Should this be the full URL?
      child = fork(launcherPath, [file, routePath], { cwd, env })
      handlers.set(file, child)

      // Some things have a build step like Next and aren't ready yet.
      // TODO This takes ~1-1.5s every time, but I don't know why.
      // This can be removed & work for most examples _except_ next.
      await waitOn({ interval: 10, resources: [`tcp:${env.PORT}`] }, undefined)

      child.on("message", (message) => {
        if (message === "restart") {
          handlers.get(file).kill()
          return handlers.delete(file)
        }

        const {
          body,
          encoding = "utf8",
          headers = {},
          statusCode = 200,
          uuid
        } = message

        if (!uuid) {
          throw new Error(
            `Handlers must respond with the corresponding request's UUID`
          )
        }

        const response = responses.get(message.uuid)

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
      // TODO Replace with body-parser
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
}
