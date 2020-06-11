import React, { FC, memo } from 'react';
import { SafeAreaView, Alert, StatusBar, TouchableOpacity } from 'react-native';
import EStyleSheet from 'react-native-extended-stylesheet';
import {
  useActionSheet,
  ActionSheetOptions,
} from '@expo/react-native-action-sheet';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import Color from 'color';
import { SelectItemDetail } from 'domain/itemDetail';
import { KINDS } from 'lib/getKind';
import s from 'config/style';
import theme from 'config/theme';
import Card from 'components/molecules/ScheduleDetail/Card';
import Header from 'components/molecules/Header';
import Loading from 'components/molecules/ScheduleDetail/Loading';
import GlobalStyles from '../../../GlobalStyles';

type ConnectedProps = SelectItemDetail & {
  loading: boolean;
  onDismiss: () => void;
  onDelete: () => void;
  onCreateScheduleDetail: () => void;
};

type Props = ConnectedProps & {
  showActionSheetWithOptions: (
    options: ActionSheetOptions,
    callback: (i: number) => void
  ) => void;
};

export type ScheduleDetailType = {
  onOpenActionSheet: () => void;
};

const Connected: FC<ConnectedProps> = (props) => {
  const { showActionSheetWithOptions } = useActionSheet();

  return (
    <ScheduleDetailPage
      {...props}
      showActionSheetWithOptions={showActionSheetWithOptions}
    />
  );
};

export const ScheduleDetailPage: FC<Props> = memo((props) => {
  const onOpenActionSheet = () => {
    props.showActionSheetWithOptions(
      {
        options: ['編集', '削除', 'キャンセル'],
        destructiveButtonIndex: 1,
        cancelButtonIndex: 2,
      },
      (buttonIndex) => {
        if (buttonIndex === 0) {
          props.onCreateScheduleDetail();
        }
        if (buttonIndex === 1) {
          Alert.alert(
            '削除しますか？',
            '',
            [
              {
                text: 'キャンセル',
                style: 'cancel',
              },
              {
                text: '削除する',
                onPress: () => {
                  props.onDelete();
                },
              },
            ],
            { cancelable: false }
          );
        }
      }
    );
  };

  if (props.loading) {
    return <Loading />;
  }

  const kind = props.kind;
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
            onPress={onOpenActionSheet}
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
        onClose={props.onDismiss}
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
        <Card {...props} onOpenActionSheet={onOpenActionSheet} />
      </SafeAreaView>
    </>
  );
});

export default Connected;

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
