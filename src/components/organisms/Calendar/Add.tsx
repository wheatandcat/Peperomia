import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import theme from 'config/theme';
import { MaterialCommunityIcons } from '@expo/vector-icons';

type Props = {
  onPress: () => void;
};

const CalendarAdd: React.FC<Props> = (props) => {
  return (
    <TouchableOpacity onPress={props.onPress}>
      <View style={styles.content}>
        <View style={styles.imageContainer}>
          <MaterialCommunityIcons
            name="plus-circle-outline"
            color={theme().color.darkGray}
            size={70}
          />
        </View>
        <View>
          <Text style={styles.title}>追加する</Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default CalendarAdd;

const styles = StyleSheet.create({
  content: {
    paddingHorizontal: 20,
    width: '100%',
    height: 120,
    borderWidth: 1,
    borderColor: theme().color.darkGray,
  },
  imageContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: 10,
    paddingBottom: 10,
  },
  title: {
    textAlign: 'center',
    fontSize: 14,
    color: theme().color.darkGray,
  },
});
