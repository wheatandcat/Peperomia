import * as Font from 'expo-font';
import React, { useState, FC, useEffect } from 'react';
import { Text, TextProps, StyleSheet } from 'react-native';
import useIsFirstRender from 'hooks/useIsFirstRender';

type State = {
  fontLoaded: boolean;
};

const AtomText: FC<TextProps> = (props) => {
  const [state, setState] = useState<State>({
    fontLoaded: false,
  });
  const isFirstRender = useIsFirstRender();

  useEffect(() => {
    if (!isFirstRender) return;

    const setup = async () => {
      await Font.loadAsync({
        Lato: require('../../../assets/fonts/Lato-Light.ttf'),
      });

      setState({ fontLoaded: true });
    };

    setup();
  }, [isFirstRender]);

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

const styles = StyleSheet.create({
  text: {
    fontFamily: 'Lato',
  },
});

export default AtomText;
