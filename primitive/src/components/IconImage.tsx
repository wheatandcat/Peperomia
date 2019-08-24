import React from "react";
import { Image, View } from "react-native";

export type Props = {
  src: string;
  name: string;
  size: number;
  opacity?: number;
  image?: string;
  defaultIcon?: boolean;
};

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

export interface FrameProps {
  children?: any;
  size: number;
}

const Frame = (props: FrameProps) => (
  <View
    style={{
      width: props.size,
      height: props.size
    }}
  >
    {props.children}
  </View>
);
