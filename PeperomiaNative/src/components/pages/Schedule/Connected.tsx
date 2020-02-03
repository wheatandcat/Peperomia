import React, {
  useState,
  memo,
  useCallback,
  useEffect,
  useContext,
} from 'react';
import { Alert } from 'react-native';
import {
  NavigationScreenProp,
  NavigationRoute,
  NavigationContext,
} from 'react-navigation';
import { useNavigation } from 'react-navigation-hooks';
import { Context as AuthContext } from '../../../containers/Auth';
import { SelectItemDetail } from '../../../domain/itemDetail';
import { getItemDetails, updateItemDetail } from '../../../lib/itemDetail';
import { useDidMount } from '../../../hooks/index';
import { SwitchType } from './Switch';
import Page from './Page';

type Props = Pick<SwitchType, 'onAdd' | 'onSort' | 'onDelete'> & {
  navigation: NavigationScreenProp<NavigationRoute>;
};

type State = {
  itemDetails: SelectItemDetail[];
  refresh: string;
  loading: boolean;
};

export type ConnectedType = {
  onScheduleDetail: (id: string) => void;
};

export default memo((props: Props) => {
  const [state, setState] = useState<State>({
    itemDetails: [],
    refresh: '',
    loading: true,
  });
  const navigation = useContext(NavigationContext);
  const { uid } = useContext(AuthContext);
  const { navigate } = useNavigation();

  const setitemDetails = useCallback(
    (data: SelectItemDetail[]) => {
      const prioritys = data.map(item => item.priority);
      const uniquePrioritys = prioritys.filter(
        (x: number, i: number, self: number[]) => self.indexOf(x) === i
      );

      // priorityが重複していない
      if (prioritys.length === uniquePrioritys.length) {
        navigation.setParams({
          itemDetails: data,
        });
        setState(s => ({
          ...s,
          itemDetails: data,
        }));
      }

      // priorityが重複している場合はid順でpriorityをupdateする
      const itemDetails: SelectItemDetail[] = data.map((item, index) => ({
        ...item,
        priority: index + 1,
      }));

      itemDetails.forEach(async (itemDetail, index) => {
        const v = {
          ...itemDetail,
          id: itemDetail.id || '',
          priority: index + 1,
        };

        const ok = await updateItemDetail(uid, v);
        if (!ok) {
          Alert.alert('保存に失敗しました');
          return;
        }
      });

      props.navigation.setParams({
        itemDetails,
      });

      setState(s => ({
        ...s,
        itemDetails: itemDetails,
        loading: false,
      }));
    },
    [navigation, props.navigation, uid]
  );

  const getData = useCallback(
    async (itemId: string) => {
      const itemDetails = await getItemDetails(uid, String(itemId));

      setitemDetails(itemDetails);
    },
    [setitemDetails, uid]
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
      loading={state.loading}
      data={state.itemDetails}
      onScheduleDetail={onScheduleDetail}
      onAdd={() => props.onAdd(state.itemDetails)}
      onSort={() => props.onSort(state.itemDetails)}
      onDelete={props.onDelete}
    />
  );
});
