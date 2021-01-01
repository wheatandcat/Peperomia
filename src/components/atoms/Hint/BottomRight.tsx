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
    right: theme().space(2),
    top: theme().space(4),
  },
  tips: {
    width: 0,
    height: 0,
    backgroundColor: theme().color.transparent,
    borderStyle: 'solid',
    borderRightWidth: 20,
    borderTopWidth: 20,
    transform: [{ rotate: '180deg' }],
    borderRightColor: theme().color.transparent,
    borderTopColor: theme().color.background.main,
    borderBottomColor: theme().color.background.main,
    right: theme().space(2),
  },
  tipsContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    width: whenIPhoneSE(280, 330),
    height: whenIPhoneSE(40, 55),
    backgroundColor: theme().color.background.main,
    borderWidth: 0,
    paddingHorizontal: whenIPhoneSE(theme().space(3), theme().space(4)),
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
