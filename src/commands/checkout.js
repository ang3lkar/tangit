const {Command, flags} = require('@oclif/command')
const {blue, yellow} = require('../log')
const getConfig = require('../config')
const getAsync = require('../get-async')

class CheckoutCommand extends Command {
  async run() {
    const {repo1Path, repo2Path} = await getConfig()

    const {args} = this.parse(CheckoutCommand)

    try {
      const bdata = await getAsync(`cd ${repo1Path}; git checkout ${args.branch}`)
      await blue(this.log, bdata[1].trim())
    } catch (error) {
      await blue(this.log, `No branch '${args.branch}' found`)
      const bdata = await getAsync(`cd ${repo2Path}; git checkout master`)
      await blue(this.log, bdata[1].trim())
    }

    try {
      const fdata = await getAsync(`cd ${repo2Path}; git checkout ${args.branch}`)
      await yellow(this.log, fdata[1].trim())
    } catch (error) {
      await yellow(this.log, `No branch '${args.branch}' found`)
      const fdata = await getAsync(`cd ${repo2Path}; git checkout master`)
      await yellow(this.log, fdata[1].trim())
    }
  }
}

CheckoutCommand.description = 'Checkout branch in both repositories'

CheckoutCommand.args = [
  {name: 'branch'},
]

CheckoutCommand.flags = {
  branch: flags.string({char: 'b', description: 'Which branch to checkout. If branch does not exist, it will fallback to "master".'}),
}

module.exports = CheckoutCommand
