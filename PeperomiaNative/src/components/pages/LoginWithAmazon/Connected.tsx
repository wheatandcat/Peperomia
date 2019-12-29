import React, { Component } from 'react';
import { NavigationScreenProp, NavigationRoute } from 'react-navigation';
import { Linking, Alert, Dimensions } from 'react-native';
import Constants from 'expo-constants';
import Toast from 'react-native-root-toast';
import dayjs from 'dayjs';
import advancedFormat from 'dayjs/plugin/advancedFormat';
import 'dayjs/locale/ja';
import queryString from 'query-string';
import theme from '../../../config/theme';
import {
  Consumer as FetchConsumer,
  ContextProps as FetchContextProps,
} from '../../../containers/Fetch';
import {
  Consumer as AuthConsumer,
  ContextProps as AuthContextProps,
} from '../../../containers/Auth';
import Page from './Page';

dayjs.extend(advancedFormat);

type Props = {
  navigation: NavigationScreenProp<NavigationRoute>;
};

type WebPageResponse = {
  accessToken: string;
};

export default class extends Component<Props> {
  static navigationOptions = () => {
    return {
      title: 'Amazonアカウント連携',
      headerBackTitle: '',
      headerTitleStyle: {
        color: theme().mode.header.text,
      },
      headerTintColor: theme().mode.header.text,
      headerStyle: {
        backgroundColor: theme().mode.header.backgroundColor,
      },
    };
  };

  render() {
    return (
      <AuthConsumer>
        {({ uid }: AuthContextProps) => (
          <FetchConsumer>
            {({ post }: FetchContextProps) => (
              <Connected {...this.props} post={post} uid={uid} />
            )}
          </FetchConsumer>
        )}
      </AuthConsumer>
    );
  }
}

type ConnectedProps = Pick<AuthContextProps, 'uid'> &
  Pick<FetchContextProps, 'post'> & {
    navigation: NavigationScreenProp<NavigationRoute>;
  };

type State = {
  loading: boolean;
  linked: boolean;
};

class Connected extends Component<ConnectedProps, State> {
  state = {
    loading: false,
    linked: false,
  };

  onAmazonLogin = () => {
    Linking.addEventListener('url', event => this.redirect(event));
    const url = `https://peperomia.info/login/amazon?aaa=aa12&redirect_uri=${Constants.linkingUri}`;

    Linking.openURL(url);
  };

  redirect = async (event: any) => {
    Linking.removeEventListener('url', e => this.redirect(e));

    const result = (await queryString.parse(
      queryString.extract(event.url)
    )) as WebPageResponse;

    if (!this.props.post) {
      return;
    }

    try {
      const request = {
        accessToken: result.accessToken.split('?')[0],
      };

      const response = await this.props.post('LoginWithAmazon', {
        body: JSON.stringify(request),
      });

      if (!response.ok) {
        Alert.alert('連携の登録に失敗しました');
        this.setState({
          loading: false,
        });
        return;
      }
      const { height } = Dimensions.get('window');

      let toast = Toast.show('Alexa連携しました', {
        duration: Toast.durations.LONG,
        position: height - 150,
        shadow: true,
        animation: true,
        hideOnPress: true,
        delay: 0,
      });

      setTimeout(function() {
        Toast.hide(toast);
      }, 3000);

      this.setState({
        loading: false,
        linked: true,
      });
    } catch (err) {
      this.setState({
        loading: false,
      });

      setTimeout(() => {
        Alert.alert('連携の登録に失敗しました');
      }, 100);
    }
  };

  render() {
    return (
      <Page
        loading={this.state.loading}
        linked={this.state.linked}
        onAmazonLogin={this.onAmazonLogin}
      />
    );
  }
}
