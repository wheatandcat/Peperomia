const { execSync } = require("child_process");
const { existsSync, mkdirSync, renameSync, rmdirSync } = require("fs");

const SCREENSHOT_DIR = "/tmp/ShioriNativeScreenshots";

const SCREENSHOT_OPTIONS = {
  timeout: 1000,
  killSignal: "SIGKILL"
};

let screenshotIndex = 0;

const takeScreenshot = () => {
  if (!existsSync(SCREENSHOT_DIR)) mkdirSync(SCREENSHOT_DIR);

  const screenshotFilename = `${SCREENSHOT_DIR}/screenshot-${screenshotIndex++}.png`;
  execSync(
    `xcrun simctl io booted screenshot ${screenshotFilename}`,
    SCREENSHOT_OPTIONS
  );
};

const screenshotMove = () => {
  renameSync(SCREENSHOT_DIR, "./screenshots");
};

module.exports = { takeScreenshot, screenshotMove };
