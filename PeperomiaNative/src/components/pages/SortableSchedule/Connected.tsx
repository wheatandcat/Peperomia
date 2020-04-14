import React from 'react';
import { SelectItemDetail } from 'domain/itemDetail';
import Page from '../../templates/SortableSchedule/Page';
import { SwitchType } from '../Schedule/Switch';

export type SortableItemDetail = SelectItemDetail & {
  tmpId?: number | string;
};

type Props = Pick<SwitchType, 'onChangeItems'> & {
  items: SortableItemDetail[];
};

export default (props: Props) => {
  const items = props.items.map((item) => ({
    ...item,
    tmpId: item.id,
    id: item.priority,
  }));

  return <Page data={items} onChangeItems={props.onChangeItems} />;
};
