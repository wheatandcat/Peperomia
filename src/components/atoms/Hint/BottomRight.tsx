import React from 'react';
import { StyleSheet, View, Text } from 'react-native';
import { whenIPhoneSE } from 'lib/responsive';
import theme from 'config/theme';

export default () => (
  <View style={styles.root}>
    <View style={styles.right}>
      <View style={styles.tips} />
    </View>
    <View style={styles.tipsContainer}>
      <Text style={styles.text}>
        <Text style={styles.plus}> + </Text>
        <Text> ボタンをタッチして予定を作成しよう！</Text>
      </Text>
    </View>
  </View>
);

const styles = StyleSheet.create({
  root: {
    position: 'absolute',
    right: 10,
    top: 50,
  },
  tips: {
    width: 0,
    height: 0,
    backgroundColor: 'transparent',
    borderStyle: 'solid',
    borderRightWidth: 20,
    borderTopWidth: 20,
    transform: [{ rotate: '180deg' }],
    borderRightColor: 'transparent',
    borderTopColor: theme().color.white,
    borderBottomColor: theme().color.white,
    right: 10,
  },
  tipsContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    width: whenIPhoneSE(280, 330),
    height: whenIPhoneSE(40, 55),
    backgroundColor: theme().color.white,
    borderWidth: 0,
    paddingHorizontal: whenIPhoneSE(12, 15),
  },

  text: {
    fontSize: whenIPhoneSE(12, 14),
  },
  plus: {
    fontSize: whenIPhoneSE(17, 20),
    fontWeight: '600',
  },
  right: {
    right: whenIPhoneSE(-250, -300),
  },
});
