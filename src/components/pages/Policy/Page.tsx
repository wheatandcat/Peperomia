import React from 'react';
import { WebView } from 'react-native-webview';
import CommonStatusBar from 'components/organisms/CommonStatusBar';

type Props = {};

const Policy: React.FC<Props> = () => {
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
};

export default Policy;
