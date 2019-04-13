import { SQLite } from "expo";
import React, { Component } from "react";
import { NavigationScreenProp, NavigationRoute } from "react-navigation";
import { Text, TouchableOpacity, View } from "react-native";
import { db } from "../../../lib/db";
import { select1st } from "../../../lib/db/item";
import { selectByItemId } from "../../../lib/db/itemDetail";
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
          <TouchableOpacity
            onPress={() => {
              navigation.navigate("Home", { refresh: true });
            }}
            testID="saveSchedule"
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
      mode
    });
  };

  setItems = (data: any, error: any) => {
    if (error) {
      return;
    }

    this.setState({ items: data });
  };

  onCreateScheduleDetail = () => {
    const itemId = this.props.navigation.getParam("itemId", "1");
    this.props.navigation.navigate("CreateScheduleDetail", { itemId });
  };

  onScheduleDetail = (id: string) => {
    this.props.navigation.navigate("ScheduleDetail", {
      scheduleDetailId: id,
      priority: this.state.items.length + 1
    });
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
