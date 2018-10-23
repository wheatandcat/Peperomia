import React, { Component } from "react";
import { NavigationScreenProp, NavigationRoute } from "react-navigation";
import { Text, TouchableOpacity, View } from "react-native";
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
      title: "葛西臨海公園",
      headerRight: (
        <View style={{ right: 10 }}>
          <TouchableOpacity
            onPress={() => {
              navigation.navigate("CreateSchedule");
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

  onCreateScheduleDetail = () => {
    this.props.navigation.navigate("CreateScheduleDetail");
  };

  render() {
    return <Page onCreateScheduleDetail={this.onCreateScheduleDetail} />;
  }
}
