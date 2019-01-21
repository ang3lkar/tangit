const chalk = require('chalk')
const getConfig = require('./config')

module.exports = {
  async blue(f, str, moar = '') {
    const {repo1Alias, repo2Alias} = await getConfig()
    const padSize = Math.max(repo1Alias.length, repo2Alias.length)
    f(chalk.blue(repo1Alias.padEnd(padSize), `-> (${str})`, moar))
  },
  async yellow(f, str, moar = '') {
    const {repo1Alias, repo2Alias} = await getConfig()
    const padSize = Math.max(repo1Alias.length, repo2Alias.length)
    f(chalk.yellow(repo2Alias.padEnd(padSize), `-> (${str})`, moar))
  },
}
