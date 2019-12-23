import * as SQLite from 'expo-sqlite';
import React, {
  useState,
  memo,
  useCallback,
  useEffect,
  useContext,
} from 'react';
import {
  NavigationScreenProp,
  NavigationRoute,
  NavigationContext,
} from 'react-navigation';
import { useNavigation } from 'react-navigation-hooks';
import { db, ResultError } from '../../../lib/db';
import {
  selectByItemId,
  ItemDetail,
  update as updateItemDetail,
} from '../../../lib/db/itemDetail';
import { useDidMount } from '../../../hooks/index';
import Page from './Page';

type Props = {
  navigation: NavigationScreenProp<NavigationRoute>;
  onAdd: (items: ItemDetail[]) => void;
  onSort: (items: ItemDetail[]) => void;
  onDelete: () => void;
};

type State = {
  items: ItemDetail[];
  refresh: string;
};

export default memo((props: Props) => {
  const [state, setState] = useState<State>({ items: [], refresh: '' });
  const navigation = useContext(NavigationContext);
  const { navigate } = useNavigation();

  const save = useCallback(() => {}, []);

  const setItems = useCallback(
    (data: ItemDetail[], error: ResultError) => {
      if (error) {
        return;
      }

      const prioritys = data.map(item => item.priority);
      const uniquePrioritys = prioritys.filter(
        (x: number, i: number, self: number[]) => self.indexOf(x) === i
      );

      // priorityが重複していない
      if (prioritys.length === uniquePrioritys.length) {
        navigation.setParams({
          items: data,
        });
        setState(s => ({
          ...s,
          items: data,
        }));
      }

      // priorityが重複している場合はid順でpriorityをupdateする
      const items: ItemDetail[] = data.map(
        (item: ItemDetail, index: number) => ({
          ...item,
          priority: index + 1,
        })
      );

      db.transaction((tx: SQLite.Transaction) => {
        items.forEach(async (item, index) => {
          item.priority = index + 1;
          await updateItemDetail(tx, item, save);
        });
      });

      setState(s => ({
        ...s,
        items: items,
      }));
    },
    [navigation, save]
  );

  const getData = useCallback(
    (itemId: string) => {
      db.transaction((tx: SQLite.Transaction) => {
        selectByItemId(tx, itemId, setItems);
      });
    },
    [setItems]
  );

  useDidMount(() => {
    const itemId = props.navigation.getParam('itemId', '1');
    getData(String(itemId));
  });

  useEffect(() => {
    const refresh = props.navigation.getParam('refresh', '');
    const itemId = props.navigation.getParam('itemId', '1');

    if (state.refresh === refresh) {
      return;
    }

    setState(s => ({
      ...s,
      refresh,
    }));

    getData(String(itemId));
  }, [getData, props.navigation, state]);

  const onScheduleDetail = useCallback(
    (id: string) => {
      const itemId = props.navigation.getParam('itemId', '1');

      navigate('ScheduleDetail', {
        scheduleDetailId: id,
        refreshData: () => getData(String(itemId)),
      });
    },
    [getData, navigate, props.navigation]
  );

  return (
    <Page
      data={state.items}
      onScheduleDetail={onScheduleDetail}
      onAdd={() => props.onAdd(state.items)}
      onSort={() => props.onSort(state.items)}
      onDelete={props.onDelete}
    />
  );
});
