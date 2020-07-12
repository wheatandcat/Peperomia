import React, { useState, memo, useCallback, useEffect } from 'react';
import { useNavigation } from '@react-navigation/native';
import { Alert } from 'react-native';
import { useAuth } from 'containers/Auth';
import { SelectItemDetail } from 'domain/itemDetail';
import { getItemDetails, updateItemDetail } from 'lib/itemDetail';
import { useDidMount } from 'hooks/index';
import { SwitchType, SwitchProps } from './Switch';
import Page from './Page';

type Props = Pick<SwitchType, 'onAdd' | 'onSort' | 'onDelete'> &
  SwitchProps & {
    itemDetails: SelectItemDetail[];
  };

type State = {
  itemDetails: SelectItemDetail[];
  refresh: string;
  loading: boolean;
};

export type ConnectedType = {
  onScheduleDetail: (id: string) => void;
};

const Connected: React.FC<Props> = (props) => {
  const [state, setState] = useState<State>({
    itemDetails: [],
    refresh: '',
    loading: true,
  });
  const itemId = props.route.params.itemId || '1';
  const refresh = props.route.params.refresh || '';
  const { uid } = useAuth();
  const { navigate } = useNavigation();

  const setItemDetails = useCallback(
    (data: SelectItemDetail[]) => {
      const priorities = data.map((item) => item.priority);
      const uniquePriorities = priorities.filter(
        (x: number, i: number, self: number[]) => self.indexOf(x) === i
      );

      // priorityが重複していない
      if (priorities.length === uniquePriorities.length) {
        props.navigation.setParams({
          itemDetails: data,
        });

        setState((s) => ({
          ...s,
          itemDetails: data,
          loading: false,
        }));

        return;
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

      setState((s) => ({
        ...s,
        itemDetails: itemDetails,
        loading: false,
      }));
    },
    [props.navigation, uid]
  );

  const getData = useCallback(
    async (tmpItemId: string) => {
      const itemDetails = await getItemDetails(uid, String(tmpItemId));

      setItemDetails(itemDetails);
    },
    [setItemDetails, uid]
  );

  useDidMount(() => {
    if (props.itemDetails.length > 0) {
      setItemDetails(props.itemDetails);
    } else {
      getData(String(itemId));
    }
  });

  useEffect(() => {
    if (state.refresh === refresh) {
      return;
    }

    setState((s) => ({
      ...s,
      refresh,
    }));

    getData(String(itemId));
  }, [getData, props.navigation, state, itemId, refresh]);

  const onScheduleDetail = useCallback(
    (id: string) => {
      navigate('ScheduleDetail', {
        scheduleDetailId: id,
        refreshData: () => getData(String(itemId)),
      });
    },
    [getData, navigate, itemId]
  );

  return (
    <Page
      loading={state.loading}
      data={state.itemDetails}
      onScheduleDetail={onScheduleDetail}
      onAdd={() => props.onAdd(state.itemDetails)}
      onSort={props.onSort}
      onDelete={props.onDelete}
    />
  );
};

export default memo(Connected);
