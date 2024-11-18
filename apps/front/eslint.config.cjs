const baseConfig = require('../../eslint.config.cjs');
const js = require('@eslint/js');
const tseslint = require('typescript-eslint');

module.exports = tseslint.config({
  name: 'front',
  extends: [...baseConfig],
});