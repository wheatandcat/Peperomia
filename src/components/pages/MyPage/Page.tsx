import React, { FC } from 'react';
import { View, ScrollView, Text, Linking, StyleSheet } from 'react-native';
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
  onNotificationSetting: () => Promise<void>;
};

const url = 'https://amazing-hawking-a280c3.netlify.com/general/account/';

const MyPage: FC<Props> = (props) => (
  <View style={estyles.root}>
    <Spinner
      visible={props.loading}
      textContent={props.LoadingText}
      textStyle={{ color: theme().color.background.main }}
    />
    <ScrollView>
      <View style={styles.contents}>
        <View style={estyles.emailContainer}>
          <Text style={estyles.emailTitle}>メールアドレス:</Text>
          <Text style={estyles.email}>{props.email}</Text>
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
                color={theme().color.primary.main}
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
          <ListItem onPress={props.onBackup} bottomDivider>
            <ListItem.Content>
              <ListItem.Title>バックアップを作成する</ListItem.Title>
            </ListItem.Content>
            <ListItem.Chevron />
          </ListItem>
        </>
      )}

      <ListItem onPress={props.onNotificationSetting} bottomDivider>
        <ListItem.Content>
          <ListItem.Title>通知を設定する</ListItem.Title>
        </ListItem.Content>
        <ListItem.Chevron />
      </ListItem>

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
                color={theme().color.primary.main}
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

const estyles = EStyleSheet.create({
  root: {
    backgroundColor: '$settingRoot',
    height: '100%',
  },
  emailContainer: {
    padding: theme().space(2),
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
});

const styles = StyleSheet.create({
  contents: {
    marginTop: theme().space(3),
    marginHorizontal: theme().space(2),
    marginBottom: theme().space(4),
  },
  list: {
    marginTop: theme().space(2),
    marginHorizontal: theme().space(2),
    marginBottom: theme().space(1),
  },
  guideContainer: {
    alignItems: 'flex-end',
  },
  guide: {
    fontSize: 14,
    color: theme().color.primary.main,
  },
});

export default MyPage;
