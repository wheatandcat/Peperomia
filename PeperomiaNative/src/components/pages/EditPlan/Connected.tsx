import { SQLite, ImageManipulator } from "expo";
import React, { Component } from "react";
import { NavigationScreenProp, NavigationRoute } from "react-navigation";
import { TouchableOpacity, View } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { db } from "../../../lib/db";
import { update as updateItem, Item } from "../../../lib/db/item";
import getKind from "../../../lib/getKind";
import Page, { Props as PageProps } from "../../templates/CreatePlan/Page";

interface Props extends PageProps {
  navigation: NavigationScreenProp<NavigationRoute>;
}

interface State {
  input: {
    title: string;
  };
  image: string;
  kind: string;
}

export default class extends Component<Props, State> {
  static navigationOptions = ({
    navigation
  }: {
    navigation: NavigationScreenProp<NavigationRoute>;
  }) => {
    return {
      title: "タイトル編集",
      headerLeft: (
        <View style={{ left: 10 }}>
          <TouchableOpacity
            onPress={() => {
              navigation.goBack();
            }}
          >
            <MaterialCommunityIcons name="close" size={25} />
          </TouchableOpacity>
        </View>
      )
    };
  };

  state = { input: { title: "" }, image: "", kind: "" };

  componentDidMount() {
    const image = this.props.navigation.getParam("image", "");
    const title = this.props.navigation.getParam("title", "");
    const kind = this.props.navigation.getParam("kind", "");
    this.setState({
      input: { title },
      image,
      kind
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
      const id = this.props.navigation.getParam("id", 0);

      const item: Item = {
        id,
        title: this.state.input.title,
        kind: this.state.kind || getKind(this.state.input.title),
        image
      };

      updateItem(tx, item, this.save);
    });
  };

  save = async (_: any, error: any) => {
    if (error) {
      return;
    }

    const id = this.props.navigation.getParam("id", 0);

    this.props.navigation.navigate("Schedule", {
      itemId: id,
      title: this.state.input.title
    });
  };

  onIcons = () => {
    this.props.navigation.navigate("Icons", {
      kind: getKind(this.state.input.title),
      onSelectIcon: (kind: string) => {
        this.props.navigation.navigate("EditPlan", {
          kind: kind
        });
      },
      onDismiss: () => {
        this.props.navigation.navigate("EditPlan");
      },
      photo: true
    });
  };

  onCamera = () => {
    this.props.navigation.navigate("Camera", {
      onPicture: (image?: string) => {
        this.props.navigation.navigate("EditPlan", {
          image
        });
      },
      onDismiss: () => {
        this.props.navigation.navigate("EditPlan");
      }
    });
  };

  render() {
    return (
      <Page
        mode="edit"
        title={this.state.input.title}
        image={this.state.image}
        kind={this.state.kind}
        onInput={this.onInput}
        onImage={this.onImage}
        onSave={this.onSave}
        onIcons={this.onIcons}
        onCamera={this.onCamera}
      />
    );
  }
}
