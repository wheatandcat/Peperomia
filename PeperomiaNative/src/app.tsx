import Constants from 'expo-constants';
import * as SQLite from 'expo-sqlite';
import React, { Component } from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import EStyleSheet from 'react-native-extended-stylesheet';
import { Appearance, AppearanceProvider } from 'react-native-appearance';
import { ActionSheetProvider } from '@expo/react-native-action-sheet';
import { StatusBar, AsyncStorage, Text } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import {
  createBottomTabNavigator,
  BottomTabNavigationOptions,
} from '@react-navigation/bottom-tabs';
import { MaterialIcons, MaterialCommunityIcons } from '@expo/vector-icons';
import * as Sentry from 'sentry-expo';
import uuidv1 from 'uuid/v1';
import app from '../app.json';
import AppInfo from './components/pages/AppInfo/Page';
import { db, init } from './lib/db';
import Version from './containers/Version';
import AuthProvider from './containers/Auth';
import FetchProvider from './containers/Fetch';
import ItemsProvider from './containers/Items';
import ThemeProvider from './containers/Theme';
import './lib/firebase';
import { RootStackParamList } from './lib/navigation';
import theme from './config/theme';
import Home from './components/pages/Home/Connected';
import Setting from './components/pages/Setting/Connected';
import Calendars from './components/pages/Calendars/Connected';
import { setDebugMode } from './lib/auth';
import './lib/firebase';
import {
  select1st as selectUser1st,
  insert as insertUser,
  User,
} from './lib/db/user';
import EditPlan from './components/pages/EditPlan/Connected';
import CreatePlan from './components/pages/CreatePlan/Connected';
import CreateSchedule from './components/pages/CreateSchedule/Connected';
import ScheduleDetail from './components/pages/ScheduleDetail/Switch';
import AddScheduleDetail from './components/pages/AddScheduleDetail/Connected';
import CreateScheduleDetail from './components/pages/CreateScheduleDetail/Connected';
import Icons, {
  IconsNavigationOptions,
} from './components/pages/Icons/Connected';

if (process.env.SENTRY_URL) {
  Sentry.setRelease(String(Constants.manifest.revisionId));
  Sentry.init({
    dsn: String(process.env.SENTRY_URL),
    debug: true,
  });
}

Appearance.getColorScheme();

StatusBar.setBarStyle('light-content', true);
StatusBar.setBackgroundColor(theme().color.white, true);

const Tab = createBottomTabNavigator();

type Props = {};

type State = {
  guide: boolean;
  loading: boolean;
};

const tabNames = [
  {
    name: 'Home',
    screenName: 'マイプラン',
  },
  {
    name: 'Calendars',
    screenName: 'カレンダー',
  },
  {
    name: 'Setting',
    screenName: '設定',
  },
];

type NavigationOptions = {
  route: any;
  navigation: any;
};

const tabOption = ({
  route,
}: NavigationOptions): BottomTabNavigationOptions => ({
  tabBarLabel: ({ focused }) => {
    const routeName = route.name;

    const item = tabNames.find(v => v.name === routeName);
    return (
      <Text style={focused ? styles.tabTitleFold : styles.tabTitle}>
        {item?.screenName || 'home'}
      </Text>
    );
  },
});

const tabNavigationOptions = ({
  route,
}: NavigationOptions): BottomTabNavigationOptions => ({
  tabBarIcon: ({ focused }) => {
    const routeName = route.name;

    if (routeName === 'Home') {
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
    } else if (routeName === 'Calendars') {
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
    } else if (routeName === 'Setting') {
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
  },
});

const RootStack = createStackNavigator<RootStackParamList>();

const RootStackScreen = () => {
  return (
    <RootStack.Navigator initialRouteName="Main" mode="modal">
      <RootStack.Screen
        name="Main"
        component={MainStackScreen}
        options={{ headerShown: false }}
      />
      <RootStack.Screen
        name="EditPlan"
        component={EditPlan}
        options={{ headerShown: false }}
      />
      <RootStack.Screen
        name="ScheduleDetail"
        component={ScheduleDetail}
        options={{ headerShown: false }}
      />
      <RootStack.Screen
        name="CreatePlan"
        component={CreatePlan}
        options={{ headerShown: false }}
      />
      <RootStack.Screen
        name="AddScheduleDetail"
        component={AddScheduleDetail}
        options={{ headerShown: false }}
      />
      <RootStack.Screen
        name="CreateScheduleDetail"
        component={CreateScheduleDetail}
        options={{ headerShown: false }}
      />
      <RootStack.Screen
        name="Icons"
        component={Icons}
        options={IconsNavigationOptions}
      />
      <RootStack.Screen
        name="CreateSchedule"
        component={CreateSchedule}
        options={{ headerShown: false }}
      />
    </RootStack.Navigator>
  );
};

const MainStackScreen = () => (
  <Tab.Navigator screenOptions={tabNavigationOptions}>
    <Tab.Screen name="Home" component={Home} options={tabOption} />
    <Tab.Screen name="Calendars" component={Calendars} options={tabOption} />
    <Tab.Screen name="Setting" component={Setting} options={tabOption} />
  </Tab.Navigator>
);

export default class App extends Component<Props, State> {
  state = {
    guide: false,
    loading: true,
  };

  async componentDidMount() {
    db.transaction((tx: SQLite.SQLTransaction) => {
      init(tx);
      selectUser1st(tx, this.checkUser);
    });

    if (!Constants.isDevice) {
      const debugMode = await AsyncStorage.getItem('DEBUG_MODE');
      await setDebugMode(Boolean(debugMode));
    }
  }

  checkUser = (data: User | null, error: SQLite.SQLError | null) => {
    if (error) {
      return;
    }

    if (!data) {
      const uuid = Constants.installationId + uuidv1();
      const user: User = {
        uuid,
      };
      db.transaction((tx: SQLite.SQLTransaction) => {
        insertUser(tx, user, this.setUser);
      });

      AsyncStorage.setItem('userID', user.uuid);
      // 現在のバージョンを設定
      AsyncStorage.setItem('APP_VERSION', app.expo.version);
    } else {
      AsyncStorage.setItem('userID', data.uuid);
      this.setState({
        loading: false,
      });
    }
  };

  setUser = (_: number, error: SQLite.SQLError | null) => {
    if (error) {
      return;
    }

    this.setState({
      guide: true,
      loading: false,
    });
  };

  onDoneGuide = () => {
    this.setState({
      guide: false,
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
      <NavigationContainer>
        <AppearanceProvider>
          <ActionSheetProvider>
            <Version>
              <AuthProvider>
                <FetchProvider>
                  <ItemsProvider>
                    <ThemeProvider>
                      <RootStackScreen />
                    </ThemeProvider>
                  </ItemsProvider>
                </FetchProvider>
              </AuthProvider>
            </Version>
          </ActionSheetProvider>
        </AppearanceProvider>
      </NavigationContainer>
    );
  }
}

const styles = EStyleSheet.create({
  tabTitle: {
    fontSize: 12,
    color: theme().color.darkGray,
  },
  tabTitleFold: {
    fontSize: 12,
    fontWeight: '600',
    color: theme().color.main,
  },
  tab: {
    backgroundColor: '$background',
  },
  tabForWide: {
    height: 100,
    backgroundColor: '$background',
  },
});
