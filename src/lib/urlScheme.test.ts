import { urlParser } from './urlScheme';

describe('urlSchema', () => {
  describe('urlParser', () => {
    test('Schedule', () => {
      const url = 'Schedule/test';
      const r = urlParser(url);
      expect(r).toEqual({
        routeName: 'Schedule',
        params: {
          itemId: 'test',
        },
      });
    });

    test('ScheduleDetail', () => {
      const url = 'ScheduleDetail/test';
      const r = urlParser(url);
      expect(r).toEqual({
        routeName: 'ScheduleDetail',
        params: {
          itemDetailId: 'test',
        },
      });
    });

    test('一致しない', () => {
      const url = '';
      const r = urlParser(url);
      expect(r).toBeNull();
    });
  });
});
