const { FlatCompat } = require('@eslint/eslintrc')
const js = require('@eslint/js')
const baseConfig = require('../../eslint.config.js')
// const jsoncParser = require('jsonc-eslint-parser')

const compat = new FlatCompat({
  baseDirectory: __dirname,
  recommendedConfig: js.configs.recommended,
})

module.exports = [
  ...baseConfig,
  ...compat.extends('plugin:@nx/react'),
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
  {
    files: [
      '**/*.ts',
      '**/*.tsx',
    ],
    // Override or add rules here
    rules: {},
  },
  {
    files: [
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
//           ignoredDependencies: ['react', '@onus-elements/core'], // these libs will be omitted from checks
//           ignoredFiles: ['eslint.config.js'], // list of files that should be skipped for check
//           includeTransitiveDependencies: true, // collect dependencies transitively from children
//           useLocalPathsForWorkspaceDependencies: false,
//         },
//       ],
//     },
//   },
]
