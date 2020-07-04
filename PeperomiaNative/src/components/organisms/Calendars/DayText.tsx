import React from 'react';
import {
  Text,
  View,
  Dimensions,
  StyleSheet,
  Platform,
  StatusBar,
} from 'react-native';
import { getStatusBarHeight } from 'react-native-status-bar-height';
import Color from 'color';
import { isTablet } from 'lib/responsive';
import theme from 'config/theme';
import { getWeekCount } from 'lib/calendar';

const width = Dimensions.get('window').width;
const top =
  Platform.OS === 'android'
    ? StatusBar.currentHeight || 0
    : getStatusBarHeight() || 0;
const footer = 120;
const header = 100;
const height = Dimensions.get('window').height - top - header - footer;

type Props = {
  currentDate: string;
  color: string;
  day: number;
};

const DayText: React.FC<Props> = (props) => {
  const backgroundColor = Color(props.color).fade(0.8).toString();
  const rows = getWeekCount(props.currentDate);

  return (
    <View
      style={[
        styles.itemContainer,
        {
          backgroundColor,
          height: height / rows,
          borderColor: props.color,
        },
      ]}
    >
      <Text style={isTablet ? styles.dayTextForWide : styles.dayText}>
        {props.day}
      </Text>
    </View>
  );
};

export default DayText;

const styles = StyleSheet.create({
  itemContainer: {
    width: width / 7,
    borderTopWidth: 0.5,
    borderRightWidth: 0.5,
    borderLeftWidth: 0.5,
    borderTopColor: theme().color.gray,
    borderBottomColor: theme().color.gray,
    paddingTop: 15,
    alignItems: 'center',
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
