import React from 'react';
import { Text, TouchableOpacity } from 'react-native';
import EStyleSheet from 'react-native-extended-stylesheet';

interface Props {
  label: string;
  testID?: string;
  onPress: () => void;
}

export default (props: Props) => (
  <TouchableOpacity
    onPress={props.onPress}
    testID={props.testID}
    style={styles.tap}
  >
    <Text style={styles.text}>{props.label}</Text>
  </TouchableOpacity>
);

const styles = EStyleSheet.create({
  text: {
    fontSize: 18,
    fontWeight: '600',
    color: '$headerText',
  },
  tap: {
    padding: 5,
  },
});
