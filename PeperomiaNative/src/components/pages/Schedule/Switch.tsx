import React, { Component } from 'react';
import * as SQLite from 'expo-sqlite';
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
import { db, ResultError } from '../../../lib/db';
import { deleteByItemId as deleteCalendarByItemId } from '../../../lib/db/calendar';
import {
  update as updateItemDetail,
  ItemDetail,
  deleteByItemId as deleteItemDetailByItemId,
} from '../../../lib/db/itemDetail';

import {
  save as saveFirestore,
  isShare,
  updateShare,
} from '../../../lib/firestore/plan';
import { select1st, delete1st, Item } from '../../../lib/db/item';
import getShareText from '../../../lib/getShareText';
import {
  Consumer as ItemsConsumer,
  ContextProps,
} from '../../../containers/Items';
import SortableSchedule from '../SortableSchedule/Connected';
import Schedule from './Connected';
import HeaderLeft from './HeaderLeft';
import HeaderRight from './HeaderRight';

interface State {
  item: Item;
  itemId: number;
  title: string;
  items: ItemDetail[];
  saveItems: ItemDetail[];
  mode: string;
}

type Props = ActionSheetProps & {
  navigation: NavigationScreenProp<NavigationRoute>;
};

type PlanProps = Props &
  Pick<ContextProps, 'refreshData'> & {
    item: Item;
    itemId: number;
    title: string;
    items: ItemDetail[];
    saveItems: ItemDetail[];
    mode: string;
    onShow: () => void;
    onAdd: (items: ItemDetail[]) => void;
    onSort: (items: ItemDetail[]) => void;
  };

class Switch extends Component<Props, State> {
  static navigationOptions = ({ navigation }: { navigation: any }) => {
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
            onShare={() =>
              params.onShare(params.itemId, params.title, params.items)
            }
            onOpenActionSheet={() =>
              params.onOpenActionSheet(
                params.itemId,
                params.title,
                params.items
              )
            }
          />
        </View>
      ),
    };
  };

  state = {
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

  async componentDidMount() {
    const itemId = this.props.navigation.getParam('itemId', '1');

    db.transaction((tx: SQLite.Transaction) => {
      select1st(tx, itemId, this.setItem);
    });

    this.props.navigation.setParams({
      onAdd: this.onAdd,
      onShow: this.onShow,
      onSort: this.onSort,
      onSave: this.onSave,
      onShare: this.onShare,
      onEditPlan: this.onEditPlan,
      onOpenActionSheet: this.onOpenActionSheet,
      mode: 'show',
    });
  }

  setItem = (data: Item, error: ResultError) => {
    if (error) {
      return;
    }

    this.setState({
      item: data,
    });
  };

  onOpenActionSheet = async (
    itemId: string,
    title: string,
    items: ItemDetail[]
  ) => {
    const userID = await AsyncStorage.getItem('userID');
    if (userID) {
      const uuid = userID + itemId;
      const share = await isShare(uuid);
      if (share) {
        this.props.showActionSheetWithOptions(
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
              this.onCrateShareLink(items);
            } else if (buttonIndex === 1) {
              this.onCloseShareLink(uuid);
            } else if (buttonIndex === 2) {
              this.onShare(itemId, title, items);
            }
          }
        );
        return;
      }
    }

    this.props.showActionSheetWithOptions(
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
                  this.onCrateShareLink(items);
                },
              },
            ],
            { cancelable: false }
          );
        } else if (buttonIndex === 1) {
          this.onShare(itemId, title, items);
        }
      }
    );
  };

  onCrateShareLink = async (items: ItemDetail[]) => {
    if (!this.state.item.id) {
      return;
    }

    const userID = await AsyncStorage.getItem('userID');
    if (userID === null) {
      return;
    }

    const linkID = await saveFirestore(userID, this.state.item, items);
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
  };

  onCloseShareLink = async (doc: string) => {
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
  };

  onAdd = (items: ItemDetail[]) => {
    const itemId = this.props.navigation.getParam('itemId', '1');
    this.props.navigation.navigate('AddScheduleDetail', {
      itemId,
      priority: items.length + 1,
      onSave: () => {
        this.props.navigation.navigate('Schedule', {
          itemId: itemId,
          refresh: uuidv1(),
        });
      },
    });
  };

  onShow = (): void => {
    this.setState({ mode: 'show' });

    this.props.navigation.setParams({
      mode: 'show',
    });
  };

  onSort = (items: ItemDetail[]): void => {
    this.setState({ mode: 'sort', items });

    this.props.navigation.setParams({
      mode: 'sort',
    });
  };

  onSave = () => {
    this.setState({
      items: this.state.saveItems,
    });
    this.onShow();
  };

  onShare = async (itemId: string, title: string, items: ItemDetail[]) => {
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
  };

  onEditPlan = () => {
    this.props.navigation.navigate('EditPlan', {
      id: this.state.item.id,
      title: this.state.item.title,
      kind: this.state.item.kind,
      image: this.state.item.image,
    });
  };

  render() {
    return (
      <ItemsConsumer>
        {({ refreshData }: ContextProps) => (
          <Plan
            {...this.props}
            {...this.state}
            refreshData={refreshData}
            onShow={this.onShow}
            onAdd={this.onAdd}
            onSort={this.onSort}
          />
        )}
      </ItemsConsumer>
    );
  }
}

class Plan extends Component<PlanProps> {
  onDelete = () => {
    const itemId = this.props.navigation.getParam('itemId', '1');

    db.transaction((tx: SQLite.Transaction) => {
      delete1st(tx, itemId, (_: Item, error: ResultError) => {
        if (error) {
          return;
        }
        deleteCalendarByItemId(tx, Number(itemId), () => null);
        deleteItemDetailByItemId(tx, itemId, this.onDeleteRefresh);
      });
    });
  };

  onDeleteRefresh = (_: ItemDetail[], error: ResultError) => {
    if (error) {
      return;
    }

    if (this.props.refreshData) {
      this.props.refreshData();
      this.props.navigation.goBack();
    }
  };

  onChangeItems = (data: ItemDetail[]): void => {
    db.transaction((tx: SQLite.Transaction) => {
      data.forEach(async (item, index) => {
        item.priority = index + 1;
        await updateItemDetail(tx, item, () => {});
      });
    });
  };

  save = () => {
    if (this.props.refreshData) {
      this.props.refreshData();
    }
  };

  render() {
    if (this.props.mode === 'sort') {
      return (
        <SortableSchedule
          items={this.props.items}
          onChangeItems={this.onChangeItems}
        />
      );
    }

    return (
      <Schedule
        navigation={this.props.navigation}
        onAdd={this.props.onAdd}
        onSort={this.props.onSort}
        onDelete={() => this.onDelete()}
      />
    );
  }
}

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
