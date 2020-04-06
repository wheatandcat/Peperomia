import React, { Component } from 'react';
import { RouteProp } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from 'lib/navigation';
import { useTheme, ContextProps as ThemeContextProps } from 'containers/Theme';
import Page from './Page';

type ScreenNavigationProp = StackNavigationProp<
  RootStackParamList,
  'ScreenSetting'
>;
type ScreenRouteProp = RouteProp<RootStackParamList, 'ScreenSetting'>;

type Props = {
  navigation: ScreenNavigationProp;
  route: ScreenRouteProp;
};

type State = {
  darkMode: boolean;
};

const Root = (props: Props) => {
  const { onModeChange, mode } = useTheme();

  return <Connected {...props} mode={mode} onModeChange={onModeChange} />;
};

type ConnectedProps = Props & Pick<ThemeContextProps, 'mode' | 'onModeChange'>;

class Connected extends Component<ConnectedProps, State> {
  state = {
    darkMode: this.props.mode === 'dark' ? true : false,
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
    return <Page darkMode={this.state.darkMode} onChange={this.onChange} />;
  }
}

export default Root;
