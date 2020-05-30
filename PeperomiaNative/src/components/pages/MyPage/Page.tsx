import React, { FC } from 'react';
import { View, ScrollView, Text, Linking } from 'react-native';
import EStyleSheet from 'react-native-extended-stylesheet';
import { ListItem, Button } from 'react-native-elements';
import { MaterialIcons } from '@expo/vector-icons';
import Spinner from 'react-native-loading-spinner-overlay';
import Constants from 'expo-constants';
import theme from '../../../config/theme';

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
          <Text style={styles.emialTitle}>メールアドレス:</Text>
          <Text style={styles.emial}>{props.email}</Text>
        </View>
      </View>

      {!Constants.isDevice && (
        <>
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
      <ListItem
        title="Push通知を設定する"
        titleStyle={styles.menuText}
        containerStyle={styles.menuContainer}
        onPress={props.onNotificationSetting}
      />

      <Button
        title="会員登録するとできること"
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
  guide: {
    fontSize: 14,
    color: theme().color.main,
  },
});

export default MyPage;
