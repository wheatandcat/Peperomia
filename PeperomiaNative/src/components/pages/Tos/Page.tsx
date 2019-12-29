import React, { Component } from 'react';
import { WebView } from 'react-native-webview';
import theme from '../../../config/theme';

type Props = {};

export default class extends Component<Props> {
  static navigationOptions = () => {
    return {
      title: '利用規約',
      headerBackTitle: '',
      headerTitleStyle: {
        color: theme().mode.header.text,
      },
      headerTintColor: theme().mode.header.text,
      headerStyle: {
        backgroundColor: theme().mode.header.backgroundColor,
      },
    };
  };

  render() {
    return (
      <WebView
        source={{
          uri: 'https://peperomia.app/tos',
        }}
      />
    );
  }
}
