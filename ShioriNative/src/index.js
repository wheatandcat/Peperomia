import React, { Component } from "react";
import { Text, View } from "react-native";
import FontAwesomeIcons from "react-native-vector-icons/FontAwesome";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import {
  createAppContainer,
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
      screen: Home,
      navigationOptions: {
        tabBarTestID: "MyPlan"
      }
    },
    検索: {
      screen: Search,
      navigationOptions: {
        tabBarTestID: "Search"
      }
    },
    設定: {
      screen: Setting,
      navigationOptions: {
        tabBarTestID: "Setting"
      }
    }
  },
  {
    defaultNavigationOptions: ({ navigation }) => ({
      tabBarIcon: ({ focused, horizontal, tintColor }) => {
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
    }),
    tabBarOptions: {
      activeTintColor: "#23527c",
      inactiveTintColor: "gray"
    }
  }
);

TabNavigator.navigationOptions = () => {
  return { header: null };
};

const Navigator = createStackNavigator({
  TabNavigator
});

const AppContainer = createAppContainer(Navigator);

export default class App extends Component {
  render() {
    return (
      <PaperProvider>
        <ActionSheetProvider>
          <AppContainer />
        </ActionSheetProvider>
      </PaperProvider>
    );
  }
}
