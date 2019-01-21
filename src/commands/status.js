const {Command} = require('@oclif/command')
const {blue, yellow} = require('../log')
const getConfig = require('../config')

class StatusCommand extends Command {
  async run() {
    const {repo1Branch, repo2Branch} = await getConfig()

    await blue(this.log, repo1Branch)
    await yellow(this.log, repo2Branch)
  }
}

StatusCommand.description = 'Check branch in both repositories'

module.exports = StatusCommand
