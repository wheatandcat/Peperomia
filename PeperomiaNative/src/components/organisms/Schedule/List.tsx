import React, { FC } from 'react';
import { ItemDetail } from '../../../lib/db/itemDetail';
import Card from '../../molecules/Schedule/TouchableCard';
import { ConnectedType } from '../../pages/Schedule/Connected';

type Props = Pick<ConnectedType, 'onScheduleDetail'> & {
  data: ItemDetail[];
};

const List: FC<Props> = props => (
  <>
    {props.data.map((item, index) => (
      <Card
        key={item.id}
        {...item}
        kind={item.kind}
        end={index + 1 === props.data.length}
        onPress={() => props.onScheduleDetail(String(item.id))}
      />
    ))}
  </>
);

export default List;
