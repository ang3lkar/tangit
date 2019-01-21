const Promise = require('bluebird')
const cmd = require('node-cmd')

module.exports = Promise.promisify(cmd.get, {multiArgs: true, context: cmd})
