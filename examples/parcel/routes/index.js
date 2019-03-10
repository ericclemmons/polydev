const Bundler = require("parcel-bundler")
const bundler = new Bundler("./src/index.html", { outDir: "./public" })

module.exports = bundler.middleware()
