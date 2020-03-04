import React, { FC, memo } from 'react';
import { SafeAreaView, Alert, StatusBar, TouchableOpacity } from 'react-native';
import EStyleSheet from 'react-native-extended-stylesheet';
import { useActionSheet } from '@expo/react-native-action-sheet';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import Color from 'color';
import GlobalStyles from '../../../GlobalStyles';
import { SelectItemDetail } from '../../../domain/itemDetail';
import { KINDS, KIND_DEFAULT } from '../../../lib/getKind';
import s from '../../../config/style';
import theme from '../../../config/theme';
import Card from '../../molecules/ScheduleDetail/Card';
import Header from '../../molecules/Header';
import Loading from '../../molecules/ScheduleDetail/Loading';

type Props = SelectItemDetail & {
  loading: boolean;
  onDismiss: () => void;
  onDelete: () => void;
  onCreateScheduleDetail: () => void;
};

const ScheduleDetailPage: FC<Props> = memo(props => {
  const { showActionSheetWithOptions } = useActionSheet();

  const onOpenActionSheet = () => {
    showActionSheetWithOptions(
      {
        options: ['編集', '削除', 'キャンセル'],
        destructiveButtonIndex: 1,
        cancelButtonIndex: 2,
      },
      buttonIndex => {
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

  const kind = props.kind || KIND_DEFAULT;
  const config = KINDS[kind];
  const ss = s.schedule;
  const bc = Color(config.backgroundColor)
    .lighten(ss.backgroundColorAlpha)
    .toString();

  if (props.loading) {
    return <Loading />;
  }

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

export default ScheduleDetailPage;

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
