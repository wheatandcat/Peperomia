import React from 'react';
import { Text, TouchableOpacity, StyleSheet } from 'react-native';

type Props = {
  label: string;
  cancel?: boolean;
  testID?: string;
  onPress: () => void;
};

export default (props: Props) => {
  const color = props.cancel ? 'red' : 'black';

  return (
    <TouchableOpacity
      onPress={props.onPress}
      style={styles.tap}
      testID={props.testID}
    >
      <Text
        style={[
          styles.text,
          {
            color,
          },
        ]}
      >
        {props.label}
      </Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  tap: {
    left: 5,
  },
  text: {
    fontSize: 16,
    fontWeight: '600',
  },
});
