import React from 'react';
import { View } from 'react-native';
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
        titleStyle={styles.linkTitle}
        buttonStyle={styles.linkButton}
        onPress={() => props.onIcons(props.title)}
      />
    </View>
  </>
);

export default Body;

const styles = EStyleSheet.create({
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
  timeText: {
    fontSize: 18,
    color: '$text',
    paddingHorizontal: 15,
  },

  linkTitle: {
    color: '$text',
    fontSize: 12,
    fontWeight: '600',
    padding: 0,
  },
  linkButton: {
    borderBottomWidth: 1,
    borderBottomColor: theme().color.gray,
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
