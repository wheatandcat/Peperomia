import { cleanup, init } from "detox";
const adapter = require("detox/runners/jest/adapter");
const specReporter = require("detox/runners/jest/specReporter");
const assignReporter = require("detox/runners/jest/assignReporter");
import { reloadApp } from "detox-expo-helpers";
const config = require("../package.json").detox;

// @ts-ignore
detoxCircus.getEnv().addEventsListener(adapter);
// @ts-ignore
detoxCircus.getEnv().addEventsListener(specReporter);
// @ts-ignore
detoxCircus.getEnv().addEventsListener(assignReporter);

jest.setTimeout(300000);

beforeAll(async () => {
  await init(config);
  await reloadApp({
    permissions: { medialibrary: "YES" }
  });
});

beforeEach(async () => {
  await adapter.beforeEach();
});

afterAll(async () => {
  await adapter.afterAll();
  await cleanup();
});
