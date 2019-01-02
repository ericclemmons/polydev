import Head from "next/head"
import { Component, Fragment } from "react"

export default class NextExample extends Component {
  state = { taps: 1 }

  render() {
    const { taps } = this.state

    return (
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

            <p>
              <kbd>{taps}</kbd> {taps ? "taps" : "tap"}
            </p>
            <p>
              <button onClick={() => this.setState({ taps: taps + 1 })}>
                Tap me again 👊
              </button>
            </p>
          </main>

          <footer>
            <a href="/">&laquo; Back</a>
          </footer>
        </section>
      </Fragment>
    )
  }
}
