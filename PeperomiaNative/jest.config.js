module.exports = {
  preset: 'jest-expo',
  testRegex: '(spec|test)\\.[jt]sx?$',
  testPathIgnorePatterns: ['/node_modules/', '/e2e/'],

  transformIgnorePatterns: [
    'node_modules/(?!(jest-)?react-native|react-clone-referenced-element|@react-native-community|expo(nent)?|@expo(nent)?/.*|react-navigation|@react-navigation/.*|@unimodules/.*|unimodules|sentry-expo|native-base)',
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
