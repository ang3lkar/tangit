const {expect, test} = require('@oclif/test')
const shell = require('shelljs')

const setupRepo = repo => {
  shell.rm('-rf', repo)
  shell.mkdir('-p', repo)
  shell.cd(repo)
  shell.touch('dummy-file')
  shell.exec('git init')
  shell.exec('git add .')
  shell.exec('git commit -m "Initial commit"')
}

if (!shell.which('git')) {
  shell.echo('Sorry, this script requires git')
  shell.exit(1)
}
shell.cd('test')
setupRepo('repos/repo1')
shell.exec('git checkout -b feature/foo')
shell.exec('git checkout master')
shell.cd('../..')
setupRepo('repos/repo2')
shell.exec('git checkout -b develop')
shell.exec('git checkout -b feature/foo')
shell.exec('git checkout develop')

describe('tangit status', () => {
  test
  .stdout()
  .command(['status'])
  .it('runs `git status` in both repositories', ctx => {
    expect(ctx.stdout).to.contain('server -> (master)')
    expect(ctx.stdout).to.contain('client -> (develop)')
  })
})

describe('tangit checkout', () => {
  test
  .stdout()
  .command(['checkout', 'feature/foo'])
  .it('runs `git checkout` in both repositories', ctx => {
    expect(ctx.stdout).to.contain("server -> (Switched to branch \'feature/foo\')")
    expect(ctx.stdout).to.contain('client -> (Switched to branch \'feature/foo\')')
  })

  test
  .stdout()
  .command(['checkout', 'develop'])
  .it('fallbacks to master if branch does not exist', ctx => {
    expect(ctx.stdout).to.contain("server -> (No branch \'develop\' found)")
    expect(ctx.stdout).to.contain("server -> (Switched to branch \'master\')")
    expect(ctx.stdout).to.contain('client -> (Switched to branch \'develop\')')
  })
})
