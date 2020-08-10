import { useState } from 'react';
import {
  NativeSyntheticEvent,
  TextInputScrollEventData,
  Platform,
  StatusBar,
} from 'react-native';
import { getStatusBarHeight } from 'react-native-status-bar-height';

const top =
  Platform.OS === 'android' ? StatusBar.currentHeight : getStatusBarHeight();

const useScroll = (offsetY: number = 84) => {
  const [scrollBelowTarget, setScrollBelowTarget] = useState(true);

  const onScroll = (e: NativeSyntheticEvent<TextInputScrollEventData>) => {
    const offsetScrollY = offsetY + (top || 0);

    if (e.nativeEvent.contentOffset.y >= offsetScrollY && scrollBelowTarget) {
      setScrollBelowTarget(false);
    }

    if (e.nativeEvent.contentOffset.y < offsetScrollY && !scrollBelowTarget) {
      setScrollBelowTarget(true);
    }
  };

  return {
    onScroll,
    scrollBelowTarget,
  };
};

export default useScroll;
