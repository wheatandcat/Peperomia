import React from 'react';
import { View, TouchableOpacity, Text } from 'react-native';
import EStyleSheet from 'react-native-extended-stylesheet';
import { Button, Divider } from 'react-native-elements';
import { Ionicons } from '@expo/vector-icons';
import { ItemDetail } from '../../../domain/itemDetail';
import theme from '../../../config/theme';
import Memo from './Memo';

export type Props = Pick<
  ItemDetail,
  'title' | 'place' | 'url' | 'memo' | 'moveMinutes'
> & {
  scrollView: any;
  onIcons: (title: string) => void;
  onChangeMemoInput: (name: string, value: string) => void;
  onOpenActionSheet: () => void;
};

export default (props: Props) => (
  <>
    <View style={styles.root}>
      <TouchableOpacity onPress={props.onOpenActionSheet}>
        <View style={styles.timeContainer}>
          <Ionicons
            name="md-time"
            color={theme().color.lightGreen}
            size={25}
            style={styles.time}
          />
          <Text style={styles.timeText}>{props.moveMinutes}分</Text>
        </View>
      </TouchableOpacity>
    </View>
    <Divider />
    <View style={styles.memoContainer}>
      <Memo
        place={props.place}
        url={props.url}
        memo={props.memo}
        scrollViewRef={props.scrollView}
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
