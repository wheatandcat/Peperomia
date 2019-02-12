import React, { Component } from "react";
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
import CreatePlan from "./components/pages/CreatePlan/Connected";
import CreateSchedule from "./components/pages/CreateSchedule/Connected";
import ScheduleDetail from "./components/pages/ScheduleDetail/Switch";
import CreateScheduleDetail from "./components/pages/CreateScheduleDetail/Connected";
import Icons from "./components/pages/Icons/Connected";

const TabNavigator = createBottomTabNavigator(
  {
    マイプラン: {
      screen: Home,
      navigationOptions: {
        tabBarTestID: "MyPlan"
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
            <FontAwesomeIcons name="calendar-o" size={horizontal ? 20 : 25} />
          );
        } else if (routeName === "設定") {
          return (
            <MaterialCommunityIcons
              name="settings"
              size={horizontal ? 20 : 25}
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

TabNavigator.navigationOptions = (props: any) => {
  return {
    header: null
  };
};

const IconsNavigator = createStackNavigator(
  {
    Icons: {
      screen: Icons
    }
  },
  {
    mode: "modal"
  }
);

const CreateNavigator = createStackNavigator({
  CreatePlan: {
    screen: CreatePlan
  },
  CreateSchedule: {
    screen: CreateSchedule
  }
});

const Navigator = createStackNavigator(
  {
    TabNavigator,
    CreateNavigator: {
      screen: CreateNavigator
    },
    ScheduleDetail: {
      screen: ScheduleDetail
    },
    CreateScheduleDetail: {
      screen: CreateScheduleDetail
    },
    IconsNavigator: {
      screen: IconsNavigator
    }
  },
  {
    initialRouteName: "TabNavigator",
    mode: "modal",
    headerMode: "none"
  }
);

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
