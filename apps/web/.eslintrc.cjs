module.exports = {
  root: true,
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaVersion: 2020,
    sourceType: 'module',
  },
  env: {
    browser: true,
    es2020: true,
  },
  ignorePatterns: ['dist'],
  plugins: ['react-hooks'],
  extends: [
    'eslint:recommended',
    'plugin:react-hooks/recommended'
  ],
  rules: {
    'no-unused-vars': 'off',
    'no-undef': 'off'
  }
};
