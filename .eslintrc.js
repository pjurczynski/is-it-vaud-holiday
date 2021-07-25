/** @type {WebGLRenderingContext} */
module.exports = {
  env: {
    browser: true,
    es2021: true,
  },
  extends: [
    'google',
    'plugin:@angular-eslint/ng-cli-compat',
    'plugin:@angular-eslint/ng-cli-compat--formatting-add-on',
    'plugin:@angular-eslint/template/process-inline-templates',
    'prettier',
  ],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaVersion: 12,
    sourceType: 'module',
  },
  plugins: ['@typescript-eslint'],
  rules: {
    'require-jsdoc': 'off',
    'object-curly-spacing': 'always',
  },
};
