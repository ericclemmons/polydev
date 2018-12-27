module.exports = (req, res) => {
  res.writeHead(200, { "Content-Type": "text/html; charset=utf-8" })
  res.end("👋 Howdy from Polydev!")
}
