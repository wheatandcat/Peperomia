import React, { useState, memo, useEffect, useCallback } from 'react';
import { Alert } from 'react-native';
import { RouteProp } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import uuidv1 from 'uuid/v1';
import { RootStackParamList } from 'lib/navigation';
import { SuggestItem } from 'lib/suggest';
import getKind from 'lib/getKind';
import { useItems, ContextProps as ItemContextProps } from 'containers/Items';
import { useAuth } from 'containers/Auth';
import { ItemDetail } from 'domain/itemDetail';
import { createItemDetail, countItemDetail } from 'lib/itemDetail';
import { useDidMount } from 'hooks/index';
import Page from 'components/templates/CreateScheduleDetail/Page';

type ScreenNavigationProp = StackNavigationProp<
  RootStackParamList,
  'CreateScheduleDetail'
>;
type ScreenRouteProp = RouteProp<RootStackParamList, 'CreateScheduleDetail'>;

export type State = ItemDetail & {
  iconSelected: boolean;
  priority: number;
  suggestList: SuggestItem[];
};

type Props = ItemDetail & {
  navigation: ScreenNavigationProp;
  route: ScreenRouteProp;
};

type PlanProps = Props & Pick<ItemContextProps, 'itemDetails' | 'refreshData'>;

const Root: React.FC<Props> = (props) => {
  const { refreshData, itemDetails } = useItems();

  return (
    <Plan {...props} refreshData={refreshData} itemDetails={itemDetails} />
  );
};

export default Root;

export type PlanType = {
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

const Plan: React.FC<PlanProps> = memo((props) => {
  const { uid } = useAuth();
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
      const count = await countItemDetail(uid, itemId);

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

      const insertID = await createItemDetail(uid, itemDetail);
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
    [props, state.priority, uid, itemId]
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
          props.navigation.navigate('CreateScheduleDetail');
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
