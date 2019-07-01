import React from "react";
import { View } from "react-native-ui-lib";
import styled from "styled-components/native";
import Color from "color";
import { ItemDetail } from "../../../lib/db/itemDetail";
import { KINDS } from "../../../lib/getKind";
import s from "../../../config/style";
import { IconImage } from "../../atoms";

export interface Props extends ItemDetail {
  kind: string;
}

export default (props: Props) => {
  const config = KINDS[props.kind];
  const ss = s.schedule;

  if (!config) {
    console.log("error");
    return null;
  }

  return (
    <Content
      style={{
        borderWidth: ss.borderWidth,
        borderColor: Color(config.backgroundColor)
          .lighten(ss.borderColorAlpha)
          .toString(),
        backgroundColor: Color(config.backgroundColor)
          .lighten(ss.backgroundColorAlpha)
          .toString()
      }}
    >
      <View style={{ flexDirection: "row", alignItems: "flex-end" }}>
        <View style={{ position: "absolute", right: 30 }}>
          <IconImage {...config} size={80} opacity={0.7} />
        </View>
        <View style={{ flex: 1, padding: 20, paddingBottom: 25 }}>
          <Title numberOfLines={1}>{props.title}</Title>
        </View>
      </View>
    </Content>
  );
};

const Content = styled.View`
  padding-horizontal: 0;
  padding-vertical: 0;
  border-radius: 0;
  height: 80;
  justify-content: flex-end;
`;

const Title = styled.Text`
  color: #555;
  font-weight: 600;
  font-size: 20;
`;
