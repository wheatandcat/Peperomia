import { SQLite, Constants } from "expo";
import React, { Component } from "react";
import {
  createStackNavigator,
  NavigationScreenProp,
  NavigationRoute
} from "react-navigation";
import { TouchableOpacity, View, AsyncStorage, Image } from "react-native";
import { Feather } from "@expo/vector-icons";
import uuidv1 from "uuid/v1";
import { db } from "../../../lib/db";
import { Item } from "../../../lib/db/item";
import {
  select1st as selectUser1st,
  insert as insertUser,
  User
} from "../../../lib/db/user";
import { delete1st } from "../../../lib/db/item";
import { deleteByItemId as deleteItemDetailByItemId } from "../../../lib/db/itemDetail";
import { Consumer as ItemsConsumer } from "../../../containers/Items";
import Schedule from "../Schedule/Switch";
import EditPlan from "../EditPlan/Connected";
import Page from "./Page";

interface ItemAbout {
  itemId: number;
  about: string;
}

interface Props {
  navigation: NavigationScreenProp<NavigationRoute>;
}

interface State {
  refresh: string;
}

interface PlanProps {
  items: Item[];
  about: ItemAbout[];
  refreshData: () => void;
  refresh: string;
  onSchedule: (id: string, title: string) => void;
  onCreate: () => void;
}

interface PlanState {
  refresh: string;
  guide: boolean;
}

class LogoTitle extends Component {
  render() {
    return (
      <Image
        source={require("../../../img/logo.png")}
        style={{ height: 85 / 2.5, width: 274 / 2.5 }}
      />
    );
  }
}

class HomeScreen extends Component<Props, State> {
  static navigationOptions = ({
    navigation
  }: {
    navigation: NavigationScreenProp<NavigationRoute>;
  }) => {
    return {
      headerTitle: <LogoTitle />,
      headerRight: (
        <View style={{ right: 12 }}>
          <TouchableOpacity
            onPress={() => {
              navigation.navigate("CreatePlan");
            }}
          >
            <Feather name="plus" size={28} />
          </TouchableOpacity>
        </View>
      )
    };
  };

  state = {
    refresh: ""
  };

  onSchedule = (id: string, title: string) => {
    this.props.navigation.navigate("Schedule", { itemId: id, title });
  };

  onCreate = () => {
    this.props.navigation.navigate("CreatePlan");
  };

  render() {
    const refresh = this.props.navigation.getParam("refresh", "");

    return (
      <ItemsConsumer>
        {({ items, about, refreshData }: any) => (
          <HomeScreenPlan
            items={items}
            about={about}
            refresh={refresh}
            refreshData={refreshData}
            onSchedule={this.onSchedule}
            onCreate={this.onCreate}
          />
        )}
      </ItemsConsumer>
    );
  }
}

class HomeScreenPlan extends Component<PlanProps, PlanState> {
  state = {
    refresh: "",
    guide: false
  };

  componentDidMount() {
    db.transaction((tx: SQLite.Transaction) => {
      selectUser1st(tx, this.checkUser);
    });
  }

  componentDidUpdate() {
    if (this.state.refresh === this.props.refresh) {
      return;
    }

    this.setState({ refresh: this.props.refresh });
    this.props.refreshData();
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
    }
  };

  setUser = (_: any, error: any) => {
    if (error) {
      return;
    }

    this.setState({
      guide: true
    });
  };

  onGuideFinish = () => {
    this.setState({
      guide: false
    });
  };

  onDelete = (scheduleId: string) => {
    db.transaction((tx: SQLite.Transaction) => {
      delete1st(tx, scheduleId, (data: any, error: any) => {
        if (error) {
          return;
        }
        deleteItemDetailByItemId(tx, scheduleId, this.onRefresh);
      });
    });
  };

  onRefresh = () => {
    this.setState({ refresh: uuidv1() });
  };

  render() {
    const items: any = this.props.items.map((item: Item) => {
      const about: any = this.props.about.find(
        (val: ItemAbout) => val.itemId === item.id
      );

      return { ...item, id: String(item.id), about: about ? about.about : "" };
    });

    return (
      <Page
        data={items}
        loading={false}
        guide={this.state.guide}
        onSchedule={this.props.onSchedule}
        onCreate={this.props.onCreate}
        onGuideFinish={this.onGuideFinish}
        onDelete={this.onDelete}
      />
    );
  }
}

const MainCardNavigator = createStackNavigator({
  Home: {
    screen: HomeScreen
  },
  Schedule: {
    screen: Schedule
  },
  EditPlan: {
    screen: EditPlan
  }
});

export default createStackNavigator(
  {
    MainCardNavigator: {
      screen: MainCardNavigator
    }
  },
  {
    initialRouteName: "MainCardNavigator",
    mode: "modal",
    headerMode: "none"
  }
);
