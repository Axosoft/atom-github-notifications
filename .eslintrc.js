module.exports = {
  extends: 'airbnb-base',
  plugins: ['import'],
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
