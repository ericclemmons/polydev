#!/usr/bin/env node

const { execSync } = require("child_process")
const fs = require("fs")
const path = require("path")

const [, , example] = process.argv
const examplesDir = path.resolve(__dirname, "../examples")

if (!example) {
  const examples = fs
    .readdirSync(examplesDir, "utf8")
    .filter((folder) =>
      fs.statSync(path.resolve(examplesDir, folder)).isDirectory()
    )

  throw new Error(`$ yarn example ${examples}`)
}

const options = {
  cwd: path.resolve(examplesDir, example),
  stdio: "inherit"
}

execSync("yarn install", options)
execSync("yarn start", options)
