import React, { Component } from "react";
import { Text, View } from "react-native";
import { createStackNavigator } from "react-navigation";

class HomeScreen extends Component {
  static navigationOptions = {
    title: "プラン一覧"
  };

  render() {
    return (
      <View>
        <Text>Home!</Text>
      </View>
    );
  }
}

export default createStackNavigator({
  Home: HomeScreen
});
