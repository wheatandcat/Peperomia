import React, { useCallback, memo } from 'react';
import {
  View,
  Alert,
  TextInput,
  Keyboard,
  TouchableOpacity,
} from 'react-native';
import EStyleSheet from 'react-native-extended-stylesheet';
import { Divider } from 'react-native-elements';
import { ActionSheetOptions } from '@expo/react-native-action-sheet';
import { MaterialIcons, MaterialCommunityIcons } from '@expo/vector-icons';
import Color from 'color';
import { getKind, KINDS } from 'peperomia-util';
import { whenIPhoneSE } from 'lib/responsive';
import theme from 'config/theme';
import s from 'config/style';
import { Item as ItemParam } from 'domain/item';
import Suggest from 'components/organisms/Suggest/List';
import IconImage from 'components/organisms/CreatePlan/IconImage';
import Header from 'components/molecules/Header';
import DatePickerButton from 'components/atoms/DatePicker';
import useItemSuggest from 'hooks/useItemSuggest';
import useKeyboard from 'hooks/useKeyboard';

type Props = ItemParam & {
  mode: string;
  date: string;
  onInput: (name: string, value: any) => void;
  onSave: () => void;
  onIcons: () => void;
  onHome: () => void;
  showActionSheetWithOptions: (
    options: ActionSheetOptions,
    callback: (i: number) => void
  ) => void;
};

const Page: React.FC<Props> = (props) => {
  const { showKeyboard } = useKeyboard();
  const { suggestList, setSuggestList } = useItemSuggest();
  const kind = props.kind || getKind(props.title);
  const config = KINDS[kind];
  const ss = s.schedule;
  const bc = Color(config.backgroundColor)
    .lighten(ss.backgroundColorAlpha)
    .toString();

  const imageSize = whenIPhoneSE(120, 180);

  const onCloseKeyBoard = useCallback(() => {
    Keyboard.dismiss();
    setSuggestList('');
  }, [setSuggestList]);

  const onSave = useCallback(() => {
    if (props.title === '') {
      Alert.alert('タイトルが入力されていません');
    } else {
      props.onSave();
    }
  }, [props]);

  const onSuggest = useCallback(
    (_: string, name: string) => {
      Keyboard.dismiss();
      props.onInput('title', name);
      setSuggestList('');
    },
    [setSuggestList, props]
  );

  const onOpenActionSheet = useCallback(() => {
    Keyboard.dismiss();

    props.showActionSheetWithOptions(
      {
        options: ['アイコンを変更する', 'キャンセル'],
        cancelButtonIndex: 1,
      },
      (buttonIndex) => {
        if (buttonIndex === 0) {
          props.onIcons();
        }
      }
    );
  }, [props]);

  return (
    <>
      <Header
        title=""
        color={bc}
        position="relative"
        right={
          showKeyboard ? (
            <TouchableOpacity
              onPress={onCloseKeyBoard}
              testID="KeyBoardCloseInCreateSchedule"
            >
              <MaterialCommunityIcons
                name="keyboard-close"
                color={theme().color.main}
                size={25}
                style={styles.headerRightIcon}
              />
            </TouchableOpacity>
          ) : (
            <TouchableOpacity onPress={onSave} testID="ScheduleCreated">
              <MaterialIcons
                name="check"
                color={theme().color.main}
                size={25}
                style={styles.headerRightIcon}
              />
            </TouchableOpacity>
          )
        }
        onClose={props.onHome}
      />

      <View style={styles.body}>
        <View
          style={[
            styles.textInputContainer,
            {
              backgroundColor: Color(config.backgroundColor)
                .lighten(ss.backgroundColorAlpha)
                .toString(),
            },
          ]}
        >
          <TextInput
            placeholder={props.title === '' ? 'タイトル' : ''}
            placeholderTextColor={theme().color.gray}
            style={styles.titleInput}
            onChangeText={(text) => {
              setSuggestList(text);
              props.onInput('title', text);
            }}
            testID="ScheduleTitleInput"
            defaultValue={props.title}
            returnKeyType="done"
            autoFocus
            selectionColor={theme().color.lightGreen}
          />
          <Divider style={styles.divider} />
          {suggestList.length > 0 ? (
            <Suggest
              title={props.title}
              items={suggestList}
              onPress={onSuggest}
            />
          ) : (
            <IconImage
              imageSrc={config.src}
              imageSize={imageSize}
              backgroundColor={theme().mode.background}
              onSave={onSave}
              onOpenActionSheet={onOpenActionSheet}
            />
          )}
        </View>

        {(() => {
          if (suggestList.length > 0) {
            return null;
          }
          return (
            <DatePickerButton
              date={props.date}
              onInput={(v) => props.onInput('date', v)}
            />
          );
        })()}
      </View>
    </>
  );
};

export default memo(Page);

const styles = EStyleSheet.create({
  titleInput: {
    width: '100%',
    color: theme().color.darkGray,
    fontSize: 22,
    fontWeight: '600',
    paddingLeft: 15,
  },
  body: {
    backgroundColor: '$background',
    height: '100%',
  },
  dateButtonContainer: {
    padding: 30,
  },
  dateButton: {
    backgroundColor: theme().color.lightGreen,
    borderRadius: 15,
    padding: 15,
  },
  dateButtonText: {
    fontSize: 20,
    fontWeight: '600',
  },
  datePicker: {
    width: 0,
    height: 0,
    //  TDOD: androidで謎の線が残るので↓で対処,
    position: 'absolute',
    top: -9999,
  },
  datePickerContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
    paddingHorizontal: 30,
    paddingTop: 35,
  },
  headerRightIcon: {
    paddingRight: 5,
  },
  textInputContainer: {
    paddingTop: whenIPhoneSE(20, 30),
    width: '100%',
  },
  divider: {
    marginTop: 20,
    height: 1,
  },
  datePickerInput: {
    width: '100%',
  },
});
