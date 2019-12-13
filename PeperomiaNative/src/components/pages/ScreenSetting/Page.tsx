import React from 'react';
import { View } from 'react-native';
import { ListItem } from 'react-native-elements';
import EStyleSheet from 'react-native-extended-stylesheet';

type Props = {
  darkMode: boolean;
  loading: boolean;
  onChange: (val: boolean) => void;
};

export default (props: Props) => {
  return (
    <View style={styles.root}>
      <View style={styles.space} />
      <ListItem
        title="ダークモード"
        switch={{
          value: props.darkMode,
          disabled: props.loading,
          onValueChange: props.onChange,
        }}
        containerStyle={styles.menu}
        titleStyle={styles.menuText}
        bottomDivider
      />
    </View>
  );
};

const styles = EStyleSheet.create({
  root: {
    backgroundColor: '$settingRoot',
    height: '100%',
  },
  menu: {
    backgroundColor: '$settingMenu',
  },
  menuText: {
    color: '$text',
  },
  space: {
    height: 20,
  },
});
