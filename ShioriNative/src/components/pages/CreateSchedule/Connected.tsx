import { SQLite } from "expo";
import React, { Component } from "react";
import { NavigationScreenProp, NavigationRoute } from "react-navigation";
import { Text, TouchableOpacity, View } from "react-native";
import { db } from "../../../lib/db";
import { selectByItemId } from "../../../lib/db/itemDetail";
import { ItemProps } from "../../organisms/Schedule/Cards";
import Page, { Props as PageProps } from "./Page";

interface Props extends PageProps {
  navigation: NavigationScreenProp<NavigationRoute>;
}

interface State {
  items: ItemProps[];
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
          <TouchableOpacity
            onPress={() => {
              navigation.navigate("CreateSchedule");
            }}
          >
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
              <Text style={{ fontSize: 16, fontWeight: "600", color: "red" }}>
                キャンセル
              </Text>
            </TouchableOpacity>
          </View>
        )
      };
    }

    return result;
  };

  state = { items: [] };

  componentDidMount() {
    const itemId = this.props.navigation.getParam("itemId", "1");
    const mode = this.props.navigation.getParam("mode", "create");
    const title = this.props.navigation.getParam("title", "");
    this.props.navigation.setParams({ title, itemId, mode });

    db.transaction((tx: SQLite.Transaction) => {
      selectByItemId(tx, itemId, this.setItems);
    });
  }

  setItems = (data: any, error: any) => {
    if (error) {
      return;
    }

    console.log(data);

    this.setState({ items: data });
  };

  onCreateScheduleDetail = () => {
    this.props.navigation.navigate("CreateScheduleDetail");
  };

  onScheduleDetail = (id: string) => {
    this.props.navigation.navigate("ScheduleDetail", { scheduleDetailId: id });
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
