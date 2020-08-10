import React, { useState, memo, useEffect, useCallback } from 'react';
import { Alert } from 'react-native';
import { Item } from 'domain/item';
import { SelectItemDetail } from 'domain/itemDetail';
import { useDidMount } from 'hooks/index';
import { getItemByID } from 'lib/item';
import { getItemDetails, updateItemDetail } from 'lib/itemDetail';
import { ContextProps as AuthContextProps } from 'containers/Auth';
import { Props as IndexProps } from './';
import Page from 'components/templates/CreateSchedule/Page';

type Props = Pick<AuthContextProps, 'uid'> & {
  refresh: string;
  itemId: string;
  navigation: IndexProps['navigation'];
};

type State = {
  item: Item;
  itemDetails: SelectItemDetail[];
  refresh: string;
};

const Connected: React.FC<Props> = (props) => {
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

        const ok = await updateItemDetail(props.uid, v);
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
    [props.navigation, props.uid]
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
      const item = await getItemByID(props.uid, props.itemId);
      setItem(item);
    };

    const setItemDetailsByItemID = async () => {
      const itemDetails = await getItemDetails(props.uid, props.itemId);
      setItemDetails(itemDetails);
    };

    setItemByItemID();
    setItemDetailsByItemID();
  });

  useEffect(() => {
    const setItemDetailsByItemID = async () => {
      const itemDetails = await getItemDetails(props.uid, props.itemId);
      setItemDetails(itemDetails);
    };

    if (props.refresh !== state.refresh) {
      setItemDetailsByItemID().then(() => {
        setState((s) => ({ ...s, refresh: props.refresh }));
      });
    }
  }, [setItemDetails, state.refresh, props.refresh, props.uid, props.itemId]);

  const onCreateScheduleDetail = useCallback(() => {
    props.navigation.navigate('CreateScheduleDetail', {
      itemId: props.itemId,
    });
  }, [props.navigation, props.itemId]);

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
