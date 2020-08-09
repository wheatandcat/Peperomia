import { by, element, expect } from 'detox';
import { addSchedule, addScheduleDetail } from './helper';

describe('Authentication tests', () => {
  beforeEach(async () => {});

  it('チュートリアル', async () => {});

  it('予定を作成', async () => {
    await element(by.id('ScheduleAdd')).tap();
    await addSchedule('葛西臨海公園');
    await expect(element(by.label('葛西臨海公園'))).toBeVisible();

    await element(by.id('ScheduleDetailAdd')).tap();
    await addScheduleDetail('新宿駅');

    await element(by.id('CreateScheduleFinished')).tap();
  });

  it('予定タイトルの更新', async () => {
    await expect(element(by.label('葛西臨海公園'))).toBeVisible();
    await element(by.id('ScheduleID_1')).tap();

    await element(by.id('ScheduleTitleUpdate')).tap();

    await addSchedule('上野公園');
  });

  // TODO: react-native-action-buttonが対応できなかったので一旦スルー
  /*
  it("予定詳細を追加", async () => {
    await element(by.id("ScheduleID_1")).tap();
    await waitFor(element(by.id("ScheduleMenu")))
      .toBeNotVisible()
      .withTimeout(1000);
    await element(by.id("ScheduleMenu")).tap();
    await waitFor(element(by.id("ScheduleMenuAdd")))
      .toBeNotVisible()
      .withTimeout(1000);
    await element(by.text("ScheduleMenuAdd")).tap();
    await addScheduleDetail("葛西臨海公園");
  });
  */

  it('予定詳細を編集', async () => {
    await element(by.id('ScheduleID_1')).tap();

    await element(by.id('itemDetailId_1')).tap();
    await element(by.id('ScheduleDetailMenu')).tap();

    await element(by.text('編集')).tap();

    await addScheduleDetail('上野駅');
  });

  it('予定の詳細を削除', async () => {
    await element(by.id('ScheduleID_1')).tap();

    await element(by.id('itemDetailId_1')).tap();
    await element(by.id('ScheduleDetailMenu')).tap();

    await element(by.text('削除')).tap();

    await element(by.text('削除する')).tap();
  });
});
