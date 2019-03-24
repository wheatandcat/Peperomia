import React from "react";
import { Image } from "react-native";
import { View } from "react-native-ui-lib";

export interface Props {
  src: string;
  kind: string;
  size: number;
  opacity?: number;
  image?: string;
  defaultIcon?: boolean;
}

export default (props: Props) => {
  console.log(props);

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
  children: any;
  size: number;
}

const Frame = (props: Frame) => (
  <View
    style={{
      width: props.size * 1.1,
      height: props.size * 1.1
    }}
  >
    {props.children}
  </View>
);
