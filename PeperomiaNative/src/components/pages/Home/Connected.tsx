import { SQLite, Constants } from "expo";
import React, { Component } from "react";
import {
  createStackNavigator,
  NavigationScreenProp,
  NavigationRoute
} from "react-navigation";
import { TouchableOpacity, View } from "react-native";
import { Feather } from "@expo/vector-icons";
import uuidv1 from "uuid/v1";
import { db, init } from "../../../lib/db";
import { select as selectItems, Item } from "../../../lib/db/item";
import {
  select1st as selectUser1st,
  insert as insertUser,
  User
} from "../../../lib/db/user";
import {
  selectByItemId as selectItemDetailByItemId,
  ItemDetail
} from "../../../lib/db/itemDetail";
import Schedule from "../Schedule/Switch";
import Page, { Props as PageProps } from "./Page";

interface Props extends PageProps {
  navigation: NavigationScreenProp<NavigationRoute>;
}

interface ItemAbout {
  itemId: number;
  about: string;
}

interface State {
  items: Item[];
  about: ItemAbout[];
  refresh: string;
  guide: boolean;
}

class HomeScreen extends Component<Props, State> {
  static navigationOptions = ({
    navigation
  }: {
    navigation: NavigationScreenProp<NavigationRoute>;
  }) => {
    return {
      title: "マイプラン",
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
    items: [],
    about: [],
    refresh: "",
    guide: false
  };

  componentDidMount() {
    db.transaction((tx: SQLite.Transaction) => {
      init(tx);
      selectItems(tx, this.setItems);
      selectUser1st(tx, this.checkUser);
    });
  }

  componentDidUpdate() {
    const refresh = this.props.navigation.getParam("refresh", "");

    if (this.state.refresh === refresh) {
      return;
    }

    this.setState({ refresh: refresh });
    db.transaction((tx: SQLite.Transaction) => {
      selectItems(tx, this.setItems);
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
    }
  };

  setUser = (data: any, error: any) => {
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

  setItems = (data: any, error: any) => {
    if (error) {
      return;
    }
    this.setState({
      items: data
    });

    data.map((val: Item) => {
      db.transaction((tx: SQLite.Transaction) => {
        selectItemDetailByItemId(tx, String(val.id), this.setItemsDetail);
      });
    });
  };

  setItemsDetail = (data: any, error: any) => {
    if (error || !data || data.length === 0) {
      return;
    }

    const names = data.map((val: ItemDetail) => val.title).join("→");
    const itemId = data[0].itemId;
    const about = [
      ...this.state.about,
      {
        itemId: itemId,
        about: names
      }
    ];

    this.setState({
      about
    });
  };

  onSchedule = (id: string, title: string) => {
    this.props.navigation.navigate("Schedule", { itemId: id, title });
  };

  onCreate = () => {
    this.props.navigation.navigate("CreatePlan");
  };

  render() {
    const items: any = this.state.items.map((item: Item) => {
      const about: any = this.state.about.find(
        (val: ItemAbout) => val.itemId === item.id
      );

      return { ...item, id: String(item.id), about: about ? about.about : "" };
    });

    return (
      <Page
        data={items}
        loading={false}
        guide={this.state.guide}
        onSchedule={this.onSchedule}
        onCreate={this.onCreate}
        onGuideFinish={this.onGuideFinish}
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
