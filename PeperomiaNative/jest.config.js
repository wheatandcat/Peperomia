module.exports = {
  preset: 'react-native',
  transform: {
    '^.+\\.js$': '<rootDir>/node_modules/react-native/jest/preprocessor.js',
  },
  testRegex: '(spec|test)\\.[jt]sx?$',
  testPathIgnorePatterns: ['/node_modules/', '/e2e/'],

  transformIgnorePatterns: [
    'node_modules/(?!(react-native|(react-native-).*|static-container|@react-native-community|(rn-).*|(concat-).*|@sentry)/)',
  ],

  moduleNameMapper: {
    '\\.(jpg|jpeg|png|gif|eot|otf|webp|svg|ttf|woff|woff2|mp4|webm|wav|mp3|m4a|aac|oga)$':
      'empty/object',
  },

  setupFilesAfterEnv: [
    '<rootDir>setupTests.js',
    '<rootDir>/node_modules/jest-plugin-context/setup',
  ],
};
