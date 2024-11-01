const name = '@onus-elements/core'
const srcRoot = 'libs/onus-core'

module.exports = {
  extends: 'release.config.base.js',
  branches: ['main', { name: 'next', prerelease: true }],
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
    'semantic-release-yarn',
  ],
}
