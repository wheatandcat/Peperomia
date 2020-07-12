import { uniqueSuggests } from './suggest';
import { KIND_PARK, KIND_TRAIN, KIND_SHIP } from 'peperomia-util';

jest.mock('react-native-extended-stylesheet', () => {
  return jest.fn().mockImplementation(() => {
    return {};
  });
});

describe('uniqueSuggests', () => {
  test('重複削除', () => {
    expect(
      uniqueSuggests([
        {
          title: '上野公園',
          kind: KIND_PARK,
        },
        {
          title: '上野駅',
          kind: KIND_TRAIN,
        },
        {
          title: '水上バス',
          kind: KIND_SHIP,
        },
        {
          title: '上野駅',
          kind: KIND_TRAIN,
        },
      ])
    ).toEqual([
      {
        title: '上野公園',
        kind: KIND_PARK,
      },
      {
        title: '上野駅',
        kind: KIND_TRAIN,
      },
      {
        title: '水上バス',
        kind: KIND_SHIP,
      },
    ]);
  });
});
