import React from 'react';
import { ActivityIndicator, Dimensions, StyleSheet, View } from 'react-native';
import EStyleSheet from 'react-native-extended-stylesheet';
const deviceHeight = Dimensions.get('screen').height;
const deviceWidth = Dimensions.get('window').width;

type Props = {
  loading: boolean;
  row?: boolean;
};

const Loading: React.FC<Props> = (props) => {
  if (!props.loading) return <>{props.children}</>;

  return props.row ? (
    <ActivityIndicator size="large" />
  ) : (
    <View style={[styles.container, estyles.background]} {...props}>
      <View style={styles.inner}>
        <ActivityIndicator size="large" />
      </View>
    </View>
  );
};

export default Loading;

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: deviceWidth,
    height: deviceHeight,
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    opacity: 0.8,
  },
  inner: {
    flex: 1,
    position: 'absolute',
    top: '35%',
  },
});

const estyles = EStyleSheet.create({
  background: {
    backgroundColor: '$background',
  },
});
