module.exports = (req, res) => {
  res.send(`
    <head>
      <link href="https://fonts.googleapis.com/css?family=Quicksand:300,500" rel="stylesheet">
      <link href="/_polydev/styles.css" rel="stylesheet">

      <style>
        * {
          box-sizing: border-box;
        }

        #splash {
          animation: none;
          border-radius: 5px;
          box-shadow: 0 1em 3em rgba(0, 0, 0, 0.1), 0 0.5em 1.5em rgba(0, 0, 0, 0.1);
          height: calc(100% - 6em);
          position: absolute;
          width: calc(100% - 6em);
          margin: 3em;
        }

        body {
          background: transparent;
          height: calc(898px / 16 * 9);
          margin: 3em;
          overflow: hidden;
          position: relative;
          width: 898px;
        }

        h1 {
          color: black;
          font-size: 128px;
        }
      </style>
    </head>

    <body>
      <div id="splash"></div>
      <h1>polydev</h1>
    </body>
  `)
}
