import { SelectCalendar } from 'domain/calendar';
import { KIND_PARK, KIND_FISHING } from 'lib/getKind';

export const calendarsMockData: SelectCalendar[] = [
  {
    id: '1',
    itemId: '1',
    title: '公園',
    kind: KIND_PARK,
    date: '2020-01-01',
  },
  {
    id: '2',
    itemId: '2',
    title: '釣り',
    kind: KIND_FISHING,
    date: '2020-01-02',
  },
];

export const calendarMockData: SelectCalendar = {
  id: '1',
  itemId: '1',
  title: '公園',
  kind: KIND_PARK,
  date: '2020-01-01',
};
