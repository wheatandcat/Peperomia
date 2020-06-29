import React, { useState, memo, useCallback, useMemo } from 'react';
import { RouteProp } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { Share, Alert, View } from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import EStyleSheet from 'react-native-extended-stylesheet';
import {
  useActionSheet,
  ActionSheetOptions,
} from '@expo/react-native-action-sheet';
import uuidv1 from 'uuid/v1';
import { Button } from 'react-native-elements';
import { Item, SelectItem } from 'domain/item';
import { SelectItemDetail } from 'domain/itemDetail';
import { updateItemDetail, getItemDetails } from 'lib/itemDetail';
import { RootStackParamList } from 'lib/navigation';
import { deleteItem, getItemByID } from 'lib/item';
import { closeShareLink, crateShareLink } from 'lib/share';
import { isShare } from 'lib/firestore/plan';
import getShareText from 'lib/getShareText';
import { useItems, ContextProps as ItemsContextProps } from 'containers/Items';
import { useAuth, ContextProps as AuthContextProps } from 'containers/Auth';
import { useDidMount } from 'hooks/index';
import theme from 'config/theme';
import SortableSchedule from 'components/pages/SortableSchedule/Connected';
import Schedule from './Connected';
import HeaderLeft from './HeaderLeft';
import HeaderRight from './HeaderRight';

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
  onOpenActionSheet: (
    itemId: string,
    title: string,
    items: SelectItemDetail[]
  ) => void;
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

const Switch = (props: SwitchProps) => {
  const { uid } = useAuth();
  const { refreshData } = useItems();
  const { showActionSheetWithOptions } = useActionSheet();

  return (
    <Connected
      {...props}
      uid={uid}
      refreshData={refreshData}
      showActionSheetWithOptions={showActionSheetWithOptions}
    />
  );
};

export const Connected = memo((props: Props) => {
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
    async (title?: string, itemDetails?: SelectItemDetail[]) => {
      if (!title || !itemDetails) {
        return;
      }

      try {
        const message = getShareText(itemDetails);

        await Share.share({
          title,
          message,
        });
      } catch (error) {
        Alert.alert(error.message);
      }
    },
    []
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

  const onCrateShareLink = useCallback(
    async (itemDetails: SelectItemDetail[]) => {
      if (!state.item.id) {
        return;
      }

      await crateShareLink(state.item, itemDetails);
    },
    [state.item]
  );

  const onOpenActionSheet = useCallback(
    async (title?: string, itemDetails?: SelectItemDetail[]) => {
      if (!title || !itemDetails) {
        return;
      }

      const userID = await AsyncStorage.getItem('userID');
      if (userID) {
        const uuid = userID + itemId;
        const share = await isShare(uuid);
        if (share) {
          props.showActionSheetWithOptions(
            {
              options: [
                'リンクを取得する',
                'リンクを非公開にする',
                'その他',
                'キャンセル',
              ],
              destructiveButtonIndex: 1,
              cancelButtonIndex: 3,
            },
            (buttonIndex) => {
              if (buttonIndex === 0) {
                onCrateShareLink(itemDetails);
              } else if (buttonIndex === 1) {
                closeShareLink(uuid);
              } else if (buttonIndex === 2) {
                onShare(title, itemDetails);
              }
            }
          );
          return;
        }
      }

      props.showActionSheetWithOptions(
        {
          options: ['リンクを取得する', 'その他', 'キャンセル'],
          cancelButtonIndex: 2,
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
                  onPress: () => {
                    onCrateShareLink(itemDetails);
                  },
                },
              ],
              { cancelable: false }
            );
          } else if (buttonIndex === 1) {
            onShare(title, itemDetails);
          }
        }
      );
    },
    [onCrateShareLink, onShare, props, itemId]
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
      onShare: onShare,
      onOpenActionSheet: onOpenActionSheet,
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
});

export default Switch;

export const ScheduleNavigationOptions = ({ route }: SwitchProps) => {
  return {
    headerTitle: () => (
      <Button
        type="clear"
        title={route.params.title}
        onPress={route.params.onEditPlan}
        testID="ScheduleTitleUpdate"
        titleStyle={styles.headerTitle}
      />
    ),
    headerStyle: {
      backgroundColor: theme().mode.header.backgroundColor,
    },
    headerLeft: () => (
      <View style={styles.headerLeft}>
        <HeaderLeft mode={route.params.mode} onShow={route.params.onShow} />
      </View>
    ),
    headerRight: () => (
      <View style={styles.headerRight}>
        <HeaderRight
          mode={route.params.mode}
          onSave={route.params.onSave}
          onShare={() => {
            if (route.params.onShare) {
              route.params.onShare(
                route.params.title,
                route.params.itemDetails
              );
            }
          }}
          onOpenActionSheet={() => {
            if (route.params.onOpenActionSheet) {
              route.params.onOpenActionSheet(
                route.params.title,
                route.params.itemDetails
              );
            }
          }}
        />
      </View>
    ),
  };
};

const styles = EStyleSheet.create({
  headerTitle: {
    color: '$headerText',
    fontWeight: '600',
  },
  headerLeft: {
    left: 5,
  },
  headerRight: {
    right: 10,
  },
});
