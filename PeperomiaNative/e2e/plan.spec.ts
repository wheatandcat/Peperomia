import { by, element, expect } from "detox";
import { reloadApp } from "detox-expo-helpers";
import { addSchedule } from "./helpr";

describe("Authentication tests", () => {
  beforeEach(async () => {
    await reloadApp();
  });

  it("アプリ紹介", async () => {});

  it("予定を追加", async () => {
    await element(by.id("ScheduleAdd")).tap();
    await addSchedule("葛西臨海公園");

    await expect(element(by.label("葛西臨海公園"))).toBeVisible();

    await element(by.id("ScheduleDetailAdd")).tap();
    await element(by.id("ScheduleDetailTitleInput")).tap();
    await element(by.id("ScheduleDetailTitleInput")).replaceText("新宿駅");
    await element(by.id("KeyBoardCloseInCreateScheduleDetail")).tap();
    await waitFor(element(by.id("ScheduleDetailCreated")))
      .toBeNotVisible()
      .withTimeout(1000);
    await element(by.id("ScheduleDetailCreated")).tap();

    await element(by.id("ScheduleDetailAdd")).tap();
    /*
    await element(by.id("TitleInput")).tap();
    await element(by.id("TitleInput")).replaceText("葛西臨海公園");
    await element(by.id("KeyBoardClose")).tap();
    await element(by.id("ScheduleDetailCreated")).tap();

    await element(by.id("ScheduleDetailAdd")).tap();
    await element(by.id("TitleInput")).tap();
    await element(by.id("TitleInput")).replaceText("葛西臨海公園水上バス");
    await element(by.id("KeyBoardClose")).tap();
    await element(by.id("ScheduleDetailCreated")).tap();

    await element(by.id("ScheduleDetailAdd")).tap();
    await element(by.id("TitleInput")).tap();
    await element(by.id("TitleInput")).replaceText("浅草寺二天門前");
    await element(by.id("KeyBoardClose")).tap();
    await element(by.id("ScheduleDetailCreated")).tap();

    await element(by.id("CreateScheduleFinished")).tap();
    */
  });

  /*
  it("タイトルの更新", async () => {
    await expect(element(by.label("葛西臨海公園"))).toBeVisible();
    await element(by.id("scheduleItemId_1")).tap();

    await element(by.id("updateTitle")).tap();

    await element(by.id("inputTextTitle")).tap();
    await element(by.id("inputTextTitle")).replaceText("上野公園");
    await element(by.id("completion")).tap();
    await element(by.id("completion")).tap();
  });

  it("予定の詳細を更新", async () => {
    await element(by.id("scheduleItemId_1")).tap();
    await element(by.id("scheduleItemDetailId_1")).tap();
    await element(by.id("scheduleDetailMenu")).tap();

    await element(by.text("編集")).tap();

    await element(by.id("inputTextScheduleDetailTitle")).tap();
    await element(by.id("inputTextScheduleDetailTitle")).replaceText("上野駅");
    await element(by.id("inputTextScheduleDetailMemo")).tap();
    await element(by.id("inputTextScheduleDetailMemo")).replaceText(
      "パンダの前に集合"
    );

    await element(by.id("saveScheduleDetail")).tap();
  });

  it("予定の詳細を削除", async () => {
    await element(by.id("scheduleItemId_1")).tap();
    await element(by.id("scheduleItemDetailId_3")).tap();
    await element(by.id("scheduleDetailMenu")).tap();

    await element(by.text("削除")).tap();
    await element(by.text("削除する")).tap();
  });
  */
});
