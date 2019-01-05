import React from "react";
import { Image, TouchableOpacity } from "react-native";
import { View } from "react-native-ui-lib";
import styled from "styled-components/native";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import {
  KIND_PARK,
  KIND_TRAIN,
  KIND_SHIP,
  KIND_DEFAULT
} from "../../../lib/getKind";

const park = require(`../../../img/park.png`);
const train = require(`../../../img/train.png`);
const ship = require(`../../../img/ship.png`);

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
  [KIND_DEFAULT]: {
    image: null,
    backgroundColor: "#969FAA"
  }
};

export interface Props {
  kind: string;
  children: any;
  right: any;
  onClose: () => void;
}

export default (props: Props) => {
  const config = KINDS[props.kind];

  const getImg = (kind: string) => {
    if (kind === KIND_PARK) {
      return park;
    } else if (kind === KIND_TRAIN) {
      return train;
    } else if (kind === KIND_SHIP) {
      return ship;
    }

    return null;
  };

  const img = getImg(props.kind);

  return (
    <View style={{ backgroundColor: config.backgroundColor }}>
      <View style={{ padding: 15, flexDirection: "row" }}>
        <TouchableOpacity onPress={props.onClose}>
          <MaterialCommunityIcons name="close" size={30} color="#ffffff" />
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

          <View style={{ position: "absolute", right: 80 }}>
            {img ? <Image source={img} style={{ opacity: 0.5 }} /> : null}
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
  height: 100;
  justify-content: flex-end;
`;
