import { SQLite } from "expo-sqlite";
import React, { Component } from "react";
import { NavigationScreenProp, NavigationRoute } from "react-navigation";
import uuidv1 from "uuid/v1";
import { db } from "../../../lib/db";
import {
  ItemDetailParam,
  insert as insertItemDetail,
  ItemDetail
} from "../../../lib/db/itemDetail";
import getKind from "../../../lib/getKind";
import { Consumer as ItemsConsumer } from "../../../containers/Items";
import Page from "../../templates/CreateScheduleDetail/Page";

export interface State extends ItemDetailParam {
  iconSelected: boolean;
}

interface Props extends ItemDetailParam {
  navigation: NavigationScreenProp<NavigationRoute>;
}

interface PlanProps extends Props {
  refreshData: () => void;
}

export default class extends Component<Props> {
  render() {
    return (
      <ItemsConsumer>
        {({ refreshData }: any) => (
          <Plan {...this.props} refreshData={refreshData} />
        )}
      </ItemsConsumer>
    );
  }
}

class Plan extends Component<PlanProps, State> {
  state = {
    title: this.props.title || "",
    place: this.props.place || "",
    url: this.props.url || "",
    memo: this.props.memo || "",
    moveMinutes: this.props.moveMinutes || 0,
    kind: this.props.kind,
    priority: this.props.priority,
    iconSelected: false
  };

  componentDidUpdate() {
    const kind = this.props.navigation.getParam("kind", "");

    if (!kind) {
      return;
    }

    if (this.state.kind !== kind) {
      this.setState({ kind, iconSelected: true });
    }
  }

  onDismiss = () => {
    this.props.navigation.goBack();
  };

  onSave = (
    title: string,
    kind: string,
    place: string,
    url: string,
    memo: string,
    time: number
  ) => {
    const itemId = this.props.navigation.getParam("itemId", "1");
    const priority = this.props.navigation.getParam("priority", "1");

    db.transaction((tx: SQLite.Transaction) => {
      const itemDetail: ItemDetail = {
        itemId,
        title,
        place,
        url,
        memo,
        kind,
        moveMinutes: time,
        priority: Number(priority)
      };

      insertItemDetail(tx, itemDetail, this.save);
    });
  };

  save = () => {
    const itemId = this.props.navigation.getParam("itemId", "1");

    this.props.navigation.navigate("Schedule", {
      itemId,
      refresh: uuidv1()
    });

    this.props.refreshData();
  };

  onIcons = (title: string) => {
    this.props.navigation.navigate("Icons", {
      kind: getKind(title),
      onSelectIcon: (kind: string) => {
        this.props.navigation.navigate("AddScheduleDetail", {
          kind: kind
        });
      },
      onDismiss: () => {
        this.props.navigation.navigate("AddScheduleDetail");
      },
      photo: false
    });
  };

  render() {
    const itemId = this.props.navigation.getParam("itemId", "1");

    return (
      <Page
        title={this.state.title}
        kind={this.state.kind}
        place={this.state.place}
        url={this.state.url}
        memo={this.state.memo}
        time={this.state.moveMinutes}
        iconSelected={this.state.iconSelected}
        onDismiss={this.onDismiss}
        onSave={this.onSave}
        onIcons={this.onIcons}
      />
    );
  }
}
