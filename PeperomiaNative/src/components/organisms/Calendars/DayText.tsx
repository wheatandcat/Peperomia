import React from 'react';
import { Text, View, Dimensions, StyleSheet } from 'react-native';
import { isTablet } from 'lib/responsive';
import theme from 'config/theme';

const width = Dimensions.get('window').width;

type Props = {
  color: string;
  day: number;
};

export default (props: Props) => {
  return (
    <View style={styles.itemContainer}>
      <Text style={isTablet ? styles.dayTextForWide : styles.dayText}>
        {props.day}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  itemContainer: {
    width: width / 7,
    height: width / 7,
    borderTopWidth: 0.5,
    borderRightWidth: 0.5,
    borderLeftWidth: 0.5,
    borderColor: 'gray',
    alignItems: 'center',
    justifyContent: 'center',
  },
  dayText: {
    textAlign: 'center',
    color: theme().color.gray,
    fontSize: 18,
    fontWeight: '600',
  },
  dayTextForWide: {
    textAlign: 'center',
    color: theme().color.gray,
    fontSize: 26,
    fontWeight: '600',
  },
});
