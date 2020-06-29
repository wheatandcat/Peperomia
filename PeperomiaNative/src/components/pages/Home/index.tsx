import React from 'react';
import { RouteProp } from '@react-navigation/native';
import {
  createStackNavigator,
  StackNavigationProp,
} from '@react-navigation/stack';
import EStyleSheet from 'react-native-extended-stylesheet';
import { View, Image } from 'react-native';
import { Feather } from '@expo/vector-icons';
import theme, { darkMode } from 'config/theme';
import { RootStackParamList } from 'lib/navigation';
import { ContextProps as ItemContextProps } from 'containers/Items';
import Hint from 'components/atoms/Hint/Hint';
import Schedule, {
  ScheduleNavigationOptions,
} from 'components/pages/Schedule/Switch';
import HomeScreen from './Connected';

export type PlanProps = Pick<
  ItemContextProps,
  'items' | 'about' | 'refreshData'
> & {
  loading: boolean;
  refresh: string;
};

type ScreenNavigationProp = StackNavigationProp<RootStackParamList, 'Home'>;
type ScreenRouteProp = RouteProp<RootStackParamList, 'Home'>;

type Props = {
  navigation: ScreenNavigationProp;
  route: ScreenRouteProp;
};

const LogoTitle = () => (
  <Image
    source={
      darkMode() ? require('img/header_dark.png') : require('img/header.png')
    }
    style={styles.logo}
    resizeMode="contain"
  />
);

const HomeNavigationOptions = ({ route }: Props) => {
  return {
    headerTitle: () => <LogoTitle />,
    headerStyle: {
      backgroundColor: theme().mode.header.backgroundColor,
    },
    headerRight: () => {
      if (!route.params.onPushCreatePlan) {
        return null;
      }

      return (
        <View style={styles.headerRight}>
          <Hint onPress={route.params.onPushCreatePlan} testID="ScheduleAdd">
            <Feather
              name="plus"
              size={28}
              color={
                darkMode()
                  ? theme().color.highLightGray
                  : theme().color.lightGreen
              }
            />
          </Hint>
        </View>
      );
    },
  };
};

const RootStack = createStackNavigator<RootStackParamList>();

const RootStackScreen = () => {
  return (
    <RootStack.Navigator initialRouteName="Home">
      <RootStack.Screen
        name="Home"
        component={HomeScreen}
        options={HomeNavigationOptions}
        initialParams={{
          refresh: false,
        }}
      />
      <RootStack.Screen
        name="Schedule"
        component={Schedule}
        options={ScheduleNavigationOptions}
      />
    </RootStack.Navigator>
  );
};

export default RootStackScreen;

const styles = EStyleSheet.create({
  logo: {
    height: 40,
    zIndex: 10,
  },
  headerRight: {
    right: 12,
  },
});
