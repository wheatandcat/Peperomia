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
  'EditItemDetail'
>;
type ScreenRouteProp = RouteProp<RootStackParamList, 'EditItemDetail'>;

export type Props = {
  navigation: ScreenNavigationProp;
  route: ScreenRouteProp;
};

const EditItemDetail: React.FC<Props> = memo((props) => {
  const date = props.route.params?.date;
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
});

export default EditItemDetail;
