import { by, element } from "detox";

export const addSchedule = async (title: string) => {
  await element(by.id("ScheduleTitleInput")).tap();
  await element(by.id("ScheduleTitleInput")).replaceText(title);
  await element(by.id("KeyBoardCloseInCreateSchedule")).tap();
  await waitFor(element(by.id("ScheduleCreated")))
    .toBeNotVisible()
    .withTimeout(1000);
  await element(by.id("ScheduleCreated")).tap();
};

export const addScheduleDetail = async (title: string) => {
  await element(by.id("ScheduleDetailTitleInput")).tap();
  await element(by.id("ScheduleDetailTitleInput")).replaceText(title);
  await element(by.id("KeyBoardCloseInCreateScheduleDetail")).tap();
  await waitFor(element(by.id("ScheduleDetailCreated")))
    .toBeNotVisible()
    .withTimeout(1000);
  await element(by.id("ScheduleDetailCreated")).tap();
};
