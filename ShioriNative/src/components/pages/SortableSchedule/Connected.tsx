import React, { Component } from "react";
import { ItemDetail } from "../../../lib/db/itemDetail";
import Page from "../../templates/SortableSchedule/Page";

interface Props {
  items: ItemDetail[];
  onChangeItems: (data: ItemDetail[]) => void;
}

export interface State {
  items: ItemDetail[];
  ready: boolean;
}

export default class extends Component<Props, State> {
  state = { items: this.props.items, ready: true };

  componentDidMount() {
    console.log(this.state.items);

    this.setState({ ready: false });
  }

  render() {
    return <Page data={this.state.items} onChange={this.props.onChangeItems} />;
  }
}
