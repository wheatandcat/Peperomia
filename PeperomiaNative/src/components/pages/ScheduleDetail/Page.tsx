import React, { Component } from 'react';
import { SafeAreaView, Alert, StatusBar, TouchableOpacity } from 'react-native';
import EStyleSheet from 'react-native-extended-stylesheet';
import {
  ActionSheetProps,
  connectActionSheet,
} from '@expo/react-native-action-sheet';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import Color from 'color';
import GlobalStyles from '../../../GlobalStyles';
import { ItemDetail } from '../../../lib/db/itemDetail';
import { KINDS, KIND_DEFAULT } from '../../../lib/getKind';
import s from '../../../config/style';
import theme from '../../../config/theme';
import Card from '../../molecules/ScheduleDetail/Card';
import Header from '../../molecules/Header';

type PropsBase = ItemDetail & {
  onDismiss: () => void;
  onDelete: () => void;
  onCreateScheduleDetail: () => void;
};

type Props = PropsBase & ActionSheetProps;

class Page extends Component<Props> {
  onOpenActionSheet = () => {
    this.props.showActionSheetWithOptions(
      {
        options: ['編集', '削除', 'キャンセル'],
        destructiveButtonIndex: 1,
        cancelButtonIndex: 2,
      },
      buttonIndex => {
        if (buttonIndex === 0) {
          this.props.onCreateScheduleDetail();
        }
        if (buttonIndex === 1) {
          Alert.alert(
            '削除しますか？',
            '',
            [
              {
                text: 'キャンセル',
                onPress: () => {},
                style: 'cancel',
              },
              {
                text: '削除する',
                onPress: () => {
                  this.props.onDelete();
                },
              },
            ],
            { cancelable: false }
          );
        }
      }
    );
  };

  render() {
    const kind = this.props.kind || KIND_DEFAULT;
    const config = KINDS[kind];
    const ss = s.schedule;
    const bc = Color(config.backgroundColor)
      .lighten(ss.backgroundColorAlpha)
      .toString();

    return (
      <>
        <Header
          title=""
          color={'none'}
          right={
            <TouchableOpacity
              onPress={this.onOpenActionSheet}
              testID="ScheduleDetailMenu"
            >
              <MaterialCommunityIcons
                name="dots-horizontal"
                size={30}
                color={theme().color.main}
                style={styles.icon}
              />
            </TouchableOpacity>
          }
          onClose={this.props.onDismiss}
        />

        <StatusBar
          backgroundColor={theme().color.white}
          barStyle="dark-content"
        />
        <SafeAreaView
          style={[
            GlobalStyles.droidSafeArea,
            styles.header,
            { backgroundColor: bc },
          ]}
        />
        <SafeAreaView style={styles.contents}>
          <Card {...this.props} onOpenActionSheet={this.onOpenActionSheet} />
        </SafeAreaView>
      </>
    );
  }
}

export default connectActionSheet<PropsBase>(Page);

const styles = EStyleSheet.create({
  contents: {
    flex: 1,
    backgroundColor: '$background',
  },
  icon: {
    marginRight: 0,
    marginLeft: 'auto',
  },
  header: {
    flex: 0,
  },
});
