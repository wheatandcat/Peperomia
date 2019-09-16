import React, { Component } from "react";
import { View, Alert, StyleSheet } from "react-native";
import theme from "../../../config/theme";
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
      <View style={styles.root}>
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

const styles = StyleSheet.create({
  root: {
    backgroundColor: theme.mode.background,
    height: "100%"
  }
});
