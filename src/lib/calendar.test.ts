import { getWeekCount } from './calendar';

describe('lib/calendar', () => {
  describe('getWeekCount', () => {
    test('2020年7月 => week 5', () => {
      expect(getWeekCount('2020-07-05')).toEqual(5);
    });
    test('2020年8月 => week 6', () => {
      expect(getWeekCount('2020-08-05')).toEqual(6);
    });
    test('2020年10月 => week 6', () => {
      expect(getWeekCount('2020-10-05')).toEqual(5);
    });
  });
});
