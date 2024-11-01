const baseConfig = require('../../eslint.config.js')
// const jsoncParser = require('jsonc-eslint-parser')

module.exports = [
  ...baseConfig,
  {
    files: [
      '**/*.ts',
      '**/*.tsx',
      '**/*.js',
      '**/*.jsx',
    ],
    // Override or add rules here
    rules: {},
  },
//   {
//     files: ['**/*.json'],
//     languageOptions: { parser: jsoncParser },
//     rules: {
//       '@nx/dependency-checks': [
//         'error',
//         {
//           checkMissingDependencies: true, // toggle to disable
//           checkObsoleteDependencies: true, // toggle to disable
//           checkVersionMismatches: true, // toggle to disable
//           ignoredDependencies: [], // these libs will be omitted from checks
//           ignoredFiles: ['eslint.config.js'], // list of files that should be skipped for check
//           includeTransitiveDependencies: true, // collect dependencies transitively from children
//           useLocalPathsForWorkspaceDependencies: false,
//         },
//       ],
//     },
//   },
]
