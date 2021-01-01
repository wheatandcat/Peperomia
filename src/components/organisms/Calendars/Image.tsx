import React from 'react';
import {
  Text,
  View,
  StyleSheet,
  Platform,
  useWindowDimensions,
} from 'react-native';
import { getStatusBarHeight } from 'react-native-status-bar-height';
import { IconImage } from 'components/atoms';
import { isTablet } from 'lib/responsive';
import { KINDS } from 'peperomia-util';
import theme from 'config/theme';
import { getWeekCount } from 'lib/calendar';

const top = Platform.OS === 'android' ? 0 : getStatusBarHeight() || 0;
const footer = 120;
const header = 100;

type Props = {
  currentDate: string;
  kind: string;
  day: string;
};

const ImageCard: React.FC<Props> = (props) => {
  const config = KINDS[props.kind];
  const rows = getWeekCount(props.currentDate);

  const height = useWindowDimensions().height - top - header - footer;
  const width = useWindowDimensions().width / 7;

  return (
    <View
      style={[
        styles.itemContainer,
        {
          backgroundColor: config.backgroundColor,
          height: height / rows,
          width,
        },
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

export default ImageCard;

const styles = StyleSheet.create({
  itemContainer: {
    borderTopWidth: 0.5,
    borderRightWidth: 0.5,
    borderLeftWidth: 0.5,
    borderColor: theme().color.base.light,
    paddingTop: theme().space(3),
    alignItems: 'center',
  },
  dayText: {
    textAlign: 'center',
    color: theme().color.base.dark,
    fontSize: 12,
    fontWeight: '600',
    paddingBottom: theme().space(2),
  },
  dayTextForWide: {
    textAlign: 'center',
    color: theme().color.base.dark,
    fontSize: 20,
    fontWeight: '600',
    paddingBottom: theme().space(2),
  },
  imageContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    height: '55%',
  },
});
