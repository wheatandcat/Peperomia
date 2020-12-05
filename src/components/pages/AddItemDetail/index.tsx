import React, { memo } from 'react';
import { RouteProp } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from 'lib/navigation';
import dayjs from 'dayjs';
import advancedFormat from 'dayjs/plugin/advancedFormat';
import 'dayjs/locale/ja';
import Connected from './Connected';

dayjs.extend(advancedFormat);

type ScreenNavigationProp = StackNavigationProp<
  RootStackParamList,
  'AddItemDetail'
>;
type ScreenRouteProp = RouteProp<RootStackParamList, 'AddItemDetail'>;

export type Props = {
  navigation: ScreenNavigationProp;
  route: ScreenRouteProp;
};

const AddItemDetail: React.FC<Props> = memo((props) => {
  const date =
    props.route.params?.date || dayjs().format('YYYY-MM-DDT00:00:00');
  const itemId = props.route.params?.itemId || '';
  const priority = props.route.params?.priority || 0;
  const onCallback = props.route.params?.onCallback;

  return (
    <Connected
      {...props}
      date={date}
      itemId={itemId}
      priority={priority}
      onCallback={onCallback}
    />
  );
});

export default AddItemDetail;
