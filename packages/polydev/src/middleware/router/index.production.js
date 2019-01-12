const express = require("express")
const jetpack = require("fs-jetpack")
const path = require("path")

const createRouterFromFiles = require("./createRouterFromFiles")

module.exports = function createRouter(routesPath = "routes") {
  routesPath = path.resolve(routesPath)

  const files = jetpack
    .find(routesPath, { matching: "*", recursive: true })
    .map((file) => path.resolve(file))

  return createRouterFromFiles(routesPath, files)
}
