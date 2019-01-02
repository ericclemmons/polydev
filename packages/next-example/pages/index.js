import Head from "next/head"
import { Fragment } from "react"

export default (req, res) => (
  <Fragment>
    <Head>
      <link
        href="https://fonts.googleapis.com/css?family=Quicksand:300,500"
        rel="stylesheet"
      />
      <link href="/styles.css" rel="stylesheet" />
    </Head>

    <div id="splash" />

    <section>
      <main>
        <h1>
          👋 Howdy from <kbd>Next.js</kbd>
        </h1>
      </main>

      <footer>
        <a href="/">&laquo; Back</a>
      </footer>
    </section>
  </Fragment>
)
