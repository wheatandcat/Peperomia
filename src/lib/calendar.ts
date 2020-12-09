import dayjs from 'dayjs';
import advancedFormat from 'dayjs/plugin/advancedFormat';
import 'dayjs/locale/ja';
import { ContextProps as CalendarsContextProps } from 'containers/Calendars';

dayjs.extend(advancedFormat);

// カレンダーの週間数を取得する
export const getWeekCount = (date: string) => {
  const startOfMonth = dayjs(date).startOf('month');
  const endOfMonth = dayjs(date).endOf('month');
  const firstDayOfWeek = startOfMonth.day();

  const days = endOfMonth.diff(startOfMonth, 'day') + 1;
  const weeks = Math.ceil((firstDayOfWeek + days) / 7);

  return weeks;
};

export const calendarKey = (calendars: CalendarsContextProps['calendars']) => {
  const key = calendars.map((v) => `${v?.date}-${v?.item.kind}`).join('_');
  return key;
};
