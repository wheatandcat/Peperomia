import React from 'react';
import {
  Text,
  View,
  StyleSheet,
  Platform,
  useWindowDimensions,
} from 'react-native';
import { getStatusBarHeight } from 'react-native-status-bar-height';
import Color from 'color';
import { isTablet } from 'lib/responsive';
import theme from 'config/theme';
import { getWeekCount } from 'lib/calendar';

const top = Platform.OS === 'android' ? 0 : getStatusBarHeight() || 0;
const footer = 120;
const header = 100;

type Props = {
  currentDate: string;
  color: string;
  day: number;
};

const DayText: React.FC<Props> = (props) => {
  const backgroundColor = Color(props.color).fade(0.8).toString();
  const rows = getWeekCount(props.currentDate);
  const height = useWindowDimensions().height - top - header - footer;
  const width = useWindowDimensions().width / 7;

  return (
    <View
      style={[
        styles.itemContainer,
        {
          backgroundColor,
          borderColor: props.color,
          height: height / rows,
          width,
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
    borderTopWidth: 0.5,
    borderRightWidth: 0.5,
    borderLeftWidth: 0.5,
    borderTopColor: theme().color.base.light,
    borderBottomColor: theme().color.base.light,
    paddingTop: theme().space(3),
    alignItems: 'center',
  },
  dayText: {
    textAlign: 'center',
    color: theme().color.base.light,
    fontSize: 18,
    fontWeight: '600',
  },
  dayTextForWide: {
    textAlign: 'center',
    color: theme().color.base.light,
    fontSize: 26,
    fontWeight: '600',
  },
});
