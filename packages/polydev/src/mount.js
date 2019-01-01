const express = require("express")

// The launcher injects `req` into the env
const { ROUTE_PATH } = process.env

module.exports = (packageName) => {
  const handler = require(packageName)

  return express().use(ROUTE_PATH, handler)
}
