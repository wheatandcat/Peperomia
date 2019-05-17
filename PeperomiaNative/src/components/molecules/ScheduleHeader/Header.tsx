import React from "react";
import { TouchableOpacity, StatusBar } from "react-native";
import { View } from "react-native-ui-lib";
import styled from "styled-components/native";
import Color from "color";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import { KINDS, KIND_DEFAULT } from "../../../lib/getKind";
import s from "../../../config/style";
import { IconImage } from "../../atoms";

export interface Props {
  kind: string;
  children: any;
  right: any;
  onClose: () => void;
}

export default (props: Props) => {
  const kind = props.kind || KIND_DEFAULT;
  const config = KINDS[kind];
  const ss = s.schedule;
  const bc = Color(config.backgroundColor)
    .alpha(ss.backgroundColorAlpha)
    .toString();

  return (
    <View
      style={{
        borderBottomWidth: ss.borderWidth,
        borderColor: bc,
        backgroundColor: Color(config.backgroundColor)
          .alpha(ss.borderColorAlpha)
          .toString()
      }}
    >
      <StatusBar backgroundColor={bc} barStyle="light-content" />
      <View style={{ padding: 15, flexDirection: "row" }}>
        <TouchableOpacity onPress={props.onClose}>
          <MaterialCommunityIcons name="close" size={30} color="#555" />
        </TouchableOpacity>
        <View style={{ marginRight: 0, marginLeft: "auto" }}>
          {props.right}
        </View>
      </View>

      <Content>
        <View style={{ flexDirection: "row", alignItems: "flex-end" }}>
          <View style={{ flex: 1, paddingLeft: 15, paddingBottom: 25 }}>
            {props.children}
          </View>

          <View style={{ position: "absolute", right: 30 }}>
            <IconImage {...config} size={110} opacity={0.7} />
          </View>
        </View>
      </Content>
    </View>
  );
};

const Content = styled.View`
  padding-horizontal: 0;
  padding-vertical: 0;
  border-radius: 0;
  height: 80;
  justify-content: flex-end;
`;
