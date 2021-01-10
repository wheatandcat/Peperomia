import dayjs from 'dayjs';
import advancedFormat from 'dayjs/plugin/advancedFormat';
import 'dayjs/locale/ja';

dayjs.extend(advancedFormat);

type ResultURLParser = {
  routeName: string;
  params?: Object;
} | null;

const urlScheme = [
  {
    regex: /Calendar\/[0-9]{4}-[0-3]{2}-[0-9]{2}\/?/iu,
    navigate: (url: string): ResultURLParser => {
      const path = url.match(/Calendar\/[0-9]{4}-[0-3]{2}-[0-9]{2}\/?/u);
      if (!path) {
        return null;
      }

      const date = path[0].split('/')[1];

      return {
        routeName: 'Calendar',
        params: {
          date: dayjs(date).format('YYYY-MM-DDT00:00:00'),
        },
      };
    },
  },
  {
    regex: /Schedule\/[0-9a-zA-Z]*\/?/iu,
    navigate: (url: string): ResultURLParser => {
      const path = url.match(/Schedule\/[0-9a-zA-Z]*\/?/u);
      if (!path) {
        return null;
      }
      const id = path[0].split('/')[1];

      return {
        routeName: 'Schedule',
        params: {
          itemId: id,
        },
      };
    },
  },
  {
    regex: /ScheduleDetail\/[0-9a-zA-Z]*\/?/iu,
    navigate: (url: string): ResultURLParser => {
      const path = url.match(/ScheduleDetail\/[0-9a-zA-Z]*\/?/u);
      if (!path) {
        return null;
      }
      const id = path[0].split('/')[1];

      return {
        routeName: 'ScheduleDetail',
        params: {
          itemDetailId: id,
        },
      };
    },
  },
];

export const urlParser = (url: string): ResultURLParser => {
  const us = urlScheme.find((s) => s.regex.test(url));

  if (!us) {
    return null;
  }

  return us.navigate(url);
};
