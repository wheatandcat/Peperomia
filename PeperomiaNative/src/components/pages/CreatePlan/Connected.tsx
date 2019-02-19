import { SQLite } from "expo";
import React, { Component } from "react";
import { NavigationScreenProp, NavigationRoute } from "react-navigation";
import { TouchableOpacity, View } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { db } from "../../../lib/db";
import { insert as insertItem, Item } from "../../../lib/db/item";
import getKind from "../../../lib/getKind";
import Page, { Props as PageProps } from "./Page";

interface Props extends PageProps {
  navigation: NavigationScreenProp<NavigationRoute>;
}

interface State {
  input: {
    title: string;
  };
  image: string;
}

export default class extends Component<Props, State> {
  static navigationOptions = ({
    navigation
  }: {
    navigation: NavigationScreenProp<NavigationRoute>;
  }) => {
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

  state = { input: { title: "" }, image: "" };

  async componentDidMount() {
    const image = this.props.navigation.getParam("image", "");
    console.log(image);

    this.props.navigation.setParams({
      save: this.onSave
    });
  }

  async componentDidUpdate(_: Props, prevState: State) {
    const image = this.props.navigation.getParam("image", "");
    console.log("componentDidUpdate");
    console.log(image);
    if (image !== this.state.image) {
      this.setState({
        image
      });
    }
  }

  onImage = (image: string) => {
    this.setState({
      image
    });
  };

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
    this.props.navigation.navigate("Icons", {
      kind: getKind(this.state.input.title)
    });
  };

  onCamera = () => {
    this.props.navigation.navigate("Camera");
  };

  render() {
    return (
      <Page
        title={this.state.input.title}
        image={this.state.image}
        onInput={this.onInput}
        onImage={this.onImage}
        onSave={this.onSave}
        onIcons={this.onIcons}
        onCamera={this.onCamera}
      />
    );
  }
}
