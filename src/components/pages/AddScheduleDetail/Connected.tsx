import React, { memo, useState, useCallback, useEffect } from 'react';
import { Alert } from 'react-native';
import uuidv1 from 'uuid/v1';
import { getKind } from 'peperomia-util';
import { SuggestItem } from 'lib/suggest';
import { ItemDetail, SelectItemDetail } from 'domain/itemDetail';
import { createItemDetail } from 'lib/itemDetail';
import { useDidMount } from 'hooks/index';
import { ContextProps as ItemContextProps } from 'containers/Items';
import { ContextProps as AuthContextProps } from 'containers/Auth';
import Page from 'components/templates/CreateScheduleDetail/Page';
import { Props as IndexProps } from './';

type State = ItemDetail & {
  iconSelected: boolean;
  suggestList: SuggestItem[];
};

type Props = IndexProps &
  Pick<ItemContextProps, 'itemDetails' | 'refreshData'> &
  Pick<AuthContextProps, 'uid'>;

const AddScheduleDetailConnected: React.FC<Props> = (props) => {
  const [state, setState] = useState<State>({
    title: props.title || '',
    place: props.place || '',
    url: props.url || '',
    memo: props.memo || '',
    moveMinutes: props.moveMinutes || 0,
    kind: props.kind,
    priority: props.priority,
    iconSelected: false,
    suggestList: [],
  });
  const kind = props.route?.params?.kind || '';
  const itemId = props.route?.params?.itemId || '1';
  const priority = props.route?.params?.priority || 1;

  useDidMount(() => {
    const suggestList = (props.itemDetails || []).map((itemDetail) => ({
      title: itemDetail.title,
      kind: itemDetail.kind,
    }));

    setState((s) => ({
      ...s,
      suggestList,
    }));
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

  const save = useCallback(() => {
    props.navigation.navigate('Schedule', {
      itemId,
      refresh: uuidv1(),
    });

    if (props.refreshData) {
      props.refreshData();
    }
  }, [props, itemId]);

  const onSave = useCallback(
    async (
      title: string,
      selectedKind: string,
      place: string,
      url: string,
      m: string,
      moveMinutes: number
    ) => {
      const itemDetail: SelectItemDetail = {
        itemId,
        title,
        place,
        url,
        memo: m,
        kind: selectedKind,
        moveMinutes,
        priority: Number(priority),
      };

      const insertID = await createItemDetail(props.uid, itemDetail);
      if (!insertID) {
        Alert.alert('保存に失敗しました');
        return;
      }

      save();
    },
    [priority, itemId, save, props.uid]
  );

  const onIcons = useCallback(
    (title: string) => {
      props.navigation.navigate('Icons', {
        kind: getKind(title),
        onSelectIcon: (selectedKind: string) => {
          props.navigation.navigate('AddScheduleDetail', {
            kind: selectedKind,
          });
        },
        onDismiss: () => {
          props.navigation.navigate('AddScheduleDetail', {});
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
};

export default memo(AddScheduleDetailConnected);
