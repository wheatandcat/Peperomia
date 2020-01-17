import { SelectItemDetail } from '../domain/itemDetail';

export default (itemDetails: SelectItemDetail[]): string => {
  const results = itemDetails
    .map(itemDetail => {
      const { title, moveMinutes } = itemDetail;

      const moveMinutesText = moveMinutes ? ` : ${moveMinutes}分` : '';

      return `${title}${moveMinutesText}`;
    })
    .join('\n↓\n');

  return results;
};
