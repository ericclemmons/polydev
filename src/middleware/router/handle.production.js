const debug = require("debug")("polydev")

// ! Jest has a built-in mocking mechanism that can't correctly resolve project
// ! files from node_modules:
// @see https://github.com/facebook/jest/blob/72d01cc79f3dfe05419cd8dea1b6c9a558d93879/packages/jest-resolve/src/index.ts#L277-L279
//
// @ts-ignore
if (require.requireActual) require = require.requireActual

module.exports = async function handle(router, file, routes) {
  await Promise.all(
    routes.map(async ([httpMethod, route]) => {
      const method = httpMethod.toLowerCase()
      const exported = require(file)

      if (!exported) {
        return debug(
          `Route %o does not have an exported handler from %o`,
          route,
          file.replace(process.cwd(), ".")
        )
      }

      const handler = await (exported.default || exported)

      debug(`router.${method}(%o, %o)`, route, file.replace(process.cwd(), "."))

      router[method].call(
        router,
        route,
        // Make sure we always evaluate at run-time for the latest HMR'd handler
        (req, res, next) => {
          const handled = handler(req, res, next)

          // Automatically bubble up async errors
          if (handled && handled.catch) {
            handled.catch(next)
          }
        }
      )
    })
  )
}
