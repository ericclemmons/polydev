const express = require("express")

const bridge = require("./bridge")

// TODO Wrap this all in an async function so any errors can be caught & sent
// via: https://github.com/programble/errio

const { PORT } = process.env
const [, , ...args] = process.argv

async function startHandler(handlerPath, baseUrl = "/") {
  const exported = require(handlerPath)
  const handler = await (exported.default || exported)

  const url = `http://localhost:${PORT}/`

  if (typeof handler === "function") {
    const app = express().use(baseUrl, handler)

    app.listen(PORT, async () => {
      console.log(`↩︎  ${handlerPath.replace(process.cwd(), ".")} from ${url}`)
    })
  } else {
    // TODO Do not allow empty exports!
    // ! A server or _something_ has to be returned!
    console.warn(
      `${handlerPath} did not export a function. Assuming a server...`
    )
  }

  process.on("message", bridge(PORT))
}

startHandler(...args)
