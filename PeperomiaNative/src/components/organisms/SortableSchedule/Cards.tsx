import React, { Component } from 'react';
import SortableList from 'react-native-sortable-list';
import EStyleSheet from 'react-native-extended-stylesheet';
import { SelectItemDetail } from '../../../domain/itemDetail';
import { Plan } from '../../pages/Schedule/Switch';
import { SortableItemDetail } from '../../pages/SortableSchedule/Connected';
import Card from '../../molecules/Schedule/Card';
import Row from './Row';

type DataKey = string | number;

type Props = Pick<Plan, 'onChangeItems'> & {
  data: SortableItemDetail[];
};

export default class extends Component<Props> {
  renderItem({ data, active }: { data: SortableItemDetail; active: boolean }) {
    return (
      <Row active={active}>
        <Card {...data} kind={data.kind} />
      </Row>
    );
  }

  onChangeItems = (nextOrder: DataKey[]) => {
    const data = nextOrder.map(id => {
      return this.props.data.find(item => Number(item.id) === Number(id));
    });

    const result = data.map(item => ({
      ...item,
      id: item && item.tmpId,
    }));

    this.props.onChangeItems(result as SelectItemDetail[]);
  };

  render() {
    const obj = this.props.data.reduce(
      (o, c) => ({ ...o, [String(c.id)]: c }),
      {}
    );

    return (
      <SortableList
        data={obj}
        renderRow={this.renderItem}
        style={styles.root}
        onChangeOrder={this.onChangeItems}
      />
    );
  }
}

const styles = EStyleSheet.create({
  root: {
    flex: 1,
  },
});
