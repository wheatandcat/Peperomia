import React, { FC, useState, memo, useCallback, useContext } from 'react';
import { Alert } from 'react-native';
import { NavigationScreenProp, NavigationRoute } from 'react-navigation';
import uuidv1 from 'uuid/v1';
import { Item } from '../../../domain/item';
import { SelectItemDetail } from '../../../domain/itemDetail';
import { getItemByID } from '../../../lib/item';
import {
  sortItemDetail,
  getItemDetailByID,
  getItemDetails,
  deleteItemDetail,
} from '../../../lib/itemDetail';
import { ContextProps as ItemContextProps } from '../../../containers/Items';
import { Context as AuthContext } from '../../../containers/Auth';
import { useDidMount } from '../../../hooks/index';
import Page from './Page';

type State = {
  item: Item;
  itemDetail: SelectItemDetail;
};

type Props = Pick<ItemContextProps, 'refreshData'> & {
  navigation: NavigationScreenProp<NavigationRoute>;
  onEdit: (
    title: string,
    kind: string,
    place: string,
    url: string,
    memo: string,
    moveMinutes: number,
    priority: number
  ) => void;
};

const initState = {
  item: {
    id: 0,
    title: '',
    image: '',
    kind: '',
  },
  itemDetail: {
    id: 0,
    itemId: 0,
    kind: '',
    title: '',
    memo: '',
    place: '',
    url: '',
    moveMinutes: 0,
    priority: 0,
  },
};

const ScheduleDetailConnected: FC<Props> = memo(props => {
  const { uid } = useContext(AuthContext);
  const [state, setState] = useState<State>(initState);

  useDidMount(() => {
    const getData = async () => {
      const scheduleDetailId = props.navigation.getParam(
        'scheduleDetailId',
        '1'
      );

      const itemDetail = await getItemDetailByID(uid, String(scheduleDetailId));
      const item = await getItemByID(uid, String(itemDetail?.itemId));

      setState(s => ({
        ...s,
        item,
        itemDetail,
      }));
    };

    getData();
  });

  const onDismiss = useCallback(() => {
    props.navigation.goBack();
  }, [props.navigation]);

  const onCreateScheduleDetail = useCallback(() => {
    const { title, kind, place, url, moveMinutes, priority } = state.itemDetail;
    props.onEdit(
      title,
      kind,
      place,
      url,
      state.itemDetail.memo,
      moveMinutes,
      priority
    );
  }, [props, state.itemDetail]);

  const onDelete = useCallback(async () => {
    const ok = await deleteItemDetail(uid, {
      id: String(state.itemDetail.id),
    });

    if (!ok) {
      Alert.alert('保存に失敗しました');
      return;
    }

    const itemDetails = await getItemDetails(
      null,
      String(state.itemDetail.itemId)
    );

    if (itemDetails.length > 0) {
      await sortItemDetail(
        uid,
        itemDetails.map(itemDetail => ({
          ...itemDetail,
          id: String(itemDetail.id),
        }))
      );
    }

    if (props.refreshData) {
      props.refreshData();
      props.navigation.navigate('Schedule', {
        itemId: state.itemDetail.itemId,
        title: state.item.title,
        refresh: uuidv1(),
      });
    }
  }, [
    props,
    state.item.title,
    state.itemDetail.id,
    state.itemDetail.itemId,
    uid,
  ]);

  return (
    <Page
      {...state.itemDetail}
      loading={state.itemDetail.id === 0}
      onDismiss={onDismiss}
      onDelete={onDelete}
      onCreateScheduleDetail={onCreateScheduleDetail}
    />
  );
});

export default ScheduleDetailConnected;
