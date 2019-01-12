const express = require("express")

// TODO What are good production settings?
// Sure, there should be a proxy/CDN for static assets, but whatever
module.exports = express.static("public", {
  index: false,
  fallthrough: true
})
