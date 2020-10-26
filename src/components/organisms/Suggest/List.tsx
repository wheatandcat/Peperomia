import React from 'react';
import { View, TouchableOpacity, Text, StyleSheet } from 'react-native';
import { IconImage } from 'components/atoms';
import EStyleSheet from 'react-native-extended-stylesheet';
import { SuggestItem, uniqueSuggests } from 'lib/suggest';
import { KINDS } from 'peperomia-util';
import { darkMode } from 'config/theme';
import theme from 'config/theme';

type Props = {
  title: string;
  items: SuggestItem[];
  onPress: (kind: string, name: string) => void;
};

const Suggest: React.FC<Props> = (props) => (
  <View style={estyles.root}>
    {uniqueSuggests(props.items)
      .filter((item) => {
        if (!props.title) {
          return true;
        }
        return item.title.includes(props.title);
      })
      .slice(0, 8)
      .map((item) => (
        <TouchableOpacity
          style={styles.tap}
          onPress={() => props.onPress(item.kind, item.title)}
          key={item.title}
        >
          <View style={styles.container}>
            <View style={styles.iconImage}>
              <IconImage
                src={getImageSrc(item.kind, darkMode())}
                name=""
                size={25}
                opacity={1.0}
              />
            </View>
            <View
              style={[
                styles.titleContainer,
                {
                  borderColor: getImageColor(item.kind),
                },
              ]}
            >
              <Text style={estyles.title}>{item.title}</Text>
            </View>
          </View>
        </TouchableOpacity>
      ))}
  </View>
);

export default Suggest;

const getImageSrc = (kind: string, reversal?: boolean) => {
  const item = KINDS[kind];

  if (reversal) {
    return item.reversal.src;
  }

  return item.src;
};

const getImageColor = (kind: string) => {
  const item = KINDS[kind];

  return item.backgroundColor;
};

const estyles = EStyleSheet.create({
  root: {
    padding: theme().space(3),
    backgroundColor: '$background',
  },
  title: {
    color: '$text',
  },
});

const styles = StyleSheet.create({
  tap: {
    paddingVertical: theme().space(3),
  },
  container: {
    flexDirection: 'row',
    height: 30,
    alignItems: 'center',
  },
  iconImage: {
    alignItems: 'center',
  },
  titleContainer: {
    marginLeft: theme().space(1),
    borderLeftWidth: 6,
    paddingLeft: theme().space(2),
  },
});
