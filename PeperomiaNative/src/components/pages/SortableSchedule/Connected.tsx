import React from 'react';
import { ItemDetail } from '../../../lib/db/itemDetail';
import Page from '../../templates/SortableSchedule/Page';

export type SortableItemDetail = ItemDetail & {
  tmpId?: number;
};

type Props = {
  items: SortableItemDetail[];
  onChangeItems: (data: ItemDetail[]) => void;
};

export default (props: Props) => {
  const items = props.items.map(item => ({
    ...item,
    tmpId: item.id,
    id: item.priority,
  }));

  return <Page data={items} onChangeItems={props.onChangeItems} />;
};
