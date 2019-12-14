import * as SQLite from 'expo-sqlite';
import React, { Component } from 'react';
import { NavigationScreenProp, NavigationRoute } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import EStyleSheet from 'react-native-extended-stylesheet';
import { Dimensions, View, Image, AsyncStorage } from 'react-native';
import { Feather } from '@expo/vector-icons';
import uuidv1 from 'uuid/v1';
import theme, { darkMode } from '../../../config/theme';
import { db, ResultError } from '../../../lib/db';
import { Item } from '../../../lib/db/item';
import { delete1st } from '../../../lib/db/item';
import { deleteByItemId as deleteItemDetailByItemId } from '../../../lib/db/itemDetail';
import { deleteByItemId as deleteCalendarByItemId } from '../../../lib/db/calendar';
import {
  Consumer as ItemsConsumer,
  ContextProps,
} from '../../../containers/Items';
import {
  Consumer as ThemeConsumer,
  ContextProps as ThemeContextProps,
} from '../../../containers/Theme';
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

export type PlanProps = Pick<ContextProps, 'items' | 'about' | 'refreshData'> &
  Pick<ThemeContextProps, 'rerendering' | 'onFinishRerendering'> &
  Pick<Props, 'navigation'> & {
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

class HomeScreen extends Component<Props, State> {
  static navigationOptions = ({
    navigation,
  }: {
    navigation: NavigationScreenProp<NavigationRoute>;
  }) => {
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

  state = {
    refresh: '',
    mask: false,
  };

  async componentDidMount() {
    this.props.navigation.setParams({
      onPushCreatePlan: async () => {
        this.setState({
          mask: false,
        });

        await AsyncStorage.setItem('FIRST_CRAEATE_ITEM', 'true');
        this.props.navigation.navigate('CreatePlan');
      },
    });

    const mask = await AsyncStorage.getItem('FIRST_CRAEATE_ITEM');

    this.setState({
      mask: !mask,
    });
  }

  render() {
    const refresh = this.props.navigation.getParam('refresh', '');

    return (
      <ItemsConsumer>
        {({ items, about, refreshData, itemsLoading }: ContextProps) => (
          <ThemeConsumer>
            {({ rerendering, onFinishRerendering }: ThemeContextProps) => (
              <>
                <HomeScreenPlan
                  loading={Boolean(itemsLoading)}
                  navigation={this.props.navigation}
                  rerendering={rerendering}
                  items={items}
                  about={about}
                  refresh={refresh}
                  refreshData={refreshData}
                  onFinishRerendering={onFinishRerendering}
                />
                {this.state.mask && <View style={styles.mask} />}
              </>
            )}
          </ThemeConsumer>
        )}
      </ItemsConsumer>
    );
  }
}

export class HomeScreenPlan extends Component<PlanProps, PlanState> {
  state = {
    refresh: '',
  };
  componentDidMount() {
    if (this.props.rerendering) {
      this.props.navigation.navigate('ScreenSetting');
      if (this.props.onFinishRerendering) this.props.onFinishRerendering();
    }
  }

  componentDidUpdate() {
    if (this.state.refresh === this.props.refresh) {
      return;
    }

    this.setState({ refresh: this.props.refresh });

    if (this.props.refreshData) {
      this.props.refreshData();
    }
  }

  onDelete = (itemId: string) => {
    db.transaction((tx: SQLite.Transaction) => {
      delete1st(tx, itemId, (_: Item, error: ResultError) => {
        if (error) {
          return;
        }
        deleteCalendarByItemId(tx, Number(itemId), () => null);
        deleteItemDetailByItemId(tx, itemId, this.onRefresh);
      });
    });
  };

  onSchedule = (id: string, title: string) => {
    this.props.navigation.navigate('Schedule', { itemId: id, title });
  };

  onRefresh = () => {
    this.setState({ refresh: uuidv1() });
  };

  render() {
    const items = (this.props.items || []).map((item: Item) => {
      const about = (this.props.about || []).find(
        val => val.itemId === item.id
      );

      return {
        ...item,
        id: String(item.id),
        about: about ? about.about : '',
      };
    });

    return (
      <Page
        data={items}
        loading={this.props.loading}
        onSchedule={this.onSchedule}
        onDelete={this.onDelete}
      />
    );
  }
}

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
