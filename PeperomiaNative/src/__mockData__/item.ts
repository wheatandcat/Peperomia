import { KIND_PARK, KIND_FISHING } from 'lib/getKind';
import { SelectItem } from 'domain/item';

export const itemsMockData: SelectItem[] = [
  {
    id: '1',
    title: '公園',
    kind: KIND_PARK,
  },
  {
    id: '2',
    title: '釣り',
    kind: KIND_FISHING,
  },
];

export const itemMockData: SelectItem = {
  id: '1',
  title: '公園',
  kind: KIND_PARK,
};
