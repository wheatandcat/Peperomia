import React, { FC, useCallback, memo } from 'react';
import {
  View,
  ScrollView,
  Text,
  ActivityIndicator,
  StyleSheet,
  Switch,
} from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import EStyleSheet from 'react-native-extended-stylesheet';
import Spinner from 'react-native-loading-spinner-overlay';
import { Updates } from 'expo';
import { ListItem, Divider } from 'react-native-elements';
import Constants from 'expo-constants';
import * as Analytics from 'expo-firebase-analytics';
import * as Sentry from 'sentry-expo';
import theme from 'config/theme';
import { ConnectedType } from './Connected';
import app from '../../../../app.json';

type Props = ConnectedType;

const SettingPage: FC<Props> = (props) => {
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

        <ListItem onPress={props.onFeedback} bottomDivider>
          <ListItem.Content>
            <ListItem.Title>お問い合わせ</ListItem.Title>
          </ListItem.Content>
          <ListItem.Chevron />
        </ListItem>
        <View style={estyles.menuSpace} />
        <Divider />

        <ListItem onPress={props.onTos} bottomDivider>
          <ListItem.Content>
            <ListItem.Title>利用規約</ListItem.Title>
          </ListItem.Content>
          <ListItem.Chevron />
        </ListItem>

        <ListItem onPress={props.onPolicy} bottomDivider>
          <ListItem.Content>
            <ListItem.Title>プライバシーポリシー</ListItem.Title>
          </ListItem.Content>
          <ListItem.Chevron />
        </ListItem>

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
                <ListItem onPress={props.onMyPage} bottomDivider>
                  <ListItem.Content>
                    <ListItem.Title>マイページ</ListItem.Title>
                  </ListItem.Content>
                  <ListItem.Chevron />
                </ListItem>

                <ListItem onPress={props.onLogout} bottomDivider>
                  <ListItem.Content>
                    <ListItem.Title style={styles.logout}>
                      ログアウト
                    </ListItem.Title>
                  </ListItem.Content>
                </ListItem>
              </>
            );
          }

          return (
            <>
              <Divider />
              <ListItem onPress={props.onSignIn} bottomDivider>
                <ListItem.Content>
                  <ListItem.Title>ユーザー登録 / ログイン</ListItem.Title>
                </ListItem.Content>
                <ListItem.Chevron />
              </ListItem>
            </>
          );
        })()}

        {!Constants.isDevice && (
          <ListItem onPress={props.onLoginWithAmazon} bottomDivider>
            <ListItem.Content>
              <ListItem.Title>Alexa連携を設定する</ListItem.Title>
            </ListItem.Content>
            <ListItem.Chevron />
          </ListItem>
        )}

        <View style={estyles.menuSpace} />
        <Divider />
        <ListItem bottomDivider>
          <ListItem.Content>
            <ListItem.Title>バージョン情報</ListItem.Title>
          </ListItem.Content>
          <Text style={estyles.menuText}>{app.expo.version}</Text>
        </ListItem>

        {!Constants.isDevice && (
          <>
            <View style={styles.debugSpace} />
            <Divider />
            <ListItem bottomDivider>
              <ListItem.Content>
                <ListItem.Title>▼ デバッグ機能</ListItem.Title>
              </ListItem.Content>
            </ListItem>

            <ListItem bottomDivider>
              <ListItem.Content>
                <ListItem.Title>{`UID: ${props.uid || ''}`}</ListItem.Title>
              </ListItem.Content>
            </ListItem>
            <ListItem bottomDivider onPress={props.onResetSQL}>
              <ListItem.Content>
                <ListItem.Title>初期データ投入</ListItem.Title>
              </ListItem.Content>
            </ListItem>
            <ListItem bottomDivider onPress={props.onDeleteUser}>
              <ListItem.Content>
                <ListItem.Title>ユーザー初期化</ListItem.Title>
              </ListItem.Content>
            </ListItem>
            <ListItem bottomDivider onPress={props.onMigrationV100}>
              <ListItem.Content>
                <ListItem.Title>v1.0.0の状態にする</ListItem.Title>
              </ListItem.Content>
            </ListItem>
            <ListItem bottomDivider onPress={props.onDeleteSQL}>
              <ListItem.Content>
                <ListItem.Title>v1.0.アイテムを削除</ListItem.Title>
              </ListItem.Content>
            </ListItem>
            <ListItem bottomDivider onPress={props.onDeleteSQL}>
              <ListItem.Content>
                <ListItem.Title>v1.0.アイテムを削除</ListItem.Title>
              </ListItem.Content>
            </ListItem>
            <ListItem bottomDivider onPress={props.onData}>
              <ListItem.Content>
                <ListItem.Title>DBのデータを表示</ListItem.Title>
              </ListItem.Content>
            </ListItem>
            <ListItem
              bottomDivider
              onPress={() => AsyncStorage.removeItem('FIRST_CREATE_ITEM')}
            >
              <ListItem.Content>
                <ListItem.Title>
                  最初のプラン作成キャッシュの削除
                </ListItem.Title>
              </ListItem.Content>
            </ListItem>
            <ListItem bottomDivider>
              <ListItem.Content>
                <ListItem.Title>使用DBをSQLiteにする</ListItem.Title>
              </ListItem.Content>
              <Switch
                onValueChange={props.onChangeDebugMode}
                value={props.debugMode}
              />
            </ListItem>
            <ListItem
              bottomDivider
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
            >
              <ListItem.Content>
                <ListItem.Title>Firebase アナリティクス</ListItem.Title>
              </ListItem.Content>
            </ListItem>
            <ListItem bottomDivider onPress={onSentry}>
              <ListItem.Content>
                <ListItem.Title>Sentryテスト</ListItem.Title>
              </ListItem.Content>
            </ListItem>
            <ListItem bottomDivider onPress={() => Updates.reload()}>
              <ListItem.Content>
                <ListItem.Title> title="アプリを再起動する"</ListItem.Title>
              </ListItem.Content>
            </ListItem>
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
  logout: {
    color: theme().color.error.main,
  },

  debugSpace: {
    marginBottom: theme().space(4),
  },
});

export default memo(SettingPage);
