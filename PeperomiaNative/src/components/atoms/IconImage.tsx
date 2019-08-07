import React from "react";
import { Image } from "react-native";
import { View } from "react-native";

export interface Props {
  src: string;
  name: string;
  size: number;
  opacity?: number;
  image?: string;
  defaultIcon?: boolean;
}

export default (props: Props) => {
  if (!props.defaultIcon && props.name === "地球") {
    return <Frame size={props.size} />;
  }

  return (
    <Frame size={props.size}>
      <Image
        source={{
          uri: props.src
        }}
        style={{
          opacity: props.opacity || 0.5,
          width: "100%",
          height: "100%"
        }}
      />
    </Frame>
  );
};

export interface Frame {
  children?: any;
  size: number;
}

const Frame = (props: Frame) => (
  <View
    style={{
      width: props.size,
      height: props.size
    }}
  >
    {props.children}
  </View>
);
