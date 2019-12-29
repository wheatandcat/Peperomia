import React, { Component } from 'react';
import { ItemDetail } from '../../../lib/db/itemDetail';
import Card from '../../molecules/Schedule/TouchableCard';
import { ConnectedType } from '../../pages/Schedule/Connected';

type Props = Pick<ConnectedType, 'onScheduleDetail'> & {
  data: ItemDetail[];
};

export default class extends Component<Props> {
  render() {
    return (
      <>
        {this.props.data.map((item, index) => (
          <Card
            key={item.id}
            {...item}
            kind={item.kind}
            end={index + 1 === this.props.data.length}
            onPress={() => this.props.onScheduleDetail(String(item.id))}
          />
        ))}
      </>
    );
  }
}
