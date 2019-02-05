import React from "react";
import { Image } from "react-native";
import { View } from "react-native-ui-lib";
import {
  KIND_PARK,
  KIND_TRAIN,
  KIND_SHIP,
  KIND_FISHING
} from "../../lib/getKind";

const park = require(`../../img/park.png`);
const train = require(`../../img/train.png`);
const ship = require(`../../img/ship.png`);
const fishing = require(`../../img/fishing.png`);
const world = require(`../../img/world.png`);

export interface Props {
  kind: string;
  size: number;
  opacity?: number;
  defaultIcon?: boolean;
}

const getImg = (kind: string, defaultIcon?: boolean) => {
  if (kind === KIND_PARK) {
    return park;
  } else if (kind === KIND_TRAIN) {
    return train;
  } else if (kind === KIND_SHIP) {
    return ship;
  } else if (kind === KIND_FISHING) {
    return fishing;
  }

  if (defaultIcon) {
    return world;
  }

  return null;
};

export default (props: Props) => {
  const img = getImg(props.kind, props.defaultIcon);

  return (
    <View
      style={{
        width: props.size,
        height: props.size
      }}
    >
      {img ? (
        <Image
          source={img}
          style={{
            opacity: props.opacity || 0.5,
            width: "100%",
            height: "100%"
          }}
        />
      ) : null}
    </View>
  );
};
