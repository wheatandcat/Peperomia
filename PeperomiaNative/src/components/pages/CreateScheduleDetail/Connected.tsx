import * as SQLite from 'expo-sqlite';
import React, {
  useContext,
  useState,
  memo,
  useEffect,
  useCallback,
} from 'react';
import { NavigationScreenProp, NavigationRoute } from 'react-navigation';
import uuidv1 from 'uuid/v1';
import { db, ResultError } from '../../../lib/db';
import {
  insert as insertItemDetail,
  countByItemId,
  ItemDetail,
} from '../../../lib/db/itemDetail';
import { SuggestItem } from '../../../lib/suggest';
import getKind from '../../../lib/getKind';
import {
  Context as ItemsContext,
  ContextProps as ItemContextProps,
} from '../../../containers/Items';
import { ItemDetail as ItemDetailParam } from '../../../domain/itemDetail';
import { useDidMount } from '../../../hooks/index';
import Page from '../../templates/CreateScheduleDetail/Page';

type State = ItemDetailParam & {
  iconSelected: boolean;
  priority: number;
  suggestList: SuggestItem[];
};

type Props = ItemDetailParam & {
  navigation: NavigationScreenProp<NavigationRoute>;
};

type PlanProps = Props & Pick<ItemContextProps, 'itemDetails' | 'refreshData'>;

export default (props: Props) => {
  const { refreshData, itemDetails } = useContext(ItemsContext);

  return (
    <Plan {...props} refreshData={refreshData} itemDetails={itemDetails} />
  );
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

  const getCount = useCallback((count: number, error: ResultError) => {
    if (error) {
      return;
    }

    setState(s => ({
      ...s,
      priority: count + 1,
    }));
  }, []);

  useDidMount(() => {
    const suggestList = (props.itemDetails || []).map(itemDetail => ({
      title: itemDetail.title,
      kind: itemDetail.kind,
    }));

    setState(s => ({
      ...s,
      suggestList,
    }));

    const itemId = props.navigation.getParam('itemId', '1');

    db.transaction((tx: SQLite.Transaction) => {
      countByItemId(tx, itemId, getCount);
    });
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

  const save = useCallback(
    (_: number, error: ResultError) => {
      if (error) {
        return;
      }

      const itemId = props.navigation.getParam('itemId', '1');

      props.navigation.navigate('CreateSchedule', {
        itemId,
        refresh: uuidv1(),
      });

      if (props.refreshData) {
        props.refreshData();
      }
    },
    [props]
  );

  const onSave = useCallback(
    (
      title: string,
      kind: string,
      place: string,
      url: string,
      m: string,
      moveMinutes: number
    ) => {
      const itemId = props.navigation.getParam('itemId', '1');

      db.transaction((tx: SQLite.Transaction) => {
        const itemDetail: ItemDetail = {
          itemId,
          title,
          kind,
          place,
          url,
          memo: m,
          moveMinutes,
          priority: state.priority,
        };

        insertItemDetail(tx, itemDetail, save);
      });
    },
    [props.navigation, save, state.priority]
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
