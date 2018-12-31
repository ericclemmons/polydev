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
    module.hot.accept(handlerPath, async () => {
      handler = await getLatestHandler()
      console.log(`🔁  Hot-reloaded ${baseUrl}`)
    })
  }

  const url = `http://localhost:${PORT}/`

  if (typeof handler === "function") {
    const app = express().use(baseUrl, (req, res) => handler(req, res))

    app.listen(PORT, async () => {
      console.log(`↩︎  ${handlerPath.replace(process.cwd(), ".")} from ${url}`)
    })
  } else {
    // TODO Do not allow empty exports!
    // ! A server or _something_ has to be returned!
    throw new Error(`${handlerPath} must return a Function or a Server`)
  }

  process.on("message", bridge(PORT))
}

startHandler(...args)
