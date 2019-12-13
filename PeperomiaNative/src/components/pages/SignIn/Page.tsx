import React, { Component } from 'react';
import { View, Text } from 'react-native';
import EStyleSheet from 'react-native-extended-stylesheet';
import { Button } from 'react-native-elements';
import theme from '../../../config/theme';

export interface Props {
  onGoogleLogin: () => void;
}

export default class extends Component<Props> {
  render() {
    return (
      <View style={styles.container}>
        <View style={styles.titleContainer}>
          <Text style={styles.title}>ユーザー登録 / ログインする</Text>
        </View>
        <View style={styles.buttonContainer}>
          <Button
            title="Googleアカウントでログイン"
            titleStyle={styles.buttonTitleStyle}
            buttonStyle={styles.buttonStyle}
            onPress={this.props.onGoogleLogin}
          />
        </View>
      </View>
    );
  }
}

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
