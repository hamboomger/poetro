module.exports = {
  extends: ['airbnb-typescript'],
  parserOptions: {
    project: './tsconfig.json',
  },
  rules: {
    'no-console': 'off',
    'no-underscore-dangle': 0,
    'import/prefer-default-export': 'off',
  },
  root: true,
};