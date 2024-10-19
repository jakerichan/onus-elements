const stylistic = require('@stylistic/eslint-plugin')
const { FlatCompat } = require('@eslint/eslintrc')
const jsoncParser = require('jsonc-eslint-parser')
const js = require('@eslint/js')
const nxEslintPlugin = require('@nx/eslint-plugin')
const tsParser = require('@typescript-eslint/parser')
const globals = require('globals')
const tseslint = require('typescript-eslint')

const compat = new FlatCompat({
  baseDirectory: __dirname,
  recommendedConfig: js.configs.recommended,
})

module.exports = [
  {
    ignores: ['**/dist']
  },
  stylistic.configs['recommended-flat'],
  ...tseslint.configs.strict,
  ...tseslint.configs.stylistic,
  {
    plugins: {
      '@nx': nxEslintPlugin,
      '@stylistic': stylistic,
    },
  },
  {
    files: [
      '**/*.ts',
      '**/*.tsx',
      '**/*.js',
      '**/*.jsx',
    ],
    rules: { '@nx/enforce-module-boundaries': [
      'error',
      {
        enforceBuildableLibDependency: true,
        allow: [],
        depConstraints: [{
          sourceTag: '*',
          onlyDependOnLibsWithTags: ['*'],
        }],
      },
    ] },
  },
  ...compat.config({ extends: ['plugin:@nx/typescript'] }).map(config => ({
    ...config,

    files: [
      '**/*.ts',
      '**/*.tsx',
    ],
    rules: {
      ...config.rules,
      'no-extra-semi': 'off',
    },
  })),
  ...compat.config({ extends: ['plugin:@nx/javascript'] }).map(config => ({
    ...config,
    files: [
      '**/*.js',
      '**/*.jsx',
    ],
    rules: {
      ...config.rules,
      'no-extra-semi': 'off',
    },
  })),
  {
    languageOptions: {
      parser: tsParser,
      globals: {
        ...globals.node,
      },
    },
    rules: {
      '@typescript-eslint/explicit-module-boundary-types': ['error'],
    },
  },
  {
    files: ['**/*.json'],
    languageOptions: { parser: jsoncParser },
    rules: {
      '@nx/dependency-checks': [
        'error',
        {
          buildTargets: ['build', 'custom-build'], // add non standard build target names
          checkMissingDependencies: true, // toggle to disable
          checkObsoleteDependencies: true, // toggle to disable
          checkVersionMismatches: true, // toggle to disable
          ignoredDependencies: ['lodash'], // these libs will be omitted from checks
          ignoredFiles: ['webpack.config.js', 'eslint.config.js'], // list of files that should be skipped for check
          includeTransitiveDependencies: true, // collect dependencies transitively from children
          useLocalPathsForWorkspaceDependencies: true, // toggle to disable
        },
      ],
    },
  },
]
