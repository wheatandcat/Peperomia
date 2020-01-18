import React, {
  useContext,
  useState,
  memo,
  useEffect,
  useCallback,
} from 'react';
import { Alert } from 'react-native';
import { NavigationScreenProp, NavigationRoute } from 'react-navigation';
import uuidv1 from 'uuid/v1';
import { SuggestItem } from '../../../lib/suggest';
import getKind from '../../../lib/getKind';
import {
  Context as ItemsContext,
  ContextProps as ItemContextProps,
} from '../../../containers/Items';
import { ItemDetail } from '../../../domain/itemDetail';
import { createItemDetail, countItemDetail } from '../../../lib/itemDetail';
import { useDidMount } from '../../../hooks/index';
import Page from '../../templates/CreateScheduleDetail/Page';

export type State = ItemDetail & {
  iconSelected: boolean;
  priority: number;
  suggestList: SuggestItem[];
};

type Props = ItemDetail & {
  navigation: NavigationScreenProp<NavigationRoute>;
};

type PlanProps = Props & Pick<ItemContextProps, 'itemDetails' | 'refreshData'>;

export default (props: Props) => {
  const { refreshData, itemDetails } = useContext(ItemsContext);

  return (
    <Plan {...props} refreshData={refreshData} itemDetails={itemDetails} />
  );
};

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

const Plan = memo((props: PlanProps) => {
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

  useDidMount(() => {
    const suggestList = (props.itemDetails || []).map(itemDetail => ({
      title: itemDetail.title,
      kind: itemDetail.kind,
    }));

    setState(s => ({
      ...s,
      suggestList,
    }));

    const setCount = async () => {
      const itemId = props.navigation.getParam('itemId', '1');
      const count = await countItemDetail(null, itemId);

      setState(s => ({
        ...s,
        priority: count + 1,
      }));
    };

    setCount();
  });

  useEffect(() => {
    const kind = props.navigation.getParam('kind', '');

    if (!kind) {
      return;
    }

    if (state.kind !== kind) {
      setState(s => ({
        ...s,
        kind,
        iconSelected: true,
      }));
    }
  }, [props.navigation, state.kind]);

  const onDismiss = useCallback(() => {
    props.navigation.goBack();
  }, [props.navigation]);

  const onSave = useCallback(
    async (
      title: string,
      kind: string,
      place: string,
      url: string,
      m: string,
      moveMinutes: number
    ) => {
      const itemId = props.navigation.getParam('itemId', '1');

      const itemDetail = {
        itemId,
        title,
        kind,
        place,
        url,
        memo: m,
        moveMinutes,
        priority: state.priority,
      };

      const insertID = await createItemDetail(null, itemDetail);
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
    [props, state.priority]
  );

  const onIcons = useCallback(
    (title: string) => {
      props.navigation.navigate('Icons', {
        kind: getKind(title),
        onSelectIcon: (kind: string) => {
          props.navigation.navigate('CreateScheduleDetail', {
            kind: kind,
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
