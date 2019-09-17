import React from "react";
import { NavigationScreenProp, NavigationRoute } from "react-navigation";
import { TouchableOpacity } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import theme from "../../../config/theme";
import { LeftText } from "../../atoms/Header";

interface Props {
  mode: string;
  onShow: () => void;
  navigation: NavigationScreenProp<NavigationRoute>;
}

export default (props: Props) => {
  if (props.mode === "edit") {
    return <LeftText label="キャンセル" cancel onPress={props.onShow} />;
  }

  if (props.mode === "sort") {
    return null;
  }

  return (
    <TouchableOpacity
      onPress={() => props.navigation.goBack()}
      style={{ flex: 1, flexDirection: "row", marginTop: 10 }}
    >
      <MaterialCommunityIcons
        name="chevron-left"
        size={30}
        color={theme.mode.header.text}
      />
    </TouchableOpacity>
  );
};
