import React, { Component } from "react";
import { NavigationScreenProp, NavigationRoute } from "react-navigation";
import { TouchableOpacity, View } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import Page, { Props as PageProps } from "./Page";

interface Props extends PageProps {
  navigation: NavigationScreenProp<NavigationRoute>;
}

export default class extends Component<Props> {
  static navigationOptions = ({
    navigation
  }: {
    navigation: NavigationScreenProp<NavigationRoute>;
  }) => {
    const { params = {} } = navigation.state;

    return {
      title: "アイコン写真を取る",
      headerLeft: (
        <View style={{ left: 10 }}>
          <TouchableOpacity onPress={params.onDismiss}>
            <MaterialCommunityIcons name="close" size={25} />
          </TouchableOpacity>
        </View>
      )
    };
  };

  componentDidMount() {
    const onDismiss = this.props.navigation.getParam("onDismiss", () => {});

    this.props.navigation.setParams({
      onDismiss: onDismiss
    });
  }

  onPicture = (image?: string) => {
    const onPicture = this.props.navigation.getParam("onPicture", () => {});

    onPicture(image);
  };

  render() {
    return <Page onPicture={this.onPicture} />;
  }
}
