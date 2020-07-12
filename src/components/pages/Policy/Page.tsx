import React, { Component } from 'react';
import { WebView } from 'react-native-webview';

type Props = {};

export default class extends Component<Props> {
  render() {
    return (
      <WebView
        source={{
          uri: 'https://peperomia.app/policy',
        }}
      />
    );
  }
}
