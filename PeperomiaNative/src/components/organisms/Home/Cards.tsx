import React from 'react';
import {
  View,
  Text,
  RefreshControl,
  TouchableOpacity,
  Alert,
} from 'react-native';
import EStyleSheet from 'react-native-extended-stylesheet';
import { SwipeListView } from 'react-native-swipe-list-view';
import theme from '../../../config/theme';
import { HomeScreenPlanType } from '../../pages/Home/Connected';
import Card from '../../molecules/Home/Card';
import { ItemProps } from '../../pages/Home/Connected';

export type Props = HomeScreenPlanType & {
  data: ItemProps[];
  loading: boolean;
};

export default ({ loading, data, onSchedule, onDelete }: Props) => {
  const onDeleteAlert = ({ id }: ItemProps) => {
    Alert.alert(
      '削除しますか？',
      '',
      [
        {
          text: 'キャンセル',
          style: 'cancel',
        },
        {
          text: '削除する',
          onPress: () => {
            onDelete(id);
          },
        },
      ],
      { cancelable: false }
    );
  };

  return (
    <View>
      <SwipeListView
        useFlatList
        refreshControl={<RefreshControl refreshing={loading} />}
        refreshing={loading}
        contentContainerStyle={styles.swipeContentContainer}
        data={data}
        keyExtractor={item => String(item.id)}
        renderHiddenItem={({ item }: { item: ItemProps }) => (
          <View style={styles.deleteContainer}>
            <View />
            <DeleteButton onPress={() => onDeleteAlert(item)} />
          </View>
        )}
        renderItem={({ item }: { item: ItemProps }) => (
          <Card
            {...item}
            onPress={() => {
              onSchedule(item.id, item.title);
            }}
            testID={`ScheduleID_${item.id}`}
          />
        )}
        rightOpenValue={-85}
        stopRightSwipe={-105}
        disableRightSwipe
        closeOnRowBeginSwipe={false}
        closeOnScroll={false}
      />
    </View>
  );
};

type DeleteButtonProps = {
  onPress: () => void;
};

const DeleteButton = ({ onPress }: DeleteButtonProps) => (
  <TouchableOpacity onPress={onPress}>
    <View style={styles.deleteButton}>
      <Text style={styles.deleteText}>削除</Text>
    </View>
  </TouchableOpacity>
);

const styles = EStyleSheet.create({
  deleteButton: {
    margin: 3,
    borderRadius: 5,
    borderWidth: 0.5,
    borderColor: theme().color.red,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: theme().color.red,
    height: 80,
    width: 80,
  },
  deleteText: {
    color: theme().color.white,
    fontWeight: 'bold',
  },
  deleteContainer: {
    justifyContent: 'space-between',
    flexDirection: 'row',
    flex: 1,
  },
  swipeContentContainer: {
    paddingBottom: 300,
  },
});
