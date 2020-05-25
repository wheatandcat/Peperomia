module.exports = {
  preset: 'jest-expo',
  testURL: 'http://localhost',
  transform: {
    '^.+\\.js$': '<rootDir>/node_modules/react-native/jest/preprocessor.js',
  },
  testRegex: '(spec|test)\\.[jt]sx?$',
  testPathIgnorePatterns: ['/node_modules/', '/e2e/'],

  transformIgnorePatterns: [
    'node_modules/(?!(jest-)?react-native|react-native-root-siblings|static-container|react-clone-referenced-element|@react-native-community|react-native-cookies|@sentry/react-native|expo(nent)?|@expo(nent)?/.*|react-navigation|@react-navigation/.*|@unimodules/.*|unimodules|sentry-expo|native-base)',
  ],
  moduleNameMapper: {
    '\\.(jpg|jpeg|png|gif|eot|otf|webp|svg|ttf|woff|woff2|mp4|webm|wav|mp3|m4a|aac|oga)$':
      'identity-obj-proxy',
  },

  setupFilesAfterEnv: [
    '<rootDir>setupTests.js',
    '<rootDir>/node_modules/jest-plugin-context/setup',
  ],

  collectCoverageFrom: [
    'src/**/*.{js,jsx,ts,tsx}',
    'src/**/*.!{d.ts}',
    '!**/(node_modules|src/@types|src/queries)/**',
    '!**/mockData.ts',
  ],
};
