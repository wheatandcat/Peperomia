import React from "react";
import { TouchableOpacity } from "react-native";
import { View } from "react-native-ui-lib";
import styled from "styled-components/native";
import Color from "color";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import { KINDS, KIND_DEFAULT } from "../../../lib/getKind";
import s from "../../../config/style";
import { IconImage } from "../../atoms";
import theme from "../../../config/theme";

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
    .lighten(ss.borderColorAlpha)
    .toString();

  return (
    <View
      style={{
        borderBottomWidth: ss.borderWidth,
        borderColor: bc,
        backgroundColor: Color(config.backgroundColor)
          .lighten(ss.backgroundColorAlpha)
          .toString()
      }}
    >
      <View style={{ padding: 15, flexDirection: "row" }}>
        <TouchableOpacity onPress={props.onClose}>
          <MaterialCommunityIcons
            name="close"
            size={30}
            color={theme.color.main}
          />
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
