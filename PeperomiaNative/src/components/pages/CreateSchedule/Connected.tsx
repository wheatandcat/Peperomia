import React, { useState, memo, useEffect, useCallback } from 'react';
import { NavigationScreenProp, NavigationRoute } from 'react-navigation';
import { Alert } from 'react-native';
import { Item } from '../../../lib/db/item';
import { ItemDetail } from '../../../lib/db/itemDetail';
import { useDidMount } from '../../../hooks/index';
import { getItemByID } from '../../../lib/item';
import { getItemDetails, updateItemDetail } from '../../../lib/itemDetail';
import Page from '../../templates/CreateSchedule/Page';

type Props = {
  navigation: NavigationScreenProp<NavigationRoute>;
};

type State = {
  item: Item;
  itemDetails: ItemDetail[];
  refresh: string;
};

export default memo((props: Props) => {
  const [state, setState] = useState<State>({
    item: { title: '', kind: '' },
    itemDetails: [],
    refresh: '0',
  });

  const setItemDetails = useCallback(
    (data: ItemDetail[]) => {
      const prioritys = data.map(item => item.priority);
      const uniquePrioritys = prioritys.filter(
        (x: number, i: number, self: number[]) => self.indexOf(x) === i
      );

      // priorityが重複していない
      if (prioritys.length === uniquePrioritys.length) {
        props.navigation.setParams({
          itemDetails: data,
        });
        setState(s => ({
          ...s,
          itemDetails: data,
        }));
      }

      // priorityが重複している場合はid順でpriorityをupdateする
      const itemDetails: ItemDetail[] = data.map(
        (itemDetail: ItemDetail, index: number) => ({
          ...itemDetail,
          priority: index + 1,
        })
      );

      itemDetails.forEach(async (itemDetail, index) => {
        const v = {
          ...itemDetail,
          id: itemDetail.id || '',
          priority: index + 1,
        };

        const ok = await updateItemDetail(null, v);
        if (!ok) {
          Alert.alert('保存に失敗しました');
          return;
        }
      });

      setState(s => ({
        ...s,
        itemDetails: itemDetails,
      }));
    },
    [props.navigation]
  );

  const setItem = useCallback((data: Item) => {
    setState(s => ({
      ...s,
      item: {
        title: data.title,
        kind: data.kind,
      },
    }));
  }, []);

  useDidMount(() => {
    const itemId = props.navigation.getParam('itemId', '1');

    const setItemByItemID = async () => {
      const item = await getItemByID<Item>(null, itemId);
      setItem(item);
    };

    const setItemDetailsByItemID = async () => {
      const itemDetails = await getItemDetails<ItemDetail[]>(null, itemId);
      setItemDetails(itemDetails);
    };

    setItemByItemID();
    setItemDetailsByItemID();
  });

  useEffect(() => {
    const refresh = props.navigation.getParam('refresh', '0');

    const setItemDetailsByItemID = async (itemId: string) => {
      const itemDetails = await getItemDetails<ItemDetail[]>(null, itemId);
      setItemDetails(itemDetails);
    };

    if (refresh !== state.refresh) {
      const itemId = props.navigation.getParam('itemId', '1');
      setItemDetailsByItemID(itemId).then(() => {
        setState(s => ({ ...s, refresh }));
      });
    }
  }, [props.navigation, setItemDetails, state.refresh]);

  const onCreateScheduleDetail = useCallback(() => {
    const itemId = props.navigation.getParam('itemId', '1');

    props.navigation.navigate('CreateScheduleDetail', {
      itemId,
    });
  }, [props.navigation]);

  const onScheduleDetail = useCallback(
    (id: string) => {
      props.navigation.navigate('ScheduleDetail', {
        scheduleDetailId: id,
        priority: state.itemDetails.length + 1,
      });
    },
    [props.navigation, state.itemDetails.length]
  );

  const onFinish = useCallback(() => {
    if (state.itemDetails.length === 0) {
      Alert.alert(
        'まだ予定の設定がありません',
        '本当に完了しますか？',
        [
          {
            text: 'キャンセル',
            style: 'cancel',
          },
          {
            text: '完了する',
            onPress: () => {
              props.navigation.navigate('Home', { refresh: true });
            },
          },
        ],
        { cancelable: false }
      );
    } else {
      props.navigation.navigate('Home', { refresh: true });
    }
  }, [props.navigation, state.itemDetails.length]);

  const onGoBack = useCallback(() => {
    if (state.itemDetails.length === 0) {
      Alert.alert(
        'まだ予定の設定がありません',
        '本当に閉じますか？',
        [
          {
            text: 'キャンセル',
            style: 'cancel',
          },
          {
            text: '閉じる',
            onPress: () => {
              props.navigation.navigate('Home', { refresh: true });
            },
          },
        ],
        { cancelable: false }
      );
    } else {
      props.navigation.navigate('Home', { refresh: true });
    }
  }, [props.navigation, state.itemDetails.length]);

  return (
    <Page
      title={state.item.title}
      kind={state.item.kind}
      data={state.itemDetails}
      onScheduleDetail={onScheduleDetail}
      onCreateScheduleDetail={onCreateScheduleDetail}
      onFinish={onFinish}
      onGoBack={onGoBack}
    />
  );
});
