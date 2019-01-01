// TODO HMR doesn't work when replacing the entire server.
// How can we make that more resilient? Mock out `.listen` to work _once_?
// Disable HMR for the entry file only?
require("hot-module-replacement")({
  // options are optional
  ignore: /node_modules/ // regexp to decide if module should be ignored; also can be a function accepting string and returning true/false
})

const express = require("express")

const bridge = require("./bridge")

// TODO Wrap this all in an async function so any errors can be caught & sent
// via: https://github.com/programble/errio

const { PORT } = process.env
const [, , ...args] = process.argv

async function startHandler(handlerPath, baseUrl = "/") {
  const getLatestHandler = async () => {
    const exported = require(handlerPath)
    const handler = await (exported.default || exported)

    return handler
  }

  // Next.js returns a Promise for when the server is ready
  let handler = await getLatestHandler()

  if (module.hot) {
    let recentlySaved = false

    module.hot.accept(handlerPath, async () => {
      if (recentlySaved) {
        console.log(`♻️  Restarting ${baseUrl}`)
        return process.send("restart")
      }

      handler = await getLatestHandler()
      console.log(`🔁  Hot-reloaded ${baseUrl}`)

      // TODO Send reload signal

      // Wait for a double-save
      recentlySaved = true
      // Outside of double-save reload window
      setTimeout(() => {
        recentlySaved = false
      }, 500)
    })
  }

  const url = `http://localhost:${PORT}/`

  if (typeof handler === "function") {
    const app = express().use(
      // Make sure we always evaluate at run-time for the latest HMR'd handler
      (req, res) => handler(req, res)
    )

    app.listen(PORT, async () => {
      console.log(`↩︎  ${handlerPath.replace(process.cwd(), ".")} from ${url}`)
    })
  } else {
    console.warn(
      `${handlerPath.replace(
        process.cwd(),
        "."
      )} does not return a Function or a Server`
    )
  }

  process.on("message", async (event) => {
    const payload = await bridge(PORT, event)

    process.send(payload)
  })
}

startHandler(...args)
