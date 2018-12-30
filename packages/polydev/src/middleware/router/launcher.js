const express = require("express")

const bridge = require("./bridge")

// TODO Wrap this all in an async function so any errors can be caught & sent
// via: https://github.com/programble/errio

const { PORT } = process.env
const [, , handlerPath, baseUrl = "/"] = process.argv
const exported = require(handlerPath)
const handler = exported.default || exported

if (typeof handler === "function") {
  const app = express().use(express.Router().use(baseUrl, handler))

  const server = app.listen(PORT, async () => {
    const url = `http://localhost:${server.address().port}/`

    console.log(`↩︎  ${handlerPath.replace(process.cwd(), ".")} from ${url}`)
  })
} else {
  console.warn(`${handlerPath} did not export a function`)
}

process.on("message", bridge(PORT))
