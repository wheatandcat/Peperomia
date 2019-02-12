import React from "react";
import { View } from "react-native-ui-lib";
import styled from "styled-components/native";
import { ItemDetail } from "../../../lib/db/itemDetail";
import { KINDS } from "../../../lib/getKind";
import { IconImage } from "../../atoms";

export interface Props extends ItemDetail {
  kind: string;
}

export default (props: Props) => {
  const config = KINDS[props.kind];

  return (
    <Content style={{ backgroundColor: config.backgroundColor }}>
      <View style={{ flexDirection: "row", alignItems: "flex-end" }}>
        <View style={{ position: "absolute", right: 30 }}>
          <IconImage kind={props.kind} size={100} />
        </View>
        <View style={{ flex: 1, padding: 15 }}>
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
  height: 100;
  justify-content: flex-end;
`;

const Title = styled.Text`
  color: #ffffff;
  font-weight: 600;
  font-size: 20;
`;
