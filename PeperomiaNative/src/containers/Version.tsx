import { useState, ReactNode } from 'react';
import { AsyncStorage } from 'react-native';
import compareVersions from 'compare-versions';
import { useDidMount } from '../hooks/index';
import { migrationV104, migrationV201 } from '../lib/migration';

type Props = {
  children: ReactNode;
};

type State = {
  loading: boolean;
};

export default (props: Props) => {
  const [state, setState] = useState<State>({ loading: false });

  useDidMount(() => {
    const checkVersion = async () => {
      let appVerion = await AsyncStorage.getItem('APP_VERSION');
      if (!appVerion) {
        appVerion = '1.0.0';
      }

      if (compareVersions.compare('1.0.5', appVerion, '>')) {
        // カラム追加のマイグレーション実行
        const ok = await migrationV104();
        if (ok) {
          // 現在のバージョンを設定
          await AsyncStorage.setItem('APP_VERSION', '1.0.5');
          appVerion = '1.0.5';
        }
      }

      if (compareVersions.compare('2.0.1', appVerion, '>')) {
        // カラム追加のマイグレーション実行
        const ok = await migrationV201();
        if (ok) {
          // 現在のバージョンを設定
          await AsyncStorage.setItem('APP_VERSION', '2.0.1');
          appVerion = '2.0.1';
        }
      }

      setState({
        loading: false,
      });
    };

    checkVersion();
  });

  if (state.loading) {
    return null;
  }

  return props.children;
};
