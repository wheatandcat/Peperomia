import React, { useState, memo, useEffect, useCallback } from 'react';
import { Alert } from 'react-native';
import { RouteProp } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from 'lib/navigation';
import { Item } from 'domain/item';
import { SelectItemDetail } from 'domain/itemDetail';
import { useDidMount } from 'hooks/index';
import { getItemByID } from 'lib/item';
import { getItemDetails, updateItemDetail } from 'lib/itemDetail';
import { useAuth } from 'containers/Auth';
import Page from 'components/templates/CreateSchedule/Page';

type ScreenNavigationProp = StackNavigationProp<
  RootStackParamList,
  'CreateSchedule'
>;
type ScreenRouteProp = RouteProp<RootStackParamList, 'CreateSchedule'>;

type Props = {
  navigation: ScreenNavigationProp;
  route: ScreenRouteProp;
};

type State = {
  item: Item;
  itemDetails: SelectItemDetail[];
  refresh: string;
};

const Connected: React.FC<Props> = (props) => {
  const { uid } = useAuth();
  const itemId = String(props.route?.params?.itemId) || '1';
  const refresh = props.route?.params?.refresh || '';

  const [state, setState] = useState<State>({
    item: { title: '', kind: '' },
    itemDetails: [],
    refresh: '0',
  });

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
        }));

        return;
      }

      // priorityが重複している場合はid順でpriorityをupdateする
      const itemDetails: SelectItemDetail[] = data.map((itemDetail, index) => ({
        ...itemDetail,
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

      setState((s) => ({
        ...s,
        itemDetails: itemDetails,
      }));
    },
    [props.navigation, uid]
  );

  const setItem = useCallback((data: Item) => {
    setState((s) => ({
      ...s,
      item: {
        title: data.title,
        kind: data.kind,
      },
    }));
  }, []);

  useDidMount(() => {
    const setItemByItemID = async () => {
      const item = await getItemByID(uid, String(itemId));
      setItem(item);
    };

    const setItemDetailsByItemID = async () => {
      const itemDetails = await getItemDetails(uid, String(itemId));
      setItemDetails(itemDetails);
    };

    setItemByItemID();
    setItemDetailsByItemID();
  });

  useEffect(() => {
    const setItemDetailsByItemID = async () => {
      const itemDetails = await getItemDetails(uid, itemId);
      setItemDetails(itemDetails);
    };

    if (refresh !== state.refresh) {
      setItemDetailsByItemID().then(() => {
        setState((s) => ({ ...s, refresh }));
      });
    }
  }, [setItemDetails, state.refresh, refresh, uid, itemId]);

  const onCreateScheduleDetail = useCallback(() => {
    props.navigation.navigate('CreateScheduleDetail', {
      itemId,
    });
  }, [props.navigation, itemId]);

  const onScheduleDetail = useCallback(
    (id: string) => {
      props.navigation.navigate('ScheduleDetail', {
        itemDetailId: id,
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
};

export default memo(Connected);
