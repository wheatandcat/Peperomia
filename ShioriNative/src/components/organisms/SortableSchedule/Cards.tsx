import React, { Component } from "react";
import SortableList from "react-native-sortable-list";
import getKind from "../../../lib/getKind";
import Card from "../../molecules/Schedule/Card";

export interface ItemProps {
  id: string;
  title: string;
  moveMinutes: number | null;
}

export interface Props {
  data: ItemProps[];
}

export default class extends Component<Props> {
  renderItem({
    data,
    active,
    index
  }: {
    data: ItemProps;
    active: boolean;
    index: number;
  }) {
    return (
      <Card
        {...data}
        kind={getKind(data.title)}
        end={index + 1 === this.props.data.length}
        onPress={() => null}
      />
    );
  }

  render() {
    return (
      <SortableList
        data={this.props.data}
        renderRow={this.renderItem.bind(this)}
        contentContainerStyle={{ paddingBottom: 50 }}
      />
    );
  }
}
