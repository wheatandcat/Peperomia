import React, { useState, memo, useCallback, useMemo } from 'react';
import { NavigationScreenProp, NavigationRoute } from 'react-navigation';
import { View, Share, AsyncStorage, Alert } from 'react-native';
import EStyleSheet from 'react-native-extended-stylesheet';
import {
  useActionSheet,
  ActionSheetOptions,
} from '@expo/react-native-action-sheet';
import uuidv1 from 'uuid/v1';
import { Button } from 'react-native-elements';
import theme from '../../../config/theme';
import { Item, SelectItem } from '../../../domain/item';
import { SelectItemDetail } from '../../../domain/itemDetail';
import { updateItemDetail, getItemDetails } from '../../../lib/itemDetail';
import { deleteItem, getItemByID } from '../../../lib/item';
import { closeShareLink, crateShareLink } from '../../../lib/share';
import { isShare } from '../../../lib/firestore/plan';
import getShareText from '../../../lib/getShareText';
import {
  useItems,
  ContextProps as ItemsContextProps,
} from '../../../containers/Items';
import {
  useAuth,
  ContextProps as AuthContextProps,
} from '../../../containers/Auth';
import { useDidMount } from '../../../hooks/index';
import SortableSchedule from '../SortableSchedule/Connected';
import Schedule from './Connected';
import HeaderLeft from './HeaderLeft';
import HeaderRight from './HeaderRight';

type State = Pick<Item, 'title'> & {
  item: SelectItem;
  itemId: number;
  itemDetails: SelectItemDetail[];
  mode: string;
};

type SwitchProps = {
  navigation: NavigationScreenProp<NavigationRoute>;
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

  const onEditPlan = useCallback(
    (item: SelectItem) => {
      props.navigation.navigate('EditPlan', {
        ...item,
      });
    },
    [props.navigation]
  );

  const onShare = useCallback(
    async (title: string, itemDetails: SelectItemDetail[]) => {
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
    const itemId = props.navigation.getParam('itemId', '1');
    const itemDetails = await getItemDetails(props.uid, String(itemId));

    saveItems = itemDetails;

    setState(s => ({
      ...s,
      mode: 'sort',
      itemDetails,
    }));

    props.navigation.setParams({
      mode: 'sort',
    });
  }, [props.navigation, props.uid]);

  const onShow = useCallback(() => {
    setState(s => ({
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

    setState(s => ({
      ...s,
      itemDetails: saveItems,
    }));

    onShow();
  }, [onShow, props.uid]);

  const onAdd = useCallback(
    (itemDetails: SelectItemDetail[]) => {
      const itemId = props.navigation.getParam('itemId', '1');
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
    [props.navigation]
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
    async (itemId: string, title: string, itemDetails: SelectItemDetail[]) => {
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
            buttonIndex => {
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
        buttonIndex => {
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
    [onCrateShareLink, onShare, props]
  );

  const onDelete = useCallback(async () => {
    const itemId = props.navigation.getParam('itemId', '1');

    const ok = await deleteItem(props.uid, { id: itemId });
    if (!ok) {
      Alert.alert('削除に失敗しました');
      return;
    }

    if (props.refreshData) {
      props.refreshData();
      props.navigation.goBack();
    }
  }, [props]);

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
      const itemId = props.navigation.getParam('itemId', '1');
      const item = await getItemByID(props.uid, String(itemId));

      setState(s => ({
        ...s,
        item,
      }));

      props.navigation.setParams({
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
      itemDetails={state.itemDetails}
      onAdd={onAdd}
      onSort={onSort}
      onDelete={onDelete}
    />
  );
});

type NavigationOptions = {
  navigation: NavigationScreenProp<NavigationRoute>;
};

Switch.navigationOptions = ({ navigation }: NavigationOptions) => {
  const { params = {} } = navigation.state;

  return {
    headerTitle: (
      <Button
        type="clear"
        title={params.title}
        onPress={params.onEditPlan}
        testID="ScheduleTitleUpdate"
        titleStyle={styles.headerTitle}
      />
    ),
    headerStyle: {
      backgroundColor: theme().mode.header.backgroundColor,
    },
    headerLeft: (
      <View style={styles.headerLeft}>
        <HeaderLeft
          mode={params.mode}
          onShow={params.onShow}
          navigation={navigation}
        />
      </View>
    ),
    headerRight: (
      <View style={styles.headerRight}>
        <HeaderRight
          mode={params.mode}
          onSave={params.onSave}
          onShare={() => params.onShare(params.title, params.itemDetails)}
          onOpenActionSheet={() =>
            params.onOpenActionSheet(
              params.itemId,
              params.title,
              params.itemDetails
            )
          }
        />
      </View>
    ),
  };
};

export default Switch;

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
