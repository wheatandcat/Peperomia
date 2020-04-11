import React from 'react';
import { Text, View, Dimensions, StyleSheet } from 'react-native';
import { IconImage } from 'primitive';
import 'react-native-match-media-polyfill';
import { useMediaQuery } from 'react-responsive';
import { KINDS } from '../../../lib/getKind';
import theme from '../../../config/theme';

const width = Dimensions.get('window').width;

type Props = {
  kind: string;
  day: string;
};

export default (props: Props) => {
  const config = KINDS[props.kind];
  const isTablet = useMediaQuery({ minWidth: 768, maxWidth: 991 });

  return (
    <View
      style={[
        styles.itemContainer,
        { backgroundColor: config.backgroundColor },
      ]}
    >
      <Text style={isTablet ? styles.dayTextForWide : styles.dayText}>
        {props.day}
      </Text>
      <IconImage
        src={config.src}
        name={config.name}
        opacity={0.8}
        size={isTablet ? 60 : 30}
      />
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
    borderColor: theme().color.gray,
    alignItems: 'center',
    justifyContent: 'center',
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
});
