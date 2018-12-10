import React, { Component } from "react";
import { FlatList } from "react-native";
import getKind from "../../../lib/getKind";
import Card from "../../molecules/Schedule/TouchableCard";

export interface ItemProps {
  id: string;
  title: string;
  moveMinutes: number | null;
}

export interface Props {
  data: ItemProps[];
  onScheduleDetail: (id: string) => void;
}

export default class extends Component<Props> {
  renderItem({ item, index }: { item: ItemProps; index: number }) {
    return (
      <Card
        {...item}
        kind={getKind(item.title)}
        end={index + 1 === this.props.data.length}
        onPress={() => this.props.onScheduleDetail(item.id)}
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
