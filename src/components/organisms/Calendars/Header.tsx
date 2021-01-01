import React from 'react';
import { Text, View, TouchableOpacity, StyleSheet } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import theme from 'config/theme';

type Props = {
  onPrevMonth: () => void;
  onNextMonth: () => void;
  date: string;
};

const Header: React.FC<Props> = (props) => {
  return (
    <View style={styles.headerContainer}>
      <TouchableOpacity onPress={props.onPrevMonth}>
        <MaterialCommunityIcons
          name="chevron-left"
          size={30}
          color={theme().color.primary.main}
        />
      </TouchableOpacity>

      <View style={styles.yearContainer}>
        <Text style={styles.year}>{props.date}</Text>
      </View>

      <TouchableOpacity onPress={props.onNextMonth}>
        <MaterialCommunityIcons
          name="chevron-right"
          size={30}
          color={theme().color.primary.main}
        />
      </TouchableOpacity>
    </View>
  );
};

export default Header;

const styles = StyleSheet.create({
  headerContainer: {
    justifyContent: 'space-between',
    alignItems: 'center',
    flexDirection: 'row',
  },
  yearContainer: {
    paddingVertical: theme().space(3),
    justifyContent: 'center',
  },
  year: {
    textAlign: 'center',
    color: theme().color.darkGray,
    fontSize: 25,
    fontWeight: '600',
  },
});
