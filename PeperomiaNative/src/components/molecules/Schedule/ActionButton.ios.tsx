import React from "react";
import { Platform } from "react-native";
import ActionButton from "react-native-action-button";
import { MaterialIcons, FontAwesome } from "@expo/vector-icons";
import theme from "../../../config/theme";

interface Props {
  onAdd: () => void;
  onSort: () => void;
  onDelete: () => void;
}

const right = Platform.OS === "ios" ? 50 : 100;

export default (props: Props) => (
  <ActionButton
    buttonColor={theme.color.lightGreen}
    hideShadow
    testID="scheduleMenu"
  >
    <ActionButton.Item
      buttonColor="#0099FF"
      title="予定を追加"
      textStyle={{
        paddingTop: 1
      }}
      textContainerStyle={{
        right: right,
        borderColor: "#777"
      }}
      hideLabelShadow
      onPress={props.onAdd}
      testID="scheduleMenuAdd"
      accessible
    >
      <MaterialIcons name="add" size={30} color="#fff" />
    </ActionButton.Item>
    <ActionButton.Item
      buttonColor="#FFCC33"
      title="順番を変更"
      textStyle={{
        paddingTop: 1
      }}
      textContainerStyle={{
        right: right,
        borderColor: "#777"
      }}
      hideLabelShadow
      onPress={props.onSort}
    >
      <FontAwesome name="sort" size={30} color="#fff" />
    </ActionButton.Item>
    <ActionButton.Item
      buttonColor="rgba(231,76,60,1)"
      title="プランを削除"
      textStyle={{
        paddingTop: 1
      }}
      textContainerStyle={{
        right: right,
        borderColor: "#777"
      }}
      hideLabelShadow
      onPress={props.onDelete}
    >
      <MaterialIcons name="remove" size={30} color="#fff" />
    </ActionButton.Item>
  </ActionButton>
);
