import React, { FC } from 'react';
import { View } from 'react-native';
import EStyleSheet from 'react-native-extended-stylesheet';
import Cards from 'components/organisms/SortableSchedule/Cards';
import { SwitchType } from 'components/pages/Schedule/Switch';
import { SortableItemDetail } from 'components/pages/SortableSchedule/Connected';

type Props = Pick<SwitchType, 'onChangeItems'> & {
  data: SortableItemDetail[];
};

const SortableSchedule: FC<Props> = (props) => (
  <View style={styles.root}>
    <View style={styles.contens}>
      <Cards data={props.data} onChangeItems={props.onChangeItems} />
    </View>
  </View>
);

const styles = EStyleSheet.create({
  root: {
    backgroundColor: '$background',
  },
  contens: {
    height: '100%',
    width: '100%',
  },
});

export default SortableSchedule;
