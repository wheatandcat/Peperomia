import React from 'react';
import { View, StyleSheet, Platform } from 'react-native';

type Props = {
  topBounceColor: string;
  bottomBounceColor: string;
  style?: any;
};

const AppScrollViewIOSBounceColorsWrapper: React.FC<Props> = ({
  topBounceColor,
  bottomBounceColor,
  children,
  ...props
}) => {
  return (
    <View {...props} style={[styles.top, props.style]}>
      {children}
      <View style={styles.wrap}>
        {Platform.OS === 'ios' && (
          <View
            style={[styles.contents, { backgroundColor: topBounceColor }]}
          />
        )}
        <View
          style={[styles.contents, { backgroundColor: bottomBounceColor }]}
        />
      </View>
    </View>
  );
};

export default AppScrollViewIOSBounceColorsWrapper;

const styles = StyleSheet.create({
  contents: {
    flex: 1,
  },
  top: { position: 'relative', flex: 1 },
  wrap: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    zIndex: -1,
  },
});
