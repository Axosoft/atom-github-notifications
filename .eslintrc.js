module.exports = {
  extends: ['airbnb-base', 'plugin:flowtype/recommended'],
  parser: 'babel-eslint',
  plugins: ['flowtype', 'import'],
  globals: {
    atom: true,
  },
  rules: {
    'comma-dangle': ['error', 'only-multiline'],
  },
  settings: {
    'import/core-modules': ['atom'],
  },
};
