import chokidar from "chokidar"
import express from "express"
import path from "path"

import createRouterFromWatcher from "./createRouterFromWatcher"

const routesPath = path.resolve(process.cwd(), "routes")
const watcher = chokidar.watch(routesPath, { ignoreInitial: true })

// Start with a blank router before routes get loaded
let router = express()

const updateRouter = () => {
  router = createRouterFromWatcher(routesPath, watcher)
}

watcher
  .on("add", updateRouter)
  .on("ready", updateRouter)
  .on("unlink", updateRouter)

// Ensure each request references the latest router
export default (req, res, next) => router(req, res, next)
