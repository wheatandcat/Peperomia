import React, { Component } from 'react';
import { FlatList } from 'react-native';
import EStyleSheet from 'react-native-extended-stylesheet';
import { ItemDetail } from '../../../lib/db/itemDetail';
import Card from '../../molecules/Schedule/TouchableCard';
import { ConnectedType } from '../../pages/Schedule/Connected';

type Props = Pick<ConnectedType, 'onScheduleDetail'> & {
  data: ItemDetail[];
};

export default class extends Component<Props> {
  renderItem({ item, index }: { item: ItemDetail; index: number }) {
    return (
      <Card
        {...item}
        kind={item.kind}
        end={index + 1 === this.props.data.length}
        onPress={() => this.props.onScheduleDetail(String(item.id))}
      />
    );
  }

  render() {
    return (
      <FlatList
        data={this.props.data}
        keyExtractor={item => String(item.id)}
        renderItem={this.renderItem.bind(this)}
        contentContainerStyle={styles.root}
      />
    );
  }
}

const styles = EStyleSheet.create({
  root: {
    paddingBottom: 50,
  },
});
