const stylistic = require('@stylistic/eslint-plugin')
const { FlatCompat } = require('@eslint/eslintrc')
const { fileURLToPath } = require('url')
const path = require('path')
const js = require('@eslint/js')
const nxEslintPlugin = require('@nx/eslint-plugin')
const tseslint = require('typescript-eslint')

const compat = new FlatCompat({
  baseDirectory: __dirname,
  recommendedConfig: js.configs.recommended,
})

module.exports = [
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
]
