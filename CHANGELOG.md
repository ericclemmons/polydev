# Changelog

## UNRELEASED

##### Pull Requests

- #19 - Support "-r" flags via child*process.fork/spawn? *(@ericclemmons)\_
- #7 - TypeScript support _(@ericclemmons)_

#### Commits

- cd9f1f86589c9ccabea5e909d49ba7e8c05600af - yarn dev uses ts-node (@ericclemmons)
- 37c7a93c2984b8c6d85bd050d6acf27b89ae9da8 - @ts-ignore (@ericclemmons)
- 515d9e0d376fe20a5bee50e77aa00ab7a5a2fc70 - Update README.md with updated args example (@ericclemmons)
- 4970d218338604b45a5b653cb55919848fdc7111 - polydev forks to server so we can re-use Node flags (@ericclemmons)
- aebd7ff3ec38e2a0497838111743a483f10bfdbe - Add docs for TypeScript (@ericclemmons)
- 544e4cdc78fa6cbc3f60f6eb948fba9b582a1eab - Routes support .ts (@ericclemmons)
- 9bad30fc1dcff70aa3ecb5a9bf6ea1af5fa96679 - Add typescript-example (@ericclemmons)
- 5c0f950f8557bdb481f17871e334f621f488e344 - typo (@ericclemmons)
- 7d4c0c29f7f3fa3ecc86111ed8a79b4532417f6b - Put gif in blockquote (@ericclemmons)
- 087da74dcaf797d93ca7e667229a423db2bdd42d - Use markdown for links (@ericclemmons)
- ecc074869b7c2b8f3a25da924507036e15a2e663 - Add demo gif (@ericclemmons)

## v1.2.0 (2019-01-17)

##### Pull Requests

- #10 - development/production-only routes _(@ericclemmons)_
- #4 - Production mode _(@ericclemmons)_
- #16 - Add shadow to logo _(@ericclemmons)_

#### Commits

- f4780730699ea175495274c9c4f00c7d6873487e - In production, don't add routes if no handler is exported (@ericclemmons)
- b73c06b85748c44cd8b9679666336455734a7ab4 - In development, listen to non-exported servers so we at least 404 (@ericclemmons)
- 9bf29abba82ec5122d970a99318f004d05bcea5d - Add /dev-only page (@ericclemmons)
- 62a81a5905553a9a75d825e9c0a867d982b1766b - Add a standalone server.js via dev:server & start:server (@ericclemmons)
- 31052bbb085ad275f2203a6691cb68cd26145c34 - Export { polydev} as a middleware (@ericclemmons)
- 0bd0883bf6800f4fbc3afc767f2b283c6260b905 - Add shadow to logo (@ericclemmons)

## v1.1.0 (2019-01-16)

##### Pull Requests

- #11 - Make assets available under _polydev _(@ericclemmons)\_
- #12 - Empty repo experience _(@ericclemmons)_

#### Commits

- 698945d6cf194d4a8100589a1c1a852e9ef39f0a - Some quick documentation on how to use it (@ericclemmons)
- 8a7bbe39ffdc5348b0022d7f4f92622ad0fb3474 - All polydev-specific styles are under /\_polydev (@ericclemmons)
- 258c52099943b8dd38d3bee55e2299677a9d2b81 - Use path.join for potential path (@ericclemmons)

## v1.0.0 (2019-01-16)

#### Commits

- 056e990f9298dbc7cacd7e642be9e320436ff6f9 - np --yolo (@ericclemmons)
- ae7eec541b41b785f04dc35bd0168710819869b0 - Revert "Move np dependency to root" (@ericclemmons)
- cab50b2bc1e6db44b9d5838f9be931287a7bf0eb - Remove unlink on preinstall, since this can fail when the link doesn't exist (@ericclemmons)
- 9e99e2fe6c416747df1beae1ffaf787082ef4926 - Move np dependency to root (@ericclemmons)
- 9a462afac86c26794472c28ff271b713cbb953c5 - Prepare for publishing (@ericclemmons)
- 04472ddd39d1dd18776e11ee8248a0a5bb8dcdba - Start at v0.0.0 (@ericclemmons)
- 268cb6644051cc78fd4343a44f67d257ddc31de5 - unlink before link (@ericclemmons)
- 9cad508cd5e7f1ac9d30f0627a3ff6784599c33e - Ignore dist (@ericclemmons)
- 254beecbae77636d78a3b2b58ca179ebb1db5001 - Link Roadmap to GitHub issues (@ericclemmons)
- 66902b3a6b182e99c5f5b2eee35f579b1e634111 - Better README.md (@ericclemmons)
- f85b332109ffc7e91826b1472c211ed3aede0a7d - Add /logo for capturing the logo (@ericclemmons)
- 02072a945f8759ffccaedf8cc1f49d9700d61016 - Forward most of process.env to sub-processes (@ericclemmons)
- c26e4c518a7ad736f3c3ef7560075464e2ec6f61 - Fix reference to NODE_ENV (@ericclemmons)
- 7de772aa29e2f251ecdcfc37f4f71e082a2860e8 - build next-example before starting (@ericclemmons)
- 454fe9d3ec151c2c596a674c761fc3e6fa58d8fd - production mode (@ericclemmons)
- e8f1431047359ca7ec7a5f538a5c88cddb052113 - Enable notFound & error routes only in development (@ericclemmons)
- 183aa8ee23fae27e8b292f7bddae138ccc228c54 - Enable apollo-playground in production (@ericclemmons)
- 3376f8718d7fdac592c3147e2b4bdbdf63cbb086 - Remove esm (@ericclemmons)
- ed324708968fe1e342588836443f15d8ed934438 - yarn dev & yarn start (@ericclemmons)
- 7bb3c61e30377bd34fec6e148dbe6e59f2754194 - Prettier 404 page (@ericclemmons)
- f62bb5cf959f8f272a6a01363f6138ad32c188dd - Fix bug with index.js not using both GET & POST (@ericclemmons)
- 659c58d5cd0b0e4490e76fd49d5701963cc07a9f - GraphQL doesn't need to use express explicitly (@ericclemmons)
- dc02fc5096be1502d570644094d88516b7d112dd - Routes are duplicated between polydev + launcher (so that express behaves the same) (@ericclemmons)
- 49ec7fe2c07c42dee22de32ae7de53d21776af81 - Add better parameterized route example (@ericclemmons)
- 15a9c4c695c4809d05ea277347dde4d3213a2b5a - No longer namespace routes automatically (we'll see) (@ericclemmons)
- d07edb4e2435c6d7e8ce04ca00fd09b5c7e29d34 - Prettier error page (@ericclemmons)
- f0854e4ced4330d2b93b6f5af951388191fa4616 - hot-module-replacement@^3.0.3 fixes Next.js (reverts f41663680b577f1dc67906eef57f7212e875ed80) (@ericclemmons)
- 7d79c3e3f5f914764a5e5dca17cd51661fc38cf1 - Add helpful postinstall + start scripts (@ericclemmons)
- f41663680b577f1dc67906eef57f7212e875ed80 - Use fork until new version is published with https://github.com/sidorares/hot-module-replacement/pull/14 (@ericclemmons)
- aa8c2f3c7fdc617224b1711d6b590f18f0c93d65 - 500 error example (@ericclemmons)
- 2ddc2161d697f289e0dec1a9b9fa45db99887718 - Interactive Next.js example (@ericclemmons)
- f57bb7df748ccf24b22bdd45c67dace8df5f5f95 - Prettier Next.js example (@ericclemmons)
- 137b17c9283c10c5ac26b7174fca38937d1a2635 - Absolute path to /styles.css (@ericclemmons)
- 27d8a6ac4ff8da41baa2bbf15fc1f83d9b1f04f3 - Working SSE example! This means Next.js works too! (@ericclemmons)
- 27c37cdd07ba808372b1ea73948364e19d58eb9b - whitespace (@ericclemmons)
- 1959a9906d12736c36783383bdebaf3909066149 - SSE example (@ericclemmons)
- 5f53d1e2cc7319ce8fc96c8ad156c35059bca038 - Revert "bridge returns a promise instead of talking to the process directly" (@ericclemmons)
- c08a9ff2d32e08ce10548d3e257fdf37bff919f8 - Add notes for error page (@ericclemmons)
- 4ca11f87d7cbf401bffb2296b7534aab45e4a4ea - Remove polydev exports (@ericclemmons)
- 063f4c8f5da3ee4adb0397ee9ea313f3d6b11d67 - Use body-parser for 404 page (@ericclemmons)
- c516b73362af774f4cbe7bc793d3a4d0a7448af0 - Remove redundant variables (@ericclemmons)
- c78e02f09776c32e78f59d85efbfeff96bcd275a - Switch to support index[.*|get|post].js (@ericclemmons)
- 65f7f55147e23802a87f2c8430276a5e9aa856aa - Routes only respond to GET/POST for now (@ericclemmons)
- f2e67043fdf25d35c1c87de6f5f3056f1fe0ef4f - Enable built-in HMR only for functional routes (@ericclemmons)
- db7ad56550fb94a7bbe4c00fa0a3eb46e1f8a0a2 - Got pages returning from Next.js (@ericclemmons)
- 6af6705cb7111aae12716d5abd2d2fb43a31dfa4 - If a child process crashes, re-create it on the next request (@ericclemmons)
- 7f9471fad71c359a4eea0afb9fedb376a4a1518c - Revert 208088222dd4e14c68d0b6e2b42e31e0ffb224b9 to prevent crashing the process (@ericclemmons)
- a829c90724edc8bd70a46a240ba427adb1f416df - Working apollo-server example (@ericclemmons)
- deaefcf259d0e5b82e540c855ffc7f6b81df1e11 - Simpler child exists check (@ericclemmons)
- 208088222dd4e14c68d0b6e2b42e31e0ffb224b9 - Remove process.on errors (@ericclemmons)
- c6b99bcb0178276545f705c0d16e95d065267bad - Add note for bug with HMR with servers (@ericclemmons)
- c6d65f874de1067e863e4112f634eef1a59dd4d1 - Fix regression with HMR not referencing the latest handler (@ericclemmons)
- bf68ccf3abdb8dd70461b24a9d5b16efcaebb881 - require("polydev").mount(handler) is good for relative routes (@ericclemmons)
- 99e5d30c6e9175671812d0d28c94b4806aee431b - Move server to separate file (@ericclemmons)
- 0ffdc17b8765c8d9c283f1b646d28ae0addc5e05 - Add hit counter to express example (@ericclemmons)
- b35915642a223250a2397a4ddd719d481d423020 - Fix background (@ericclemmons)
- e12e243a4f908a41ea435e084d8611a7271a8041 - Use font-size: 16px (@ericclemmons)
- 8b9c72ef7fa4cef95e82dff078db02737fde4195 - bridge returns a promise instead of talking to the process directly (@ericclemmons)
- d0d50186a37a74cb7e3f1f3f2d65d64cd240a5b9 - Force arrow-parens (@ericclemmons)
- 42e81e5fb1efa88b28d06732ffe471082e3f9ff6 - Double-save to restart server (@ericclemmons)
- 05437679fb023c65611d9fa84e877ce8a86ec11a - hot-module-replace is legit! (@ericclemmons)
- 971fee30a995299e2aec693b090effcc9e5137ba - Remove form margins (@ericclemmons)
- ce415d88e897551a83647c8cc484be6a9844a371 - Add note about empty routes (@ericclemmons)
- b04ff3f875f1655e8a5b51388aa4e3481664a082 - Create empty pages with _some_ content (@ericclemmons)
- 748c15b2269268e775af671c5373a6795b43449b - Wait for the servers to start before finishing the request (@ericclemmons)
- efdd1e4adb74c7786f7b759f8899319afc9e22f9 - Prettier 404 page (@ericclemmons)
- 45e6bc7dc9e702e1234e93afe59d34218de30804 - Events are tied to their request/response via a UUID (@ericclemmons)
- 75b932bb0a9cbf0feb87289a2a2cad3b5216894f - 404 page lets you create the missing page (@ericclemmons)
- 35984d98a74541d9c0ad08c3e36b2e31d6365b69 - Add Next.js example (@ericclemmons)
- 47bc36f7dc19b3f9cb9a978b5892d029c00fe2ec - Faster fadeIn (@ericclemmons)
- fe9ebec00065547f1f7000cc72126383f1311cd1 - apollo-server 2 is terrible (@ericclemmons)
- 0668c6083c7becbc1e999de41ad92b884febed72 - Add graphql-example (@ericclemmons)
- e7fb252240ae620336eee176e3734af6f714ec0e - Improved folder structure (@ericclemmons)
- 819c4fed7b900cfc4e8c19a21653fdf7f1be3f19 - Only open window if --open (@ericclemmons)
- 9c7d76901532121dd50f09c53c1a8227dc3c7fa3 - Use express internally (@ericclemmons)
- 721f0340c647e9c2101845c0e6cd0e929d0fdadd - Add express-example (@ericclemmons)
- 6d4fa253f344acd09cbf609ce695884dcab77c68 - Add 404 link (@ericclemmons)
- 1a5914c738a4caabac65d8d02e6bccf0ebd97ddd - Add (broken) apollo-server-example (@ericclemmons)
- 60d061cf35c9e321b0eacbc64fb9d701d57cbc45 - Have a pretty example page (@ericclemmons)
- 7f4b0f41f3455ae854fd820b3ea5211d166b9bba - Support static assets (@ericclemmons)
- 14f793ef9e3d3770ba7201688aa225feedb4f4b7 - Add a better README.md (@ericclemmons)
- 41739c49d7f4de73d13e96fa6deb431b5211339c - Switch to yarn workspaces (@ericclemmons)
- 60b23499d574446c56be2704c2fe30f9076035fb - opn URL when the server starts (@ericclemmons)
- 73bb8d12eaebd74bb7124b84612bad099faee351 - Split out lambda (@ericclemmons)
- 2d5a04753d4538ad5a9f4acb9a479e6c274680ba - Simple node handler (@ericclemmons)

---

Automatically generated by `🤖 CHANGEBOT`.
