module.exports = (req, res) => {
  const { name } = req.params

  res.send(`
    <link href="https://fonts.googleapis.com/css?family=Quicksand:300,500" rel="stylesheet">
    <link href="/_polydev/styles.css" rel="stylesheet">

    <div id="splash"></div>

    <section>
      <main>
        <h1>
          👋 Howdy there <kbd>${name}</kbd>!
        </h1>

        <form name="demo">
          <label>
            Try a different URL:
          </label>
          <br />
          <code>/users/<input
            autofocus
            name="name"
            style="font-family: inherit; font-size: inherit;"
            type="text"
            value=${JSON.stringify(name)} /></code>

          <button>Go</button>
        </form>

        <script>
          const { demo } = document.forms

          demo.addEventListener("submit", (event) => {
            event.preventDefault();

            window.location.href = \`/users/\${demo.name.value}\`
          })
        </script>
      </main>

      <footer>
        <a href="/">&laquo; Back</a>
      </footer>
    </section>
  `)
}
