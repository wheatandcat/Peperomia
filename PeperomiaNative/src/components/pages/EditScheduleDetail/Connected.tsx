import { SQLite } from "expo-sqlite";
import React, { Component } from "react";
import { NavigationScreenProp, NavigationRoute } from "react-navigation";
import { db } from "../../../lib/db";
import {
  ItemDetailParam,
  update as updateItemDetail,
  ItemDetail
} from "../../../lib/db/itemDetail";
import getKind from "../../../lib/getKind";
import { Consumer as ItemsConsumer } from "../../../containers/Items";
import Page from "../../templates/CreateScheduleDetail/Page";

interface State extends ItemDetailParam {
  iconSelected: boolean;
}

interface Props extends ItemDetailParam {
  id: number;
  navigation: NavigationScreenProp<NavigationRoute>;
  onShow: (reload: boolean) => void;
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
    this.props.onShow(false);
  };

  onSave = (title: string, kind: string, memo: string, time: number) => {
    db.transaction((tx: SQLite.Transaction) => {
      const itemDetail: ItemDetail = {
        id: this.props.id,
        title,
        memo,
        kind,
        moveMinutes: time,
        priority: this.props.priority,
        itemId: 0
      };

      updateItemDetail(tx, itemDetail, this.save);
    });
  };

  save = async () => {
    const refreshData = this.props.navigation.getParam("refreshData", () => {});
    await refreshData();

    await this.props.refreshData();
    this.props.onShow(true);
  };

  onIcons = (title: string) => {
    this.props.navigation.navigate("Icons", {
      kind: getKind(title),
      defaultIcon: false,
      onSelectIcon: (kind: string) => {
        this.props.navigation.navigate("ScheduleDetail", {
          kind: kind
        });
      },
      onDismiss: () => {
        this.props.navigation.navigate("ScheduleDetail");
      },
      photo: false
    });
  };

  render() {
    return (
      <Page
        title={this.state.title}
        kind={this.state.kind}
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
