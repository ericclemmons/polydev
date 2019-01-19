![polydev](/logo.png)

> Faster, route-centric development for [Node.js][node] apps with built-in
> [Hot Module Replacement][hmr].
>
> ![Demo GIF](/polydev.gif)

## Rationale

As your project grows, **working on a large or monolithic [Node.js][node] app gets slower**:

- Working on _part_ of the app means running the _entire_ app.
- The `require` tree grows so large it can take several seconds to start the server.
- Restarting the server on every change impedes development.
- Middleware for projects like [Next.js][next] & [Storybook][storybook] are expensive
  to restart with each change.
- Tools like [concurrently][concurrently], [nodemon][nodemon], & [piping][piping] still
  run the entire app.
- You shouldn't waste time in the terminal hitting <kbd>Ctrl-C</kbd> and restarting.

## Features

- Fast startup.
- [Hot Module Replacement][hmr] built-in.
- Run only the parts of your app that's requested.
- Supports [yarn workspaces][workspaces].
- Pretty `404` screens with the option to create the missing route.
- Pretty `500` screens, so you spend less time in the terminal.
- Iterative adoption, so it's easy to get started.

## Quick Started

1. Install

   ```shell
   yarn add polydev --dev
   ```

2. Run `polydev`

   ```shell
   yarn run polydev --open
   ```

## Defining `routes`

The `routes` folder is similar to Old-Time&trade; HTML & PHP, where
**folders mirror the URL structure**, followed by an `index.js` file:

- `routes/`

  - `page/[id]/index.js`

    _Has access to `req.params.id` for [/page/123](http://localhost:3000/page/123)._

  - `contact-us/`

    - `index.get.js`
    - `index.post.js`

  - `posts/index.*.js`

    _Responds to both `GET` & `POST` for [/posts/\*](http://localhost:3000/posts)._

  - `index.js`

    _Responds to both `GET` & `POST` for [/](http://localhost:3000/)._

### Route Handlers

Route handlers can be any of the following:

1. Functional middleware:

   ```js
   module.exports = (req, res) => {
     res.send("Howdy there!")
   }
   ```

2. Express apps:

   ```js
   const express = require("express")

   module.exports = express().get("/", (req, res) => {
     res.send(`Howdy from ${req.path}!`)
   })
   ```

3. A [yarn workspace][workspaces] package:

   ```js
   module.exports = require("my-package-name")
   ```

4. A `package.json` path:

   ```js
   module.exports = require.resolve("my-app/package.json")
   ```

   These are considered stand-alone apps that will be ran via `yarn dev` or `yarn start` (whichever exists) for development only.

   This is good for when you want to have a separate API server open on `process.env.PORT` that's not part of your application.

## Roadmap

- [ ] [Reload browser on double-save](/../../issues/1)
- [ ] [Loading screen, for slow routes](/../../issues/2)
- [ ] [Option to install missing modules](/../../issues/3)
- [ ] [ESM support](/../../issues/4)
- [ ] [TypeScript support](/../../issues/5)
- [ ] [Better errors for broken routes/modules](/../../issues/6)
- [ ] [Storybook example](/../../issues/7)
- [ ] [View All][issues]

## Contributing

> See [CONTRIBUTING.md](/CONTRIBUTING.md).

## Author

- [Eric Clemmons][twitter]

[concurrently]: https://github.com/kimmobrunfeldt/concurrently
[hmr]: https://github.com/sidorares/hot-module-replacement
[issues]: https://github.com/ericclemmons/polydev/issues?q=is%3Aissue+is%3Aopen+sort%3Aupdated-desc
[next]: https://github.com/zeit/next.js/
[node]: https://nodejs.org/
[nodemon]: https://github.com/remy/nodemon
[piping]: https://www.npmjs.com/package/piping
[storybook]: https://github.com/storybooks/storybook
[twitter]: https://twitter.com/ericclemmons
[workspaces]: https://yarnpkg.com/en/docs/workspaces
