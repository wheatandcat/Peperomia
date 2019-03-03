import React, { Component } from "react";
import { SQLite } from "expo";
import { NavigationScreenProp, NavigationRoute } from "react-navigation";
import { View, Share, Alert } from "react-native";
import {
  ActionSheetProps,
  connectActionSheet
} from "@expo/react-native-action-sheet";
import uuidv1 from "uuid/v1";
import EditSchedule from "../EditSchedule/Connected";
import SortableSchedule from "../SortableSchedule/Connected";
import { db } from "../../../lib/db";
import {
  update as updateItemDetail,
  ItemDetail,
  deleteByItemId as deleteItemDetailByItemId
} from "../../../lib/db/itemDetail";
import { delete1st } from "../../../lib/db/item";
import getShareText from "../../../lib/getShareText";
import Schedule from "./Connected";
import HeaderLeft from "./HeaderLeft";
import HeaderRight from "./HeaderRight";

interface State {
  itemId: number;
  title: string;
  items: ItemDetail[];
  saveItems: ItemDetail[];
  mode: string;
}

interface Props {
  navigation: NavigationScreenProp<NavigationRoute>;
}

class Switch extends Component<Props & ActionSheetProps, State> {
  static navigationOptions = ({ navigation }: { navigation: any }) => {
    const { params = {} } = navigation.state;
    return {
      title: params.title,
      headerLeft: (
        <View style={{ left: 5 }}>
          <HeaderLeft
            mode={params.mode}
            onShow={params.onShow}
            navigation={navigation}
          />
        </View>
      ),
      headerRight: (
        <View style={{ right: 10 }}>
          <HeaderRight
            mode={params.mode}
            onSave={params.onSave}
            onShare={() =>
              params.onShare(params.itemId, params.title, params.items)
            }
            onOpenActionSheet={() => params.onOpenActionSheet(params.items)}
          />
        </View>
      )
    };
  };

  state = { itemId: 0, title: "", items: [], saveItems: [], mode: "show" };

  componentDidMount() {
    this.props.navigation.setParams({
      onAdd: this.onAdd,
      onEdit: this.onEdit,
      onShow: this.onShow,
      onSort: this.onSort,
      onSave: this.onSave,
      onShare: this.onShare,
      onOpenActionSheet: this.onOpenActionSheet,
      mode: "show"
    });
  }

  onOpenActionSheet = (items: ItemDetail[]) => {
    this.props.showActionSheetWithOptions(
      {
        options: ["追加する", "並び替え", "プランを削除", "キャンセル"],
        destructiveButtonIndex: 2,
        cancelButtonIndex: 3
      },
      buttonIndex => {
        if (buttonIndex === 0) {
          this.onAdd(items);
        } else if (buttonIndex === 1) {
          this.onSort(items);
        } else if (buttonIndex === 2) {
          Alert.alert(
            "削除しますか？",
            "",
            [
              {
                text: "キャンセル",
                style: "cancel"
              },
              {
                text: "削除する",
                onPress: () => {
                  this.onDelete();
                }
              }
            ],
            { cancelable: false }
          );
        }
      }
    );
  };

  onAdd = (items: ItemDetail[]) => {
    const itemId = this.props.navigation.getParam("itemId", "1");
    this.props.navigation.navigate("CreateScheduleDetail", {
      itemId,
      priority: items.length + 1
    });
  };

  onDelete = () => {
    const itemId = this.props.navigation.getParam("itemId", "1");

    db.transaction((tx: SQLite.Transaction) => {
      delete1st(tx, itemId, (data: any, error: any) => {
        if (error) {
          return;
        }
        deleteItemDetailByItemId(tx, itemId, this.onDeleteRefresh);
      });
    });
  };

  onDeleteRefresh = (_: any, error: any) => {
    if (error) {
      return;
    }

    this.props.navigation.navigate("Home", { refresh: uuidv1() });
  };

  onEdit = (items: ItemDetail[]): void => {
    const itemId = this.props.navigation.getParam("itemId", "1");

    this.setState({ itemId, items, mode: "edit" });

    this.props.navigation.setParams({
      mode: "edit"
    });
  };

  onShow = (): void => {
    this.setState({ mode: "show" });

    this.props.navigation.setParams({
      mode: "show"
    });
  };

  onSort = (items: ItemDetail[]): void => {
    this.setState({ mode: "sort", items });

    this.props.navigation.setParams({
      mode: "sort"
    });
  };

  onSave = () => {
    this.setState({
      items: this.state.saveItems
    });
    this.onEdit(this.state.saveItems);
  };

  onChangeItems = (data: ItemDetail[]): void => {
    db.transaction((tx: SQLite.Transaction) => {
      data.forEach(async (item, index) => {
        item.priority = index + 1;
        await updateItemDetail(tx, item, this.save);
      });
    });

    this.setState({ saveItems: data });
  };

  save = (_: any) => {};

  onShare = async (itemId: string, title: string, items: ItemDetail[]) => {
    try {
      const result: any = await Share.share({
        title,
        message: getShareText(items)
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
      alert(error.message);
    }
  };

  render() {
    if (this.state.mode === "edit") {
      return (
        <EditSchedule
          title={this.state.title}
          items={this.state.items}
          navigation={this.props.navigation}
          onShow={this.onShow}
        />
      );
    }

    if (this.state.mode === "sort") {
      return (
        <SortableSchedule
          items={this.state.items}
          onChangeItems={this.onChangeItems}
        />
      );
    }

    return (
      <Schedule
        navigation={this.props.navigation}
        onAdd={() => this.onAdd(this.state.items)}
        onSort={() => this.onSort(this.state.items)}
        onDelete={() => this.onDelete()}
      />
    );
  }
}

export default connectActionSheet(Switch);
