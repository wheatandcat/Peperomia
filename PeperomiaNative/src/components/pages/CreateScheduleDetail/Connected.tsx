import * as SQLite from "expo-sqlite";
import React, { Component } from "react";
import { NavigationScreenProp, NavigationRoute } from "react-navigation";
import uuidv1 from "uuid/v1";
import { db, ResultError } from "../../../lib/db";
import {
  ItemDetailParam,
  insert as insertItemDetail,
  countByItemId,
  ItemDetail
} from "../../../lib/db/itemDetail";
import { SuggestItem } from "../../../lib/suggest";
import getKind from "../../../lib/getKind";
import {
  Consumer as ItemsConsumer,
  ContextProps
} from "../../../containers/Items";
import Page from "../../templates/CreateScheduleDetail/Page";

export interface State extends ItemDetailParam {
  iconSelected: boolean;
  priority: number;
  suggestList: SuggestItem[];
}

interface Props extends ItemDetailParam {
  navigation: NavigationScreenProp<NavigationRoute>;
}

type PlanProps = Props & Pick<ContextProps, "itemDetails" | "refreshData">;

export default class extends Component<Props> {
  render() {
    return (
      <ItemsConsumer>
        {({ refreshData, itemDetails }: ContextProps) => (
          <Plan
            {...this.props}
            refreshData={refreshData}
            itemDetails={itemDetails}
          />
        )}
      </ItemsConsumer>
    );
  }
}

class Plan extends Component<PlanProps, State> {
  state = {
    title: this.props.title || "",
    kind: this.props.kind || "",
    place: this.props.place || "",
    url: this.props.url || "",
    memo: this.props.memo || "",
    moveMinutes: this.props.moveMinutes || 0,
    iconSelected: false,
    priority: 1,
    suggestList: []
  };

  componentDidMount() {
    const suggestList = (this.props.itemDetails || []).map(itemDetail => ({
      title: itemDetail.title,
      kind: itemDetail.kind
    }));

    this.setState({
      suggestList
    });

    const itemId = this.props.navigation.getParam("itemId", "1");

    db.transaction((tx: SQLite.Transaction) => {
      countByItemId(tx, itemId, this.getCount);
    });
  }

  componentDidUpdate() {
    const kind = this.props.navigation.getParam("kind", "");

    if (!kind) {
      return;
    }

    if (this.state.kind !== kind) {
      this.setState({ kind, iconSelected: true });
    }
  }

  getCount = (count: number, error: ResultError) => {
    if (error) {
      return;
    }

    this.setState({
      priority: count + 1
    });
  };

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

    db.transaction((tx: SQLite.Transaction) => {
      const itemDetail: ItemDetail = {
        itemId,
        title,
        kind,
        place,
        url,
        memo,
        moveMinutes: time,
        priority: this.state.priority
      };

      insertItemDetail(tx, itemDetail, this.save);
    });
  };

  save = (_: number, error: ResultError) => {
    if (error) {
      return;
    }

    const itemId = this.props.navigation.getParam("itemId", "1");

    this.props.navigation.navigate("CreateSchedule", {
      itemId,
      refresh: uuidv1()
    });

    if (this.props.refreshData) {
      this.props.refreshData();
    }
  };

  onIcons = (title: string) => {
    this.props.navigation.navigate("Icons", {
      kind: getKind(title),
      onSelectIcon: (kind: string) => {
        this.props.navigation.navigate("CreateScheduleDetail", {
          kind: kind
        });
      },
      onDismiss: () => {
        this.props.navigation.navigate("CreateScheduleDetail");
      },
      photo: false
    });
  };

  render() {
    return (
      <Page
        title={this.state.title}
        kind={this.state.kind}
        place={this.state.place}
        url={this.state.url}
        memo={this.state.memo}
        time={this.state.moveMinutes}
        suggestList={this.state.suggestList}
        iconSelected={this.state.iconSelected}
        onDismiss={this.onDismiss}
        onSave={this.onSave}
        onIcons={this.onIcons}
      />
    );
  }
}
