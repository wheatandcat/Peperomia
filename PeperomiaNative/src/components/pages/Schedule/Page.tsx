import React, { Component } from 'react';
import { View, Alert } from 'react-native';
import EStyleSheet from 'react-native-extended-stylesheet';
import { ItemDetail } from '../../../lib/db/itemDetail';
import Cards from '../../organisms/Schedule/Cards';
import ActionButton from '../../molecules/Schedule/ActionButton';
import { ConnectedType } from './Connected';

type Props = Pick<ConnectedType, 'onScheduleDetail'> & {
  data: ItemDetail[];
  onAdd: () => void;
  onSort: () => void;
  onDelete: () => void;
};

export default class extends Component<Props> {
  onDelete = () => {
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
            this.props.onDelete();
          },
        },
      ],
      { cancelable: false }
    );
  };

  render() {
    return (
      <View style={styles.root}>
        <Cards
          data={this.props.data}
          onScheduleDetail={this.props.onScheduleDetail}
        />
        <View style={styles.footer}>
          <ActionButton
            onAdd={this.props.onAdd}
            onSort={this.props.onSort}
            onDelete={this.onDelete}
          />
        </View>
      </View>
    );
  }
}

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
