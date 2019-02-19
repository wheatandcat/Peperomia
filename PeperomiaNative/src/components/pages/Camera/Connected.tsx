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
    return {
      title: "アイコン写真を取る",
      headerLeft: (
        <View style={{ left: 10 }}>
          <TouchableOpacity
            onPress={() => {
              navigation.navigate("CreatePlan");
            }}
          >
            <MaterialCommunityIcons name="close" size={25} />
          </TouchableOpacity>
        </View>
      )
    };
  };

  onPicture = (image?: string) => {
    this.props.navigation.navigate("CreatePlan", {
      image
    });
  };

  render() {
    return <Page onPicture={this.onPicture} />;
  }
}
