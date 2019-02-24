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

  return (
    <Content
      style={{
        borderWidth: ss.borderWidth,
        borderColor: Color(config.backgroundColor)
          .alpha(ss.backgroundColorAlpha)
          .toString(),
        backgroundColor: Color(config.backgroundColor)
          .alpha(ss.borderColorAlpha)
          .toString()
      }}
    >
      <View style={{ flexDirection: "row", alignItems: "flex-end" }}>
        <View style={{ position: "absolute", right: 30 }}>
          <IconImage kind={props.kind} size={80} opacity={0.9} />
        </View>
        <View style={{ flex: 1, padding: 10, paddingBottom: 25 }}>
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
