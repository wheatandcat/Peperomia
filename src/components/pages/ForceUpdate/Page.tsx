import React, { useCallback } from 'react';
import { View, ScrollView, Text } from 'react-native';
import EStyleSheet from 'react-native-extended-stylesheet';
import AppLink from 'react-native-app-link';
import { Button } from 'react-native-elements';

type Props = {};

const ForceUpdate: React.FC<Props> = () => {
  const onPress = useCallback(() => {
    const appStoreId = 1460583871;
    const playStoreId = 'com.wheatandcat.peperomia';
    AppLink.openInStore({
      appName: 'シェアフル',
      appStoreId,
      appStoreLocale: 'jp',
      playStoreId,
    });
  }, []);

  return (
    <View style={styles.root}>
      <ScrollView>
        <View style={styles.inner}>
          <View style={styles.textContainer}>
            <Text style={styles.title}>
              最新のバージョンのアプリを{'\n'}インストールしてください。
            </Text>
          </View>
          <View style={styles.buttonContainer}>
            <Button title="ストアへ移動する" onPress={onPress} />
          </View>
        </View>
      </ScrollView>
    </View>
  );
};

export default ForceUpdate;

const styles = EStyleSheet.create({
  root: {
    backgroundColor: '$background',
    height: '100%',
  },
  inner: {
    height: '100%',
    paddingHorizontal: 15,
    paddingVertical: 15,
  },
  title: {
    color: '$text',
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
  },

  textContainer: {
    paddingTop: 15,
    paddingBottom: 15,
  },
  buttonContainer: {
    paddingHorizontal: 15,
    paddingVertical: 15,
  },
});
