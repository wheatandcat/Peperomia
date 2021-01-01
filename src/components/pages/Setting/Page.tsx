import React, { FC, useCallback, memo } from 'react';
import {
  View,
  ScrollView,
  Text,
  AsyncStorage,
  ActivityIndicator,
  StyleSheet,
} from 'react-native';
import EStyleSheet from 'react-native-extended-stylesheet';
import Spinner from 'react-native-loading-spinner-overlay';
import { Updates } from 'expo';
import { ListItem, Divider } from 'react-native-elements';
import Constants from 'expo-constants';
import * as Analytics from 'expo-firebase-analytics';
import * as Sentry from 'sentry-expo';
import Bugsnag from '@bugsnag/expo';
import theme from 'config/theme';
import { ConnectedType } from './Connected';
import app from '../../../../app.json';

type Props = ConnectedType;

const SettingPage: FC<Props> = (props) => {
  const onBugsnag = useCallback(() => {
    Bugsnag.notify(new Error('test: bugsnag'));
  }, []);

  const onSentry = useCallback(() => {
    Sentry.captureException(new Error('test: sentry'));
  }, []);

  return (
    <View style={estyles.root}>
      <Spinner
        visible={props.restoreLoading}
        textContent="ログアウト中"
        textStyle={{ color: theme().color.background.main }}
      />
      <ScrollView>
        <Divider />
        <ListItem
          title="お問い合わせ"
          rightIcon={{ name: 'chevron-right', color: theme().mode.text }}
          containerStyle={estyles.menu}
          titleStyle={estyles.menuText}
          bottomDivider
          onPress={props.onFeedback}
        />
        <View style={estyles.menuSpace} />
        <Divider />
        <ListItem
          title="利用規約"
          rightIcon={{ name: 'chevron-right', color: theme().mode.text }}
          containerStyle={estyles.menu}
          titleStyle={estyles.menuText}
          bottomDivider
          onPress={props.onTos}
        />
        <ListItem
          title="プライバシーポリシー"
          rightIcon={{ name: 'chevron-right', color: theme().mode.text }}
          containerStyle={estyles.menu}
          titleStyle={estyles.menuText}
          onPress={props.onPolicy}
          bottomDivider
        />

        <View style={estyles.menuSpace} />

        {(() => {
          if (props.loading) {
            return (
              <View style={[estyles.menu, styles.loginMenu]}>
                <ActivityIndicator size="large" color={theme().mode.text} />
              </View>
            );
          }

          if (props.login) {
            return (
              <>
                <Divider />
                <ListItem
                  title="マイページ"
                  onPress={props.onMyPage}
                  rightIcon={{
                    name: 'chevron-right',
                    color: theme().mode.text,
                  }}
                  containerStyle={estyles.menu}
                  titleStyle={estyles.menuText}
                  bottomDivider
                />
                <ListItem
                  title="ログアウト"
                  containerStyle={estyles.menu}
                  titleStyle={{ color: theme().color.error.main }}
                  onPress={props.onLogout}
                  bottomDivider
                />
              </>
            );
          }

          return (
            <>
              <Divider />
              <ListItem
                title="ユーザー登録 / ログイン"
                rightIcon={{
                  name: 'chevron-right',
                  color: theme().mode.text,
                }}
                containerStyle={estyles.menu}
                titleStyle={estyles.menuText}
                onPress={props.onSignIn}
                bottomDivider
              />
            </>
          );
        })()}

        {!Constants.isDevice && (
          <ListItem
            title="Alexa連携を設定する(β版)"
            rightIcon={{
              name: 'chevron-right',
              color: theme().mode.text,
            }}
            containerStyle={estyles.menu}
            titleStyle={estyles.menuText}
            onPress={props.onLoginWithAmazon}
            bottomDivider
          />
        )}

        <View style={estyles.menuSpace} />
        <Divider />
        <ListItem
          title="バージョン情報"
          rightTitle={
            <Text style={{ color: theme().mode.text }}>
              {app.expo.version}{' '}
            </Text>
          }
          containerStyle={estyles.menu}
          titleStyle={estyles.menuText}
          bottomDivider
        />
        {!Constants.isDevice && (
          <>
            <View style={styles.debugSpace} />
            <Divider />
            <Text style={styles.debug}>デバッグ機能</Text>
            <Divider />
            <ListItem title={`UID: ${props.uid || ''}`} />
            <Divider />
            <Divider />
            <ListItem title="初期データ投入" onPress={props.onResetSQL} />
            <Divider />
            <ListItem title="ユーザー初期化" onPress={props.onDeleteUser} />
            <Divider />
            <ListItem
              title="v1.0.0の状態にする"
              onPress={props.onMigrationV100}
            />
            <Divider />
            <ListItem title="アイテムを削除" onPress={props.onDeleteSQL} />
            <Divider />
            <ListItem title="DBのデータを表示" onPress={props.onData} />
            <Divider />
            <ListItem
              title="最初のプラン作成キャッシュの削除"
              onPress={() => {
                AsyncStorage.removeItem('FIRST_CREATE_ITEM');
              }}
            />
            <Divider />
            <ListItem
              title="使用DBをSQLiteにする"
              switch={{
                value: props.debugMode,
                onValueChange: props.onChangeDebugMode,
              }}
              bottomDivider
            />
            <ListItem
              title="Firebase アナリティクス"
              onPress={() => {
                Analytics.setUserId('saitama');
                Analytics.setUserProperties({
                  hero_class: 'B',
                });

                Analytics.logEvent('share', {
                  contentType: 'text',
                  itemId: 'Expo rocks!',
                  method: 'facebook',
                });
              }}
              bottomDivider
            />
            <ListItem title="Sentryテスト" onPress={onSentry} bottomDivider />
            <ListItem title="Bugsnagテスト" onPress={onBugsnag} bottomDivider />
            <ListItem
              title="アプリを再起動する"
              onPress={() => {
                Updates.reload();
              }}
            />
            <Divider style={styles.debugSpace} />
          </>
        )}
      </ScrollView>
    </View>
  );
};
const estyles = EStyleSheet.create({
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
  menuSpace: {
    height: 20,
    backgroundColor: '$settingRoot',
  },
});

const styles = StyleSheet.create({
  loginMenu: {
    height: 60,
    justifyContent: 'center',
    alignItems: 'center',
  },

  debugSpace: {
    marginBottom: 50,
  },

  debug: {
    backgroundColor: theme().color.background.light,
    paddingVertical: 15,
    paddingLeft: 10,
    fontSize: 20,
  },
});

export default memo(SettingPage);
