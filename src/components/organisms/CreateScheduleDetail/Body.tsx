import React from 'react';
import { View, StyleSheet } from 'react-native';
import EStyleSheet from 'react-native-extended-stylesheet';
import { Button } from 'react-native-elements';
import { SelectItemDetail } from 'domain/itemDetail';
import theme from 'config/theme';
import Memo from './Memo';

type Props = Pick<SelectItemDetail, 'title' | 'place' | 'url' | 'memo'> & {
  onIcons: (title: string) => void;
  onChangeMemoInput: (name: string, value: string) => void;
};

const Body: React.FC<Props> = (props) => (
  <>
    <View style={styles.memoContainer}>
      <Memo
        place={props.place}
        url={props.url}
        memo={props.memo}
        onChangeInputText={props.onChangeMemoInput}
      />
    </View>
    <View style={styles.buttonContainer}>
      <Button
        title="アイコンを変更する"
        type="clear"
        titleStyle={estyles.linkTitle}
        buttonStyle={styles.linkButton}
        onPress={() => props.onIcons(props.title)}
      />
    </View>
  </>
);

export default Body;

const estyles = EStyleSheet.create({
  linkTitle: {
    color: '$text',
    fontSize: 12,
    fontWeight: '600',
    padding: 0,
  },
});

const styles = StyleSheet.create({
  root: {
    paddingHorizontal: 15,
    paddingTop: 15,
    paddingBottom: 5,
  },
  time: {
    paddingTop: 3,
  },
  timeContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    width: 80,
    height: 30,
  },
  linkButton: {
    borderBottomWidth: 1,
    borderBottomColor: theme().color.base.light,
    padding: 0,
  },

  memoContainer: {
    paddingTop: 10,
    paddingLeft: 10,
  },

  buttonContainer: {
    paddingLeft: 12,
    paddingTop: 40,
    width: 120,
  },
});
