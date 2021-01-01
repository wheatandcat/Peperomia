import React, { FC } from 'react';
import { View, Text, Linking, StyleSheet } from 'react-native';
import EStyleSheet from 'react-native-extended-stylesheet';
import { Button } from 'react-native-elements';
import { MaterialIcons } from '@expo/vector-icons';
import Spinner from 'react-native-loading-spinner-overlay';
import AppleAuthentication from 'components/organisms/SignIn/AppleAuthentication';
import theme from 'config/theme';

type Props = {
  loading: boolean;
  onGoogleLogin: () => void;
  onAppleLogin: () => void;
};

const url = 'https://amazing-hawking-a280c3.netlify.com/general/account/';

const SignInPage: FC<Props> = (props) => (
  <View style={estyles.container}>
    <Spinner
      visible={props.loading}
      textContent="ログイン中"
      textStyle={{ color: theme().color.background.main }}
    />

    <View style={styles.titleContainer}>
      <Text style={estyles.title}>会員登録 / ログインする</Text>
    </View>

    <AppleAuthentication onAppleLogin={props.onAppleLogin} />

    <View style={styles.buttonContainer}>
      <Button
        title="Googleアカウントでログイン"
        titleStyle={styles.buttonTitleStyle}
        buttonStyle={styles.buttonStyle}
        onPress={props.onGoogleLogin}
      />
    </View>

    <View style={styles.guideContainer}>
      <Button
        title="ユーザー登録とは"
        type="clear"
        titleStyle={styles.guide}
        icon={
          <MaterialIcons
            name="chevron-right"
            size={20}
            color={theme().color.primary.main}
          />
        }
        iconRight
        onPress={() => Linking.openURL(url)}
      />
    </View>
  </View>
);

const estyles = EStyleSheet.create({
  container: {
    alignItems: 'center',
    backgroundColor: '$background',
    height: '100%',
  },
  title: {
    color: '$text',
  },
});

const styles = StyleSheet.create({
  titleContainer: {
    paddingTop: 30,
    paddingBottom: 10,
  },
  buttonContainer: {
    marginVertical: 30,
  },
  buttonTitleStyle: {
    padding: 15,
  },
  buttonStyle: {
    backgroundColor: theme().color.error.main,
    borderColor: theme().color.transparent,
  },
  guide: {
    fontSize: 14,
    color: theme().color.primary.main,
  },
  guideContainer: {
    paddingTop: 25,
    paddingRight: 5,
    width: '100%',
  },
});

export default SignInPage;
