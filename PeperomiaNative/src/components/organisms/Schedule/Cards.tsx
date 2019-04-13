import React, { Component } from "react";
import { FlatList } from "react-native";
import { ItemDetail } from "../../../lib/db/itemDetail";
import Card from "../../molecules/Schedule/TouchableCard";

export interface ItemProps extends ItemDetail {}

export interface Props {
  data: ItemProps[];
  onScheduleDetail: (id: string) => void;
}

export default class extends Component<Props> {
  renderItem({ item, index }: { item: ItemProps; index: number }) {
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
        contentContainerStyle={{ paddingBottom: 50 }}
      />
    );
  }
}
