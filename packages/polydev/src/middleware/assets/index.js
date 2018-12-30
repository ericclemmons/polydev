import express from "express"

export default express.static("public", {
  index: false,
  fallthrough: true
})
