import * as ImageManipulator from "expo-image-manipulator";
import * as SQLite from "expo-sqlite";
import React, { Component } from "react";
import { NavigationScreenProp, NavigationRoute } from "react-navigation";
import { TouchableOpacity, View } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import {
  Consumer as ItemsConsumer,
  ContextProps
} from "../../../containers/Items";
import theme from "../../../config/theme";
import { db, ResultError } from "../../../lib/db";
import { update as updateItem, Item } from "../../../lib/db/item";
import {
  update as updateCalendar,
  insert as insertCalendar,
  Calendar
} from "../../../lib/db/calendar";
import getKind from "../../../lib/getKind";
import { SuggestItem } from "../../../lib/suggest";
import Page from "../../templates/CreatePlan/Page";

type Props = {
  navigation: NavigationScreenProp<NavigationRoute>;
};

type ConnectedProps = Pick<
  ContextProps,
  "items" | "refreshData" | "calendars"
> & {
  navigation: NavigationScreenProp<NavigationRoute>;
};

type PlanProps = Pick<ContextProps, "items" | "refreshData"> & {
  navigation: NavigationScreenProp<NavigationRoute>;
  input: {
    title: string;
    date: string;
  };
  image: string;
  kind: string;
  onInput: (name: string, value: any) => void;
  onImage: (image: string) => void;
  onSave: () => void;
  onIcons: () => void;
  onCamera: () => void;
  onHome: () => void;
};

type State = {
  input: {
    title: string;
    date: string;
  };
  image: string;
  kind: string;
  calendar: Calendar;
};

export default class extends Component<Props> {
  static navigationOptions = ({
    navigation
  }: {
    navigation: NavigationScreenProp<NavigationRoute>;
  }) => {
    return {
      title: "タイトル編集",
      headerLeft: (
        <View style={{ left: 10 }}>
          <TouchableOpacity
            onPress={() => {
              navigation.goBack();
            }}
          >
            <MaterialCommunityIcons
              name="chevron-left"
              size={25}
              color={theme().color.lightGreen}
            />
          </TouchableOpacity>
        </View>
      )
    };
  };

  render() {
    return (
      <ItemsConsumer>
        {({ refreshData, items, calendars }: ContextProps) => (
          <Connected
            navigation={this.props.navigation}
            items={items}
            refreshData={refreshData}
            calendars={calendars}
          />
        )}
      </ItemsConsumer>
    );
  }
}

class Connected extends Component<ConnectedProps, State> {
  state = {
    input: { title: "", date: "" },
    image: "",
    kind: "",
    calendar: {
      id: 0,
      itemId: 0,
      date: ""
    }
  };

  componentDidMount() {
    const id = this.props.navigation.getParam("id", 0);
    let input: {
      date: string;
      title: string;
    } = {
      date: "",
      title: ""
    };

    const calendar = (this.props.calendars || []).find(
      item => Number(id) === Number(item.itemId)
    );

    if (calendar && calendar.date) {
      input.date = calendar.date;
      this.setState({
        calendar
      });
    }

    const schedule = (this.props.items || []).find(
      item => Number(id) === Number(item.id)
    );

    if (schedule && schedule.title) {
      input.title = schedule.title;
    }

    const image = this.props.navigation.getParam("image", "");
    const kind = this.props.navigation.getParam("kind", "");

    this.setState({
      input,
      image,
      kind
    });
  }

  async componentDidUpdate() {
    const image = this.props.navigation.getParam("image", "");
    if (image && image !== this.state.image) {
      this.setState({
        image
      });
    }

    const kind = this.props.navigation.getParam("kind", "");
    if (kind && kind !== this.state.kind) {
      this.setState({
        kind
      });
    }
  }

  onImage = (image: string) => {
    this.setState({
      image
    });
  };

  onInput = (name: string, value: any) => {
    const input = {
      ...this.state.input,
      [name]: value
    };

    this.setState({
      input
    });
  };

  onSave = async () => {
    let image = "";
    if (this.state.image) {
      const manipResult = await ImageManipulator.manipulateAsync(
        this.state.image,
        [{ rotate: 0 }, { flip: { vertical: true } }],
        { format: "png", base64: true }
      );

      image = manipResult.base64 || "";
    }

    db.transaction((tx: SQLite.Transaction) => {
      const id = this.props.navigation.getParam("id", 0);

      const item: Item = {
        id,
        title: this.state.input.title,
        kind: this.state.kind || getKind(this.state.input.title),
        image
      };

      updateItem(tx, item, this.save);

      if (this.state.calendar.id) {
        console.log({
          ...this.state.calendar,
          date: this.state.input.date
        });

        updateCalendar(
          tx,
          {
            ...this.state.calendar,
            date: this.state.input.date
          },
          this.saveCalendar
        );
      } else {
        insertCalendar(
          tx,
          {
            itemId: id,
            date: this.state.input.date
          },
          this.saveCalendar
        );
      }
    });
  };

  save = (_: Item[], error: ResultError) => {
    if (error) {
      return;
    }

    const id = this.props.navigation.getParam("id", 0);

    this.props.navigation.navigate("Schedule", {
      itemId: id,
      title: this.state.input.title
    });
  };

  saveCalendar = (_: Calendar | number, error: ResultError) => {
    if (error) {
      return;
    }

    if (this.props.refreshData) {
      this.props.refreshData();
    }
  };

  onIcons = () => {
    this.props.navigation.navigate("Icons", {
      kind: getKind(this.state.input.title),
      onSelectIcon: (kind: string) => {
        this.props.navigation.navigate("EditPlan", {
          kind: kind
        });
      },
      onDismiss: () => {
        this.props.navigation.navigate("EditPlan");
      },
      photo: true
    });
  };

  onCamera = () => {
    this.props.navigation.navigate("Camera", {
      onPicture: (image?: string) => {
        this.props.navigation.navigate("EditPlan", {
          image
        });
      },
      onDismiss: () => {
        this.props.navigation.navigate("EditPlan");
      }
    });
  };

  onHome = () => {
    this.props.navigation.goBack();
  };

  render() {
    return (
      <Plan
        navigation={this.props.navigation}
        input={this.state.input}
        image={this.state.image}
        kind={this.state.kind}
        items={this.props.items}
        refreshData={this.props.refreshData}
        onInput={this.onInput}
        onImage={this.onImage}
        onSave={this.onSave}
        onIcons={this.onIcons}
        onCamera={this.onCamera}
        onHome={this.onHome}
      />
    );
  }
}

interface PlanState {
  suggestList: SuggestItem[];
}

class Plan extends Component<PlanProps, PlanState> {
  state = {
    suggestList: []
  };

  componentDidMount() {
    const suggestList = (this.props.items || []).map(item => ({
      title: item.title,
      kind: item.kind
    }));

    this.setState({
      suggestList
    });
  }

  onSave = async () => {
    await this.props.onSave();

    if (this.props.refreshData) {
      this.props.refreshData();
    }
  };

  render() {
    return (
      <Page
        mode="edit"
        title={this.props.input.title}
        date={this.props.input.date}
        image={this.props.image}
        kind={this.props.kind}
        suggestList={this.state.suggestList}
        onInput={this.props.onInput}
        onImage={this.props.onImage}
        onSave={this.onSave}
        onIcons={this.props.onIcons}
        onCamera={this.props.onCamera}
        onHome={this.props.onHome}
      />
    );
  }
}
