import * as ImageManipulator from "expo-image-manipulator";
import * as SQLite from "expo-sqlite";
import React, { Component } from "react";
import { Alert } from "react-native";
import { NavigationScreenProp, NavigationRoute } from "react-navigation";
import {
  Consumer as ItemsConsumer,
  ContextProps
} from "../../../containers/Items";
import { db, ResultError } from "../../../lib/db";
import { insert as insertItem, Item } from "../../../lib/db/item";
import { insert as insertCalendar, Calendar } from "../../../lib/db/calendar";
import { SuggestItem } from "../../../lib/suggest";
import getKind from "../../../lib/getKind";
import Page from "../../templates/CreatePlan/Page";

interface Props {
  navigation: NavigationScreenProp<NavigationRoute>;
}

interface State {
  input: {
    title: string;
    date: string;
  };
  image: string;
  kind: string;
  suggestList: SuggestItem[];
}

export default class extends Component<Props> {
  render() {
    return (
      <ItemsConsumer>
        {({ items, refreshData, calendars }: ContextProps) => (
          <Connect
            {...this.props}
            items={items}
            refreshData={refreshData}
            calendars={calendars}
          />
        )}
      </ItemsConsumer>
    );
  }
}

type ConnectProps = Props &
  Pick<ContextProps, "items" | "refreshData" | "calendars">;

class Connect extends Component<ConnectProps, State> {
  state = {
    input: { title: "", date: "" },
    image: "",
    kind: "",
    suggestList: []
  };

  componentDidMount() {
    const date = this.props.navigation.getParam("date", "");

    const suggestList = (this.props.items || []).map(item => ({
      title: item.title,
      kind: item.kind
    }));

    this.setState({
      suggestList,
      input: {
        ...this.state.input,
        date
      }
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
    this.setState({
      input: {
        ...this.state.input,
        [name]: value
      }
    });
  };

  onSave = async () => {
    if (this.state.input.date) {
      const check = (this.props.calendars || []).find(
        calendar => calendar.date === this.state.input.date
      );

      if (check) {
        Alert.alert("同じ日にスケジュールが既に登録されています");
        return;
      }
    }

    let image = "";
    if (this.state.image) {
      const manipResult = await ImageManipulator.manipulateAsync(
        this.state.image,
        [{ rotate: 0 }, { flip: ImageManipulator.FlipType.Vertical }],
        { compress: 1, format: ImageManipulator.SaveFormat.PNG, base64: true }
      );

      image = manipResult.base64 || "";
    }

    db.transaction((tx: SQLite.Transaction) => {
      const item: Item = {
        title: this.state.input.title,
        kind: this.state.kind || getKind(this.state.input.title),
        image
      };

      insertItem(tx, item, this.save);
    });
  };

  save = (insertId: number, error: ResultError) => {
    if (error) {
      return;
    }

    if (this.state.input.date) {
      // 日付のデータがある場合ははcalendarに登録する
      db.transaction((tx: SQLite.Transaction) => {
        const item: Calendar = {
          itemId: insertId,
          date: this.state.input.date
        };

        insertCalendar(tx, item, (_, error: ResultError) => {
          if (error) {
            return;
          }

          this.pushCreateSchedule(insertId);
        });
      });
    } else {
      this.pushCreateSchedule(insertId);
    }
  };

  pushCreateSchedule = (itemId: number) => {
    if (this.props.refreshData) {
      this.props.refreshData();
    }

    this.props.navigation.navigate("CreateSchedule", {
      itemId,
      title: this.state.input.title
    });
  };

  onIcons = () => {
    this.props.navigation.navigate("Icons", {
      kind: getKind(this.state.input.title),
      onSelectIcon: (kind: string) => {
        this.props.navigation.navigate("CreatePlan", {
          kind: kind
        });
      },
      onDismiss: () => {
        this.props.navigation.navigate("CreatePlan");
      },
      photo: true
    });
  };

  onCamera = () => {
    this.props.navigation.navigate("Camera", {
      onPicture: (image?: string) => {
        this.props.navigation.navigate("CreatePlan", {
          image
        });
      },
      onDismiss: () => {
        this.props.navigation.navigate("CreatePlan");
      }
    });
  };

  onHome = () => {
    this.props.navigation.goBack(null);
  };

  render() {
    return (
      <Page
        mode="new"
        title={this.state.input.title}
        date={this.state.input.date}
        image={this.state.image}
        kind={this.state.kind}
        suggestList={this.state.suggestList}
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
