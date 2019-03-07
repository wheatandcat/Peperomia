import React from "react";
import { View } from "react-native";
import { Button } from "react-native-elements";
import { Entypo } from "@expo/vector-icons";
import { RightText } from "../../atoms/Header";

interface Props {
  mode: string;
  onSave: () => void;
  onShare: () => void;
  onOpenActionSheet: () => void;
}

export default (props: Props) => {
  if (props.mode === "edit") {
    return null;
  }

  if (props.mode === "sort") {
    return <RightText label="完了" onPress={props.onSave} />;
  }

  return (
    <View style={{ flex: 1, flexDirection: "row", paddingTop: 2 }}>
      <Button
        icon={<Entypo name="share-alternative" size={13} color="#FFFFFF" />}
        iconContainerStyle={{
          padding: 0
        }}
        buttonStyle={{
          backgroundColor: "#4DB6AC",
          width: 28,
          height: 28,
          borderColor: "transparent",
          borderWidth: 0,
          borderRadius: 10,
          marginRight: 10
        }}
        onPress={props.onOpenActionSheet}
      />
    </View>
  );
};
