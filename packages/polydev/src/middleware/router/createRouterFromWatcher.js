import express from "express"
import path from "path"

import handle from "./handle"

// Match index[.*|get|post].js
const REGEXP_INDEX = /^index(?:\.(\*|get|post))?\.js$/
const REGEXP_PARAM = /\[([a-zA-Z0-9-]+)\]/g
const REGEXP_PARAM_REPLACE = ":$1"
const REGEXP_TRAILING_SLASH = /\/+$/

export default function createRouterFromWatcher(routesPath, watcher) {
  const router = express()
  const watched = watcher.getWatched()
  const folders = Object.keys(watched)

  const files = folders
    .reduce((files, folder) => {
      const names = watched[folder].filter((name) => name.match(REGEXP_INDEX))

      return files.concat(names.map((name) => path.resolve(folder, name)))
    }, [])
    // Ensure that explict route matches win
    .sort((a, b) => {
      // Ignore filename when sorting
      return path.basename(a) < path.basename(b) ? -1 : 0
    })
    .reverse()

  files.forEach((file) => {
    const { base, dir } = path.parse(file)

    const route = "/"
      // Add relative path to page
      .concat(path.relative(routesPath, dir))
      // Convert _param to :param
      .replace(REGEXP_PARAM, REGEXP_PARAM_REPLACE)
      // Remove trailing slashes (besides root "/")
      .replace(REGEXP_TRAILING_SLASH, (match, offset) =>
        offset > 0 ? "" : match
      )

    const [, method] = base.match(REGEXP_INDEX)

    switch (method) {
      case "*":
        handle(router, file, [
          ["GET", route],
          ["GET", `${route}/*`],
          ["POST", route],
          ["POST", `${route}/*`]
        ])
        break

      case "post":
        handle(router, file, [["POST", route]])
        break

      case "get":
        handle(router, file, [["GET", route]])
        break

      case undefined:
        handle(router, file, [["GET", route], ["POST", route]])
        break

      default:
        throw new Error(`Unsupported route filename: ${file}`)
    }
  })

  return router
}
