require("babel-polyfill");
const detox = require("detox");
const config = require("../package.json").detox;
const { screenshotMove } = require("./helpers");

before(async () => {
  await detox.init(config);
});

after(async () => {
  screenshotMove();
  await detox.cleanup();
});
