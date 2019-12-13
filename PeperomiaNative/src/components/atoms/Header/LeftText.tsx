import React from 'react';
import { Text, TouchableOpacity } from 'react-native';

interface Props {
  label: string;
  cancel?: boolean;
  testID?: string;
  onPress: () => void;
}

export default (props: Props) => (
  <TouchableOpacity
    onPress={props.onPress}
    style={{ left: 5 }}
    testID={props.testID}
  >
    <Text
      style={{
        fontSize: 16,
        fontWeight: '600',
        color: props.cancel ? 'red' : 'black',
      }}
    >
      {props.label}
    </Text>
  </TouchableOpacity>
);
