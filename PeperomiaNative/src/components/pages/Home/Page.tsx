import React from 'react';
import { View, Text } from 'react-native';
import EStyleSheet from 'react-native-extended-stylesheet';
import Cards, { Props as CardsProps } from '../../organisms/Home/Cards';
import { HomeScreenPlan } from './Connected';

type Props = CardsProps & Pick<HomeScreenPlan, 'onSchedule' | 'onDelete'>;

export default ({ loading, data, onSchedule, onDelete }: Props) => (
  <View style={styles.root}>
    <View style={styles.content}>
      {data.length > 0 ? (
        <Cards
          data={data}
          loading={false}
          onSchedule={onSchedule}
          onDelete={onDelete}
        />
      ) : (
        <View style={styles.notItemsContainer}>
          {!loading && <Text style={styles.notItems}>予定がありません</Text>}
        </View>
      )}
    </View>
  </View>
);

const styles = EStyleSheet.create({
  root: {
    backgroundColor: '$background',
  },
  content: {
    height: '100%',
    paddingTop: 3,
  },
  notItemsContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  notItems: {
    color: '$text',
  },
});
