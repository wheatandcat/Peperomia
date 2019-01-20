const { reloadApp } = require("detox-expo-helpers");
const { takeScreenshot } = require("./helpers");

describe("Example", () => {
  beforeEach(async () => {
    await reloadApp();
  });

  afterEach(async () => {
    takeScreenshot();
  });

  it("スケジュール追加", async () => {
    takeScreenshot();
    await element(by.id("guidWelcomeNext")).tap();
    await element(by.id("guidShareNext")).tap();

    await expect(element(by.label("プランの登録はありません"))).toBeVisible();
    takeScreenshot();

    await element(by.id("addSchedule")).tap();
    await element(by.id("inputTextTitle")).tap();
    await element(by.id("inputTextTitle")).replaceText("葛西臨海公園");
    await element(by.id("completion")).tap();
    takeScreenshot();

    await element(by.id("addScheduleDetail")).tap();
    takeScreenshot();
    await element(by.id("inputTextScheduleDetailTitle")).tap();
    await element(by.id("inputTextScheduleDetailTitle")).replaceText("新宿駅");
    await element(by.id("inputTextScheduleDetailMemo")).tap();
    await element(by.id("inputTextScheduleDetailMemo")).replaceText(
      "8:00に西口に集合する"
    );
    takeScreenshot();
    await element(by.id("saveScheduleDetail")).tap();

    await element(by.id("addScheduleDetail")).tap();
    await element(by.id("inputTextScheduleDetailTitle")).tap();
    await element(by.id("inputTextScheduleDetailTitle")).replaceText(
      "葛西臨海公園"
    );
    await element(by.id("inputTextScheduleDetailMemo")).tap();
    await element(by.id("inputTextScheduleDetailMemo")).replaceText(
      "行く場所：砂浜、観覧車、水族園"
    );
    await element(by.id("saveScheduleDetail")).tap();

    await element(by.id("addScheduleDetail")).tap();
    await element(by.id("inputTextScheduleDetailTitle")).tap();
    await element(by.id("inputTextScheduleDetailTitle")).replaceText(
      "葛西臨海公園水上バス"
    );
    await element(by.id("saveScheduleDetail")).tap();

    await element(by.id("addScheduleDetail")).tap();
    await element(by.id("inputTextScheduleDetailTitle")).tap();
    await element(by.id("inputTextScheduleDetailTitle")).replaceText(
      "浅草寺二天門前"
    );
    await element(by.id("saveScheduleDetail")).tap();
    takeScreenshot();

    await element(by.id("saveSchedule")).tap();

    takeScreenshot();
  });
});
