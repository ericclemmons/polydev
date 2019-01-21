const express = require("express")
const path = require("path")

const handle = require("./handle")

// Match index[.*|get|post].js
const REGEXP_INDEX = /^index(?:\.(\*|get|post))?\.(?:j|t)s$/
const REGEXP_PARAM = /\[([a-zA-Z0-9-]+)\]/g
const REGEXP_PARAM_REPLACE = ":$1"
const REGEXP_TRAILING_SLASH = /\/+$/

module.exports = function createRouterFromFiles(routesPath, files) {
  const router = express()

  // Ensure that explict route matches win
  files = files
    // Ignore unknown route formats
    .filter((file) => path.basename(file).match(REGEXP_INDEX))
    .sort((a, b) => {
      // Ignore filename when sorting
      return path.basename(a) < path.basename(b) ? -1 : 0
    })
    // Most specific routes win
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
