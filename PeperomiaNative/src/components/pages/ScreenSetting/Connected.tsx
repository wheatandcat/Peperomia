import React, { Component } from 'react';
import { NavigationScreenProp, NavigationRoute } from 'react-navigation';
import {
  Consumer as ThemeConsumer,
  ContextProps as ThemeContextProps,
} from '../../../containers/Theme';
import theme from '../../../config/theme';
import Page from './Page';

type Props = {
  navigation: NavigationScreenProp<NavigationRoute>;
};

type State = {
  loading: boolean;
  darkMode: boolean;
};

export default class extends Component<Props> {
  static navigationOptions = () => {
    return {
      title: '画面設定',
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
      <ThemeConsumer>
        {({ onModeChange, mode }: ThemeContextProps) => (
          <Connected {...this.props} mode={mode} onModeChange={onModeChange} />
        )}
      </ThemeConsumer>
    );
  }
}

type ConnectedProps = Props & Pick<ThemeContextProps, 'mode' | 'onModeChange'>;

class Connected extends Component<ConnectedProps, State> {
  state = {
    darkMode: this.props.mode === 'dark' ? true : false,
    loading: false,
  };

  onChange = (darkMode: boolean) => {
    if (this.props.onModeChange) {
      this.props.onModeChange(darkMode ? 'dark' : 'light');

      this.setState({
        darkMode,
      });
    }
  };

  render() {
    return (
      <Page
        darkMode={this.state.darkMode}
        loading={this.state.loading}
        onChange={this.onChange}
      />
    );
  }
}
