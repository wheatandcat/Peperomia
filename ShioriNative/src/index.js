import React from "react";
import { Text, View } from "react-native";
import FontAwesomeIcons from "react-native-vector-icons/FontAwesome";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import {
  createBottomTabNavigator,
  createStackNavigator
} from "react-navigation";
import Home from "./components/pages/Home/Connected";

class SettingsScreen extends React.Component {
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

const SettingsStack = createStackNavigator({
  Settings: SettingsScreen
});

const Search = createStackNavigator({
  Search: SettingsScreen
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
      screen: SettingsStack
    }
  },
  {
    navigationOptions: ({ navigation }) => ({
      tabBarIcon: ({ horizontal, tintColor }) => {
        const { routeName } = navigation.state;
        let iconName;
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

TabNavigator.navigationOptions = ({ navigation }) => {
  return { header: null };
};

export default createStackNavigator({
  TabNavigator
});
