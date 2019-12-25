import Constants from "expo-constants";
import * as SQLite from "expo-sqlite";
import React, { Component } from "react";
import uuidv1 from "uuid/v1";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import { AppearanceProvider } from "react-native-appearance";
import {  createAppContainer } from "react-navigation";
import { createStackNavigator } from "react-navigation-stack";
import { createBottomTabNavigator, BottomTabBar } from "react-navigation-tabs";
import { AsyncStorage, StatusBar, Text } from "react-native";
import * as Sentry from "sentry-expo";
import { MaterialIcons } from "@expo/vector-icons";
import { ActionSheetProvider } from "@expo/react-native-action-sheet";
import ItemsProvider from "./containers/Items";
import AuthProvider from "./containers/Auth";
import FetchProvider from "./containers/Fetch";
import ThemeProvider from "./containers/Theme";
import Version from "./containers/Version";
import Home from "./components/pages/Home/Connected";
import Calendars from "./components/pages/Calendars/Connected";
import Setting from "./components/pages/Setting/Connected";
import CreatePlan from "./components/pages/CreatePlan/Connected";
import CreateSchedule from "./components/pages/CreateSchedule/Connected";
import ScheduleDetail from "./components/pages/ScheduleDetail/Switch";
import AddScheduleDetail from "./components/pages/AddScheduleDetail/Connected";
import CreateScheduleDetail from "./components/pages/CreateScheduleDetail/Connected";
import Icons from "./components/pages/Icons/Connected";
import AppInfo from "./components/pages/AppInfo/Page";
import { db, init, ResultError } from "./lib/db";
import "./lib/firebase";
import {
  select1st as selectUser1st,
  insert as insertUser,
  User
} from "./lib/db/user";
import theme from "./config/theme";
import app from "../app.json";

if (process.env.SENTRY_URL) {
  Sentry.setRelease(String(Constants.manifest.revisionId));
  Sentry.init({
    dsn: String(process.env.SENTRY_URL),
    debug: true
  });
}

StatusBar.setBarStyle("light-content", true);
StatusBar.setBackgroundColor(theme().color.white, true);

const TabBarComponent = (props: any) => <BottomTabBar {...props} />;

const TabNavigator = createBottomTabNavigator(
  {
    マイプラン: {
      screen: Home,
      navigationOptions: {
        tabBarTestID: "MyPlan"
      }
    },
    カレンダー: {
      screen: Calendars,
      navigationOptions: {
        tabBarTestID: "Calendars"
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
    tabBarComponent: props => (
      <TabBarComponent
        {...props}
        style={{ backgroundColor: theme().mode.tabBar.background }}
      />
    ),
    defaultNavigationOptions: ({ navigation }) => ({
      tabBarLabel: ({ focused }:any ) => {
        const { routeName } = navigation.state;
        return (
          <Text
            style={{
              fontSize: 12,
              fontWeight: "500",
              textAlign: "center",
              color: focused
                ? theme().mode.tabBar.activeTint
                : theme().mode.tabBar.inactiveTint
            }}
          >
            {routeName}
          </Text>
        );
      },
      tabBarIcon: ({ focused }) => {
        const { routeName } = navigation.state;
        if (routeName === "マイプラン") {
          return (
            <MaterialIcons
              name="create"
              size={30}
              color={
                focused
                  ? theme().mode.tabBar.activeTint
                  : theme().mode.tabBar.inactiveTint
              }
            />
          );
        } else if (routeName === "カレンダー") {
          return (
            <MaterialIcons
              name="date-range"
              size={30}
              color={
                focused
                  ? theme().mode.tabBar.activeTint
                  : theme().mode.tabBar.inactiveTint
              }
            />
          );
        } else if (routeName === "設定") {
          return (
            <MaterialCommunityIcons
              name="settings-outline"
              size={30}
              color={
                focused
                  ? theme().mode.tabBar.activeTint
                  : theme().mode.tabBar.inactiveTint
              }
            />
          );
        }

        return null;
      }
    })
  }
);

TabNavigator.navigationOptions = () => {
  return {
    header: null
  };
};

const IconsNavigator = createStackNavigator(
  {
    Icons: {
      screen: Icons
    },
  },
  {
    mode: "modal"
  }
);

const CreateDetailNavigator = createStackNavigator(
  {
    CreatePlan: {
      screen: CreatePlan
    },
    CreateSchedule: {
      screen: CreateSchedule
    }
  },
  {
    headerMode: "none"
  }
);

const CreateNavigator = createStackNavigator(
  {
    CreatePlan: {
      screen: CreateDetailNavigator
    }
  },
  {
    mode: "modal",
    headerMode: "none"
  }
);

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
    },
    AddScheduleDetail: {
      screen: AddScheduleDetail
    }
  },
  {
    initialRouteName: "TabNavigator",
    mode: "modal",
    headerMode: "none"
  }
);

const AppContainer = createAppContainer(Navigator);

interface Props {}

interface State {
  guide: boolean;
  loading: boolean;
}

export default class App extends Component<Props, State> {
  state = {
    guide: false,
    loading: true
  };

  componentDidMount() {
    db.transaction((tx: SQLite.Transaction) => {
      init(tx);
      selectUser1st(tx, this.checkUser);
    });
  }

  checkUser = (data: User | null, error: ResultError) => {
    if (error) {
      return;
    }

    if (!data) {
      const uuid = Constants.installationId + uuidv1();
      const user: User = {
        uuid
      };
      db.transaction((tx: SQLite.Transaction) => {
        insertUser(tx, user, this.setUser);
      });

      AsyncStorage.setItem("userID", user.uuid);
      // 現在のバージョンを設定
      AsyncStorage.setItem("APP_VERSION", app.expo.version);
    } else {
      AsyncStorage.setItem("userID", data.uuid);
      this.setState({
        loading: false
      });
    }
  };

  setUser = (_: number, error: ResultError) => {
    if (error) {
      return;
    }

    this.setState({
      guide: true,
      loading: false
    });
  };

  onDoneGuide = () => {
    this.setState({
      guide: false
    });
  };

  render() {
    if (this.state.loading) {
      return null;
    }

    if (this.state.guide) {
      return <AppInfo onDone={this.onDoneGuide} />;
    }

    return (
      <AppearanceProvider>
        <ActionSheetProvider>
          <Version>
            <AuthProvider>
              <FetchProvider>
                <ItemsProvider>
                  <ThemeProvider>
                    <AppContainer />
                  </ThemeProvider>
                </ItemsProvider>
              </FetchProvider>
            </AuthProvider>
          </Version>
        </ActionSheetProvider>
      </AppearanceProvider>
    );
  }
}
