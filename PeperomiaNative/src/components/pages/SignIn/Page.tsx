import React, { FC } from 'react';
import { View, Text, Linking } from 'react-native';
import EStyleSheet from 'react-native-extended-stylesheet';
import { Button } from 'react-native-elements';
import { MaterialIcons } from '@expo/vector-icons';
import Spinner from 'react-native-loading-spinner-overlay';
import theme from '../../../config/theme';

type Props = {
  loading: boolean;
  onGoogleLogin: () => void;
};

const url = 'https://amazing-hawking-a280c3.netlify.com/general/account/';

const SignInPage: FC<Props> = props => (
  <View style={styles.container}>
    <Spinner
      visible={props.loading}
      textContent="ログイン中"
      textStyle={{ color: theme().color.white }}
    />

    <View style={styles.titleContainer}>
      <Text style={styles.title}>会員登録 / ログインする</Text>
    </View>
    <View style={styles.buttonContainer}>
      <Button
        title="Googleアカウントでログイン"
        titleStyle={styles.buttonTitleStyle}
        buttonStyle={styles.buttonStyle}
        onPress={props.onGoogleLogin}
      />
    </View>
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
  guide: {
    fontSize: 14,
    color: theme().color.main,
  },
});

export default SignInPage;
