import React, { Component } from 'react';
import { RouteProp } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from 'lib/navigation';
import { Alert } from 'react-native';
import theme, { darkMode } from 'config/theme';
import FocusAwareStatusBar from 'components/organisms/FocusAwareStatusBar';
import Page from './Page';

type ScreenNavigationProp = StackNavigationProp<RootStackParamList, 'Feedback'>;
type ScreenRouteProp = RouteProp<RootStackParamList, 'Feedback'>;

type Props = {
  navigation: ScreenNavigationProp;
  route: ScreenRouteProp;
};

type State = {
  isOpen: boolean;
  loading: boolean;
};

export default class extends Component<Props, State> {
  state = {
    isOpen: false,
    loading: false,
  };

  onFeedback = async (message: string) => {
    this.setState({
      loading: true,
    });

    const response = await fetch(
      encodeURI(
        `https://us-central1-single-kayak-229714.cloudfunctions.net/SendFeedback?message=${message}`
      )
    );

    if (!response.ok) {
      Alert.alert('アクセスに失敗しました', '');
      this.setState({
        loading: false,
      });
      return;
    }

    this.setState({ isOpen: true, loading: false });
  };

  onClose = () => {
    this.setState({ isOpen: false });
    this.props.navigation.goBack();
  };

  render() {
    return (
      <>
        <FocusAwareStatusBar
          backgroundColor={
            darkMode() ? theme().color.base.dark : theme().color.primary.main
          }
          barStyle={darkMode() ? 'light-content' : 'dark-content'}
        />
        <Page
          isOpen={this.state.isOpen}
          loading={this.state.loading}
          onFeedback={this.onFeedback}
          onClose={this.onClose}
        />
      </>
    );
  }
}
