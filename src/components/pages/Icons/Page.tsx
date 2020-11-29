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
                containerStyle={estyles.iconListItem}
                key={i}
                title={item.name !== '地球' ? item.name : '無し'}
                titleStyle={estyles.iconListItemTitle}
                onPress={() => {
                  console.log(props);

                  props.onSelectIcon(item.kind);
                }}
                leftIcon={
                  <IconImage
                    src={darkMode() ? item.reversal.src : item.src}
                    name={item.name}
                    size={20}
                    opacity={1.0}
                    defaultIcon={false}
                  />
                }
                rightIcon={
                  <View>
                    {props.kind === item.kind ? (
                      <MaterialIcons
                        name="check"
                        color={
                          darkMode()
                            ? theme().color.highLightGray
                            : theme().color.main
                        }
                        size={20}
                        style={styles.check}
                      />
                    ) : null}
                  </View>
                }
                bottomDivider
              />
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
    paddingHorizontal: theme().space(2),
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
    marginRight: theme().space(3),
  },
  inputContainer: {
    paddingTop: Platform.OS === 'ios' ? 0 : theme().space(2),
  },
  scroll: {
    width: '100%',
    height: '100%',
    paddingLeft: theme().space(4),
  },
  contents: {
    paddingBottom: theme().space(6),
  },
  check: {
    paddingRight: theme().space(2),
  },
});
