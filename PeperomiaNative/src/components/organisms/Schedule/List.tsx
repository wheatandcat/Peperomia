import React, { Component } from 'react';
import { ItemDetail } from '../../../lib/db/itemDetail';
import Card from '../../molecules/Schedule/TouchableCard';

export interface ItemProps extends ItemDetail {}

export interface Props {
  data: ItemProps[];
  onScheduleDetail: (id: string) => void;
}

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
