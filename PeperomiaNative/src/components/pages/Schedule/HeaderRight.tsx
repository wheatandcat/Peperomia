import React from "react";
import { TouchableOpacity } from "react-native";
import { Entypo } from "@expo/vector-icons";
import theme from "../../../config/theme";
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
    return <RightText label="✓" onPress={props.onSave} />;
  }

  return (
    <TouchableOpacity onPress={props.onOpenActionSheet}>
      <Entypo
        name="share-alternative"
        size={25}
        color={theme.mode.header.text}
      />
    </TouchableOpacity>
  );
};
