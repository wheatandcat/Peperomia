import { SQLite } from "expo";
import React, { Component } from "react";
import { View, FlatList, RefreshControl } from "react-native";
import Card, { ItemProps as CardProps } from "../../molecules/Home/Card";

export interface Props {
  data: CardProps[];
  loading: boolean;
  onSchedule: (id: string, title: string) => void;
}

export default class extends Component<Props> {
  renderItem({ item }: { item: CardProps }) {
    return <Card {...item} onPress={this.props.onSchedule} />;
  }

  render() {
    return (
      <View>
        <FlatList
          refreshControl={<RefreshControl refreshing={this.props.loading} />}
          refreshing={this.props.loading}
          data={this.props.data}
          keyExtractor={item => String(item.id)}
          renderItem={this.renderItem.bind(this)}
          contentContainerStyle={{ paddingBottom: 300 }}
        />
      </View>
    );
  }
}
