import React, { useState, useCallback, memo } from 'react';
import { View, TextInput, StyleSheet, Alert, Keyboard } from 'react-native';
import EStyleSheet from 'react-native-extended-stylesheet';
import { getKind, KIND_DEFAULT } from 'peperomia-util';
import theme from 'config/theme';
import HeaderImage from 'components/molecules/ScheduleHeader/Header';
import Body from 'components/organisms/CreateScheduleDetail/Body';
import Suggest from 'components/organisms/Suggest/List';
import useItemSuggest from 'hooks/useItemSuggest';
import ItemDetailWrap from 'components/organisms/ItemWrap/ItemDetailWrap';
import { NewItem, ItemDetailQuery } from 'queries/api/index';

type ItemDetail = ItemDetailQuery['itemDetail'];

type Props = {
  loading: boolean;
  date: string;
  itemDetail: ItemDetail | null;
  onSave: (item: NewItem) => void;
  onDismiss: () => void;
  onIcons: (kind: string) => void;
};

type State = NewItem;

const initialState = (itemDetail: Props['itemDetail']): State => {
  if (!itemDetail) {
    return {
      title: '',
      kind: '',
      memo: '',
      place: '',
      url: '',
    };
  }

  return {
    title: itemDetail.title,
    kind: itemDetail.kind,
    memo: itemDetail.memo,
    place: itemDetail.place,
    url: itemDetail.url,
  };
};

const CreateCalendar: React.FC<Props> = (props) => {
  const [state, setState] = useState<State>(initialState(props.itemDetail));
  const { suggestList, setSuggestList } = useItemSuggest();

  const onDismiss = useCallback(() => {
    props.onDismiss();
  }, [props]);

  const onSave = useCallback(() => {
    if (state.title === '') {
      Alert.alert('タイトルが入力されていません');
    } else {
      props.onSave(state);
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
      date={props.date}
      title={state.title}
      kind={kind}
      onCloseKeyBoard={onCloseKeyBoard}
      rightIcon="check"
      onRightPress={onSave}
      onDismiss={onDismiss}
      loading={props.loading}
    >
      <View style={styles.body}>
        <View style={estyles.root}>
          <HeaderImage kind={state.kind}>
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
              onIcons={() => props.onIcons(state.kind)}
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
    paddingLeft: theme().space(1),
  },
});

export default memo(CreateCalendar);
