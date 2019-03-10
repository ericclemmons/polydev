const THIS_PACKAGE_WONT_EXIST = require("THIS_PACKAGE_WONT_EXIST")

module.exports = (req, res) => {
  res.send(`
    <head>
      <link href="https://fonts.googleapis.com/css?family=Quicksand:300,500" rel="stylesheet">
      <link href="/_polydev/styles.css" rel="stylesheet">
    </head>

    <body>
      <div id="splash"></div>

      <section>
        <main>
          <h1>
            👋 Howdy from <kbd>polydev</kbd>
          </h1>
        </main>
      </section>
    </body>
  `)
}
