import React, { useState } from 'react';
import { View, ScrollView, Platform, StyleSheet } from 'react-native';
import { Input, ListItem, Divider } from 'react-native-elements';
import { MaterialIcons } from '@expo/vector-icons';
import EStyleSheet from 'react-native-extended-stylesheet';
import { IconImage } from 'components/atoms';
import { KINDS } from 'peperomia-util';
import { whenIPhoneSE } from 'lib/responsive';
import theme, { darkMode } from 'config/theme';

type Props = {
  kind: string;
  onSelectIcon: (kind: string) => void;
};

const IconsPage: React.FC<Props> = (props) => {
  const [searchText, setSearchText] = useState('');
  const items = Object.entries(KINDS)
    .map(([key, value]) => ({
      kind: key,
      ...value,
    }))
    .filter((item: any) => {
      if (searchText === '') {
        return true;
      }

      return item.name.includes(searchText) || item.kind.includes(searchText);
    });

  return (
    <View style={estyles.root}>
      <Divider />
      <View style={estyles.searchContainer}>
        <Input
          placeholder="検索"
          placeholderTextColor={theme().mode.secondaryText}
          leftIcon={{
            type: 'MaterialIcons',
            name: 'search',
            color: theme().mode.icon,
          }}
          inputContainerStyle={estyles.searchInputContainer}
          leftIconContainerStyle={styles.inputLeftIconContainer}
          containerStyle={styles.inputContainer}
          onChangeText={(text) => setSearchText(text)}
        />
      </View>

      <ScrollView style={styles.scroll}>
        <View style={styles.contents}>
          {items.map((item, i) => {
            return (
              <ListItem
                key={i}
                bottomDivider
                onPress={() => {
                  props.onSelectIcon(item.kind);
                }}
                containerStyle={estyles.iconListItem}
              >
                <IconImage
                  src={darkMode() ? item.reversal.src : item.src}
                  name={item.name}
                  size={20}
                  opacity={1.0}
                  defaultIcon={false}
                />
                <ListItem.Content>
                  <ListItem.Title style={estyles.iconListItemTitle}>
                    {item.name}
                  </ListItem.Title>
                </ListItem.Content>
                <View>
                  {props.kind === item.kind ? (
                    <MaterialIcons
                      name="check"
                      color={
                        darkMode()
                          ? theme().color.background.light
                          : theme().color.primary.main
                      }
                      size={20}
                      style={styles.check}
                    />
                  ) : null}
                </View>
              </ListItem>
            );
          })}
        </View>
      </ScrollView>
    </View>
  );
};

export default IconsPage;

const estyles = EStyleSheet.create({
  root: {
    backgroundColor: '$background',
  },
  searchContainer: {
    paddingTop: theme().space(2),
    paddingLeft: theme().space(2),
    height: Platform.OS === 'ios' ? whenIPhoneSE(40, 55) : 40,
    backgroundColor: '$background',
    alignItems: 'center',
  },
  searchInputContainer: {
    backgroundColor: '$searchInputContainer',
    borderBottomWidth: 0,
    borderRadius: 10,
    height: Platform.OS === 'ios' ? whenIPhoneSE(30, 45) : 30,
  },
  iconListItem: {
    backgroundColor: '$background',
  },
  iconListItemTitle: {
    color: '$text',
  },
});

const styles = StyleSheet.create({
  inputLeftIconContainer: {
    paddingLeft: theme().space(3),
    marginRight: theme().space(3),
  },
  inputContainer: {
    paddingTop: Platform.OS === 'ios' ? 0 : theme().space(2),
  },
  scroll: {
    width: '100%',
    height: '100%',
    paddingLeft: theme().space(2),
  },
  contents: {
    paddingBottom: theme().space(6),
  },
  check: {
    paddingRight: theme().space(2),
  },
});
