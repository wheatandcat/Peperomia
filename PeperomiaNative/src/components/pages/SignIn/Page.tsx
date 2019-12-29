import React, { FC } from 'react';
import { View, Text } from 'react-native';
import EStyleSheet from 'react-native-extended-stylesheet';
import { Button } from 'react-native-elements';
import theme from '../../../config/theme';

type Props = {
  onGoogleLogin: () => void;
};

const SignInPage: FC<Props> = props => (
  <View style={styles.container}>
    <View style={styles.titleContainer}>
      <Text style={styles.title}>ユーザー登録 / ログインする</Text>
    </View>
    <View style={styles.buttonContainer}>
      <Button
        title="Googleアカウントでログイン"
        titleStyle={styles.buttonTitleStyle}
        buttonStyle={styles.buttonStyle}
        onPress={props.onGoogleLogin}
      />
    </View>
  </View>
);

const styles = EStyleSheet.create({
  container: {
    alignItems: 'center',
    backgroundColor: '$background',
    height: '100%',
  },
  titleContainer: {
    paddingTop: 30,
    paddingBottom: 10,
  },
  title: {
    color: '$text',
  },
  buttonContainer: {
    marginVertical: 30,
  },
  buttonTitleStyle: {
    padding: 15,
  },
  buttonStyle: {
    backgroundColor: theme().color.red,
    borderColor: 'transparent',
  },
});

export default SignInPage;
