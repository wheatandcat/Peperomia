import React from 'react';
import { ItemDetail } from '../../../lib/db/itemDetail';
import Page from '../../templates/SortableSchedule/Page';

export type SortableItemDetail = ItemDetail & {
  tmpId?: number;
};

export type Props = {
  items: SortableItemDetail[];
  onChangeItems: (data: ItemDetail[]) => void;
};

type State = {
  items: ItemDetail[];
  ready: boolean;
};

export default (props: Props) => {
  const items = props.items.map(item => ({
    ...item,
    tmpId: item.id,
    id: item.priority,
  }));

  return <Page data={items} onChangeItems={props.onChangeItems} />;
};
