import React, { useCallback, useEffect, useState } from 'react';
import { AppState, AppStateStatus } from 'react-native';

type Props = {};

type State = {
  loading: boolean;
};

const AppStateContainer: React.FC<Props> = (props) => {
  const [appState, setAppState] = useState<AppStateStatus>(
    AppState.currentState
  );

  const check = useCallback(async () => {}, []);

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
