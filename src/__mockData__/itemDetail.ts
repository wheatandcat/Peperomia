import { KIND_PARK } from 'peperomia-util';
import { ItemDetail } from 'queries/api/index';

export const itemDetailMockData = (): ItemDetail => ({
  id: '1',
  title: 'test1',
  kind: KIND_PARK,
  memo: 'memo1',
  place: 'place1',
  url: 'url1',
  priority: 1,
});
