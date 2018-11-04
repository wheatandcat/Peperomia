import React, { Component } from "react";
import { Text, View } from "react-native";
import FontAwesomeIcons from "react-native-vector-icons/FontAwesome";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import {
  createBottomTabNavigator,
  createStackNavigator
} from "react-navigation";
import { ActionSheetProvider } from "@expo/react-native-action-sheet";
import { Provider as PaperProvider } from "react-native-paper";
import Home from "./components/pages/Home/Connected";
import Setting from "./components/pages/Setting/Connected";

class SearchScreen extends React.Component {
  static navigationOptions = {
    title: "Setting"
  };

  render() {
    return (
      <View
        style={{
          flex: 1,
          justifyContent: "center",
          alignItems: "center",
          backgroundColor: "#ffffff"
        }}
      >
        <Text>template!</Text>
      </View>
    );
  }
}

const Search = createStackNavigator({
  Search: SearchScreen
});

const TabNavigator = createBottomTabNavigator(
  {
    マイプラン: {
      screen: Home
    },
    検索: {
      screen: Search
    },
    設定: {
      screen: Setting
    }
  },
  {
    initialRouteName: "マイプラン",
    navigationOptions: ({ navigation }) => {
      return {
        activeTintColor: "#23527c",
        inactiveTintColor: "gray",
        tabBarVisible: navigation.state.index !== 1,
        tabBarIcon: ({ horizontal, tintColor }) => {
          const { routeName } = navigation.state;
          if (routeName === "マイプラン") {
            return (
              <FontAwesomeIcons
                name="calendar-o"
                size={horizontal ? 20 : 25}
                color={tintColor}
              />
            );
          } else if (routeName === "設定") {
            return (
              <MaterialCommunityIcons
                name="settings"
                size={horizontal ? 20 : 25}
                color={tintColor}
              />
            );
          } else if (routeName === "検索") {
            return (
              <FontAwesomeIcons
                name="search"
                size={horizontal ? 20 : 25}
                color={tintColor}
              />
            );
          }

          return null;
        }
      };
    }
  }
);

TabNavigator.navigationOptions = () => {
  return { header: null };
};

const Navigator = createStackNavigator({
  TabNavigator
});

export default class extends Component {
  render() {
    return (
      <PaperProvider>
        <ActionSheetProvider>
          <Navigator />
        </ActionSheetProvider>
      </PaperProvider>
    );
  }
}
