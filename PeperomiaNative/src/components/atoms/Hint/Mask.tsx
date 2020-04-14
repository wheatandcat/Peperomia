import React, { FC } from 'react';
import { View, Dimensions, TouchableOpacity, StyleSheet } from 'react-native';
import theme from '../../../config/theme';

const deviceHeight = Dimensions.get('window').height;
const deviceWidth = Dimensions.get('window').width;

type Props = {
  visible?: boolean;
  onPress: () => void;
};

const Mask: FC<Props> = (props) => (
  <TouchableOpacity onPress={props.onPress}>
    <View style={styles.root}>{props.children}</View>
  </TouchableOpacity>
);

const styles = StyleSheet.create({
  root: {
    position: 'absolute',
    top: -80,
    right: -12,
    width: deviceWidth,
    height: deviceHeight,
    backgroundColor: theme().color.yellow,
    zIndex: 50,
  },
});

export default Mask;
