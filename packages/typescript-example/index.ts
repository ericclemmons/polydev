import { Request, Response } from "express"

let hits = 0

export default (req: Request, res: Response) => {
  hits++

  res.send(`
    <link href="https://fonts.googleapis.com/css?family=Quicksand:300,500" rel="stylesheet">
    <link href="/_polydev/styles.css" rel="stylesheet">

    <div id="splash"></div>

    <section>
      <main>
        <h1>
          👋 Howdy from <kbd>TypeScript</kbd>
        </h1>

        <p>
          <kbd>${hits}</kbd> ${hits ? "hits" : "hit"}
        </p>
      </main>

      <footer>
        <a href="/">&laquo; Back</a>
      </footer>
    </section>
  `)
}
