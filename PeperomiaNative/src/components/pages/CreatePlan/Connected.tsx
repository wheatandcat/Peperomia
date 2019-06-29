import * as ImageManipulator from "expo-image-manipulator";
import { SQLite } from "expo-sqlite";
import React, { Component } from "react";
import { NavigationScreenProp, NavigationRoute } from "react-navigation";
import { TouchableOpacity, View } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { Consumer as ItemsConsumer } from "../../../containers/Items";
import { db } from "../../../lib/db";
import { insert as insertItem, Item } from "../../../lib/db/item";
import getKind from "../../../lib/getKind";
import Page from "../../templates/CreatePlan/Page";
import { Item as SuggestItem } from "../../organisms/Suggest/List";

interface Props {
  navigation: NavigationScreenProp<NavigationRoute>;
}

interface State {
  input: {
    title: string;
  };
  image: string;
  kind: string;
  suggestList: SuggestItem[];
}

export default class extends Component<Props> {
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

  render() {
    return (
      <ItemsConsumer>
        {({ items }: any) => <Connect {...this.props} items={items} />}
      </ItemsConsumer>
    );
  }
}

interface ConnectProps extends Props {
  items: Item[];
}

class Connect extends Component<ConnectProps, State> {
  state = {
    input: { title: "" },
    image: "",
    kind: "",
    suggestList: []
  };

  componentDidMount() {
    const suggestList = this.props.items.map(item => ({
      title: item.title,
      kind: item.kind
    }));

    this.setState({
      suggestList
    });
  }

  async componentDidUpdate() {
    const image = this.props.navigation.getParam("image", "");
    if (image && image !== this.state.image) {
      this.setState({
        image
      });
    }

    const kind = this.props.navigation.getParam("kind", "");

    if (kind && kind !== this.state.kind) {
      this.setState({
        kind
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
    let image = "";
    if (this.state.image) {
      const manipResult = await ImageManipulator.manipulateAsync(
        this.state.image,
        [{ rotate: 0 }, { flip: { vertical: true } }],
        { format: "png", base64: true }
      );

      image = manipResult.base64 || "";
    }

    db.transaction((tx: SQLite.Transaction) => {
      const item: Item = {
        title: this.state.input.title,
        kind: this.state.kind || getKind(this.state.input.title),
        image
      };

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
      kind: getKind(this.state.input.title),
      onSelectIcon: (kind: string) => {
        this.props.navigation.navigate("CreatePlan", {
          kind: kind
        });
      },
      onDismiss: () => {
        this.props.navigation.navigate("CreatePlan");
      },
      photo: true
    });
  };

  onCamera = () => {
    this.props.navigation.navigate("Camera", {
      onPicture: (image?: string) => {
        this.props.navigation.navigate("CreatePlan", {
          image
        });
      },
      onDismiss: () => {
        this.props.navigation.navigate("CreatePlan");
      }
    });
  };

  render() {
    return (
      <Page
        mode="new"
        title={this.state.input.title}
        image={this.state.image}
        kind={this.state.kind}
        suggestList={this.state.suggestList}
        onInput={this.onInput}
        onImage={this.onImage}
        onSave={this.onSave}
        onIcons={this.onIcons}
        onCamera={this.onCamera}
      />
    );
  }
}
