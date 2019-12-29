import React, { FC } from 'react';
import { View, ScrollView, Text } from 'react-native';
import EStyleSheet from 'react-native-extended-stylesheet';
import { ListItem } from 'react-native-elements';
import Spinner from 'react-native-loading-spinner-overlay';
import theme from '../../../config/theme';

type Props = {
  loading: boolean;
  LoadingText: string;
  email: string;
  onBackup: () => void;
  onRestore: () => void;
};

const MyPage: FC<Props> = props => (
  <View style={styles.root}>
    <Spinner
      visible={props.loading}
      textContent={props.LoadingText}
      textStyle={{ color: theme().color.white }}
    />
    <ScrollView>
      <View style={styles.contents}>
        <View style={styles.emailContainer}>
          <Text style={styles.emialTitle}>メールアドレス:</Text>
          <Text style={styles.emial}>{props.email}</Text>
        </View>
      </View>
      <ListItem
        title="バックアップを作成する"
        titleStyle={styles.menuText}
        containerStyle={styles.menuContainer}
        onPress={props.onBackup}
        bottomDivider
      />
      <ListItem
        title="バックアップから復元する"
        titleStyle={styles.menuText}
        containerStyle={styles.menuContainer}
        onPress={props.onRestore}
      />
    </ScrollView>
  </View>
);

const styles = EStyleSheet.create({
  root: {
    backgroundColor: '$settingRoot',
    height: '100%',
  },
  emailContainer: {
    padding: 10,
    width: '100%',
    justifyContent: 'center',
    backgroundColor: '$settingMenu',
  },
  emialTitle: {
    color: '$text',
  },
  emial: {
    fontSize: 20,
    fontWeight: '600',
    color: '$text',
  },
  menuContainer: {
    backgroundColor: '$settingMenu',
  },
  menuText: {
    color: '$text',
  },
  contents: {
    height: 80,
    marginTop: 20,
    marginHorizontal: 10,
  },
});

export default MyPage;
