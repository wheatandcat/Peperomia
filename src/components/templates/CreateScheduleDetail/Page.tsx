import React, { useState, useCallback, memo, useRef } from 'react';
import {
  View,
  TextInput,
  TouchableOpacity,
  SafeAreaView,
  Alert,
  Keyboard,
  ScrollView,
} from 'react-native';
import EStyleSheet from 'react-native-extended-stylesheet';
import { ActionSheetOptions } from '@expo/react-native-action-sheet';
import Color from 'color';
import { MaterialIcons, MaterialCommunityIcons } from '@expo/vector-icons';
import { getKind, KINDS, KIND_DEFAULT } from 'peperomia-util';
import s from 'config/style';
import theme from 'config/theme';
import { SelectItemDetail } from 'domain/itemDetail';
import Header from 'components/molecules/Header';
import HeaderImage from 'components/molecules/ScheduleHeader/Header';
import TimeDialog from 'components/organisms/CreateScheduleDetail/TimeDialog';
import Body from 'components/organisms/CreateScheduleDetail/Body';
import Suggest from 'components/organisms/Suggest/List';
import {
  ConnectedType,
  State as ConnectedState,
} from 'components/pages/CreateScheduleDetail/Connected';
import useItemSuggest from 'hooks/useItemSuggest';
import useKeyboard from 'hooks/useKeyboard';
import useScroll from 'hooks/useScroll';
import GlobalStyles from '../../../GlobalStyles';

type Props = Pick<
  SelectItemDetail,
  'title' | 'kind' | 'place' | 'url' | 'memo' | 'moveMinutes'
> &
  Pick<ConnectedType, 'onSave' | 'onIcons' | 'onDismiss'> &
  Pick<ConnectedState, 'iconSelected'> & {
    showActionSheetWithOptions: (
      options: ActionSheetOptions,
      callback: (i: number) => void
    ) => void;
  };

type State = Pick<
  SelectItemDetail,
  'title' | 'kind' | 'memo' | 'place' | 'url' | 'moveMinutes'
> & {
  titleFocusCount: number;
  manualTime: boolean;
  manualTimeValue: number;
  keyboard: boolean;
  imageHeader: boolean;
};

type Item = {
  value: number | null;
  label: string;
};

const times: Item[] = [
  {
    value: 0,
    label: '0分',
  },
  {
    value: 10,
    label: ' 10分',
  },
  {
    value: 30,
    label: ' 30分',
  },
  {
    value: 60,
    label: ' 60分',
  },
  {
    value: null,
    label: '手動で更新',
  },
  {
    value: null,
    label: 'キャンセル',
  },
];

const cancelButtonIndex = times.length - 1;
const manualButtonIndex = times.length - 2;

const initialState = (props: Props): State => ({
  title: props.title,
  kind: props.kind,
  memo: props.memo,
  place: props.place,
  url: props.url,
  moveMinutes: props.moveMinutes,
  titleFocusCount: 0,
  manualTimeValue: 0,
  manualTime: false,
  keyboard: false,
  imageHeader: true,
});

const CreateScheduleDetail: React.FC<Props> = (props) => {
  const [state, setState] = useState<State>(initialState(props));
  const scrollViewRef = useRef<ScrollView>(null);
  const { showKeyboard } = useKeyboard();
  const { suggestList, setSuggestList } = useItemSuggest();
  const { scrollBelowTarget, onScroll } = useScroll(84);

  const onOpenActionSheet = () => {
    const options = times.map((val) => val.label);

    let destructiveButtonIndex = times.findIndex(
      (val) => state.moveMinutes === val.value
    );
    if (destructiveButtonIndex === null) {
      destructiveButtonIndex = manualButtonIndex;
    }

    props.showActionSheetWithOptions(
      {
        options,
        cancelButtonIndex,
        destructiveButtonIndex,
      },
      (buttonIndex) => {
        if (buttonIndex === cancelButtonIndex) {
          return;
        }

        if (buttonIndex === manualButtonIndex) {
          setState((s) => ({
            ...s,
            manualTime: true,
          }));
          return;
        }

        const value = times[buttonIndex].value || 0;

        setState((s) => ({
          ...s,
          moveMinutes: value,
        }));
      }
    );
  };

  const onDismiss = useCallback(() => {
    if (
      props.title !== state.title ||
      props.kind !== state.kind ||
      props.memo !== state.memo ||
      props.moveMinutes !== state.moveMinutes
    ) {
      Alert.alert(
        '保存されていない変更があります',
        '戻りますか？',
        [
          {
            text: 'キャンセル',
            style: 'cancel',
          },
          {
            text: '戻る',
            onPress: () => {
              props.onDismiss();
            },
          },
        ],
        { cancelable: false }
      );
    } else {
      props.onDismiss();
    }
  }, [props, state]);

  const onSave = useCallback(() => {
    if (state.title === '') {
      Alert.alert('タイトルが入力されていません');
    } else {
      const kind = props.iconSelected ? props.kind : state.kind;
      const { title, url, place, moveMinutes } = state;

      props.onSave(title, kind, place, url, state.memo, moveMinutes);
    }
  }, [props, state]);

  const onSetManualTime = useCallback(() => {
    setState((s) => ({
      ...s,
      moveMinutes: state.manualTimeValue,
      manualTime: false,
    }));
  }, [state.manualTimeValue]);

  const onCloseManualTime = useCallback(() => {
    setState((s) => ({
      ...s,
      manualTime: false,
    }));
  }, []);

  const onChangeMemoInput = useCallback((name: string, value: string) => {
    setState((s) => ({
      ...s,
      [name]: value,
    }));
  }, []);

  const onCloseKeyBoard = useCallback(() => {
    Keyboard.dismiss();
    setSuggestList('');
  }, [setSuggestList]);

  const onSuggest = useCallback(
    (_: string, name: string) => {
      Keyboard.dismiss();
      setState((s) => ({
        ...s,
        title: name,
        kind: getKind(name),
      }));
      setSuggestList('');
    },
    [setSuggestList]
  );

  const kind = state.kind || KIND_DEFAULT;
  const config = KINDS[kind];
  const ss = s.schedule;
  const bc = Color(config.backgroundColor)
    .lighten(ss.backgroundColorAlpha)
    .toString();

  return (
    <View
      style={[
        styles.headerContainer,
        {
          backgroundColor: state.imageHeader ? bc : theme().color.white,
        },
      ]}
    >
      <Header
        title={scrollBelowTarget ? '' : state.title}
        color={scrollBelowTarget ? 'none' : bc}
        right={
          showKeyboard ? (
            <TouchableOpacity
              onPress={onCloseKeyBoard}
              testID="KeyBoardCloseInCreateScheduleDetail"
            >
              <MaterialCommunityIcons
                name="keyboard-close"
                color={theme().color.main}
                size={25}
                style={styles.keyboardClose}
              />
            </TouchableOpacity>
          ) : (
            <TouchableOpacity onPress={onSave} testID="ScheduleDetailCreated">
              <MaterialIcons
                name="check"
                color={theme().color.main}
                size={25}
                style={styles.keyboardClose}
              />
            </TouchableOpacity>
          )
        }
        onClose={() => onDismiss()}
      />
      <ScrollView
        ref={scrollViewRef}
        contentInsetAdjustmentBehavior="never"
        onScroll={onScroll}
        scrollEventThrottle={1000}
      >
        <SafeAreaView
          style={[
            GlobalStyles.droidSafeArea,
            styles.headerContainer,
            { backgroundColor: bc },
          ]}
        />
        <SafeAreaView style={styles.body}>
          <TimeDialog
            open={state.manualTime}
            onChange={(value) =>
              setState((s) => ({
                ...s,
                manualTimeValue: value,
              }))
            }
            onSetManualTime={onSetManualTime}
            onCloseManualTime={onCloseManualTime}
          />
          <View style={styles.root}>
            <HeaderImage kind={props.iconSelected ? props.kind : state.kind}>
              <TextInput
                placeholder="タイトルを入力"
                placeholderTextColor={theme().color.gray}
                style={styles.inputTitle}
                onChangeText={(title) => {
                  setSuggestList(title);
                  setState((s) => ({
                    ...s,
                    title,
                    kind: getKind(title),
                  }));
                }}
                value={state.title}
                testID="ScheduleDetailTitleInput"
                returnKeyType="done"
                autoFocus
                selectionColor={theme().color.lightGreen}
              />
            </HeaderImage>
            {suggestList.length > 0 ? (
              <Suggest
                title={state.title}
                items={suggestList}
                onPress={onSuggest}
              />
            ) : (
              <Body
                title={state.title}
                place={state.place}
                url={state.url}
                memo={state.memo}
                moveMinutes={state.moveMinutes}
                scrollView={scrollViewRef}
                onIcons={props.onIcons}
                onChangeMemoInput={onChangeMemoInput}
                onOpenActionSheet={onOpenActionSheet}
              />
            )}
          </View>
        </SafeAreaView>
        <View style={styles.bottom} />
      </ScrollView>
    </View>
  );
};

const styles = EStyleSheet.create({
  root: {
    backgroundColor: '$background',
    height: '100%',
    width: '100%',
  },
  headerContainer: {
    flex: 0,
  },
  body: {
    flex: 1,
  },
  inputTitle: {
    fontSize: 20,
    fontWeight: '600',
    color: theme().color.gray,
    paddingLeft: 1,
  },
  bottom: {
    height: 500,
    backgroundColor: '$background',
  },

  keyboardClose: {
    paddingRight: 5,
  },
});

export default memo(CreateScheduleDetail);
