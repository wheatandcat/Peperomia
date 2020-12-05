import React from 'react';
import { SafeAreaView, StatusBar, View, StyleSheet } from 'react-native';
import { getKindData } from 'lib/kind';

type Props = {
  kind: string;
};

const ItemWrap: React.FC<Props> = (props) => {
  const config = getKindData(props.kind);

  return (
    <View>
      <StatusBar
        backgroundColor={config.backgroundColor}
        barStyle="dark-content"
      />
      <SafeAreaView
        style={[styles.contents, { backgroundColor: config.backgroundColor }]}
      >
        {props.children}
      </SafeAreaView>
    </View>
  );
};

export default ItemWrap;

const styles = StyleSheet.create({
  contents: {
    height: '100%',
  },
});
