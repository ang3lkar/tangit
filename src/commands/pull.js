const {Command} = require('@oclif/command')
const {blue, yellow} = require('../log')
const getConfig = require('../config')
const getAsync = require('../get-async')

class PullCommand extends Command {
  async run() {
    const {repo1Path, repo1Branch, repo2Path, repo2Branch} = await getConfig()

    const bdata = await getAsync(`cd ${repo1Path}; git fetch -p; git reset --hard origin/${repo1Branch}`)
    blue(this.log, `${repo1Branch}`, `${bdata[0].trim()}`)

    const fdata = await getAsync(`cd ${repo2Path}; git fetch -p; git reset --hard origin/${repo2Branch}`)
    yellow(this.log, `${repo2Branch}`, `${fdata[0].trim()}`)
  }
}

module.exports = PullCommand
