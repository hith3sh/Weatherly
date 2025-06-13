// .eslintrc.js
module.exports = {
  root: true,
  extends: [
    'next/core-web-vitals',
    'plugin:@typescript-eslint/recommended',
    'plugin:prettier/recommended',
  ],
  parser: '@typescript-eslint/parser',
  plugins: ['@typescript-eslint'],
  rules: {
    // Customize rules here (optional)
    '@typescript-eslint/no-unused-vars': ['warn'],
    'prettier/prettier': ['error'],
  },
};
