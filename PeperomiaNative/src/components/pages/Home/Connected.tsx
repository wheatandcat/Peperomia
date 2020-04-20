import React, { memo, useState, useCallback, useEffect } from 'react';
import { RouteProp, useNavigation } from '@react-navigation/native';
import {
  createStackNavigator,
  StackNavigationProp,
} from '@react-navigation/stack';
import EStyleSheet from 'react-native-extended-stylesheet';
import { Dimensions, Alert, View, Image, AsyncStorage } from 'react-native';
import { Feather } from '@expo/vector-icons';
import uuidv1 from 'uuid/v1';
import theme, { darkMode } from 'config/theme';
import { deleteItem } from 'lib/item';
import { RootStackParamList } from 'lib/navigation';
import { useItems, ContextProps as ItemContextProps } from 'containers/Items';
import { useAuth } from 'containers/Auth';
import { SelectItem } from 'domain/item';
import { useDidMount } from 'hooks/index';
import Hint from '../../atoms/Hint/Hint';
import Schedule, { ScheduleNavigationOptions } from '../Schedule/Switch';
import Page from './Page';

const deviceHeight = Dimensions.get('window').height;
const deviceWidth = Dimensions.get('window').width;

export type PlanProps = Pick<
  ItemContextProps,
  'items' | 'about' | 'refreshData'
> & {
  loading: boolean;
  refresh: string;
};

type PlanState = {
  refresh: string;
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

type HomeScreeState = {
  mask: boolean;
};

type ScreenNavigationProp = StackNavigationProp<RootStackParamList, 'Home'>;
type ScreenRouteProp = RouteProp<RootStackParamList, 'Home'>;

type Props = {
  navigation: ScreenNavigationProp;
  route: ScreenRouteProp;
};

const HomeScreen = ({ navigation, route }: Props) => {
  const { items, about, refreshData, itemsLoading } = useItems();
  const [state, setState] = useState<HomeScreeState>({ mask: false });

  const refresh = route?.params?.refresh || '';

  useDidMount(() => {
    const onPushCreatePlan = async () => {
      setState({ mask: false });

      await AsyncStorage.setItem('FIRST_CRAEATE_ITEM', 'true');
      navigation.navigate('CreatePlan');
    };

    navigation.setParams({ onPushCreatePlan });

    const checkMask = async () => {
      const m = await AsyncStorage.getItem('FIRST_CRAEATE_ITEM');
      setState({ mask: !m });
    };

    checkMask();
  });

  return (
    <View>
      <HomeScreenPlan
        loading={Boolean(itemsLoading)}
        items={items}
        about={about}
        refresh={String(refresh)}
        refreshData={refreshData}
      />
      {state.mask && <View style={styles.mask} />}
    </View>
  );
};

export type HomeScreenPlanType = {
  onSchedule: (itemId: string, title: string) => void;
  onDelete: (itemId: string) => void;
};

export type ItemProps = SelectItem & {
  id: string;
  about: string;
};

const HomeScreenPlan = memo((props: PlanProps) => {
  const { navigate } = useNavigation();
  const { uid } = useAuth();
  const [state, setState] = useState<PlanState>({ refresh: '' });

  useEffect(() => {
    if (state.refresh === props.refresh) {
      return;
    }
    setState({ refresh: props.refresh });

    if (props.refreshData) {
      props.refreshData();
    }
  }, [props, props.refresh, state.refresh]);

  const onDelete = useCallback(
    async (itemId: string) => {
      const ok = await deleteItem(uid, { id: itemId });
      if (!ok) {
        Alert.alert('削除に失敗しました');
        return;
      }

      setState({ refresh: uuidv1() });
    },
    [uid]
  );

  const onSchedule = useCallback(
    (id: string, title: string) => {
      navigate('Schedule', { itemId: id, title });
    },
    [navigate]
  );

  const items = (props.items || []).map((item) => {
    const about = (props.about || []).find((val) => val.itemId === item.id);

    return {
      ...item,
      id: String(item.id),
      about: about ? about.about : '',
    };
  });

  return (
    <Page
      data={items}
      loading={props.loading}
      onSchedule={onSchedule}
      onDelete={onDelete}
    />
  );
});

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
  mask: {
    position: 'absolute',
    width: deviceWidth,
    height: deviceHeight,
    backgroundColor: 'rgba(0,0,0,0.8)',
  },
});
