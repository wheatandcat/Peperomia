import * as Font from 'expo-font';
import React, { useState, FC } from 'react';
import { Text, TextProps } from 'react-native';
import EStyleSheet from 'react-native-extended-stylesheet';
import { useDidMount } from '../../hooks/index';

type State = {
  fontLoaded: boolean;
};

const AtomText: FC<TextProps> = props => {
  const [state, setState] = useState<State>({
    fontLoaded: false,
  });

  useDidMount(() => {
    const setup = async () => {
      await Font.loadAsync({
        Lato: require('../../../assets/fonts/Lato-Light.ttf'),
      });

      setState({ fontLoaded: true });
    };

    setup();
  });

  if (!state.fontLoaded) {
    return null;
  }

  const { children, style, ...props2 } = props;

  return (
    <Text style={[styles.text, style]} {...props2}>
      {children}
    </Text>
  );
};

const styles = EStyleSheet.create({
  text: {
    fontFamily: 'Lato',
  },
});

export default AtomText;
