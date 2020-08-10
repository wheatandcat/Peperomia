import React, { useState, memo, useEffect, useCallback } from 'react';
import { useRoute, useNavigation } from '@react-navigation/native';
import { Alert } from 'react-native';
import { updateItemDetail } from 'lib/itemDetail';
import { getKind } from 'peperomia-util';
import { ActionSheetOptions } from '@expo/react-native-action-sheet';
import { ItemDetail } from 'domain/itemDetail';
import { ContextProps as ItemContextProps } from 'containers/Items';
import { ContextProps as AuthContextProps } from 'containers/Auth';
import Page from 'components/templates/CreateScheduleDetail/Page';
import { ScreenRouteProp } from 'components/pages/ScheduleDetail';

type State = ItemDetail & {
  iconSelected: boolean;
};

type Props = ItemDetail & {
  id: number | string;
  onShow: (reload: boolean) => void;
  showActionSheetWithOptions: (
    options: ActionSheetOptions,
    callback: (i: number) => void
  ) => void;
} & Pick<ItemContextProps, 'itemDetails' | 'refreshData'> &
  Pick<AuthContextProps, 'uid'>;

const Connected: React.FC<Props> = (props) => {
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

  const route = useRoute<ScreenRouteProp>();
  const { navigate } = useNavigation();

  useEffect(() => {
    const kind = route.params.kind;

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
  }, [route, state]);

  const onDismiss = useCallback(() => {
    props.onShow(false);
  }, [props]);

  const save = useCallback(async () => {
    const refreshData = route.params.refreshData;
    if (!refreshData) {
      return;
    }
    await refreshData();

    if (props.refreshData) {
      props.refreshData();
      props.onShow(true);
    }
  }, [props, route]);

  const onSave = useCallback(
    async (
      title: string,
      kind: string,
      place: string,
      url: string,
      memoText: string,
      moveMinutes: number
    ) => {
      const itemDetail = {
        id: props.id,
        title,
        place,
        url,
        memo: memoText,
        kind,
        moveMinutes,
        priority: props.priority,
        itemId: 0,
      };

      const ok = await updateItemDetail(props.uid, itemDetail);
      if (!ok) {
        Alert.alert('保存に失敗しました');
        return;
      }

      save();
    },
    [props.id, props.priority, save, props.uid]
  );

  const onIcons = useCallback(
    (title: string) => {
      navigate('Icons', {
        kind: getKind(title),
        defaultIcon: false,
        onSelectIcon: (kind: string) => {
          navigate('ScheduleDetail', {
            kind: kind,
          });
        },
        onDismiss: () => {
          navigate('ScheduleDetail');
        },
        photo: false,
      });
    },
    [navigate]
  );

  return (
    <Page
      title={state.title}
      kind={state.kind}
      place={state.place}
      url={state.url}
      memo={state.memo}
      moveMinutes={state.moveMinutes}
      showActionSheetWithOptions={props.showActionSheetWithOptions}
      iconSelected={state.iconSelected}
      onDismiss={onDismiss}
      onSave={onSave}
      onIcons={onIcons}
    />
  );
};

export default memo(Connected);
