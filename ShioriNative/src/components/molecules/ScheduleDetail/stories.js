import React from "react";
import { storiesOf } from "@storybook/react-native";
import { View } from "react-native-ui-lib";
import { connectActionSheet } from "@expo/react-native-action-sheet";
import { Entypo } from "@expo/vector-icons";
import { StyleSheet, Text, TouchableOpacity } from "react-native";
import {
  KIND_PARK,
  KIND_TRAIN,
  KIND_SHIP,
  KIND_DEFAULT
} from "../../../lib/getKind";
import Card from "./Card";

const props = {
  id: "1",
  kind: KIND_TRAIN,
  title: "新宿駅",
  memo: "■行く場所メモ\n・砂浜\n・観覧車\n・水族園"
};

@connectActionSheet
class App extends React.Component {
  render() {
    return (
      <View style={styles.container}>
        <View style={{ marginBottom: 30 }}>
          <Text style={{ textAlign: "center" }}>
            Hello! This is a simple example app to demonstrate
            @expo/react-native-action-sheet.
          </Text>
        </View>

        <Entypo.Button
          name="code"
          backgroundColor="#3e3e3e"
          onPress={this._onOpenActionSheet}
        >
          <Text style={{ fontSize: 15, color: "#fff" }}>Open action sheet</Text>
        </Entypo.Button>
      </View>
    );
  }

  _onOpenActionSheet = () => {
    let options = ["Delete", "Save", "Cancel"];
    let destructiveButtonIndex = 0;
    let cancelButtonIndex = 2;
    this.props.showActionSheetWithOptions(
      {
        options,
        cancelButtonIndex,
        destructiveButtonIndex
      },
      buttonIndex => {
        // Do something here depending on the button index selected
      }
    );
  };
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center"
  }
});

storiesOf("molecules/ScheduleDetail", module).add("Card", () => (
  <View style={{ paddingTop: 60 }}>
    <Card {...props} />
  </View>
));
