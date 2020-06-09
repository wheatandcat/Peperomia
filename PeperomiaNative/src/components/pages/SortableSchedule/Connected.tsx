import React from 'react';
import { SelectItemDetail } from 'domain/itemDetail';
import Page from 'components/templates/SortableSchedule/Page';
import { SwitchType } from 'components/pages/Schedule/Switch';

export type SortableItemDetail = SelectItemDetail & {
  tmpId?: number | string;
};

type Props = Pick<SwitchType, 'onChangeItems'> & {
  items: SortableItemDetail[];
};

const SortableSchedule: React.FC<Props> = (props) => {
  const items = props.items.map((item) => ({
    ...item,
    tmpId: item.id,
    id: item.priority,
  }));

  return <Page data={items} onChangeItems={props.onChangeItems} />;
};

export default SortableSchedule;
