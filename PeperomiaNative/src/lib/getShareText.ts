import { ItemDetail } from './db/itemDetail';

export default (itemDetails: ItemDetail[]): string => {
  const results = itemDetails
    .map(itemDetail => {
      const { title, moveMinutes } = itemDetail;

      const moveMinutesText = moveMinutes ? ` : ${moveMinutes}分` : '';

      return `${title}${moveMinutesText}`;
    })
    .join('\n↓\n');

  return results;
};
