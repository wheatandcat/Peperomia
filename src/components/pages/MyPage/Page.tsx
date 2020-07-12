import React, { FC } from 'react';
import { View, ScrollView, Text, Linking } from 'react-native';
import EStyleSheet from 'react-native-extended-stylesheet';
import { ListItem, Button, Divider } from 'react-native-elements';
import { MaterialIcons } from '@expo/vector-icons';
import Spinner from 'react-native-loading-spinner-overlay';
import Constants from 'expo-constants';
import theme from 'config/theme';

type Props = {
  loading: boolean;
  LoadingText: string;
  email: string;
  onBackup: () => void;
  onRestore: () => void;
  onNotificationSetting: () => Promise<void>;
};

const url = 'https://amazing-hawking-a280c3.netlify.com/general/account/';

const MyPage: FC<Props> = (props) => (
  <View style={styles.root}>
    <Spinner
      visible={props.loading}
      textContent={props.LoadingText}
      textStyle={{ color: theme().color.white }}
    />
    <ScrollView>
      <View style={styles.contents}>
        <View style={styles.emailContainer}>
          <Text style={styles.emailTitle}>メールアドレス:</Text>
          <Text style={styles.email}>{props.email}</Text>
        </View>
        <View style={styles.guideContainer}>
          <Button
            title="ユーザー登録とは？"
            type="clear"
            titleStyle={styles.guide}
            icon={
              <MaterialIcons
                name="chevron-right"
                size={20}
                color={theme().color.main}
              />
            }
            iconRight
            onPress={() => Linking.openURL(url)}
          />
        </View>
      </View>

      {!Constants.isDevice && (
        <>
          <Divider />
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
            bottomDivider
          />
        </>
      )}

      <Divider />

      <ListItem
        title="通知を設定する"
        titleStyle={styles.menuText}
        rightIcon={{ name: 'chevron-right', color: theme().mode.text }}
        containerStyle={styles.menuContainer}
        onPress={props.onNotificationSetting}
        bottomDivider
      />
      <View style={styles.list}>
        <View style={styles.guideContainer}>
          <Button
            title="通知設定とは？"
            type="clear"
            titleStyle={styles.guide}
            icon={
              <MaterialIcons
                name="chevron-right"
                size={20}
                color={theme().color.main}
              />
            }
            iconRight
            onPress={() => Linking.openURL(url)}
          />
        </View>
      </View>
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
  emailTitle: {
    color: '$text',
  },
  email: {
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
    marginTop: 20,
    marginHorizontal: 10,
    marginBottom: 25,
  },
  list: {
    marginTop: 10,
    marginHorizontal: 10,
    marginBottom: 5,
  },
  guideContainer: {
    alignItems: 'flex-end',
  },
  guide: {
    fontSize: 14,
    color: theme().color.main,
  },
});

export default MyPage;
