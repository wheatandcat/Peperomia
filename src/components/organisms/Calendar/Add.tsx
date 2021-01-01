import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import theme from 'config/theme';
import { MaterialCommunityIcons } from '@expo/vector-icons';

type Props = {};

const CalendarAdd: React.FC<Props> = () => {
  return (
    <View style={styles.content}>
      <View style={styles.imageContainer}>
        <MaterialCommunityIcons
          name="plus-circle-outline"
          color={theme().color.base.main}
          size={70}
        />
      </View>
      <View>
        <Text style={styles.title}>追加する</Text>
      </View>
    </View>
  );
};

export default CalendarAdd;

const styles = StyleSheet.create({
  content: {
    paddingHorizontal: theme().space(3),
    width: '100%',
    height: 120,
    borderWidth: 1,
    borderColor: theme().color.base.main,
  },
  imageContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: theme().space(2),
    paddingBottom: theme().space(2),
  },
  title: {
    textAlign: 'center',
    fontSize: 14,
    color: theme().color.base.main,
  },
});
