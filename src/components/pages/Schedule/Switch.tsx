import React, { useState, memo, useCallback, useMemo } from 'react';
import { RouteProp } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { Alert } from 'react-native';
import { ActionSheetOptions } from '@expo/react-native-action-sheet';
import uuidv1 from 'uuid/v1';
import { Item, SelectItem } from 'domain/item';
import { SelectItemDetail } from 'domain/itemDetail';
import { updateItemDetail, getItemDetails } from 'lib/itemDetail';
import { RootStackParamList } from 'lib/navigation';
import { deleteItem, getItemByID } from 'lib/item';
import { crateShareLink, closeShareLink, copyShareURL } from 'lib/share';
import { ContextProps as ItemsContextProps } from 'containers/Items';
import { ContextProps as AuthContextProps } from 'containers/Auth';
import { ContextProps as FetchContextProps } from 'containers/Fetch';
import { useDidMount } from 'hooks/index';
import SortableSchedule from 'components/pages/SortableSchedule/Connected';
import Schedule from './Connected';

type State = Pick<Item, 'title'> & {
  item: SelectItem;
  itemId: number;
  itemDetails: SelectItemDetail[];
  mode: string;
};

type ScreenNavigationProp = StackNavigationProp<RootStackParamList, 'Schedule'>;
export type ScreenRouteProp = RouteProp<RootStackParamList, 'Schedule'>;

export type SwitchProps = {
  navigation: ScreenNavigationProp;
  route: ScreenRouteProp;
};

type Props = SwitchProps &
  Pick<AuthContextProps, 'uid'> &
  Pick<FetchContextProps, 'post'> &
  Pick<ItemsContextProps, 'refreshData'> & {
    showActionSheetWithOptions: (
      options: ActionSheetOptions,
      callback: (i: number) => void
    ) => void;
  };

export type SwitchType = {
  onShow: () => void;
  onAdd: (items: SelectItemDetail[]) => void;
  onCloseShareLink: (doc: string) => void;
  onSort: () => void;
  onDelete: () => void;
  onChangeItems: (data: SelectItemDetail[]) => void;
};

const initState = {
  item: {
    id: 0,
    title: '',
    kind: '',
    image: '',
  },
  itemId: 0,
  title: '',
  itemDetails: [],
  mode: 'show',
};

// TODO: 再描画せずにnavigationOptionsに並び替えの情報を渡せなかったのでグローバル変数で管理する
var saveItems: SelectItemDetail[] = [];

const Switch: React.FC<Props> = (props) => {
  const [state, setState] = useState<State>(initState);
  const itemId = props.route.params.itemId || '1';

  const onEditPlan = useCallback(
    (item: SelectItem) => {
      props.navigation.navigate('EditPlan', {
        ...item,
      });
    },
    [props.navigation]
  );

  const onShare = useCallback(
    (share: boolean) => {
      if (props.uid) {
        if (share) {
          props.showActionSheetWithOptions(
            {
              options: [
                'リンクを取得する',
                'リンクを非公開にする',
                'キャンセル',
              ],
              destructiveButtonIndex: 1,
              cancelButtonIndex: 3,
            },
            async (buttonIndex) => {
              if (buttonIndex === 0) {
                copyShareURL(String(itemId));
              } else if (buttonIndex === 1) {
                if (props.post) {
                  const ok = await closeShareLink(String(itemId), props.post);
                  if (!ok) {
                    Alert.alert('更新に失敗しました');
                  }
                }
              }
            }
          );
        } else {
          props.showActionSheetWithOptions(
            {
              options: ['リンクを取得する', 'キャンセル'],
              cancelButtonIndex: 1,
            },
            (buttonIndex) => {
              if (buttonIndex === 0) {
                Alert.alert(
                  'この予定がWebで公開されます',
                  'あとで非公開に変更することも可能です',
                  [
                    {
                      text: 'キャンセル',
                      style: 'cancel',
                    },
                    {
                      text: '公開する',
                      onPress: async () => {
                        if (props.post) {
                          const ok = await crateShareLink(
                            String(itemId),
                            props.post
                          );
                          if (!ok) {
                            Alert.alert('更新に失敗しました');
                          }
                        }
                      },
                    },
                  ],
                  { cancelable: false }
                );
              }
            }
          );
        }
      } else {
        Alert.alert(
          '共有機能はユーザー登録が必要です',
          'ユーザー登録しますか？',
          [
            {
              text: 'キャンセル',
              style: 'cancel',
            },
            {
              text: 'ユーザー登録',
              onPress: () => {
                props.navigation.navigate('SignIn', {
                  onLogin: () => {
                    props.navigation.pop();
                  },
                });
              },
            },
          ],
          { cancelable: false }
        );
      }
    },
    [itemId, props]
  );

  const onSort = useCallback(async () => {
    const itemDetails = await getItemDetails(props.uid, String(itemId));

    saveItems = itemDetails;

    setState((s) => ({
      ...s,
      mode: 'sort',
      itemDetails,
    }));

    props.navigation.setParams({
      mode: 'sort',
    });
  }, [props.navigation, props.uid, itemId]);

  const onShow = useCallback(() => {
    setState((s) => ({
      ...s,
      mode: 'show',
    }));

    props.navigation.setParams({
      mode: 'show',
    });
  }, [props.navigation]);

  const onSave = useCallback(() => {
    saveItems.forEach(async (itemDetail, index) => {
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
      itemDetails: saveItems,
    }));

    onShow();
  }, [onShow, props.uid]);

  const onAdd = useCallback(
    (itemDetails: SelectItemDetail[]) => {
      props.navigation.navigate('AddScheduleDetail', {
        itemId,
        priority: itemDetails.length + 1,
        onSave: () => {
          props.navigation.navigate('Schedule', {
            itemId: itemId,
            refresh: uuidv1(),
          });
        },
      });
    },
    [props.navigation, itemId]
  );

  const onDelete = useCallback(async () => {
    const ok = await deleteItem(props.uid, { id: itemId });
    if (!ok) {
      Alert.alert('削除に失敗しました');
      return;
    }

    if (props.refreshData) {
      props.refreshData();
      props.navigation.goBack();
    }
  }, [itemId, props]);

  const onChangeItems = useCallback((data: SelectItemDetail[]) => {
    saveItems = data;
  }, []);

  useDidMount(() => {
    props.navigation.setParams({
      onShow: onShow,
      onSave: onSave,

      mode: 'show',
    });

    const getData = async () => {
      const item = await getItemByID(props.uid, String(itemId));

      setState((s) => ({
        ...s,
        item,
      }));

      props.navigation.setParams({
        title: item.title,
        onEditPlan: () => onEditPlan(item),
        onShare: () => onShare(Boolean(item.public)),
      });
    };

    getData();
  });

  const child1 = useMemo(
    () => (
      <SortableSchedule
        items={state.itemDetails}
        onChangeItems={onChangeItems}
      />
    ),
    [onChangeItems, state.itemDetails]
  );

  if (state.mode === 'sort') {
    return <>{child1}</>;
  }

  return (
    <Schedule
      navigation={props.navigation}
      route={props.route}
      itemDetails={state.itemDetails}
      onAdd={onAdd}
      onSort={onSort}
      onDelete={onDelete}
    />
  );
};

export default memo(Switch);
