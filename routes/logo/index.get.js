module.exports = (req, res) => {
  res.send(`
    <head>
      <link href="https://fonts.googleapis.com/css?family=Quicksand:300,500" rel="stylesheet">
      <link href="/styles.css" rel="stylesheet">

      <style>
        #splash {
          animation: none;
          height: 100%;
          position: absolute;
          width: 100%;
        }

        body {
          background: transparent;
          height: calc(898px / 16 * 9);
          margin: auto;
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
