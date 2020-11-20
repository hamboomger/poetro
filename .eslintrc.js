module.exports = {
  extends: ['airbnb-typescript'],
  parserOptions: {
    project: './tsconfig.json',
  },
  rules: {
    'no-console': 'off',
    'no-underscore-dangle': [ 'error', { 'allow': ['_id'] } ],
  },
  root: true,
};
