import React, { Component } from "react";
import { NavigationScreenProp, NavigationRoute } from "react-navigation";
import { Alert, Dimensions } from "react-native";
import Toast from "react-native-root-toast";
import backup from "../../../lib/backup";
import { Consumer as FetchConsumer } from "../../../containers/Fetch";
import { Consumer as AuthConsumer } from "../../../containers/Auth";
import Page from "./Page";

interface Props {
  navigation: NavigationScreenProp<NavigationRoute>;
}

export default class extends Component<Props> {
  static navigationOptions = { title: "マイページ" };

  render() {
    return (
      <AuthConsumer>
        {({ email }: any) => (
          <FetchConsumer>
            {({ post }: any) => (
              <Connected {...this.props} post={post} email={email} />
            )}
          </FetchConsumer>
        )}
      </AuthConsumer>
    );
  }
}

interface ConnectedProps {
  navigation: NavigationScreenProp<NavigationRoute>;
  post: (url: string, param: any) => Promise<Response>;
  email: string;
}

interface State {
  loading: boolean;
}

class Connected extends Component<ConnectedProps, State> {
  static navigationOptions = { title: "設定" };

  state = {
    loading: false
  };

  onBackup = async () => {
    const { items, itemDetails } = await backup();

    const request = {
      items,
      itemDetails
    };
    const response = await this.props.post("SyncItems", {
      body: JSON.stringify(request)
    });

    if (!response.ok) {
      Alert.alert("バックアップに失敗しました");
      return;
    }

    const { height } = Dimensions.get("window");

    let toast = Toast.show("バックアップしました", {
      duration: Toast.durations.LONG,
      position: height - 150,
      shadow: true,
      animation: true,
      hideOnPress: true,
      delay: 0
    });

    // You can manually hide the Toast, or it will automatically disappear after a `duration` ms timeout.
    setTimeout(function() {
      Toast.hide(toast);
    }, 3000);
  };
  onRestore = () => {};

  render() {
    return (
      <Page
        loading={this.state.loading}
        email={this.props.email}
        onBackup={this.onBackup}
        onRestore={this.onRestore}
      />
    );
  }
}
