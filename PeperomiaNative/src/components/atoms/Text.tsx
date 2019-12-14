import * as Font from 'expo-font';
import React, { Component } from 'react';
import { Text } from 'react-native';
import EStyleSheet from 'react-native-extended-stylesheet';

export default class extends Component<any> {
  state = {
    fontLoaded: false,
  };
  async componentDidMount() {
    await Font.loadAsync({
      Lato: require('../../../assets/fonts/Lato-Light.ttf'),
    });

    this.setState({ fontLoaded: true });
  }

  render() {
    if (!this.state.fontLoaded) {
      return null;
    }

    const { children, style, ...props } = this.props;

    return (
      <Text style={[styles.text, { ...style }]} {...props}>
        {children}
      </Text>
    );
  }
}

const styles = EStyleSheet.create({
  text: {
    fontFamily: 'Lato',
  },
});
