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
    'react-native/no-unused-styles': 2,
    'react-native/split-platform-components': 2,
    'react-native/no-inline-styles': 2,
    'react-native/no-raw-text': 2,
  },

  parserOptions: {
    warnOnUnsupportedTypeScriptVersion: false,
  },
};
