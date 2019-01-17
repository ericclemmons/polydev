// TODO HMR doesn't work when replacing the entire server.
// How can we make that more resilient? Mock out `.listen` to work _once_?
// Disable HMR for the entry file only?
//
// Or, recommend people use `module.hot`:
// > https://github.com/sidorares/hot-module-replacement/blob/master/examples/express-hot-routes/server.js
require("hot-module-replacement")({
  // options are optional
  ignore: /node_modules/ // regexp to decide if module should be ignored; also can be a function accepting string and returning true/false
})

const { spawn } = require("child_process")
const express = require("express")
const path = require("path")

const bridge = require("./bridge")

const { PORT } = process.env
const [, , handlerPath, routesString] = process.argv

// Expected to be JSON.stringify([["GET", "/"]])
const routes = JSON.parse(routesString)

// TODO Remove baseUrl unless it's needed in the route
async function startHandler() {
  const getLatestHandler = async () => {
    const exported = require(handlerPath)
    const handler = await (exported.default || exported)

    return handler
  }

  // Next.js returns a Promise for when the server is ready
  let handler = await getLatestHandler()

  if (module.hot) {
    let recentlySaved = false

    if (typeof handler === "function") {
      module.hot.accept(handlerPath, async () => {
        if (recentlySaved) {
          console.log(`♻️  Restarting ${handlerPath}`)
          return process.send("restart")
        }

        handler = await getLatestHandler()
        console.log(`🔁  Hot-reloaded ${handlerPath}`)

        // TODO Send reload signal

        // Wait for a double-save
        recentlySaved = true
        // Outside of double-save reload window
        setTimeout(() => {
          recentlySaved = false
        }, 500)
      })
    }
  }

  const url = `http://localhost:${PORT}/`

  if (typeof handler === "function") {
    const app = express()

    routes.forEach(([method, route]) => {
      app[method.toLowerCase()].call(
        app,
        route,
        // Make sure we always evaluate at run-time for the latest HMR'd handler
        (req, res) => handler(req, res)
      )
    })

    // When there's an uncaught error in the middleware, send it in a way
    // that we can handle.
    app.use(require("../error"))

    app.listen(PORT, async () => {
      console.log(`↩︎  ${handlerPath.replace(process.cwd(), ".")} from ${url}`)
    })
  } else if (typeof handler === "string") {
    // Expected to have path to `package.json`
    const pkg = require(handler)
    const cwd = path.dirname(handler)

    spawn("yarn", [pkg.scripts.dev ? "dev" : "start"], {
      cwd,
      stdio: "inherit"
    })
  } else {
    console.warn(
      `${handlerPath.replace(
        process.cwd(),
        "."
      )} does not return a Function, Server, or path to a package.json`
    )
  }

  process.on("message", bridge(PORT))
}

startHandler()
