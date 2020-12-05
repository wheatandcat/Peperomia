import React, { memo } from 'react';
import { RouteProp } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from 'lib/navigation';
import Connected from './Connected';

type ScreenNavigationProp = StackNavigationProp<
  RootStackParamList,
  'ItemDetail'
>;
type ScreenRouteProp = RouteProp<RootStackParamList, 'ItemDetail'>;

export type Props = {
  navigation: ScreenNavigationProp;
  route: ScreenRouteProp;
};

const itemDetail: React.FC<Props> = (props) => {
  const date = props.route.params.date;
  const itemId = props.route.params.itemId;
  const itemDetailId = props.route.params.itemDetailId;
  const onCallback = props.route.params.onCallback;

  return (
    <Connected
      {...props}
      date={date}
      itemId={itemId}
      itemDetailId={itemDetailId}
      onCallback={onCallback}
    />
  );
};

export default memo(itemDetail);
