import React, { Component } from "react";
import { NavigationScreenProp, NavigationRoute } from "react-navigation";
import ScheduleDetail from "./Connected";
import EditScheduleDetail, {
  State as EditScheduleDetailState
} from "../EditScheduleDetail/Connected";

interface State extends EditScheduleDetailState {
  scheduleDetailId: number;
  mode: string;
}

interface Props {
  navigation: NavigationScreenProp<NavigationRoute>;
}

export default class extends Component<Props, State> {
  state = {
    title: "",
    memo: "",
    moveMinutes: 0,
    scheduleDetailId: 0,
    mode: "show"
  };

  onEdit = (title: string, memo: string, moveMinutes: number): void => {
    const scheduleDetailId = this.props.navigation.getParam(
      "scheduleDetailId",
      "1"
    );

    this.setState({
      title,
      memo,
      moveMinutes,
      scheduleDetailId,
      mode: "edit"
    });
  };

  onShow = (): void => {
    this.setState({
      mode: "show"
    });
  };

  render() {
    if (this.state.mode === "edit") {
      return (
        <EditScheduleDetail
          id={this.state.scheduleDetailId}
          title={this.state.title}
          memo={this.state.memo}
          moveMinutes={this.state.moveMinutes}
          navigation={this.props.navigation}
          onShow={this.onShow}
        />
      );
    }

    return (
      <ScheduleDetail navigation={this.props.navigation} onEdit={this.onEdit} />
    );
  }
}
