const { fork } = require("child_process")
const debug = require("debug")("polydev")
const path = require("path")
const rawBody = require("raw-body")
const generateId = require("uuid/v1")
const waitOn = require("wait-on")

const findAvailablePort = require("./findAvailablePort")

const handlers = new Map()
const launcherPath = path.resolve(__dirname, "./launcher.js")
const responses = new Map()
const cwd = process.cwd()

module.exports = function handle(router, file, routes) {
  const handler = async (req, res, next) => {
    const env = {
      // Default to "development"
      NODE_ENV: "development",
      // Favor explicit env values
      ...process.env,
      // Override PORT since it's dynamic
      PORT: await findAvailablePort()
    }

    let child = handlers.get(file)

    if (!child || !child.connected) {
      child = fork(launcherPath, [file, JSON.stringify(routes)], { cwd, env })
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
          event,
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

        switch (event) {
          case "data":
            response.write(Buffer.from(body, encoding))
            break

          case "end":
            if (!response.headersSent) {
              response.set(headers)
            }

            response.status(statusCode)
            response.send()
            responses.delete(uuid)
            break

          default:
            response.set(headers)
            response.status(statusCode)
        }
      })
    }

    const event = {
      // TODO Replace with body-parser
      body: (await rawBody(req)).toString("utf8"),
      headers: req.headers,
      host: req.headers.host,
      method: req.method,
      path: req.url,
      uuid: generateId()
    }

    responses.set(event.uuid, res)
    child.send(event)
  }

  routes.forEach(([httpMethod, route]) => {
    const method = httpMethod.toLowerCase()

    debug(`router.${method}(%o, %o)`, route, file.replace(process.cwd(), "."))

    router[method].call(
      router,
      route,
      // Make sure we always evaluate at run-time for the latest HMR'd handler
      (req, res, next) => {
        const handled = handler(req, res, next)

        // Automatically bubble up async errors
        if (handled.catch) {
          handled.catch(next)
        }
      }
    )
  })
}
