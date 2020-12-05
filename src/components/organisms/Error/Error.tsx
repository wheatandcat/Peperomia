import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { ApolloError } from '@apollo/client';

type Props = {
  error?: ApolloError;
};

const Error: React.FC<Props> = () => {
  return (
    <View>
      <Text style={styles.text}>エラーが発生しました</Text>
    </View>
  );
};

export default Error;

const styles = StyleSheet.create({
  text: {
    textAlign: 'center',
  },
});
