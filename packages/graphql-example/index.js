const graphql = require("express-graphql")
const schema = require("./schema")

module.exports = graphql({
  graphiql: true,
  pretty: true,
  schema
})
