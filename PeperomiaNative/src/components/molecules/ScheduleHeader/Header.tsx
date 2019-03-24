import React from "react";
import { TouchableOpacity } from "react-native";
import { View } from "react-native-ui-lib";
import styled from "styled-components/native";
import Color from "color";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import { KINDS } from "../../../lib/getKind";
import { IconImage } from "../../atoms";

export interface Props {
  kind: string;
  children: any;
  right: any;
  onClose: () => void;
}

export default (props: Props) => {
  const config = KINDS[props.kind];

  return (
    <View
      style={{
        borderWidth: 0.5,
        borderColor: Color(config.backgroundColor)
          .alpha(0.5)
          .toString(),
        backgroundColor: Color(config.backgroundColor)
          .alpha(0.5)
          .toString()
      }}
    >
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
            <IconImage {...config} size={80} opacity={0.9} />
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
