const express = require("express")

// TODO What are good production settings?
// Sure, there should be a proxy/CDN for static assets, but whatever
module.exports = (...dirs) => {
  return dirs.map((dir) =>
    express.static(dir, {
      index: false,
      fallthrough: true
    })
  )
}
