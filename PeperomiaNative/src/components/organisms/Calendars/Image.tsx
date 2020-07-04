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
import { IconImage } from 'primitive';
import { isTablet } from 'lib/responsive';
import { KINDS } from 'lib/getKind';
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
  kind: string;
  day: string;
};

export default (props: Props) => {
  const config = KINDS[props.kind];
  const rows = getWeekCount(props.currentDate);

  return (
    <View
      style={[
        styles.itemContainer,
        { backgroundColor: config.backgroundColor, height: height / rows },
      ]}
    >
      <Text style={isTablet ? styles.dayTextForWide : styles.dayText}>
        {props.day}
      </Text>
      <View style={styles.imageContainer}>
        <IconImage
          src={config.src}
          name={config.name}
          opacity={0.8}
          size={isTablet ? 60 : 30}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  itemContainer: {
    width: width / 7,
    borderTopWidth: 0.5,
    borderRightWidth: 0.5,
    borderLeftWidth: 0.5,
    borderColor: theme().color.gray,
    paddingTop: 15,
    alignItems: 'center',
  },
  dayText: {
    textAlign: 'center',
    color: theme().color.black,
    fontSize: 12,
    fontWeight: '600',
    paddingBottom: 7,
  },
  dayTextForWide: {
    textAlign: 'center',
    color: theme().color.black,
    fontSize: 20,
    fontWeight: '600',
    paddingBottom: 7,
  },
  imageContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    height: '55%',
  },
});
