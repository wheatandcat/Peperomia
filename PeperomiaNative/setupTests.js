// see https://airbnb.io/enzyme/docs/guides/react-native.html#example-configuration-for-jest

import 'react-native';
import 'jest-enzyme';
import Adapter from 'enzyme-adapter-react-16';
import Enzyme from 'enzyme';

/**
 * Set up DOM in node.js environment for Enzyme to mount to
 */
const { JSDOM } = require('jsdom');

const jsdom = new JSDOM('<!doctype html><html><body></body></html>');
const { window } = jsdom;

function copyProps(src, target) {
  Object.defineProperties(target, {
    ...Object.getOwnPropertyDescriptors(src),
    ...Object.getOwnPropertyDescriptors(target),
  });
}

global.window = window;
global.document = window.document;
global.navigator = {
  userAgent: 'node.js',
};
copyProps(window, global);

/**
 * Set up Enzyme to mount to DOM, simulate events,
 * and inspect the DOM in tests.
 */
Enzyme.configure({ adapter: new Adapter() });

const originalConsoleError = console.error;
const originalConsoleWarn = console.warn;
const originalConsoleLog = console.log;
console.error = message => {
  // see: https://jestjs.io/docs/en/tutorial-react.html#snapshot-testing-with-mocks-enzyme-and-react-16
  // see https://github.com/Root-App/react-native-mock-render/issues/6
  if (message.startsWith('Warning:') || message.includes('RFC2822')) {
    return;
  }

  originalConsoleError(message);
};
console.warn = message => {
  // moment.jsのwarning
  if (message.includes('RFC2822')) {
    return;
  }

  originalConsoleWarn(message);
};
console.log = (message, ...optionalParams) => {
  if (
    typeof message === 'string' &&
    message.includes &&
    (message.includes('DEBUG+41') ||
      message.includes('through error: Network request failed'))
  ) {
    return;
  }

  originalConsoleLog(message, ...optionalParams);
};
