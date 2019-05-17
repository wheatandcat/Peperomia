import React, { Component } from "react";
import { NavigationScreenProp, NavigationRoute } from "react-navigation";
import { Consumer as ItemsConsumer } from "../../../containers/Items";
import { ItemDetailParam } from "../../../lib/db/itemDetail";
import ScheduleDetail from "./Connected";
import EditScheduleDetail from "../EditScheduleDetail/Connected";

interface State extends ItemDetailParam {
  scheduleDetailId: number;
  mode: string;
}

interface Props {
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
  static navigationOptions = { header: null };

  state = {
    title: "",
    memo: "",
    kind: "",
    moveMinutes: 0,
    priority: 0,
    scheduleDetailId: 0,
    mode: "show"
  };

  onEdit = (
    title: string,
    kind: string,
    memo: string,
    moveMinutes: number,
    priority: number
  ): void => {
    const scheduleDetailId = this.props.navigation.getParam(
      "scheduleDetailId",
      "1"
    );

    this.setState({
      title,
      kind,
      memo,
      moveMinutes,
      priority,
      scheduleDetailId,
      mode: "edit"
    });
  };

  onShow = (): void => {
    this.setState({ mode: "show" });
  };

  render() {
    if (this.state.mode === "edit") {
      return (
        <EditScheduleDetail
          id={this.state.scheduleDetailId}
          title={this.state.title}
          kind={this.state.kind}
          memo={this.state.memo}
          moveMinutes={this.state.moveMinutes}
          priority={this.state.priority}
          navigation={this.props.navigation}
          onShow={this.onShow}
        />
      );
    }

    return (
      <ScheduleDetail
        navigation={this.props.navigation}
        refreshData={this.props.refreshData}
        onEdit={this.onEdit}
      />
    );
  }
}
