import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Button } from 'react-native-elements';
import theme from '../../../config/theme';

type Props = {
  onOpenActionSheet: () => void;
};

export default (props: Props) => {
  return (
    <>
      <View style={styles.root}>
        <View style={styles.buttonContainer}>
          <Button
            title="アイコンを変更する"
            type="clear"
            containerStyle={styles.clear}
            titleStyle={styles.clearTitle}
            buttonStyle={styles.linkButton}
            onPress={props.onOpenActionSheet}
          />
        </View>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  createButton: {
    width: 330,
    height: 60,
    backgroundColor: theme().color.lightGreen,
    borderRadius: 15,
  },
  linkButton: {
    borderBottomWidth: 1,
    borderBottomColor: theme().color.darkGray,
    padding: 0,
    paddingHorizontal: 5,
  },
  root: {
    backgroundColor: theme().color.white,
    height: '100%',
  },
  buttonContainer: {
    paddingTop: 60,
    paddingLeft: 25,
  },
  clear: {
    width: 128,
  },
  clearTitle: {
    color: theme().color.darkGray,
    fontSize: 14,
    fontWeight: '600',
  },
});
