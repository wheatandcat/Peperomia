import React from 'react';
import { Image, View, StyleSheet } from 'react-native';

type Props = {
  src: string;
  name: string;
  size: number;
  opacity?: number;
  image?: string;
  defaultIcon?: boolean;
};

const IconImage: React.FC<Props> = (props) => {
  if (!props.defaultIcon && props.name === '地球') {
    return <Frame size={props.size} />;
  }

  const style = {
    opacity: props.opacity || 0.5,
  };

  return (
    <Frame size={props.size}>
      <Image
        source={{
          uri: props.src,
        }}
        style={[styles.image, style]}
      />
    </Frame>
  );
};

export default IconImage;

type FrameProps = {
  size: number;
};

const Frame: React.FC<FrameProps> = (props) => (
  <View
    style={{
      width: props.size,
      height: props.size,
    }}
  >
    {props.children}
  </View>
);

const styles = StyleSheet.create({
  image: {
    width: '100%',
    height: '100%',
  },
});
