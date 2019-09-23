import * as SQLite from "expo-sqlite";
import React, { Component } from "react";
import {
  createStackNavigator,
  NavigationScreenProp,
  NavigationRoute
} from "react-navigation";
import { AsyncStorage, Alert } from "react-native";
import theme from "../../../config/theme";
import { db } from "../../../lib/db";
import {
  deleteSql,
  resetSql,
  resetSqlV100,
  deleteUserSql,
  sqliteMaster
} from "../../../lib/db/debug";
import { select as selectItems } from "../../../lib/db/item";
import { select as selectItemDetailds } from "../../../lib/db/itemDetail";
import { Consumer as AuthConsumer } from "../../../containers/Auth";
import { Consumer as FetchConsumer } from "../../../containers/Fetch";
import Tos from "../Tos/Page";
import Policy from "../Policy/Page";
import Feedback from "../Feedback/Connected";
import SignIn from "../SignIn/Connected";
import MyPage from "../MyPage/Connected";
import ScreenSetting from "../ScreenSetting/Connected";
import Page from "./Page";

interface Props {
  navigation: NavigationScreenProp<NavigationRoute>;
}

class Container extends Component<Props> {
  static navigationOptions = () => {
    return {
      title: "設定",
      headerTitleStyle: {
        color: theme().mode.header.text
      },
      headerTintColor: theme().mode.header.text,
      headerStyle: {
        backgroundColor: theme().mode.header.backgroundColor
      }
    };
  };

  render() {
    return (
      <AuthConsumer>
        {({ loggedIn, logout }: any) => (
          <FetchConsumer>
            {({ post }: any) => (
              <Connected
                {...this.props}
                loggedIn={loggedIn}
                logout={logout}
                post={post}
              />
            )}
          </FetchConsumer>
        )}
      </AuthConsumer>
    );
  }
}

interface ConnectedProps {
  navigation: NavigationScreenProp<NavigationRoute>;
  loggedIn: () => boolean;
  logout: () => void;
  post: (url: string, param: any) => Promise<Response>;
}

interface State {
  login: boolean;
  loading: boolean;
}

class Connected extends Component<ConnectedProps, State> {
  static navigationOptions = { title: "設定" };

  state = {
    loading: true,
    login: false
  };

  async componentDidMount() {
    const loggedIn = await this.props.loggedIn();

    this.setState({
      login: loggedIn,
      loading: false
    });
  }

  onDeleteSQL = () => {
    db.transaction((tx: SQLite.Transaction) => {
      deleteSql(tx);
    });
  };

  onResetSQL = () => {
    db.transaction((tx: SQLite.Transaction) => {
      resetSql(tx);
    });
  };

  onData = () => {
    db.transaction((tx: SQLite.Transaction) => {
      selectItems(tx, console.log);
      selectItemDetailds(tx, console.log);
      sqliteMaster(tx);
    });
  };

  onDeleteUser = () => {
    db.transaction((tx: SQLite.Transaction) => {
      deleteUserSql(tx);
    });

    AsyncStorage.removeItem("FIRST_CRAEATE_ITEM");
  };

  onShowSQL = () => {};

  onTos = () => {
    this.props.navigation.navigate("Tos");
  };

  onPolicy = () => {
    this.props.navigation.navigate("Policy");
  };

  onFeedback = () => {
    this.props.navigation.navigate("Feedback");
  };

  onSignIn = () => {
    this.props.navigation.navigate("SignIn", {
      onLogin: () => {
        this.setState({
          login: true,
          loading: false
        });
      }
    });
  };

  onMyPage = () => {
    this.props.navigation.navigate("MyPage");
  };

  onScreenSetting = () => {
    this.props.navigation.navigate("ScreenSetting");
  };

  onLogout = () => {
    Alert.alert(
      "ログアウトしますか",
      "",
      [
        {
          text: "キャンセル",
          style: "cancel"
        },
        {
          text: "ログアウト",
          onPress: async () => {
            await this.props.logout();
            this.setState({
              login: false
            });
          }
        }
      ],
      { cancelable: false }
    );
  };

  onMigrationV100 = () => {
    db.transaction((tx: SQLite.Transaction) => {
      resetSqlV100(tx);
    });

    AsyncStorage.setItem("APP_VERSION", "1.0.0");
  };

  render() {
    return (
      <Page
        loading={this.state.loading}
        login={this.state.login}
        onResetSQL={this.onResetSQL}
        onData={this.onData}
        onDeleteSQL={this.onDeleteSQL}
        onDeleteUser={this.onDeleteUser}
        onShowSQL={this.onShowSQL}
        onTos={this.onTos}
        onPolicy={this.onPolicy}
        onFeedback={this.onFeedback}
        onSignIn={this.onSignIn}
        onLogout={this.onLogout}
        onMyPage={this.onMyPage}
        onMigrationV100={this.onMigrationV100}
        onScreenSetting={this.onScreenSetting}
      />
    );
  }
}

export default createStackNavigator(
  {
    Setting: Container,
    Tos: Tos,
    Policy: Policy,
    Feedback: Feedback,
    SignIn: SignIn,
    MyPage: MyPage,
    ScreenSetting: ScreenSetting
  },
  {
    defaultNavigationOptions: {
      headerStyle: {
        backgroundColor: theme().mode.header.backgroundColor
      },
      headerTitleStyle: {
        color: theme().mode.header.text
      },
      headerTintColor: theme().mode.header.text
    }
  }
);
