import { SQLite } from "expo";
import React, { Component } from "react";
import { NavigationScreenProp, NavigationRoute } from "react-navigation";
import { Text, TouchableOpacity, View } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import Page, { Props as PageProps } from "./Page";

const db = SQLite.openDatabase("db.db");

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
      ),
      headerRight: (
        <View style={{ right: 10 }}>
          <TouchableOpacity
            onPress={() => {
              params.save();
            }}
          >
            <Text
              style={{
                fontSize: 16,
                fontWeight: "600"
              }}
            >
              完了
            </Text>
          </TouchableOpacity>
        </View>
      )
    };
  };

  state = { input: { title: "", image: null } };

  componentDidMount() {
    this.props.navigation.setParams({ save: this.onSave });

    db.transaction((tx: any) => {
      tx.executeSql(
        "create table if not exists items (id integer primary key not null, title string,image string);"
      );
    });
  }

  onInput = (name: string, value: any) => {
    this.setState({
      input: {
        ...this.state.input,
        [name]: value
      }
    });

    console.log(name);
  };

  onSave = async () => {
    console.log(this.state);
    this.props.navigation.navigate("CreateSchedule");
  };

  render() {
    return <Page onInput={this.onInput} />;
  }
}
