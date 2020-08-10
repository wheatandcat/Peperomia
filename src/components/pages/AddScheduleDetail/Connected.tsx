import React, { memo, useState, useCallback, useEffect } from 'react';
import { Alert } from 'react-native';
import uuidv1 from 'uuid/v1';
import { getKind } from 'peperomia-util';
import { ActionSheetOptions } from '@expo/react-native-action-sheet';
import { ItemDetail, SelectItemDetail } from 'domain/itemDetail';
import { createItemDetail } from 'lib/itemDetail';
import { ContextProps as ItemContextProps } from 'containers/Items';
import { ContextProps as AuthContextProps } from 'containers/Auth';
import Page from 'components/templates/CreateScheduleDetail/Page';
import { Props as IndexProps } from './';

type State = ItemDetail & {
  iconSelected: boolean;
};

type Props = ItemDetail &
  Pick<ItemContextProps, 'itemDetails' | 'refreshData'> &
  Pick<AuthContextProps, 'uid'> & {
    kind: string;
    itemId: string;
    priority: number;
    navigation: IndexProps['navigation'];
    showActionSheetWithOptions: (
      options: ActionSheetOptions,
      callback: (i: number) => void
    ) => void;
  };

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
  });
  const { kind, itemId, priority } = props;

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
      onDismiss={onDismiss}
      onSave={onSave}
      onIcons={onIcons}
      showActionSheetWithOptions={props.showActionSheetWithOptions}
      iconSelected={state.iconSelected}
    />
  );
};

export default memo(AddScheduleDetailConnected);
