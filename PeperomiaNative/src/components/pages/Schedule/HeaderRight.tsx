import React from "react";
import { TouchableOpacity, View } from "react-native";
import { Button } from "react-native-elements";
import { MaterialCommunityIcons, Entypo } from "@expo/vector-icons";
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
    return <RightText label="保存" onPress={props.onSave} />;
  }

  return (
    <View style={{ flex: 1, flexDirection: "row" }}>
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
          borderRadius: 10
        }}
        onPress={props.onShare}
      />

      <TouchableOpacity onPress={props.onOpenActionSheet}>
        <MaterialCommunityIcons
          name="dots-vertical"
          size={26}
          color="#00bfff"
          style={{ marginRight: 0, marginLeft: "auto" }}
        />
      </TouchableOpacity>
    </View>
  );
};
