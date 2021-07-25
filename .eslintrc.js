/** @type {WebGLRenderingContext} */
module.exports = {
  env: {
    browser: true,
    es2021: true,
  },
  extends: ['google', 'prettier'],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaVersion: 12,
    sourceType: 'module',
  },
  plugins: ['@typescript-eslint'],
  rules: {
    'require-jsdoc': 'off',
    '@typescript-eslint/no-unused-vars': [
      'error',
      {
        varsIgnorePattern: '_',
        argsIgnorePattern: '_',
        vars: 'all',
        args: 'after-used',
        ignoreRestSiblings: false,
      },
    ],
    '@typescript-eslint/no-unused-expressions': [
      'error',
      {
        allowShortCircuit: true,
        allowTernary: true,
      },
    ],
  },
};
