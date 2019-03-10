import React, { Fragment, useState } from "react"

export function ParcelExample() {
  const [taps, setTaps] = useState(1)

  return (
    <Fragment>
      <link
        href="https://fonts.googleapis.com/css?family=Quicksand:300,500"
        rel="stylesheet"
      />
      <link href="/_polydev/styles.css" rel="stylesheet" />

      <div id="splash" />

      <section>
        <main>
          <h1>
            👋 Howdy from <kbd>Parcel</kbd>
          </h1>

          <p>
            <kbd>{taps}</kbd> {taps ? "taps" : "tap"}
          </p>
          <p>
            <button onClick={() => setTaps(taps + 1)}>Tap me again 👊</button>
          </p>
        </main>

        <footer>
          <a href="/">&laquo; Back</a>
        </footer>
      </section>
    </Fragment>
  )
}
