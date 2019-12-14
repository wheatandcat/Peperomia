module.exports = {
  extends: '@react-native-community',
  env: {
    jest: true,
  },
  rules: {
    curly: 0,
    'prettier/prettier': [
      'error',
      {
        singleQuote: true,
        trailingComma: 'es5',
      },
    ],
  },
};
