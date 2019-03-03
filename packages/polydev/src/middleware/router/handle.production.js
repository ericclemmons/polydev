const debug = require("debug")("polydev")

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
          if (handled.catch) {
            handled.catch(next)
          }
        }
      )
    })
  )
}
