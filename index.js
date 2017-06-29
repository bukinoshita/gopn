#!/usr/bin/env node
'use strict'

const meow = require('meow')
const updateNotifier = require('update-notifier')
const opn = require('opn')
const gitUrlPrettify = require('git-url-prettify')
const shoutError = require('shout-error')
const isGithubRepo = require('is-github-repo')

const cli = meow(
  `
  Usage:
    $ gopn <owner/repo>       Open GitHub repository on your default browser

  Example:
    $ gopn bukinoshita/gopn

  Options:
    -h, --help                Show help options
    -v, --version             Show version
`,
  {
    alias: {
      h: 'help',
      v: 'version'
    }
  }
)

updateNotifier({ pkg: cli.pkg }).notify()

const run = () => {
  const entry = cli.input[0]
  const isGit = isGithubRepo(entry)

  if (entry && isGit) {
    const repo = gitUrlPrettify(entry)
    opn(repo)
    return process.exit()
  }

  shoutError('Repository name is required. Eg:`gopn owner/repo`')
}

run()
