import React from "react";
import { Image } from "react-native";
import { View } from "react-native-ui-lib";
import styled from "styled-components/native";
import {
  KIND_PARK,
  KIND_TRAIN,
  KIND_SHIP,
  KIND_FISHING,
  KIND_DEFAULT
} from "../../../lib/getKind";

const park = require(`../../../img/park.png`);
const train = require(`../../../img/train.png`);
const ship = require(`../../../img/ship.png`);
const fishing = require(`../../../img/fishing.png`);

const KINDS: any = {
  [KIND_PARK]: {
    image: "park",
    backgroundColor: "#77D353"
  },
  [KIND_TRAIN]: {
    image: "train",
    backgroundColor: "#F3B042"
  },
  [KIND_SHIP]: {
    image: "ship",
    backgroundColor: "#00A6FF"
  },
  [KIND_FISHING]: {
    image: "fishing",
    backgroundColor: "#00A6FF"
  },
  [KIND_DEFAULT]: {
    image: null,
    backgroundColor: "#969FAA"
  }
};

export interface ItemProps {
  id: string;
  kind: string;
  title: string;
}

export interface Props extends ItemProps {}

export default (props: Props) => {
  const config = KINDS[props.kind];

  const getImg = (kind: string) => {
    if (kind === KIND_PARK) {
      return park;
    } else if (kind === KIND_TRAIN) {
      return train;
    } else if (kind === KIND_SHIP) {
      return ship;
    } else if (kind === KIND_FISHING) {
      return fishing;
    }

    return null;
  };

  const img = getImg(props.kind);

  return (
    <Content style={{ backgroundColor: config.backgroundColor }}>
      <View style={{ flexDirection: "row", alignItems: "flex-end" }}>
        <View style={{ flex: 1, padding: 15 }}>
          <Title numberOfLines={1}>{props.title}</Title>
        </View>

        <View style={{ position: "absolute", right: 80 }}>
          {img ? <Image source={img} style={{ opacity: 0.5 }} /> : null}
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
  font-size: 14;
`;
