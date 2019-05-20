import { SQLite, Constants } from "expo";
import React, { Component } from "react";
import uuidv1 from "uuid/v1";
import FontAwesomeIcons from "react-native-vector-icons/FontAwesome";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import {
  createAppContainer,
  createBottomTabNavigator,
  createStackNavigator
} from "react-navigation";
import { AsyncStorage, StatusBar } from "react-native";
import Sentry from "sentry-expo";
import { ActionSheetProvider } from "@expo/react-native-action-sheet";
import { Provider as PaperProvider } from "react-native-paper";
import ItemsProvider from "./containers/Items";
import Home from "./components/pages/Home/Connected";
import Setting from "./components/pages/Setting/Connected";
import CreatePlan from "./components/pages/CreatePlan/Connected";
import CreateSchedule from "./components/pages/CreateSchedule/Connected";
import ScheduleDetail from "./components/pages/ScheduleDetail/Switch";
import AddScheduleDetail from "./components/pages/AddScheduleDetail/Connected";
import CreateScheduleDetail from "./components/pages/CreateScheduleDetail/Connected";
import Icons from "./components/pages/Icons/Connected";
import Camera from "./components/pages/Camera/Connected";
import AppInfo from "./components/pages/AppInfo/Page";
import { db, init } from "./lib/db";
import {
  select1st as selectUser1st,
  insert as insertUser,
  User
} from "./lib/db/user";

Sentry.enableInExpoDevelopment = true;

if (process.env.SENTRY_URL) {
  Sentry.config(String(process.env.SENTRY_URL)).install();
}

StatusBar.setBarStyle("dark-content", true);
StatusBar.setBackgroundColor("#ffffff", true);

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
      tabBarIcon: ({ focused }) => {
        const { routeName } = navigation.state;
        if (routeName === "マイプラン") {
          return (
            <FontAwesomeIcons
              name="calendar-o"
              size={25}
              color={focused ? "#4DB6AC" : "#ccc"}
            />
          );
        } else if (routeName === "設定") {
          return (
            <MaterialCommunityIcons
              name="settings"
              size={25}
              color={focused ? "#4DB6AC" : "#ccc"}
            />
          );
        }

        return null;
      }
    }),
    tabBarOptions: {
      activeTintColor: "#4DB6AC",
      inactiveTintColor: "gray"
    }
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
    Camera: {
      screen: Camera
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

  checkUser = (data: any, error: any) => {
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
    } else {
      AsyncStorage.setItem("userID", data.uuid);
      this.setState({
        loading: false
      });
    }
  };

  setUser = (_: any, error: any) => {
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
      <PaperProvider>
        <ActionSheetProvider>
          <ItemsProvider>
            <AppContainer />
          </ItemsProvider>
        </ActionSheetProvider>
      </PaperProvider>
    );
  }
}
