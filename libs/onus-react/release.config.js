const name = '@onus-elements/react'
const srcRoot = 'libs/onus-react'

module.exports = {
  extends: 'release.config.base.js',
  branches: ['main', { name: 'next', prerelease: true }],
  pkgRoot: srcRoot,
  // eslint-disable-next-line no-template-curly-in-string
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
