const { NODE_ENV = "development" } = process.env

module.exports =
  NODE_ENV === "development"
    ? require("./handle.development")
    : require("./handle.production")
