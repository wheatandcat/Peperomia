import React, {
  memo,
  useContext,
  useState,
  useCallback,
  useEffect,
} from 'react';
import { NavigationScreenProp, NavigationRoute } from 'react-navigation';
import { RouteProp, useNavigation } from '@react-navigation/native';
import {
  createStackNavigator,
  StackNavigationProp,
} from '@react-navigation/stack';
import EStyleSheet from 'react-native-extended-stylesheet';
import {
  Dimensions,
  Alert,
  Text,
  View,
  Image,
  AsyncStorage,
} from 'react-native';
import { Feather } from '@expo/vector-icons';
import uuidv1 from 'uuid/v1';
import theme, { darkMode } from '../../../config/theme';
import { deleteItem } from '../../../lib/item';
import {
  useItems,
  ContextProps as ItemContextProps,
} from '../../../containers/Items';
import {
  useTheme,
  ContextProps as ThemeContextProps,
} from '../../../containers/Theme';
import { Context as AuthContext } from '../../../containers/Auth';
import { SelectItem } from '../../../domain/item';
import { useDidMount } from '../../../hooks/index';
import Hint from '../../atoms/Hint/Hint';
import Schedule from '../Schedule/Switch';
import EditPlan from '../EditPlan/Connected';
import Page from './Page';

const deviceHeight = Dimensions.get('window').height;
const deviceWidth = Dimensions.get('window').width;

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

type RootStackParamList = {
  Home: { refresh: boolean; onPushCreatePlan: () => Promise<void> };
  CreatePlan: undefined;
  ScreenSetting: undefined;
  Schedule: { itemId: string | number; title: string };
};

type HomeScreenNavigationProp = StackNavigationProp<RootStackParamList, 'Home'>;
type HomeScreenRouteProp = RouteProp<RootStackParamList, 'Home'>;

type Props = {
  navigation: HomeScreenNavigationProp;
  route: HomeScreenRouteProp;
};

const HomeScreen = ({ navigation, route }: Props) => {
  const { items, about, refreshData, itemsLoading } = useItems();
  const { rerendering, onFinishRerendering } = useTheme();
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

  console.log(items);

  return (
    <View>
      <HomeScreenPlan
        loading={Boolean(itemsLoading)}
        rerendering={rerendering}
        items={items}
        about={about}
        refresh={String(refresh)}
        refreshData={refreshData}
        onFinishRerendering={onFinishRerendering}
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
  const { uid } = useContext(AuthContext);
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

  const items = (props.items || []).map(item => {
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

const Stack = createStackNavigator();
/*
const MainStack = () => {
  return (
    <Stack.Navigator initialRouteName="Home">
      <Stack.Screen name="Home" component={HomeScreen} />
      <Stack.Screen name="Schedule" component={Schedule} />
    </Stack.Navigator>
  );
};


const RootStack = () => {
  return (
    <Stack.Navigator initialRouteName="MainStack">
      <Stack.Screen name="MainStack" component={MainStack} />
      <Stack.Screen name="EditPlan" component={EditPlan} />
    </Stack.Navigator>
  );
};
*/

const RootStack = () => {
  return (
    <Stack.Navigator initialRouteName="Home">
      <Stack.Screen name="Home" component={HomeScreen} />
    </Stack.Navigator>
  );
};

export default RootStack;

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
