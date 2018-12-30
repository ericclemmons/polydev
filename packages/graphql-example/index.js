const express = require("express")
const graphql = require("express-graphql")

const schema = require("./schema")

module.exports = express().use(
  graphql({
    graphiql: true,
    pretty: true,
    schema
  })
)
