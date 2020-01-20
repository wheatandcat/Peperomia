import React, { useState, memo, useCallback, useContext } from 'react';
import { NavigationScreenProp, NavigationRoute } from 'react-navigation';
import {
  View,
  Share,
  AsyncStorage,
  Dimensions,
  Clipboard,
  Alert,
} from 'react-native';
import EStyleSheet from 'react-native-extended-stylesheet';
import {
  ActionSheetProps,
  connectActionSheet,
} from '@expo/react-native-action-sheet';
import Toast from 'react-native-root-toast';
import uuidv1 from 'uuid/v1';
import { Button } from 'react-native-elements';
import theme from '../../../config/theme';
import { Item, SelectItem } from '../../../domain/item';
import { SelectItemDetail } from '../../../domain/itemDetail';
import { updateItemDetail } from '../../../lib/itemDetail';
import { deleteItem, getItemByID } from '../../../lib/item';
import {
  save as saveFirestore,
  isShare,
  updateShare,
} from '../../../lib/firestore/plan';
import getShareText from '../../../lib/getShareText';
import { Context as ItemsContext } from '../../../containers/Items';
import { Context as AuthContext } from '../../../containers/Auth';
import { useDidMount } from '../../../hooks/index';
import SortableSchedule from '../SortableSchedule/Connected';
import Schedule from './Connected';
import HeaderLeft from './HeaderLeft';
import HeaderRight from './HeaderRight';

type State = Pick<Item, 'title'> & {
  item: SelectItem;
  itemId: number;
  items: SelectItemDetail[];
  saveItems: SelectItemDetail[];
  mode: string;
};

type Props = ActionSheetProps & {
  navigation: NavigationScreenProp<NavigationRoute>;
};

export type SwitchType = {
  onShow: () => void;
  onAdd: (items: SelectItemDetail[]) => void;
  onCloseShareLink: (doc: string) => void;
  onSort: (items: SelectItemDetail[]) => void;
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
  items: [],
  saveItems: [],
  mode: 'show',
};

const Switch = (props: Props) => {
  return <Connected {...props} />;
};

const Connected = memo((props: Props) => {
  const { uid } = useContext(AuthContext);
  const { refreshData } = useContext(ItemsContext);
  const [state, setState] = useState<State>(initState);

  const onEditPlan = useCallback(() => {
    props.navigation.navigate('EditPlan', {
      ...state.item,
    });
  }, [props.navigation, state.item]);

  const onShare = useCallback(
    async (title: string, items: SelectItemDetail[]) => {
      try {
        const message = getShareText(items);

        const result = await Share.share({
          title,
          message,
        });

        if (result.action === Share.sharedAction) {
          if (result.activityType) {
            // shared with activity type of result.activityType
          } else {
            // shared
          }
        } else if (result.action === Share.dismissedAction) {
          // dismissed
        }
      } catch (error) {
        Alert.alert(error.message);
      }
    },
    []
  );

  const onSort = useCallback(
    (items: SelectItemDetail[]) => {
      setState(s => ({
        ...s,
        mode: 'sort',
        items,
      }));

      props.navigation.setParams({
        mode: 'sort',
      });
    },
    [props.navigation]
  );

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
    setState(s => ({
      ...s,
      items: state.saveItems,
    }));
    onShow();
  }, [onShow, state.saveItems]);

  const onAdd = useCallback(
    (items: SelectItemDetail[]) => {
      const itemId = props.navigation.getParam('itemId', '1');
      props.navigation.navigate('AddScheduleDetail', {
        itemId,
        priority: items.length + 1,
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

  const onCloseShareLink = useCallback(async (doc: string) => {
    const result = await updateShare(doc, false);
    if (result) {
      const { height } = Dimensions.get('window');

      let toast = Toast.show('リンクを非公開にしました', {
        duration: Toast.durations.LONG,
        //textColor: "red",
        position: height - 150,
        shadow: true,
        animation: true,
        hideOnPress: true,
        delay: 0,
      });

      // You can manually hide the Toast, or it will automatically disappear after a `duration` ms timeout.
      setTimeout(function() {
        Toast.hide(toast);
      }, 3000);
    }
  }, []);

  const onCrateShareLink = useCallback(
    async (items: SelectItemDetail[]) => {
      if (!state.item.id) {
        return;
      }

      const userID = await AsyncStorage.getItem('userID');
      if (userID === null) {
        return;
      }

      const linkID = await saveFirestore(userID, state.item, items);
      if (!linkID) {
        Alert.alert('保存に失敗しました');
        return;
      }

      const shareHost = 'https://peperomia.info';
      console.log(`${shareHost}/${linkID}`);

      Clipboard.setString(`${shareHost}/${linkID}`);

      const { height } = Dimensions.get('window');

      const toast = Toast.show('リンクがコピーされました！', {
        duration: Toast.durations.LONG,
        position: height - 150,
        shadow: true,
        animation: true,
        hideOnPress: true,
        delay: 0,
      });

      // You can manually hide the Toast, or it will automatically disappear after a `duration` ms timeout.
      setTimeout(function() {
        Toast.hide(toast);
      }, 3000);
    },
    [state.item]
  );

  const onOpenActionSheet = useCallback(
    async (itemId: string, title: string, items: SelectItemDetail[]) => {
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
                onCrateShareLink(items);
              } else if (buttonIndex === 1) {
                onCloseShareLink(uuid);
              } else if (buttonIndex === 2) {
                onShare(title, items);
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
                    onCrateShareLink(items);
                  },
                },
              ],
              { cancelable: false }
            );
          } else if (buttonIndex === 1) {
            onShare(title, items);
          }
        }
      );
    },
    [onCloseShareLink, onCrateShareLink, onShare, props]
  );

  const onDelete = useCallback(async () => {
    const itemId = props.navigation.getParam('itemId', '1');

    const ok = await deleteItem(uid, { id: itemId });
    if (!ok) {
      Alert.alert('削除に失敗しました');
      return;
    }

    if (refreshData) {
      refreshData();
      props.navigation.goBack();
    }
  }, [props.navigation, refreshData, uid]);

  const onChangeItems = useCallback(
    (data: SelectItemDetail[]) => {
      data.forEach(async (itemDetail, index) => {
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
    },
    [uid]
  );

  useDidMount(() => {
    const getData = async () => {
      const itemId = props.navigation.getParam('itemId', '1');
      const item = await getItemByID(uid, String(itemId));

      setState(s => ({
        ...s,
        item,
      }));
    };

    getData();

    props.navigation.setParams({
      onShow: onShow,
      onSave: onSave,
      onShare: onShare,
      onEditPlan: onEditPlan,
      onOpenActionSheet: onOpenActionSheet,
      mode: 'show',
    });
  });

  if (state.mode === 'sort') {
    return (
      <SortableSchedule items={state.items} onChangeItems={onChangeItems} />
    );
  }

  return (
    <Schedule
      navigation={props.navigation}
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

export default connectActionSheet(Switch);

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
