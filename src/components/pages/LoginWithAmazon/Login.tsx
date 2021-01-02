import React from 'react';
import { View, Image, Text, StyleSheet } from 'react-native';
import { Button, Divider } from 'react-native-elements';
import EStyleSheet from 'react-native-extended-stylesheet';
import theme from 'config/theme';

type Props = {
  loading: boolean;
  onAmazonLogin: () => void;
};

const Loading: React.FC<Props> = ({ loading, onAmazonLogin }) => {
  return (
    <View style={estyles.root}>
      <View style={styles.alexaSkillContainer}>
        <View style={styles.log}>
          <Image
            source={require('../../../img/alexa_skill.png')}
            style={styles.icon}
          />
        </View>
        <View>
          <Text style={estyles.title}>ペペロミア with Alexaスキル</Text>
        </View>
      </View>
      <Divider />
      <View style={styles.description}>
        <Text style={estyles.title}>
          ※こちらの機能はまだβ版です。{'\n'}
          {'\n'}
          ペペロミアの予定作成をAlexaスキルから行う事ができます。
        </Text>
      </View>
      <Divider />
      <View style={styles.buttonAction}>
        <Button
          title="Alexaスキルとアカウントをリンクする"
          onPress={onAmazonLogin}
          loading={loading}
          disabled={loading}
        />
      </View>
    </View>
  );
};

export default Loading;

const estyles = EStyleSheet.create({
  root: {
    backgroundColor: '$background',
    height: '100%',
    width: '100%',
  },
  text: {
    color: '$text',
  },
});

const styles = StyleSheet.create({
  alexaSkillContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  log: {
    padding: theme().space(3),
  },
  description: {
    padding: theme().space(3),
  },
  buttonAction: {
    paddingHorizontal: theme().space(3),
    paddingVertical: theme().space(4),
  },
  icon: {
    height: 80,
    width: 80,
  },
});
