module.exports =
  process.env.NODE_ENV === "development"
    ? (req, res) => {
        res.send(`
          <head>
            <link href="https://fonts.googleapis.com/css?family=Quicksand:300,500" rel="stylesheet">
            <link href="/_polydev/styles.css" rel="stylesheet">
          </head>

          <body>
            <div id="splash"></div>

            <section>
              <main>
                <h1>🤫 Shhhh!</h1>

                <p>
                  This page is only available in <kbd>development</kbd>.
                </p>
              </main>
            </section>
          </body>
        `)
      }
    : undefined
