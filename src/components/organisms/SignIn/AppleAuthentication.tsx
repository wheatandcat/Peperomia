import React from 'react';
import * as AppleAuthentication from 'expo-apple-authentication';
import EStyleSheet from 'react-native-extended-stylesheet';

type Props = {
  onAppleLogin: () => void;
};

const AppleButton = (props: Props) => {
  return (
    <AppleAuthentication.AppleAuthenticationButton
      buttonType={AppleAuthentication.AppleAuthenticationButtonType.SIGN_IN}
      buttonStyle={AppleAuthentication.AppleAuthenticationButtonStyle.BLACK}
      cornerRadius={5}
      style={styles.button}
      onPress={props.onAppleLogin}
    />
  );
};

export default AppleButton;

const styles = EStyleSheet.create({
  button: {
    width: 200,
    height: 44,
  },
});
