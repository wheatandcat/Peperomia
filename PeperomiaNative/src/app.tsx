import * as Linking from 'expo-linking';
import Constants from 'expo-constants';
import * as SQLite from 'expo-sqlite';
import React, { useState, useCallback, useRef, useEffect } from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import EStyleSheet from 'react-native-extended-stylesheet';
import { AppearanceProvider, useColorScheme } from 'react-native-appearance';
import { ActionSheetProvider } from '@expo/react-native-action-sheet';
import { StatusBar, AsyncStorage, Text } from 'react-native';
import { NavigationContainer, useLinking } from '@react-navigation/native';
import {
  createBottomTabNavigator,
  BottomTabNavigationOptions,
  BottomTabBar,
  BottomTabBarProps,
} from '@react-navigation/bottom-tabs';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { MaterialIcons, MaterialCommunityIcons } from '@expo/vector-icons';
import * as Sentry from 'sentry-expo';
import uuidv1 from 'uuid/v1';
import { useDidMount } from 'hooks/index';
import app from '../app.json';
import AppInfo from './components/pages/AppInfo/Page';
import { db, init } from './lib/db';
import Version from './containers/Version';
import AuthProvider from './containers/Auth';
import FetchProvider from './containers/Fetch';
import ItemsProvider from './containers/Items';
import ThemeProvider from './containers/Theme';
import NotificationProvider from './containers/Notification';
import './lib/firebase';
import { RootStackParamList } from './lib/navigation';
import theme, {
  NavigationDefaultTheme,
  NavigationDarkTheme,
} from './config/theme';
import Home from './components/pages/Home/Connected';
import Setting from './components/pages/Setting/Connected';
import Calendars from './components/pages/Calendars/Connected';
import { setDebugMode } from './lib/auth';
import { setDeviceType } from './lib/responsive';
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

Sentry.setRelease(String(Constants.manifest.revisionId));
Sentry.init({
  dsn: String(process.env.SENTRY_URL),
  debug: true,
  enableInExpoDevelopment: Constants.appOwnership === 'expo',
});

StatusBar.setBarStyle('light-content', true);
StatusBar.setBackgroundColor(theme().color.white, true);

const Tab = createBottomTabNavigator();

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

    const item = tabNames.find((v) => v.name === routeName);
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

const MyTabBar = (props: BottomTabBarProps) => {
  return <BottomTabBar {...props} labelPosition="below-icon" />;
};

const MainStackScreen = () => (
  <Tab.Navigator screenOptions={tabNavigationOptions} tabBar={MyTabBar}>
    <Tab.Screen name="Home" component={Home} options={tabOption} />
    <Tab.Screen name="Calendars" component={Calendars} options={tabOption} />
    <Tab.Screen name="Setting" component={Setting} options={tabOption} />
  </Tab.Navigator>
);

const initState = {
  guide: false,
  loading: true,
};

const App = () => {
  const [state, setState] = useState<State>(initState);

  const setUser = useCallback((_: number, error: SQLite.SQLError | null) => {
    if (error) {
      return;
    }

    setState((s) => ({
      ...s,
      guide: true,
      loading: false,
    }));
  }, []);

  const checkUser = useCallback(
    (data: User | null, error: SQLite.SQLError | null) => {
      if (error) {
        return;
      }

      if (!data) {
        const uuid = Constants.installationId + uuidv1();
        const user: User = {
          uuid,
        };
        db.transaction((tx: SQLite.SQLTransaction) => {
          insertUser(tx, user, setUser);
        });

        AsyncStorage.setItem('userID', user.uuid);
        // 現在のバージョンを設定
        AsyncStorage.setItem('APP_VERSION', app.expo.version);
      } else {
        AsyncStorage.setItem('userID', data.uuid);
        setState((s) => ({
          ...s,
          loading: false,
        }));
      }
    },
    [setUser]
  );

  const onDoneGuide = useCallback(() => {
    setState((s) => ({
      ...s,
      guide: false,
    }));
  }, []);

  useDidMount(() => {
    const setup = async () => {
      await setDeviceType();

      db.transaction((tx: SQLite.SQLTransaction) => {
        init(tx);
        selectUser1st(tx, checkUser);
      });

      if (!Constants.isDevice) {
        const debugMode = await AsyncStorage.getItem('DEBUG_MODE');
        await setDebugMode(Boolean(debugMode));
      }
    };

    setup();
  });

  if (state.loading) {
    return null;
  }

  if (state.guide) {
    return <AppInfo onDone={onDoneGuide} />;
  }

  return (
    <AppearanceProvider>
      <Main />
    </AppearanceProvider>
  );
};

const Main = () => {
  const prefix = Linking.makeUrl('/');

  const scheme = useColorScheme();
  const ref = useRef<any>();

  const { getInitialState } = useLinking(ref, {
    prefixes: [
      prefix,
      'https://link.peperomia.info',
      'exps://link.peperomia.info',
    ],
    config: {
      Schedule: {
        path: 'schedule/:itemId',
        parse: {
          itemId: String,
        },
      },
    },
  });

  const [isReady, setIsReady] = useState(false);
  const [initialState, setInitialState] = useState<any>();

  useEffect(() => {
    getInitialState().then((state: any) => {
      console.log(state);

      if (state !== undefined) {
        setInitialState(state);
      }

      setIsReady(true);
    });
  }, [getInitialState]);

  if (!isReady) {
    return null;
  }

  return (
    <NavigationContainer
      initialState={initialState}
      theme={scheme === 'dark' ? NavigationDarkTheme : NavigationDefaultTheme}
      ref={ref}
    >
      <SafeAreaProvider>
        <ActionSheetProvider>
          <Version>
            <NotificationProvider>
              <AuthProvider>
                <FetchProvider>
                  <ItemsProvider>
                    <ThemeProvider>
                      <RootStackScreen />
                    </ThemeProvider>
                  </ItemsProvider>
                </FetchProvider>
              </AuthProvider>
            </NotificationProvider>
          </Version>
        </ActionSheetProvider>
      </SafeAreaProvider>
    </NavigationContainer>
  );
};

export default App;

const styles = EStyleSheet.create({
  tabTitle: {
    fontSize: 12,
    color: '$tabTitleColor',
  },
  tabTitleFold: {
    fontSize: 12,
    fontWeight: '600',
    color: '$tabTitleActiveColor',
  },
  tab: {
    backgroundColor: '$background',
  },
  tabForWide: {
    height: 120,
    backgroundColor: '$background',
  },
});
