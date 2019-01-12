const chokidar = require("chokidar")
const express = require("express")
const path = require("path")

const createRouterFromFiles = require("./createRouterFromFiles")

module.exports = function createRouter(routesPath = "routes") {
  routesPath = path.resolve(routesPath)

  // Start with a blank router before routes get loaded
  let router = express()

  const watcher = chokidar.watch(routesPath, { ignoreInitial: true })

  const updateRouter = () => {
    const watched = watcher.getWatched()
    const folders = Object.keys(watched)

    // Convert { [folder]: [...base] } to [...filepaths]
    const files = folders.reduce((acc, folder) => {
      return [
        ...acc,
        ...watched[folder].map((base) => path.resolve(folder, base))
      ]
    }, [])

    router = createRouterFromFiles(routesPath, files)
  }

  watcher
    .on("add", updateRouter)
    .on("ready", updateRouter)
    .on("unlink", updateRouter)

  // Ensure each request references the latest router
  return (req, res, next) => router(req, res, next)
}
