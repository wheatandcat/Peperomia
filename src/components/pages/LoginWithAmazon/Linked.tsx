import React from 'react';
import { View, Image, Text, Linking } from 'react-native';
import { Button, Divider } from 'react-native-elements';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import EStyleSheet from 'react-native-extended-stylesheet';
import theme from 'config/theme';

export default () => {
  return (
    <View style={styles.textContainer}>
      <Divider />
      <Text style={styles.text}>連携済みです</Text>
      <Divider />
      <View style={styles.alexaSkillContainer}>
        <View style={styles.log}>
          <Image
            source={require('../../../img/alexa_skill.png')}
            style={styles.icon}
          />
        </View>
        <View style={styles.log}>
          <Button
            title="Alexa Skillのβ版申し込みをする"
            type="clear"
            titleStyle={styles.linkText}
            onPress={() =>
              Linking.openURL('https://form.run/@wheatandcat-6245')
            }
          />
        </View>
      </View>
      <Divider />

      <Text style={styles.guide}>
        <Text>Alexaスキルのガイド </Text>
        <MaterialCommunityIcons
          name="chevron-right"
          size={12}
          color={theme().mode.text}
        />
      </Text>
    </View>
  );
};

const styles = EStyleSheet.create({
  textContainer: {
    width: '100%',
  },
  text: {
    color: '$text',
    fontSize: 18,
    fontWeight: '600',
    textAlign: 'center',
    paddingVertical: 8,
  },
  alexaSkillContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  log: {
    padding: 15,
  },
  linkText: {
    fontSize: 13,
  },
  guide: {
    color: '$text',
    fontSize: 12,
    textAlign: 'center',
    paddingVertical: 25,
  },
  icon: {
    height: 80,
    width: 80,
  },
});
