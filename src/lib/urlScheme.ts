type ResultURLParser = {
  routeName: string;
  params?: Object;
} | null;

const urlScheme = [
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
          scheduleDetailId: id,
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
