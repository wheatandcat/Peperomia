import { SQLite } from "expo";
import React, { Component } from "react";
import { NavigationScreenProp, NavigationRoute } from "react-navigation";
import { Text, TouchableOpacity, View } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { db } from "../../../lib/db";
import { insert as insertItem, Item } from "../../../lib/db/item";
import Page, { Props as PageProps } from "./Page";

interface Props extends PageProps {
  navigation: NavigationScreenProp<NavigationRoute>;
}

interface State {
  input: {
    title: string;
    image: any;
  };
}

export default class extends Component<Props, State> {
  static navigationOptions = ({
    navigation
  }: {
    navigation: NavigationScreenProp<NavigationRoute>;
  }) => {
    const { params = {} } = navigation.state;

    return {
      title: "プラン作成",
      headerLeft: (
        <View style={{ left: 10 }}>
          <TouchableOpacity
            onPress={() => {
              navigation.navigate("Home");
            }}
          >
            <MaterialCommunityIcons name="close" size={25} />
          </TouchableOpacity>
        </View>
      )
    };
  };

  state = { input: { title: "", image: null } };

  async componentDidMount() {
    this.props.navigation.setParams({
      save: this.onSave
    });
  }

  onInput = (name: string, value: any) => {
    this.setState({
      input: {
        ...this.state.input,
        [name]: value
      }
    });
  };

  onSave = async () => {
    db.transaction((tx: SQLite.Transaction) => {
      const item: Item = { title: this.state.input.title, image: "" };

      insertItem(tx, item, this.save);
    });
  };

  save = (insertId: number, error: any) => {
    if (error) {
      return;
    }

    this.props.navigation.navigate("CreateSchedule", {
      itemId: insertId,
      title: this.state.input.title
    });
  };

  onIcons = () => {
    this.props.navigation.navigate("Icons");
  };

  render() {
    return (
      <Page
        onInput={this.onInput}
        onSave={this.onSave}
        onIcons={this.onIcons}
        title={this.state.input.title}
      />
    );
  }
}
