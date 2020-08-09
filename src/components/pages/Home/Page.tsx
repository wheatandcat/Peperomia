import React from 'react';
import { View, Text } from 'react-native';
import EStyleSheet from 'react-native-extended-stylesheet';
import Cards from 'components/organisms/Home/Cards';
import { ConnectType, ItemProps } from './Plain';

type Props = ConnectType & {
  data: ItemProps[];
  loading: boolean;
};

const HomePage: React.FC<Props> = ({ loading, data, onSchedule, onDelete }) => (
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

export default HomePage;

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
