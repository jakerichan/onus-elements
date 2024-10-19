import stylistic from '@stylistic/eslint-plugin'
import { FlatCompat } from '@eslint/eslintrc'
import { fileURLToPath } from 'url'
import path from 'path'
import js from '@eslint/js'
import nxEslintPlugin from '@nx/eslint-plugin'
import tseslint from 'typescript-eslint'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)
const compat = new FlatCompat({
  baseDirectory: __dirname,
  recommendedConfig: js.configs.recommended,
})

export default [
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
  ...compat.config({ env: { jest: true } }).map(config => ({
    ...config,
    files: [
      '**/*.spec.ts',
      '**/*.spec.tsx',
      '**/*.spec.js',
      '**/*.spec.jsx',
    ],
    rules: {
      ...config.rules,
    },
  })),
]
