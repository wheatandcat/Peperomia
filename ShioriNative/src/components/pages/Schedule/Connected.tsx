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
  static navigationOptions = ({ navigation }: { navigation: any }) => {
    const { params = {} } = navigation.state;
    return {
      title: params.title,
      headerRight: (
        <View style={{ right: 10 }}>
          <TouchableOpacity
            onPress={() => {
              navigation.navigate("CreateSchedule", {
                title: params.title,
                itemId: params.itemId,
                mode: "edit"
              });
            }}
          >
            <Text style={{ fontSize: 16, fontWeight: "600" }}>編集</Text>
          </TouchableOpacity>
        </View>
      )
    };
  };

  state = { items: [] };

  componentDidMount() {
    const title = this.props.navigation.getParam("title", "");

    const itemId = this.props.navigation.getParam("itemId", "1");
    this.props.navigation.setParams({ title, itemId });
    db.transaction((tx: SQLite.Transaction) => {
      selectByItemId(tx, itemId, this.setItems);
    });
  }

  setItems = (data: any, error: any) => {
    if (error) {
      return;
    }

    this.setState({
      items: data
    });
  };

  onScheduleDetail = (id: string) => {
    this.props.navigation.navigate("ScheduleDetail", { scheduleDetailId: id });
  };

  render() {
    return (
      <Page data={this.state.items} onScheduleDetail={this.onScheduleDetail} />
    );
  }
}
