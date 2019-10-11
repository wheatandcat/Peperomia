import { Component } from "react";
import { AsyncStorage } from "react-native";
import compareVersions from "compare-versions";
import { migrationV104, migrationV201 } from "../lib/migration";

interface Props {}

interface State {
  loading: boolean;
}

export default class extends Component<Props, State> {
  state = {
    loading: true
  };

  async componentDidMount() {
    let appVerion = await AsyncStorage.getItem("APP_VERSION");
    if (!appVerion) {
      appVerion = "1.0.0";
    }

    if (compareVersions.compare("1.0.5", appVerion, ">")) {
      // カラム追加のマイグレーション実行
      const ok = await migrationV104();
      if (ok) {
        // 現在のバージョンを設定
        await AsyncStorage.setItem("APP_VERSION", "1.0.5");
        appVerion = "1.0.5";
      }
    }

    if (compareVersions.compare("2.0.1", appVerion, ">")) {
      // カラム追加のマイグレーション実行
      const ok = await migrationV201();
      if (ok) {
        // 現在のバージョンを設定
        await AsyncStorage.setItem("APP_VERSION", "2.0.1");
        appVerion = "2.0.1";
      }
    }

    this.setState({
      loading: false
    });
  }

  render() {
    if (this.state.loading) {
      return null;
    }

    return this.props.children;
  }
}
