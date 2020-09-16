import React, {
  useState,
  useEffect,
  createContext,
  useCallback,
  useContext,
} from 'react';
import AsyncStorage from '@react-native-community/async-storage';
import compareVersions from 'compare-versions';
import { migrationV104, migrationV201 } from 'lib/migration';
import { getFireStore } from 'lib/firebase';
import { getSupportVersion } from 'lib/firestore/supportVersion';
import ForceUpdate from 'components/pages/ForceUpdate/Page';

export const Context = createContext<ContextProps>({});
const { Provider } = Context;

export type ContextProps = Partial<{
  onCheckForceUpdate: () => Promise<void>;
}>;

type Props = {};

type State = {
  forceVersionUpdate: boolean;
};

const Version: React.FC<Props> = (props) => {
  const [state, setState] = useState<State>({
    forceVersionUpdate: false,
  });

  useEffect(() => {
    const checkVersion = async () => {
      let appVersion = await AsyncStorage.getItem('APP_VERSION');
      if (!appVersion) {
        appVersion = '1.0.0';
      }

      if (compareVersions.compare('1.0.5', appVersion, '>')) {
        // カラム追加のマイグレーション実行
        const ok = await migrationV104();
        if (ok) {
          // 現在のバージョンを設定
          await AsyncStorage.setItem('APP_VERSION', '1.0.5');
          appVersion = '1.0.5';
        }
      }

      if (compareVersions.compare('2.0.1', appVersion, '>')) {
        // カラム追加のマイグレーション実行
        const ok = await migrationV201();
        if (ok) {
          // 現在のバージョンを設定
          await AsyncStorage.setItem('APP_VERSION', '2.0.1');
          appVersion = '2.0.1';
        }
      }
    };

    checkVersion();
    onCheckForceUpdate();
  });

  const onCheckForceUpdate = useCallback(async () => {
    let appVersion = await AsyncStorage.getItem('APP_VERSION');
    if (!appVersion) {
      appVersion = '1.0.0';
    }

    const firestore = getFireStore();
    const supportVersion = await getSupportVersion(firestore);
    console.log(supportVersion);

    if (compareVersions.compare(supportVersion, appVersion, '>')) {
      setState((s) => ({
        ...s,
        forceVersionUpdate: true,
      }));
    }
  }, []);

  if (state.forceVersionUpdate) {
    return <ForceUpdate />;
  }

  return <Provider value={{ onCheckForceUpdate }}>{props.children}</Provider>;
};

export default Version;

export const useVersion = () => useContext(Context);
export const Consumer = Context.Consumer;
