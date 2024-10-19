import { FlatCompat } from '@eslint/eslintrc'
import js from '@eslint/js'
import path from 'path'
import { fileURLToPath } from 'url'
import baseConfig from '../../eslint.config.js'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)
const compat = new FlatCompat({
  baseDirectory: __dirname,
  recommendedConfig: js.configs.recommended,
})

export default [
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
]
