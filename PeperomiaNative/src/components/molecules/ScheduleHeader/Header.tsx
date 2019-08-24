import React from "react";
import { View } from "react-native";
import styled from "styled-components/native";
import Color from "color";
import { IconImage } from "primitive";
import { KINDS, KIND_DEFAULT } from "../../../lib/getKind";
import s from "../../../config/style";

export interface Props {
  kind: string;
  children: any;
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
        paddingTop: 100,
        borderBottomWidth: ss.borderWidth,
        borderColor: bc,
        backgroundColor: Color(config.backgroundColor)
          .lighten(ss.backgroundColorAlpha)
          .toString()
      }}
    >
      <Content>
        <View style={{ flexDirection: "row", alignItems: "flex-end" }}>
          <View style={{ flex: 1, paddingLeft: 15, paddingBottom: 25 }}>
            {props.children}
          </View>

          <View style={{ position: "absolute", right: 30 }}>
            <IconImage
              src={config.src}
              name={config.name}
              size={110}
              opacity={1.0}
            />
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
