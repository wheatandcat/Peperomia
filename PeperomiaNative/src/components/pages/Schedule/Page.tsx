import React, { FC, memo, useCallback } from 'react';
import { View, Alert } from 'react-native';
import EStyleSheet from 'react-native-extended-stylesheet';
import { SelectItemDetail } from 'domain/itemDetail';
import Cards from 'components/organisms/Schedule/Cards';
import ActionButton from 'components/molecules/Schedule/ActionButton';
import { ConnectedType } from './Connected';

type Props = Pick<ConnectedType, 'onScheduleDetail'> & {
  data: SelectItemDetail[];
  loading: boolean;
  onAdd: () => void;
  onSort: () => void;
  onDelete: () => void;
};

const SchedulePage: FC<Props> = (props) => {
  const onDelete = useCallback(() => {
    Alert.alert(
      '本当に削除しますか？',
      '',
      [
        {
          text: 'キャンセル',
          style: 'cancel',
        },
        {
          text: '削除する',
          onPress: () => {
            props.onDelete();
          },
        },
      ],
      { cancelable: false }
    );
  }, [props]);

  return (
    <View style={styles.root}>
      <Cards
        data={props.data}
        onScheduleDetail={props.onScheduleDetail}
        loading={props.loading}
      />
      <View style={styles.footer}>
        <ActionButton
          onAdd={props.onAdd}
          onSort={props.onSort}
          onDelete={onDelete}
        />
      </View>
    </View>
  );
};

export default memo(SchedulePage);

const styles = EStyleSheet.create({
  root: {
    backgroundColor: '$background',
    height: '100%',
  },
  footer: {
    width: 60,
    height: 60,
    position: 'absolute',
    bottom: 50,
    right: 40,
  },
});
