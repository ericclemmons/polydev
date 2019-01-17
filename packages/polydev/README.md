![polydev](/logo.png)

> Faster, route-centric development for [Node.js][node] apps with built-in
> [Hot Module Replacement][hmr].

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

## Roadmap

- [ ] Reload browser on double-save (#1)
- [ ] Loading screen, for slow routes (#2)
- [ ] Option to install missing modules (#3)
- [ ] ESM support (#4)
- [ ] TypeScript support (#5)
- [ ] Better errors for broken routes/modules (#6)
- [ ] Storybook example (#7)
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
