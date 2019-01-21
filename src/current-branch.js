const getAsync = require('./get-async')

async function getCurrentBranch(path) {
  return getAsync(`cd ${path}; git symbolic-ref HEAD | sed 's!refs/heads/!!'`)
}

module.exports = getCurrentBranch
