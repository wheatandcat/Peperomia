import { SelectItemDetail } from '../domain/itemDetail';
import getShareText from './getShareText';

describe('getShareText', () => {
  test('itemDetails=[]', () => {
    const itemDetails: SelectItemDetail[] = [];
    expect(getShareText(itemDetails)).toEqual('');
  });

  const getItem = (title: string, moveMinutes?: number) => ({
    id: title,
    itemId: 1,
    title,
    kind: 'park',
    moveMinutes: moveMinutes || 0,
    priority: 1,
    memo: '',
    place: '',
    url: '',
  });

  test('itemDetails=[...(4 items)]', () => {
    const itemDetails: SelectItemDetail[] = [
      getItem('新宿駅', 30),
      getItem('葛西臨海公園'),
      getItem('葛西臨海公園 水上バス', 120),
      getItem('浅草寺二天門前'),
    ];
    expect(getShareText(itemDetails)).toEqual(
      '新宿駅 : 30分\n↓\n葛西臨海公園\n↓\n葛西臨海公園 水上バス : 120分\n↓\n浅草寺二天門前'
    );
  });
});
