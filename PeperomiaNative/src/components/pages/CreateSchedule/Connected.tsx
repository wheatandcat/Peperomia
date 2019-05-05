import { SQLite } from "expo";
import React, { Component } from "react";
import { NavigationScreenProp, NavigationRoute } from "react-navigation";
import { Text, TouchableOpacity, View, Alert } from "react-native";
import uuidv1 from "uuid/v1";
import { db } from "../../../lib/db";
import { select1st } from "../../../lib/db/item";
import {
  selectByItemId,
  ItemDetail,
  update as updateItemDetail
} from "../../../lib/db/itemDetail";
import { ItemProps } from "../../organisms/Schedule/Cards";
import Page, { Props as PageProps } from "../../templates/CreateSchedule/Page";

interface Props extends PageProps {
  navigation: NavigationScreenProp<NavigationRoute>;
}

interface State {
  items: ItemProps[];
  refresh: string;
}

export default class extends Component<Props, State> {
  static navigationOptions = ({
    navigation
  }: {
    navigation: NavigationScreenProp<NavigationRoute>;
  }) => {
    const { params = {} } = navigation.state;
    let result: any = {
      title: params.title,
      headerRight: (
        <View style={{ right: 10 }}>
          <TouchableOpacity onPress={params.onFinish} testID="saveSchedule">
            <Text style={{ fontSize: 16, fontWeight: "600" }}>完了</Text>
          </TouchableOpacity>
        </View>
      )
    };

    if (params.mode === "edit") {
      result = {
        ...result,
        headerLeft: (
          <View style={{ paddingLeft: 5 }}>
            <TouchableOpacity
              onPress={() => {
                navigation.navigate("Schedule", {
                  itemId: params.itemId,
                  title: params.title
                });
              }}
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
          </View>
        )
      };
    }

    return result;
  };

  state = { items: [], refresh: "0" };

  componentDidMount() {
    const itemId = this.props.navigation.getParam("itemId", "1");

    db.transaction((tx: SQLite.Transaction) => {
      select1st(tx, itemId, this.setParams);
      selectByItemId(tx, itemId, this.setItems);
    });
  }

  componentDidUpdate() {
    const refresh = this.props.navigation.getParam("refresh", "0");

    if (refresh !== this.state.refresh) {
      const itemId = this.props.navigation.getParam("itemId", "1");
      db.transaction((tx: SQLite.Transaction) => {
        selectByItemId(tx, itemId, this.setItems);
      });

      this.setState({ refresh });
    }
  }

  setParams = (data: any, error: any) => {
    if (error) {
      return;
    }

    const itemId = this.props.navigation.getParam("itemId", "1");
    const mode = this.props.navigation.getParam("mode", "create");

    this.props.navigation.setParams({
      title: data.title,
      itemId,
      mode,
      onFinish: this.onFinish
    });
  };

  setItems = (data: any, error: any) => {
    if (error) {
      return;
    }

    const prioritys = data.map((item: ItemDetail) => item.priority);
    const uniquePrioritys = prioritys.filter(
      (x: number, i: number, self: number[]) => self.indexOf(x) === i
    );

    // priorityが重複していない
    if (prioritys.length === uniquePrioritys.length) {
      this.props.navigation.setParams({
        items: data
      });
      this.setState({ items: data });
    }

    // priorityが重複している場合はid順でpriorityをupdateする
    const items: ItemDetail[] = data.map((item: ItemDetail, index: number) => ({
      ...item,
      priority: index + 1
    }));

    db.transaction((tx: SQLite.Transaction) => {
      items.forEach(async (item, index) => {
        item.priority = index + 1;
        await updateItemDetail(tx, item, this.save);
      });
    });

    this.setState({ items: items });
  };

  save = (_: any) => {};

  onCreateScheduleDetail = () => {
    const itemId = this.props.navigation.getParam("itemId", "1");

    this.props.navigation.navigate("CreateScheduleDetail", {
      itemId,
      onSave: () => {
        this.props.navigation.navigate("CreateSchedule", {
          itemId: itemId,
          refresh: uuidv1()
        });
      }
    });
  };

  onScheduleDetail = (id: string) => {
    this.props.navigation.navigate("ScheduleDetail", {
      scheduleDetailId: id,
      priority: this.state.items.length + 1
    });
  };

  onFinish = () => {
    if (this.state.items.length === 0) {
      Alert.alert(
        "まだ予定の設定がありません",
        "本当に完了しますか？",
        [
          {
            text: "キャンセル",
            style: "cancel"
          },
          {
            text: "完了する",
            onPress: () => {
              this.props.navigation.navigate("Home", { refresh: true });
            }
          }
        ],
        { cancelable: false }
      );
    } else {
      this.props.navigation.navigate("Home", { refresh: true });
    }
  };

  render() {
    return (
      <Page
        data={this.state.items}
        onScheduleDetail={this.onScheduleDetail}
        onCreateScheduleDetail={this.onCreateScheduleDetail}
      />
    );
  }
}
