module.exports = {
  extends: ['airbnb-typescript'],
  parserOptions: {
    project: './tsconfig.json',
  },
  rules: {
    'no-console': 'off',
    'no-underscore-dangle': 0,
    'class-methods-use-this': 0,
    'import/prefer-default-export': 'off',
    'max-len': ["error", { "code": 120 }]
  },
  root: true,
};
