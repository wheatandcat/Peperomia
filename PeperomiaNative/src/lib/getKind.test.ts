import getKind, {
  KIND_PARK,
  KIND_TRAIN,
  KIND_SHIP,
  KIND_DEFAULT,
} from './getKind';

jest.mock('react-native-extended-stylesheet', () => {
  return jest.fn().mockImplementation(() => {
    return {};
  });
});

describe('getKind', () => {
  test('kind=KIND_PARK', () => {
    expect(getKind('葛西臨海公園')).toEqual(KIND_PARK);
  });
  test('kind=KIND_SHIP', () => {
    expect(getKind('葛西臨海公園 水上バス')).toEqual(KIND_SHIP);
  });
  test('kind=KIND_TRAIN', () => {
    expect(getKind('新宿駅')).toEqual(KIND_TRAIN);
  });
  test('kind=KIND_DEFAULT', () => {
    expect(getKind('浅草')).toEqual(KIND_DEFAULT);
  });
});
