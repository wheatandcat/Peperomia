import React, { useState, memo, useEffect, useCallback } from 'react';
import { Alert } from 'react-native';
import uuidv1 from 'uuid/v1';
import { SuggestItem } from 'lib/suggest';
import getKind from 'lib/getKind';
import { ContextProps as ItemContextProps } from 'containers/Items';
import { ContextProps as AuthContextProps } from 'containers/Auth';
import { ItemDetail } from 'domain/itemDetail';
import { createItemDetail, countItemDetail } from 'lib/itemDetail';
import { useDidMount } from 'hooks/index';
import Page from 'components/templates/CreateScheduleDetail/Page';
import { Props } from './';

export type State = ItemDetail & {
  iconSelected: boolean;
  priority: number;
  suggestList: SuggestItem[];
};

type ConnectedProps = Props &
  Pick<ItemContextProps, 'itemDetails' | 'refreshData'> &
  Pick<AuthContextProps, 'uid'>;

export type ConnectedType = {
  onSave: (
    title: string,
    kind: string,
    place: string,
    url: string,
    memo: string,
    moveMinutes: number
  ) => void;
  onIcons: (title: string) => void;
  onDismiss: () => void;
};

const Connected: React.FC<ConnectedProps> = memo((props) => {
  const [state, setState] = useState<State>({
    title: props.title || '',
    kind: props.kind || '',
    place: props.place || '',
    url: props.url || '',
    memo: props.memo || '',
    moveMinutes: props.moveMinutes || 0,
    iconSelected: false,
    priority: 1,
    suggestList: [],
  });
  const kind = props.route?.params?.kind || '';
  const itemId = String(props.route?.params?.itemId) || '1';

  useDidMount(() => {
    const suggestList = (props.itemDetails || []).map((itemDetail) => ({
      title: itemDetail.title,
      kind: itemDetail.kind,
    }));

    setState((s) => ({
      ...s,
      suggestList,
    }));

    const setCount = async () => {
      const count = await countItemDetail(props.uid, itemId);

      setState((s) => ({
        ...s,
        priority: count + 1,
      }));
    };

    setCount();
  });

  useEffect(() => {
    if (!kind) {
      return;
    }

    if (state.kind !== kind) {
      setState((s) => ({
        ...s,
        kind,
        iconSelected: true,
      }));
    }
  }, [kind, state.kind]);

  const onDismiss = useCallback(() => {
    props.navigation.goBack();
  }, [props.navigation]);

  const onSave = useCallback(
    async (
      title: string,
      selectedKind: string,
      place: string,
      url: string,
      m: string,
      moveMinutes: number
    ) => {
      const itemDetail = {
        itemId,
        title,
        kind: selectedKind,
        place,
        url,
        memo: m,
        moveMinutes,
        priority: state.priority,
      };

      const insertID = await createItemDetail(props.uid, itemDetail);
      if (!insertID) {
        Alert.alert('保存に失敗しました');
        return;
      }

      props.navigation.navigate('CreateSchedule', {
        itemId,
        refresh: uuidv1(),
      });

      if (props.refreshData) {
        props.refreshData();
      }
    },
    [props, state.priority, itemId]
  );

  const onIcons = useCallback(
    (title: string) => {
      props.navigation.navigate('Icons', {
        kind: getKind(title),
        onSelectIcon: (selectedKind: string) => {
          props.navigation.navigate('CreateScheduleDetail', {
            kind: selectedKind,
          });
        },
        onDismiss: () => {
          props.navigation.navigate('CreateScheduleDetail', {});
        },
        photo: false,
      });
    },
    [props.navigation]
  );

  return (
    <Page
      title={state.title}
      kind={state.kind}
      place={state.place}
      url={state.url}
      memo={state.memo}
      moveMinutes={state.moveMinutes}
      suggestList={state.suggestList}
      iconSelected={state.iconSelected}
      onDismiss={onDismiss}
      onSave={onSave}
      onIcons={onIcons}
    />
  );
});

export default Connected;
