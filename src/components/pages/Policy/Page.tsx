import React, { Component } from 'react';
import { WebView } from 'react-native-webview';
import CommonStatusBar from 'components/organisms/CommonStatusBar';

type Props = {};

export default class extends Component<Props> {
  render() {
    return (
      <>
        <CommonStatusBar />
        <WebView
          source={{
            uri: 'https://peperomia.app/policy',
          }}
        />
      </>
    );
  }
}
