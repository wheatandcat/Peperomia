import React from "react";
import {
  TouchableOpacity,
  View,
  Text,
  Platform,
  StatusBar
} from "react-native";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import { getStatusBarHeight } from "react-native-status-bar-height";
import theme from "../../../config/theme";

const top =
  Platform.OS === "android" ? StatusBar.currentHeight : getStatusBarHeight();

export interface Props {
  title: string;
  right: any;
  color: string;
  position?: string;
  onClose: () => void;
}

export default (props: Props) => {
  let style: any = {
    position: props.position || "absolute",
    height: 60 + Number(top) / 2,
    width: "100%",
    zIndex: 10
  };
  if (props.color !== "none") {
    style = {
      ...style,
      backgroundColor: props.color
    };
  }

  return (
    <View style={style}>
      <StatusBar backgroundColor="#fff" barStyle="dark-content" />
      <View style={{ paddingLeft: 15, paddingTop: top, flexDirection: "row" }}>
        <TouchableOpacity onPress={props.onClose}>
          <MaterialCommunityIcons
            name="close"
            size={30}
            color={theme.color.main}
          />
        </TouchableOpacity>
        <Text
          style={{
            fontSize: 20,
            paddingTop: 5,
            fontWeight: "600",
            color: "#555"
          }}
        >
          {props.title}
        </Text>
        <View style={{ marginRight: 15, marginLeft: "auto" }}>
          {props.right}
        </View>
      </View>
    </View>
  );
};
