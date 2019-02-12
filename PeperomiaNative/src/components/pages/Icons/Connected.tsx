import React, { Component } from "react";
import { NavigationScreenProp, NavigationRoute } from "react-navigation";
import { TouchableOpacity, View } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import Page, { Props as PageProps } from "./Page";

interface Props extends PageProps {
  navigation: NavigationScreenProp<NavigationRoute>;
}

interface State {}

export default class extends Component<Props, State> {
  static navigationOptions = ({
    navigation
  }: {
    navigation: NavigationScreenProp<NavigationRoute>;
  }) => {
    return {
      title: "アイコン",
      headerStyle: {
        borderBottomWidth: 0,
        backgroundColor: "#eeeeee"
      },
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

  render() {
    return <Page kind="" />;
  }
}
