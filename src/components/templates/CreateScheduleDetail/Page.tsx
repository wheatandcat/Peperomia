import React, { useState, useCallback, memo } from 'react';
import { View, TextInput, StyleSheet, Alert, Keyboard } from 'react-native';
import EStyleSheet from 'react-native-extended-stylesheet';
import { ActionSheetOptions } from '@expo/react-native-action-sheet';
import { getKind, KIND_DEFAULT } from 'peperomia-util';
import theme from 'config/theme';
import { SelectItemDetail } from 'domain/itemDetail';
import HeaderImage from 'components/molecules/ScheduleHeader/Header';
import Body from 'components/organisms/CreateScheduleDetail/Body';
import Suggest from 'components/organisms/Suggest/List';
import {
  ConnectedType,
  State as ConnectedState,
} from 'components/pages/CreateScheduleDetail/Connected';
import useItemSuggest from 'hooks/useItemSuggest';
import ItemDetailWrap from 'components/organisms/ItemWrap/ItemDetailWrap';

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
  const { suggestList, setSuggestList } = useItemSuggest();

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

  const onChangeMemoInput = useCallback((name: string, value: string) => {
    setState((s) => ({
      ...s,
      [name]: value,
    }));
  }, []);

  const onCloseKeyBoard = useCallback(() => {
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

  return (
    <ItemDetailWrap
      title={state.title}
      kind={kind}
      onCloseKeyBoard={onCloseKeyBoard}
      onCheck={onSave}
      onDismiss={onDismiss}
    >
      <View style={styles.body}>
        <View style={estyles.root}>
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
              onIcons={props.onIcons}
              onChangeMemoInput={onChangeMemoInput}
            />
          )}
        </View>
      </View>
      <View style={estyles.footer} />
    </ItemDetailWrap>
  );
};

const estyles = EStyleSheet.create({
  root: {
    backgroundColor: '$background',
    height: '100%',
    width: '100%',
  },
  footer: {
    width: '100%',
    height: '150%',
    backgroundColor: '$background',
  },
});

const styles = StyleSheet.create({
  body: {
    flex: 1,
    width: '100%',
    height: '100%',
  },
  inputTitle: {
    fontSize: 20,
    fontWeight: '600',
    color: theme().color.gray,
    paddingLeft: 1,
  },
});

export default memo(CreateScheduleDetail);
