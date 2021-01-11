import { KIND_PARK, KIND_FISHING } from 'peperomia-util';
import { Calendar } from 'queries/api/index';

export const calendarsMockData = (): Calendar[] => [
  {
    id: '1',
    date: '2020-01-01',
    public: true,
    item: {
      id: '1',
      title: '公園',
      kind: KIND_PARK,
      itemDetails: [
        {
          id: '1',
          title: 'test1',
          kind: 'park1',
          memo: 'memo1',
          place: 'place1',
          url: 'url1',
          priority: 1,
        },
        {
          id: '2',
          title: 'test2',
          kind: 'park2',
          memo: 'memo2',
          place: 'place2',
          url: 'url2',
          priority: 2,
        },
      ],
    },
  },
  {
    id: '2',
    date: '2020-01-01',
    public: true,
    item: {
      id: '2',
      title: '釣り',
      kind: KIND_FISHING,
      itemDetails: [
        {
          id: '1',
          title: 'test1',
          kind: 'park1',
          memo: 'memo1',
          place: 'place1',
          url: 'url1',
          priority: 1,
        },
        {
          id: '2',
          title: 'test2',
          kind: 'park2',
          memo: 'memo2',
          place: 'place2',
          url: 'url2',
          priority: 2,
        },
      ],
    },
  },
];

export const calendarMockData = (): Calendar => ({
  id: '1',
  date: '2020-01-01',
  public: true,
  item: {
    id: '1',
    title: '公園',
    kind: KIND_PARK,
    itemDetails: [
      {
        id: '1',
        title: 'test1',
        kind: 'park1',
        memo: 'memo1',
        place: 'place1',
        url: 'url1',
        priority: 1,
      },
      {
        id: '2',
        title: 'test2',
        kind: 'park2',
        memo: 'memo2',
        place: 'place2',
        url: 'url2',
        priority: 2,
      },
    ],
  },
});
