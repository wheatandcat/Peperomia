import React, { useCallback, useEffect, useState } from 'react';
import { AppState, AppStateStatus } from 'react-native';
import { useVersion } from './Version';

type Props = {};

const AppStateContainer: React.FC<Props> = (props) => {
  const [appState, setAppState] = useState<AppStateStatus>(
    AppState.currentState
  );
  const { onCheckForceUpdate } = useVersion();

  const check = useCallback(async () => {
    await onCheckForceUpdate?.();
  }, [onCheckForceUpdate]);

  const handleAppStateChange = useCallback(
    async (nextAppState) => {
      if (appState.match(/inactive|background/u) && nextAppState === 'active')
        await check();

      setAppState(nextAppState);
    },
    [appState, check]
  );

  useEffect(() => {
    AppState.addEventListener('change', handleAppStateChange);

    return () => {
      AppState.removeEventListener('change', handleAppStateChange);
    };
  }, [handleAppStateChange]);

  return <>{props.children}</>;
};

export default AppStateContainer;
