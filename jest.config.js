module.exports = {
  preset: 'jest-expo',
  verbose: true,
  testURL: 'http://localhost/',
  transform: {
    '^.+\\.js$': '<rootDir>/node_modules/react-native/jest/preprocessor.js',
  },
  testRegex: '(spec|test)\\.[jt]sx?$',
  testPathIgnorePatterns: ['/node_modules/', '/e2e/'],
  transformIgnorePatterns: [
    'node_modules/(?!(jest-)?react-native|react-native-root-siblings|static-container|react-clone-referenced-element|@react-native-community|react-native-cookies|expo(nent)?|@expo(nent)?/.*|react-navigation|@react-navigation/.*|@unimodules/.*|unimodules|sentry-expo|native-base|@sentry/.*)',
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
    '!**/stories.js',
    '!src/components/pages/Policy/Page.tsx',
    '!src/components/pages/Tos/Page.tsx',
    '!src/components/pages/LoginWithAmazon/*.tsx',
    '!src/components/pages/ScreenSetting/*.tsx',
    '!src/components/pages/NotificationSetting/Page.tsx',
    '!src/domain/*.ts',
    '!src/lib/firestore/*.ts',
    '!src/lib/system/firebase/*.ts',
    '!src/lib/db/*.ts',
    '!src/app.tsx',
    '!src/index.js',
    '!src/GlobalStyles.tsx',
  ],
};
