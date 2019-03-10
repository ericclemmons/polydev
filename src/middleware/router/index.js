const { NODE_ENV = "development" } = process.env

module.exports =
  NODE_ENV === "development"
    ? require("./index.development")
    : require("./index.production")
