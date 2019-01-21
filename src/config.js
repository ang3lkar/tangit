const getCurrentBranch = require('./current-branch')

let userConfig
if (process.env.NODE_ENV === 'test') {
  const projectDir = __dirname.split('/').slice(0, -1).join('/')
  userConfig = {
    repo1Path: `${projectDir}/test/repos/repo1`,
    repo1Alias: 'server',
    repo2Path: `${projectDir}/test/repos/repo2`,
    repo2Alias: 'client',
  }
} else {
  userConfig = require('../config.json')
}

async function getConfig() {
  const homeDir = require('os').homedir()

  const repo1BranchOutput = await getCurrentBranch(userConfig.repo1Path)
  const repo1Branch = repo1BranchOutput[0].trim()

  const repo2BranchOutput = await getCurrentBranch(userConfig.repo2Path)
  const repo2Branch = repo2BranchOutput[0].trim()

  const repo1Path = userConfig.repo1Path.replace(/~/, homeDir)
  const repo1Alias = userConfig.repo1Alias.replace(/~/, homeDir)
  const repo2Path = userConfig.repo2Path.replace(/~/, homeDir)
  const repo2Alias = userConfig.repo2Alias.replace(/~/, homeDir)

  return {
    repo1Path: repo1Path,
    repo1Alias: repo1Alias,
    repo1Branch: repo1Branch,
    repo2Path: repo2Path,
    repo2Alias: repo2Alias,
    repo2Branch: repo2Branch,
  }
}

module.exports = getConfig
