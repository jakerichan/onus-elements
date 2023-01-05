/* eslint-disable no-template-curly-in-string */

const name = '@onus-elements/core'
const srcRoot = 'libs/onus-core'

module.exports = {
  extends: 'release.config.base.js',
  branches: ['main'],
  pkgRoot: srcRoot,
  tagFormat: name + '-v${version}',
  commitPaths: [`${srcRoot}/*`],
  plugins: [
    '@semantic-release/commit-analyzer',
    '@semantic-release/release-notes-generator',
    [
      '@semantic-release/changelog',
      {
        changelogTitle: name,
        changelogFile: `${srcRoot}/CHANGELOG.md`,
      },
    ],
    '@semantic-release/npm',
    [
      '@semantic-release/git',
      {
        assets: [`dist/${srcRoot}`, `${srcRoot}/CHANGLOG.md`],
        message:
          `release(version): Release ${name} ` +
          '${nextRelease.version} [skip ci]\n\n${nextRelease.notes}',
      },
    ],
  ],
}
