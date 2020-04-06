import React, { Component } from 'react';
import { Linking, Alert, Dimensions } from 'react-native';
import Constants from 'expo-constants';
import Toast from 'react-native-root-toast';
import dayjs from 'dayjs';
import advancedFormat from 'dayjs/plugin/advancedFormat';
import 'dayjs/locale/ja';
import queryString from 'query-string';
import { RouteProp } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from 'lib/navigation';
import { useFetch, ContextProps as FetchContextProps } from 'containers/Fetch';
import { useAuth, ContextProps as AuthContextProps } from 'containers/Auth';
import Page from './Page';

dayjs.extend(advancedFormat);

type ScreenNavigationProp = StackNavigationProp<
  RootStackParamList,
  'LoginWithAmazon'
>;
type ScreenRouteProp = RouteProp<RootStackParamList, 'LoginWithAmazon'>;

type Props = {
  navigation: ScreenNavigationProp;
  route: ScreenRouteProp;
};

type WebPageResponse = {
  accessToken: string;
};

const Root = (props: Props) => {
  const { uid } = useAuth();
  const { post } = useFetch();

  return <Connected {...props} post={post} uid={uid} />;
};

export default Root;

type ConnectedProps = Props &
  Pick<AuthContextProps, 'uid'> &
  Pick<FetchContextProps, 'post'>;

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

      const response = await this.props.post('LoginWithAmazon', request);

      if (response.error) {
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
