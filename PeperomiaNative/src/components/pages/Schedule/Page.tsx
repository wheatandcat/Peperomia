import React, { Component } from "react";
import { View, Alert } from "react-native";
import Cards, { Props as CardsProps } from "../../organisms/Schedule/Cards";
import ActionButton from "../../molecules/Schedule/ActionButton";

export interface Props extends CardsProps {
  onAdd: () => void;
  onSort: () => void;
  onDelete: () => void;
}

export default class extends Component<Props> {
  onDelete = () => {
    Alert.alert(
      "本当に削除しますか？",
      "",
      [
        {
          text: "キャンセル",
          style: "cancel"
        },
        {
          text: "削除する",
          onPress: () => {
            this.props.onDelete();
          }
        }
      ],
      { cancelable: false }
    );
  };

  render() {
    return (
      <View style={{ backgroundColor: "#ffffff", height: "100%" }}>
        <Cards
          data={this.props.data}
          onScheduleDetail={this.props.onScheduleDetail}
        />
        <View
          style={{
            width: 60,
            height: 60,
            position: "absolute",
            bottom: 50,
            right: 40
          }}
        >
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
