import React, { Component } from "react";
import { SQLite } from "expo";
import { NavigationScreenProp, NavigationRoute } from "react-navigation";
import { Text, TouchableOpacity, View } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import {
  ActionSheetProps,
  connectActionSheet
} from "@expo/react-native-action-sheet";
import EditSchedule from "../EditSchedule/Connected";
import SortableSchedule from "../SortableSchedule/Connected";
import { db } from "../../../lib/db";
import {
  update as updateItemDetail,
  ItemDetail
} from "../../../lib/db/itemDetail";
import Schedule from "./Connected";

interface State {
  scheduleId: number;
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
          {(() => {
            if (params.mode === "edit") {
              return (
                <TouchableOpacity
                  onPress={() => params.onShow()}
                  style={{ left: 5 }}
                >
                  <Text
                    style={{
                      fontSize: 16,
                      fontWeight: "600",
                      color: "red"
                    }}
                  >
                    キャンセル
                  </Text>
                </TouchableOpacity>
              );
            }

            if (params.mode === "sort") {
              return (
                <TouchableOpacity
                  onPress={() => params.onEdit(params.items)}
                  style={{ left: 5 }}
                >
                  >
                  <Text
                    style={{ fontSize: 16, fontWeight: "600", color: "red" }}
                  >
                    キャンセル
                  </Text>
                </TouchableOpacity>
              );
            }

            return (
              <TouchableOpacity
                onPress={() => navigation.goBack()}
                style={{ flex: 1, flexDirection: "row", marginTop: 10 }}
              >
                <MaterialCommunityIcons
                  name="chevron-left"
                  size={22}
                  color="#00bfff"
                />
                <Text
                  style={{
                    fontSize: 16,
                    fontWeight: "600",
                    color: "#00bfff",
                    marginTop: 3
                  }}
                />
              </TouchableOpacity>
            );
          })()}
        </View>
      ),
      headerRight: (
        <View style={{ right: 10 }}>
          {(() => {
            if (params.mode === "edit") {
              return null;
            }

            if (params.mode === "sort") {
              return (
                <TouchableOpacity onPress={() => params.onSave()}>
                  >
                  <Text
                    style={{
                      fontSize: 16,
                      fontWeight: "600",
                      color: "#00bfff"
                    }}
                  >
                    保存
                  </Text>
                </TouchableOpacity>
              );
            }

            return (
              <TouchableOpacity
                onPress={() => params.onOpenActionSheet(params.items)}
              >
                <Text style={{ fontSize: 16, fontWeight: "600" }}>編集</Text>
              </TouchableOpacity>
            );
          })()}
        </View>
      )
    };
  };

  state = { scheduleId: 0, title: "", items: [], saveItems: [], mode: "show" };

  componentDidMount() {
    this.props.navigation.setParams({
      onEdit: this.onEdit,
      onShow: this.onShow,
      onSort: this.onSort,
      onSave: this.onSave,
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
          const itemId = this.props.navigation.getParam("scheduleId", "1");
          this.props.navigation.navigate("CreateScheduleDetail", {
            itemId,
            priority: items.length + 1
          });
          //this.onEdit(items);
        } else if (buttonIndex === 1) {
          this.onSort(items);
        }
      }
    );
  };

  onEdit = (items: ItemDetail[]): void => {
    const scheduleId = this.props.navigation.getParam("scheduleId", "1");

    this.setState({
      scheduleId,
      items,
      mode: "edit"
    });

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
        console.log(item);

        await updateItemDetail(tx, item, this.save);
      });
    });

    this.setState({ saveItems: data });
  };

  save = (ans: any) => {
    console.log(ans);
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

    return <Schedule navigation={this.props.navigation} />;
  }
}

export default connectActionSheet(Switch);
