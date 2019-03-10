#!/usr/bin/env node

const shell = require("shelljs")

const [, , example] = process.argv

shell.cd("examples")

if (!example) {
  const examples = shell.ls("-d", "*").map((file) => file)

  throw new Error(`$ yarn example ${examples}`)
}

shell.cd(example)
shell.exec("yarn install")
shell.exec("yarn dev")
