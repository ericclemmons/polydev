const express = require("express")
const { polydev } = require("polydev")

const app = express().use(
  polydev({
    assets: "public",
    routes: "routes"
  })
)

const server = app.listen(process.env.PORT || 3000, () => {
  const url = `http://localhost:${server.address().port}/`

  console.log(`🚀 Ready! ${url}`)
})
