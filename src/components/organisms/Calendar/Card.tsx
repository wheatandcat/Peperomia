import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import theme from 'config/theme';
import { IconImage } from 'components/atoms';
import { getKindData } from 'lib/kind';

type Props = {
  title: string;
  kind: string;
};

const CalendarCard: React.FC<Props> = (props) => {
  const config = getKindData(props.kind);

  return (
    <View
      style={{
        backgroundColor: config.backgroundColor,
      }}
    >
      <View style={styles.content}>
        <View style={styles.imageContainer}>
          <IconImage
            src={config.src}
            name={config.name}
            size={70}
            opacity={0.8}
          />
        </View>
        <View>
          <Text style={styles.title}>{props.title}</Text>
        </View>
      </View>
    </View>
  );
};

export default CalendarCard;

const styles = StyleSheet.create({
  content: {
    paddingHorizontal: theme().space(3),
    width: '100%',
    height: 120,
  },
  imageContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: theme().space(2),
    paddingBottom: theme().space(2),
  },
  title: {
    fontSize: 14,
    color: theme().color.black,
  },
});
