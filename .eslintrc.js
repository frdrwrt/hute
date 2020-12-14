module.exports = {
  env: {
    browser: true,
    node: true,
    jest: true,
    es2021: true,
  },
  plugins: ['svelte3'],
  extends: ['airbnb-base', 'prettier'],
  overrides: [
    {
      files: ['**/*.svelte'],
      processor: 'svelte3/svelte3',
    },
  ],
  parserOptions: {
    ecmaVersion: 12,
    sourceType: 'module',
  },
  rules: {
    'no-console': 0,
    radix: 0,
    'import/prefer-default-export': 0,
    'import/extensions': 0,
    'import/no-extraneous-dependencies': 0,
    'import/first': 0,
    'import/no-mutable-exports': 0,
    'no-restricted-globals': 0,
  },
};
