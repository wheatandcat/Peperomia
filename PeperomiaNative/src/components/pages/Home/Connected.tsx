import * as SQLite from 'expo-sqlite';
import React, {
  memo,
  useContext,
  useState,
  useCallback,
  useEffect,
} from 'react';
import { Alert } from 'react-native';
import {
  NavigationScreenProp,
  NavigationRoute,
  NavigationContext,
} from 'react-navigation';
import { useNavigation, useNavigationParam } from 'react-navigation-hooks';
import { createStackNavigator } from 'react-navigation-stack';
import EStyleSheet from 'react-native-extended-stylesheet';
import { Dimensions, View, Image, AsyncStorage } from 'react-native';
import { Feather } from '@expo/vector-icons';
import uuidv1 from 'uuid/v1';
import theme, { darkMode } from '../../../config/theme';
import { db } from '../../../lib/db';
import { Item } from '../../../lib/db/item';
import { deleteItem } from '../../../lib/item';
import { deleteByItemId as deleteItemDetailByItemId } from '../../../lib/db/itemDetail';
import { deleteByItemId as deleteCalendarByItemId } from '../../../lib/db/calendar';
import {
  Context as ItemsContext,
  ContextProps as ItemContextProps,
} from '../../../containers/Items';
import {
  Context as ThemeContext,
  ContextProps as ThemeContextProps,
} from '../../../containers/Theme';
import { Item as ItemParam } from '../../../domain/item';
import { useDidMount } from '../../../hooks/index';
import Hint from '../../atoms/Hint/Hint';
import Schedule from '../Schedule/Switch';
import EditPlan from '../EditPlan/Connected';
import Page from './Page';

const deviceHeight = Dimensions.get('window').height;
const deviceWidth = Dimensions.get('window').width;

type Props = {
  navigation: NavigationScreenProp<NavigationRoute>;
};

type State = {
  refresh: string;
  mask: boolean;
};

export type PlanProps = Pick<
  ItemContextProps,
  'items' | 'about' | 'refreshData'
> &
  Pick<ThemeContextProps, 'rerendering' | 'onFinishRerendering'> & {
    loading: boolean;
    refresh: string;
  };

type PlanState = {
  refresh: string;
};

const LogoTitle = () => (
  <Image
    source={
      darkMode()
        ? require('../../../img/header_dark.png')
        : require('../../../img/header.png')
    }
    style={styles.logo}
    resizeMode="contain"
  />
);

type HomeScreeState = {
  mask: boolean;
};

const HomeScreen = () => {
  const navigation = useContext(NavigationContext);
  const { items, about, refreshData, itemsLoading } = useContext(ItemsContext);
  const { rerendering, onFinishRerendering } = useContext(ThemeContext);
  const [state, setState] = useState<HomeScreeState>({ mask: false });

  const refresh = useNavigationParam('refresh') || '';

  useDidMount(() => {
    navigation.setParams({
      onPushCreatePlan: async () => {
        setState({ mask: false });

        await AsyncStorage.setItem('FIRST_CRAEATE_ITEM', 'true');
        navigation.navigate('CreatePlan');
      },
    });

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
        rerendering={rerendering}
        items={items}
        about={about}
        refresh={refresh}
        refreshData={refreshData}
        onFinishRerendering={onFinishRerendering}
      />
      {state.mask && <View style={styles.mask} />}
    </View>
  );
};

type NavigationOptions = {
  navigation: NavigationScreenProp<NavigationRoute>;
};

HomeScreen.navigationOptions = ({ navigation }: NavigationOptions) => {
  const { params = {} } = navigation.state;

  return {
    headerTitle: <LogoTitle />,
    headerStyle: {
      backgroundColor: theme().mode.header.backgroundColor,
    },
    headerRight: (
      <View style={styles.headerRight}>
        <Hint onPress={params.onPushCreatePlan} testID="ScheduleAdd">
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
    ),
  };
};

export type HomeScreenPlanType = {
  onSchedule: (itemId: string, title: string) => void;
  onDelete: (itemId: string) => void;
};

export type ItemProps = ItemParam & {
  id: string;
  about: string;
};

const HomeScreenPlan = memo((props: PlanProps) => {
  const { navigate } = useNavigation();
  const [state, setState] = useState<PlanState>({ refresh: '' });

  useDidMount(() => {
    if (props.rerendering) {
      navigate('ScreenSetting');
      if (props.onFinishRerendering) props.onFinishRerendering();
    }
  });

  useEffect(() => {
    if (state.refresh === props.refresh) {
      return;
    }
    setState({ refresh: props.refresh });

    if (props.refreshData) {
      props.refreshData();
    }
  }, [props, props.refresh, state.refresh]);

  const onRefresh = useCallback(() => {
    setState({ refresh: uuidv1() });
  }, []);

  const onDelete = useCallback(
    async (itemId: string) => {
      const ok = await deleteItem(null, { id: itemId });
      if (!ok) {
        Alert.alert('削除に失敗しました');
        return;
      }

      db.transaction((tx: SQLite.SQLTransaction) => {
        deleteCalendarByItemId(tx, Number(itemId), () => null);
        deleteItemDetailByItemId(tx, itemId, onRefresh);
      });
    },
    [onRefresh]
  );

  const onSchedule = useCallback(
    (id: string, title: string) => {
      navigate('Schedule', { itemId: id, title });
    },
    [navigate]
  );

  const items = (props.items || []).map((item: Item) => {
    const about = (props.about || []).find(val => val.itemId === item.id);

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

const MainCardNavigator = createStackNavigator(
  {
    Home: {
      screen: HomeScreen,
    },
    Schedule: {
      screen: Schedule,
    },
  },
  {
    defaultNavigationOptions: {
      headerStyle: {
        backgroundColor: theme().mode.header.backgroundColor,
      },
      headerTitleStyle: {
        color: theme().mode.header.text,
      },
      headerTintColor: theme().mode.header.text,
    },
  }
);

export default createStackNavigator(
  {
    MainCardNavigator: {
      screen: MainCardNavigator,
    },
    EditPlan: {
      screen: EditPlan,
    },
  },
  {
    initialRouteName: 'MainCardNavigator',
    headerMode: 'none',
  }
);

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
