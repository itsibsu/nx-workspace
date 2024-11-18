const eslint = require('@eslint/js');
const globals = require('globals');
const nx = require('@nx/eslint-plugin');
const tseslint = require('typescript-eslint');
const eslintConfigPrettier = require('eslint-config-prettier');
const eslintPluginPrettierRecommended = require('eslint-plugin-prettier/recommended');
const a11y = require('eslint-plugin-jsx-a11y');
const react = require('eslint-plugin-react');
const reactHooks = require('eslint-plugin-react-hooks');

const { configs: nxConfigs } = nx;

module.exports = tseslint.config(
  {
    name: 'lint:init',
    ignores: [
      'dist/',
      '**/*.config.*',
      '**/jest.preset*',
      '.*.js',
      '**/node_modules/**',
      '.nx/',
    ],
  },
  eslint.configs.recommended,
  ...tseslint.configs.recommended,
  ...tseslint.configs.stylistic,
  ...nxConfigs['flat/base'],
  ...nxConfigs['flat/javascript'],
  ...nxConfigs['flat/typescript'],
  eslintConfigPrettier,
  eslintPluginPrettierRecommended,
  {
    name: 'lint:base',
    files: ['**/*.ts', '**/*.tsx'],
    plugins: {
      'jsx-a11y': a11y,
      nx,
      react,
      'react-hooks': reactHooks,
      '@typescript-eslint': tseslint.plugin,
    },
    languageOptions: {
      parser: tseslint.parser,
      parserOptions: {
        ecmaVersion: 2022,
        tsconfigRootDir: __dirname,
        ecmaFeatures: {
          jsx: true,
          modules: true,
        },
        sourceType: "module",
      },
      globals: {
        __dirname: "readonly",
        ...globals.browser,
      },
    },
    settings: {
      react: {
        version: "detect",
      },
    },
    rules: {
      ...react.configs.recommended.rules,
      ...reactHooks.configs.recommended.rules,
      ...a11y.configs.recommended.rules,
      '@typescript-eslint/no-explicit-any': 'off',
      '@typescript-eslint/prefer-for-of': 'off',
      '@typescript-eslint/consistent-indexed-object-style': 'off',
      '@typescript-eslint/prefer-function-type': 'off',
      '@typescript-eslint/no-unused-expressions': 'warn',
      '@typescript-eslint/no-unused-vars': [
        'warn',
        {
          argsIgnorePattern: '^_',
          varsIgnorePattern: '^_',
          caughtErrorsIgnorePattern: '^_',
        },
      ],
      'react/react-in-jsx-scope': 'off',
      '@nx/enforce-module-boundaries': [
        'error',
        {
          enforceBuildableLibDependency: true,
          allow: [],
          depConstraints: [
            {
              sourceTag: '*',
              onlyDependOnLibsWithTags: ['*'],
            },
          ],
        },
      ],
    },
  },
);
